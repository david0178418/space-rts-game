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
	runOne: _.bind(function(entity) {
		let gun = entity.getComponent('gun');
		let sprite;
		let radar;

		gun.remainingCooldown = Math.max(
			gun.remainingCooldown - this.game.time.physicsElapsedMS,
			0
		);

		if(gun.remainingCooldown) {
			return;
		}

		sprite = entity.getComponent('sprite');
		radar = entity.getComponent('radar');

		let potentialTargets = this.ecsManager.getEntities([
			'team',
			'sprite',
			'health',
		]);
		_.find(potentialTargets,
			_.bind(function(potentialTarget) {
				if(potentialTarget.getComponent('team').name !== entity.getComponent('team').name) {
					if(this.isDetected(sprite.position, radar.range, potentialTarget.getComponent('sprite').position)) {
						this.fire(sprite, gun, potentialTarget);
						return true;
					}
				}
				return false;
			}, this)
		);
	}, RadarDetectionSystem),

	// TODO Consider target width?
	isDetected(position, range, targetEntityPosition) {
		return this.game.physics.arcade.distanceToXY(position, targetEntityPosition.x, targetEntityPosition.y) <= range;
	},

	fire(firingSprite, gun, target) {
		let angle = this.game.math.angleBetweenPoints(firingSprite.position, target.getComponent('sprite').position);

		firingSprite.rotation = angle;

		gun.remainingCooldown = gun.cooldown;

		gun.prefab({
			damage: gun.power,
			position: firingSprite.position,
			target,
		});

		gun.sound.play();
	},
});

export default RadarDetectionSystem;
