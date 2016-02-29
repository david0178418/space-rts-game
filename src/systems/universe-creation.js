import {random} from 'lodash';
import Config from 'config';
import instanceManager from 'instance-manager';

import colonyShipPrefab from 'prefabs/colony-ship';
import fighterPrefab from 'prefabs/fighter';
import planetFactory from 'prefabs/planet';

let UniverseCreationSystem = {

	ecsManager: null,
	worldEntities: null,

	init() {
		let planets = [];

		UniverseCreationSystem.ecsManager = instanceManager.get('ecs-manager');
		UniverseCreationSystem.worldEntities = instanceManager.get('world-entities');

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
				x: random(100, Config.stage.width - 100),
				y: random(100, Config.stage.height - 100),
			});

			planets.push(newPlanet);
		}

		UniverseCreationSystem.assignTeams(planets);
	},

	assignTeams(planets) {
		let playerPlanet = planets[0];
		let playerPlanetSpriteComponent = playerPlanet.sprite;
		let enemyPlanet = planets[planets.length - 1];

		UniverseCreationSystem.worldEntities.x = -playerPlanetSpriteComponent.x + Config.screen.width / 2;
		UniverseCreationSystem.worldEntities.y = -playerPlanetSpriteComponent.y + Config.screen.height / 2;

		UniverseCreationSystem.ecsManager.removeComponent(playerPlanet.id, 'colonizable');
		UniverseCreationSystem.ecsManager.addComponents(playerPlanet.id, {
			team: {
				name: 'player',
			},
			'entity-spawn-queue': {
				queue: (() => {
					let fighters = [];
					for(let x = 0; x < 10; x++) {
						fighters.push({
							label: 'fighter',
							blueprint: 'fighter',
							elapsedBuildTime: 0,
						});
					}
					return fighters;
				})(),
			},
			'entity-spawner': {
				availableBlueprints: {
					fighter: {
						baseBuildTime: 4000,
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

		UniverseCreationSystem.ecsManager.removeComponent(enemyPlanet.id, 'colonizable');
		UniverseCreationSystem.ecsManager.addComponents(enemyPlanet.id, {
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

export default UniverseCreationSystem;
