import _ from 'lodash';
import Config from 'config';
import instanceManager from 'instance-manager';
import planetFactory from 'entities/planet';

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
		//
		// playerPlanet.
		// 	addComponent('probe-blueprint', {
		// 		prefab: require('entities/probe'),
		// 		buildTime: 3000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('fighter-blueprint', {
		// 		prefab: require('entities/fighter'),
		// 		buildTime: 4000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('battleship-blueprint', {
		// 		prefab: require('entities/battleship'),
		// 		buildTime: 6000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('colony-ship-blueprint', {
		// 		prefab: require('entities/colony-ship'),
		// 		buildTime: 8000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('ship-generator', {
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
		// 		prefab: require('entities/probe'),
		// 		buildTime: 3000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('fighter-blueprint', {
		// 		prefab: require('entities/fighter'),
		// 		buildTime: 4000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('battleship-blueprint', {
		// 		prefab: require('entities/battleship'),
		// 		buildTime: 6000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('colony-ship-blueprint', {
		// 		prefab: require('entities/colony-ship'),
		// 		buildTime: 8000,
		// 		currentUnitBuildTime: 0,
		// 	}).
		// 	addComponent('ship-generator', {
		// 		activeGenerator: 'probe-blueprint',
		// 		rallyPoint: {
		// 			x: playerPlanet.x + 100,
		// 			y: playerPlanet.y + 75,
		// 		},
		// 	});
	},
});
