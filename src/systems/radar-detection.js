import {extend, bind} from 'lodash';
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

	ecsManager: null,
	game: null,
	ui: null,
	quadtree: null,

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
		this.quadtree = instanceManager.get('quadtree');
		this.ecsManager = instanceManager.get('ecs-manager');
	},

	// TODO Optimize with quadtree
	runOne: bind(function(entity) {
		let gun = entity.gun;
		let sprite = entity.sprite;
		let radar = entity.radar;
		let currentTarget;
		let currentTargetDistance;

		gun.remainingCooldown = Math.max(
			gun.remainingCooldown - this.game.time.physicsElapsedMS,
			0
		);

		if(gun.remainingCooldown) {
			return;
		}

		let potentialTargets = this.ecsManager.getEntities([
			'team',
			'sprite',
			'health',
		]);

		for(let x = 0; x < potentialTargets.length; x++) {
			if(potentialTargets[x].team.name !== entity.team.name) {
				let targetDistance =
					this.calculateTargetDistance(
						sprite.position,
						potentialTargets[x].sprite.position
					);

				if(targetDistance <= radar.range){
					if(!currentTarget || targetDistance < currentTargetDistance) {
						currentTargetDistance = targetDistance;
						currentTarget = potentialTargets[x];
					}
				}
			}
		}

		if(currentTarget) {
			if(entity.movable && entity.movable.currentSpeed === 0) {
				this.fire(sprite, gun, currentTarget);
			} else if(!entity.breaks) {
				this.ecsManager.addComponent(entity.id, 'breaks');
			}
		} else if(entity.breaks) {
			this.ecsManager.removeComponent(entity.id, 'breaks');
		}
	}, RadarDetectionSystem),

	// TODO Consider target width?
	calculateTargetDistance(position, targetEntityPosition) {
		return this.game.physics.arcade.distanceToXY(position, targetEntityPosition.x, targetEntityPosition.y);
	},

	fire(firingSprite, gun, target) {
		let angle = this.game.math.angleBetweenPoints(firingSprite.position, target.sprite.position);

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
