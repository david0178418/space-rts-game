import instanceManager from 'instance-manager';

import colonyShipPrefab from 'prefabs/colony-ship';
import fighterPrefab from 'prefabs/fighter';

export default {
	components: [
		'colonize',
	],

	init() {
		this.game = instanceManager.get('game');
		this.ecsManager = instanceManager.get('ecs-manager');
		this.runOne = this.runOne.bind(this);
		this.teamColors = instanceManager.get('team-colors');
	},

	runOne(entity) {
		let colonizeTarget = entity.getComponent('colonize').target;
		let colonizeTargetSprite = colonizeTarget.getComponent('sprite');
		let entitySprite = entity.getComponent('sprite');
		let teamName = entity.getComponent('team').name;

		if(!this.game.physics.arcade.intersects(entitySprite, colonizeTargetSprite)) {
			return;
		}

		colonizeTarget.addComponent('team', {
			name: teamName,
		});

		// TODO Figure out how to handle colonization and blueprints
		colonizeTarget
			.removeComponent('colonizable')
			.addComponent('entity-spawn-queue')
			.addComponent('entity-spawner', {
				availableBlueprints: {
					fighter: {
						baseBuildTime: 4000,
						cost: 0,
						label: 'Fighter',
						prefab: fighterPrefab(this.teamColors[teamName]),
					},
					'colony-ship': {
						baseBuildTime: 8000,
						cost: 0,
						label: 'Colony Ship',
						prefab: colonyShipPrefab,
					},
				},
			})
			.addComponent('waypoint', {
				x: colonizeTargetSprite.x + 100,
				y: colonizeTargetSprite.y + 75,
			});

		this.ecsManager.destroyEntity(entity);
	},
};
