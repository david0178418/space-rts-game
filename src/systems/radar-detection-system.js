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
		entity.gun.remainingCooldown = Math.max(
			entity.gun.remainingCooldown - RadarDetectionSystemSystem.game.time.physicsElapsedMS,
			0
		);

		if(entity.gun.remainingCooldown) {
			return;
		}

		RadarDetectionSystemSystem.foo({
			breaks: entity.breaks,
			gun: entity.gun,
			id: entity.id,
			movable: entity.movable,
			radar: entity.radar,
			sprite: entity.sprite,
			team: entity.team,
		});
	},

	foo({sprite, radar, movable, breaks, gun, team, id}) {
		let currentTarget;
		let currentTargetDistance;
		let potentialTargets = RadarDetectionSystemSystem.ecsManager.getEntities([
			'team',
			'sprite',
			'health',
		]);

		for(let x = 0; x < potentialTargets.length; x++) {
			if(potentialTargets[x].team.name !== team.name) {
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
			if(movable && movable.currentSpeed === 0) {
				RadarDetectionSystemSystem.fire(sprite, gun, currentTarget);
			} else if(!breaks) {
				RadarDetectionSystemSystem.ecsManager.addComponent(id, 'breaks');
			}
		} else if(breaks) {
			RadarDetectionSystemSystem.ecsManager.removeComponent(id, 'breaks');
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
			angle: angle,
			damage: gun.power,
			position: {
				x: firingSprite.position.x,
				y: firingSprite.position.y,
			},
			target,
		});

		gun.sound.play();
	},
};

export default RadarDetectionSystemSystem;
