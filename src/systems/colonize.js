import instanceManager from 'instance-manager';

import colonyShipPrefab from 'prefabs/colony-ship';
import fighterPrefab from 'prefabs/fighter';

export default {
	components:{
		with: [
			'colonize',
		],
	},

	ecsManager: null,
	game: null,
	teamColors: null,

	init() {
		this.game = instanceManager.get('game');
		this.ecsManager = instanceManager.get('ecs-manager');
		this.runOne = this.runOne.bind(this);
		this.teamColors = instanceManager.get('team-colors');
	},

	runOne(entity) {
		let colonizeTarget = entity.colonize.target;
		let colonizeTargetSprite = colonizeTarget.sprite;
		let entitySprite = entity.sprite;
		let teamName = entity.team.name;

		if(!this.game.physics.arcade.intersects(entitySprite, colonizeTargetSprite)) {
			return;
		}



		// TODO Figure out how to handle colonization and blueprints
		this.ecsManager.removeComponent(colonizeTarget.id, 'colonizable');
		this.ecsManager.addComponent(colonizeTarget.id, {
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
						prefab: fighterPrefab(this.teamColors[teamName]),
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

		this.ecsManager.destroyEntity(entity.id);
	},
};
