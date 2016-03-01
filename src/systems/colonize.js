import instanceManager from 'instance-manager';

import colonyShipPrefab from 'prefabs/colony-ship';
import fighterPrefab from 'prefabs/fighter';

let ColonizeSystem = {
	components:{
		with: [
			'colonize',
		],
	},

	ecsManager: null,
	game: null,
	teamColors: null,

	init() {
		ColonizeSystem.game = instanceManager.get('game');
		ColonizeSystem.ecsManager = instanceManager.get('ecs-manager');
		ColonizeSystem.runOne = ColonizeSystem.runOne.bind(this);
		ColonizeSystem.teamColors = instanceManager.get('team-colors');
	},

	runOne(entity) {
		let colonizeTarget = entity.colonize.target;
		let colonizeTargetSprite = colonizeTarget.sprite;
		let entitySprite = entity.sprite;
		let teamName = entity.team.name;

		if(!ColonizeSystem.game.physics.arcade.intersects(entitySprite, colonizeTargetSprite)) {
			return;
		}

		// TODO Figure out how to handle colonization and blueprints
		ColonizeSystem.ecsManager.removeComponent(colonizeTarget.id, 'colonizable');
		ColonizeSystem.ecsManager.addComponents(colonizeTarget.id, {
			team: {
				name: teamName,
			},
			'entity-spawn-queue': {},
			'entity-spawner': {
				availableBlueprints: {
					fighter: {
						baseBuildTime: 4000,
						cost: 0,
						label: 'Fighter',
						prefab: fighterPrefab(ColonizeSystem.teamColors[teamName]),
					},
					'colony-ship': {
						baseBuildTime: 8000,
						cost: 0,
						label: 'Colony Ship',
						prefab: colonyShipPrefab,
					},
				},
			},
			waypoint: {
				x: colonizeTargetSprite.x + 100,
				y: colonizeTargetSprite.y + 75,
			},
		});

		ColonizeSystem.ecsManager.destroyEntity(entity.id);
	},
};

export default ColonizeSystem;
