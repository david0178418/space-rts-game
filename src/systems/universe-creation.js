import _ from 'lodash';
import Config from 'config';
import instanceManager from 'instance-manager';
import planetFactory from 'entities/planet';

instanceManager.get('ecs-manager').registerSystem('universe-creation', {
	init() {

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

		for(let i = 0; i < Config.universe_size; i++) {
			planetFactory(
				_.random(100, Config.stage.width - 100),
				_.random(100, Config.stage.height - 100)
			);
		}
	},

	assignTeams(planets) {return;
		// var playerPlanet = planets[0];
		// var enemyPlanet = planets[1];
		//
		// this.worldEntities.x = -playerPlanet.x + Config.screen.width / 2;
		// this.worldEntities.y = -playerPlanet.y + Config.screen.height / 2;
		//
		// playerPlanet.components.team.name = 'player';
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
