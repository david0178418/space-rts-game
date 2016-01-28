import _ from 'lodash';
import Config from 'config';
import instanceManager from 'instance-manager';

import colonyShipPrefab from 'prefabs/colony-ship';
import fighterPrefab from 'prefabs/fighter';
import planetFactory from 'prefabs/planet';

instanceManager.get('ecs-manager').registerSystem('universe-creation', {
	init() {
		let planets = [];

		this.worldEntities = instanceManager.get('world-entities');

		// planets acting as markers to edges and center
		planetFactory({ x: 0, y: Config.stage.height / 2 });
		planetFactory({ x: 0, y: 0 });
		planetFactory({ x: Config.stage.width / 2, y: Config.stage.height / 2 });
		planetFactory({ x: Config.stage.width / 2, y: 0 });
		planetFactory({ x: Config.stage.width, y: Config.stage.height / 2 });
		planetFactory({ x: Config.stage.width / 2, y: Config.stage.height });
		planetFactory({ x: 0, y: Config.stage.height });
		planetFactory({ x: Config.stage.width, y: 0 });
		planetFactory({ x: Config.stage.width, y: Config.stage.height });

		for(let i = 0; i < Config.universeSize; i++) {
			let newPlanet = planetFactory({
				x: _.random(100, Config.stage.width - 100),
				y: _.random(100, Config.stage.height - 100),
			});

			planets.push(newPlanet);
		}

		this.assignTeams(planets);
	},

	assignTeams(planets) {
		let playerPlanet = planets[0];
		let playerPlanetSpriteComponent = playerPlanet.getComponent('sprite');
		// let enemyPlanet = planets[1];

		this.worldEntities.x = -playerPlanetSpriteComponent.x + Config.screen.width / 2;
		this.worldEntities.y = -playerPlanetSpriteComponent.y + Config.screen.height / 2;

		playerPlanet.addComponent('team', {name: 'player'});

		playerPlanet
			.addComponent('entity-spawn-queue', {
				queue: [
					{
						label: 'fighter',
						blueprint: 'fighter',
						elapsedBuildTime: 0,
					}, {
						label: 'fighter',
						blueprint: 'fighter',
						elapsedBuildTime: 0,
					}, {
						label: 'fighter',
						blueprint: 'fighter',
						elapsedBuildTime: 0,
					}, {
						label: 'fighter',
						blueprint: 'fighter',
						elapsedBuildTime: 0,
					}, {
						label: 'Colony Ship',
						blueprint: 'colony-ship',
						elapsedBuildTime: 0,
					},
				],
			})
			.addComponent('entity-spawner', {
				availableBlueprints: {
					fighter: {
						baseBuildTime: 4000,
						cost: 0,
						label: 'Fighter',
						prefab: fighterPrefab,
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
				x: playerPlanet.getComponent('sprite').x + 100,
				y: playerPlanet.getComponent('sprite').y + 75,
			});
		//
		// playerPlanet.
		// 	addComponent('probe-blueprint', {
		// 		prefab: require('prefabs/probe'),
		// 		buildTime: 3000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('fighter-blueprint', {
		// 		prefab: require('prefabs/fighter'),
		// 		buildTime: 4000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('battleship-blueprint', {
		// 		prefab: require('prefabs/battleship'),
		// 		buildTime: 6000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('colony-ship-blueprint', {
		// 		prefab: require('prefabs/colony-ship'),
		// 		buildTime: 8000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('entity-spawner', {
		// 		activeGenerator: 'probe-blueprint',
		// 		rallyPoint: {
		// 			x: playerPlanet.x + 100,
		// 			y: playerPlanet.y + 75,
		// 		},
		// 	});
		//
		// enemyPlanet.components.team.name = 'enemy';
		//
		// enemyPlanet.
		// 	addComponent('probe-blueprint', {
		// 		prefab: require('prefabs/probe'),
		// 		buildTime: 3000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('fighter-blueprint', {
		// 		prefab: require('prefabs/fighter'),
		// 		buildTime: 4000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('battleship-blueprint', {
		// 		prefab: require('prefabs/battleship'),
		// 		buildTime: 6000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('colony-ship-blueprint', {
		// 		prefab: require('prefabs/colony-ship'),
		// 		buildTime: 8000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('entity-spawner', {
		// 		activeGenerator: 'probe-blueprint',
		// 		rallyPoint: {
		// 			x: playerPlanet.x + 100,
		// 			y: playerPlanet.y + 75,
		// 		},
		// 	});
	},
});
