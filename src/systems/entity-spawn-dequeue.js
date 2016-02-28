import instanceManager from 'instance-manager';

let EntitySpawnDequeueSystem = {
	components: {
		with: [
			'entity-spawner',
			'entity-spawn-queue',
		],
	},

	game: null,
	worldEntities: null,

	init() {
		EntitySpawnDequeueSystem.worldEntities = instanceManager.get('world-entities');
		EntitySpawnDequeueSystem.game = instanceManager.get('game');
	},

	// TODO make spawn and waypoint queue/dequeue logic more consistent if
	// possible
	runOne(entity) {
		let entitySpawnQueue = entity['entity-spawn-queue'].queue;

		if(!entitySpawnQueue.length) {
			return;
		}

		let entitySpawner = entity['entity-spawner'];
		let activeConstruction = entitySpawnQueue[0];
		let spawnerBlueprint = entitySpawner.availableBlueprints[activeConstruction.blueprint];

		activeConstruction.elapsedBuildTime += EntitySpawnDequeueSystem.game.time.elapsed;

		if(activeConstruction.elapsedBuildTime >= spawnerBlueprint.baseBuildTime) {
			let newEntity;
			let spawnerSprite = entity.sprite;
			let waypoint = entity.waypoint;

			entitySpawnQueue.shift();

			newEntity = spawnerBlueprint.prefab({
				x: spawnerSprite.x,
				y: spawnerSprite.y,
			});
			newEntity.team.name = entity.team.name;
			newEntity['waypoint-queue'].queue.push({
				x: waypoint.x,
				y: waypoint.y,
			});
		}
	},
};

export default EntitySpawnDequeueSystem;
