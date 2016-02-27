import _ from 'lodash';
import Config from 'config';
import instanceManager from 'instance-manager';

import 'components/entity-spawn-queue';

import colonyShipPrefab from 'prefabs/colony-ship';
import fighterPrefab from 'prefabs/fighter';
import planetFactory from 'prefabs/planet';

export default {

	ecsManager: null,
	worldEntities: null,

	init() {
		let planets = [];

		this.ecsManager = instanceManager.get('ecs-manager');
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
		let playerPlanetSpriteComponent = playerPlanet.sprite;
		let enemyPlanet = planets[planets.length - 1];

		this.worldEntities.x = -playerPlanetSpriteComponent.x + Config.screen.width / 2;
		this.worldEntities.y = -playerPlanetSpriteComponent.y + Config.screen.height / 2;

		this.ecsManager.removeComponent(playerPlanet.id, 'colonizable');
		this.ecsManager.addComponents(playerPlanet.id, {
			team: {
				name: 'player',
			},
			'entity-spawn-queue': {
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
			},
			'entity-spawner': {
				availableBlueprints: {
					fighter: {
						baseBuildTime: 400,
						cost: 0,
						label: 'Fighter',
						prefab: fighterPrefab('green'),
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
				x: playerPlanet.sprite.x + 100,
				y: playerPlanet.sprite.y + 75,
			},
		});

		this.ecsManager.removeComponent(enemyPlanet.id, 'colonizable');
		this.ecsManager.addComponents(enemyPlanet.id, {
			'team': {
				name: 'ai1',
			},
			'entity-spawn-queue': {
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
						label: 'Colony Ship',
						blueprint: 'colony-ship',
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
						label: 'fighter',
						blueprint: 'fighter',
						elapsedBuildTime: 0,
					},
				],
			},
			'entity-spawner': {
				availableBlueprints: {
					fighter: {
						baseBuildTime: 4000,
						cost: 0,
						label: 'Fighter',
						prefab: fighterPrefab('red'),
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
				x: playerPlanet.sprite.x + 100,
				y: playerPlanet.sprite.y + 75,
			},
		});

		// TODO Remove debug
		window.enemyPlanet = enemyPlanet;
	},
};
