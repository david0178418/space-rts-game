import _ from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: {
		with: [
			'entity-spawner',
			'entity-spawn-queue',
		],
	},

	init() {
		this.worldEntities = instanceManager.get('world-entities');
		this.game = instanceManager.get('game');
		this.runOne = _.bind(this.runOne, this);
	},

	// TODO make spawn and waypoint queue/dequeue logic more consistent if
	// possible
	runOne(entity) {
		let entitySpawnQueue = entity.getComponent('entity-spawn-queue').queue;

		if(!entitySpawnQueue.length) {
			return;
		}

		let entitySpawner = entity.getComponent('entity-spawner');
		let activeConstruction = entitySpawnQueue[0];
		let spawnerBlueprint = entitySpawner.availableBlueprints[activeConstruction.blueprint];

		activeConstruction.elapsedBuildTime += this.game.time.elapsed;

		if(activeConstruction.elapsedBuildTime >= spawnerBlueprint.baseBuildTime) {
			let newEntity;
			let spawnerSprite = entity.getComponent('sprite');
			let waypoint = entity.getComponent('waypoint');

			entitySpawnQueue.shift();

			newEntity = spawnerBlueprint.prefab({
				x: spawnerSprite.x,
				y: spawnerSprite.y,
			});
			newEntity.getComponent('team').name = entity.getComponent('team').name;
			newEntity.getComponent('waypoint-queue').queue.push({
				x: waypoint.x,
				y: waypoint.y,
			});
		}
	},
};
