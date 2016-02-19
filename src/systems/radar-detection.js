import _ from 'lodash';
import instanceManager from 'instance-manager';

let RadarDetectionSystem = {};
_.extend(RadarDetectionSystem, {
	components: [
		'sprite',
		'radar',
		'team',
		'gun',
	],

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
		this.quadtree = instanceManager.get('quadtree');
		this.ecsManager = instanceManager.get('ecs-manager');
	},

	// TODO Optimize with quadtree
	runOne: _.throttle(_.bind(function(entity) {
		let gun = entity.getComponent('gun');
		let sprite;
		let radar;

		gun.remainingCooldown = Math.max(
			gun.remainingCooldown - this.game.time.physicsElapsedMS,
			0
		);

		if(gun.remainingCooldown) {
			console.debug(`Gun has ${gun.remainingCooldown} time to fire`);
			return;
		}

		sprite = entity.getComponent('sprite');
		radar = entity.getComponent('radar');

		_.find(this.ecsManager.getEntities([
			'team',
			'sprite',
			'health',
		]), _.bind(function(potentialTarget) {
			if(potentialTarget.getComponent('team').name !== entity.getComponent('team').name) {
				if(this.isDetected(sprite.position, radar.range, potentialTarget.getComponent('sprite').position)) {
					this.damage(gun, potentialTarget);
					return true;
				}
			}
			return false;
		}, this));
	}, RadarDetectionSystem), 100),

	// TODO Consider target width?
	isDetected(position, range, targetEntityPosition) {
		return this.game.physics.arcade.distanceToXY(position, targetEntityPosition.x, targetEntityPosition.y) <= range;
	},

	damage(gun, entity) {
		let health = entity.getComponent('health');

		health.current -= gun.power;

		gun.remainingCooldown = gun.cooldown;

		console.debug(`Entity "${entity.id}" took ${gun.power} damage and has ${health.current} health left`);

		if(health.current <=0) {
			console.debug(`Killing entity "${entity.id}"`);
			entity.destroy();
		}
	},
});

export default RadarDetectionSystem;
