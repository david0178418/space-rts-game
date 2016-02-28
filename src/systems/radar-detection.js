import instanceManager from 'instance-manager';

let RadarDetectionSystemSystem = {
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
		RadarDetectionSystemSystem.game = instanceManager.get('game');
		RadarDetectionSystemSystem.ui = instanceManager.get('ui');
		RadarDetectionSystemSystem.quadtree = instanceManager.get('quadtree');
		RadarDetectionSystemSystem.ecsManager = instanceManager.get('ecs-manager');
	},

	// TODO Optimize with quadtree
	runOne(entity) {
		let gun = entity.gun;
		let sprite = entity.sprite;
		let radar = entity.radar;
		let currentTarget;
		let currentTargetDistance;

		gun.remainingCooldown = Math.max(
			gun.remainingCooldown - RadarDetectionSystemSystem.game.time.physicsElapsedMS,
			0
		);

		if(gun.remainingCooldown) {
			return;
		}

		let potentialTargets = RadarDetectionSystemSystem.ecsManager.getEntities([
			'team',
			'sprite',
			'health',
		]);

		for(let x = 0; x < potentialTargets.length; x++) {
			if(potentialTargets[x].team.name !== entity.team.name) {
				let targetDistance =
					RadarDetectionSystemSystem.calculateTargetDistance(
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
				RadarDetectionSystemSystem.fire(sprite, gun, currentTarget);
			} else if(!entity.breaks) {
				RadarDetectionSystemSystem.ecsManager.addComponent(entity.id, 'breaks');
			}
		} else if(entity.breaks) {
			RadarDetectionSystemSystem.ecsManager.removeComponent(entity.id, 'breaks');
		}
	},

	// TODO Consider target width?
	calculateTargetDistance(position, targetEntityPosition) {
		return RadarDetectionSystemSystem.game.physics.arcade.distanceToXY(position, targetEntityPosition.x, targetEntityPosition.y);
	},

	fire(firingSprite, gun, target) {
		let angle = RadarDetectionSystemSystem.game.math.angleBetweenPoints(firingSprite.position, target.sprite.position);

		firingSprite.rotation = angle;

		gun.remainingCooldown = gun.cooldown;

		gun.prefab({
			damage: gun.power,
			position: firingSprite.position,
			target,
		});

		gun.sound.play();
	},
};

export default RadarDetectionSystemSystem;
