import {each, extend, bind} from 'lodash';
import instanceManager from 'instance-manager';

let RadarDetectionSystem = {};
extend(RadarDetectionSystem, {
	components: {
		with: [
			'sprite',
			'radar',
			'team',
			'gun',
		],
	},

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
		this.quadtree = instanceManager.get('quadtree');
		this.ecsManager = instanceManager.get('ecs-manager');
	},

	// TODO Optimize with quadtree
	runOne: bind(function(entity) {
		let gun = entity.getComponent('gun');
		let sprite;
		let radar;
		let currentTarget;
		let currentTargetDistance;

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
		each(potentialTargets,
			bind(function(potentialTarget) {
				if(potentialTarget.getComponent('team').name !== entity.getComponent('team').name) {
					let targetDistance =
						this.calculateTargetDistance(
							sprite.position,
							potentialTarget.getComponent('sprite').position
						);

					if(targetDistance <= radar.range){
						if(!currentTarget || targetDistance < currentTargetDistance) {
							currentTargetDistance = targetDistance;
							currentTarget = potentialTarget;
						}
					}
				}
			}, this)
		);

		if(currentTarget) {
			this.fire(sprite, gun, currentTarget);
		}
	}, RadarDetectionSystem),

	// TODO Consider target width?
	calculateTargetDistance(position, targetEntityPosition) {
		return this.game.physics.arcade.distanceToXY(position, targetEntityPosition.x, targetEntityPosition.y);
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
