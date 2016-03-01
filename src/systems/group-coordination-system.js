import {each} from 'lodash';
import instanceManager from 'instance-manager';

let GroupCoordinationSystem = {
	components:{
		with: [
			'group-movement',
		],
	},

	ecsManager: null,
	game: null,
	moveOrderSound: null,
	worldEntities: null,

	init() {
		GroupCoordinationSystem.ecsManager = instanceManager.get('ecs-manager');
		GroupCoordinationSystem.game = instanceManager.get('game');
		GroupCoordinationSystem.worldEntities = instanceManager.get('world-entities');
		GroupCoordinationSystem.moveOrderSound = GroupCoordinationSystem.game.add.audio('move-order');
	},

	run(entities) {
		let colCount;
		let formationCenterOffsetX;
		let formationCenterOffsetY;
		let formationPositionX;
		let formationPositionY;
		// Theortically, only one is needed since all groups are processed
		// together.  If multiple group commands are issued simultaniously,
		// this may need to be changed.
		let groupMovementComponent = entities[0]['group-movement'];
		let maxX = GroupCoordinationSystem.game.world.height * 10;
		let maxY = GroupCoordinationSystem.game.world.width * 10;
		let minX = -1;
		let minY = -1;
		let movableSelectedCount = 0;
		let rowCount;
		let slotWidth = 80;
		let xTotal = 0;
		let yTotal = 0;

		each(entities, function(entity) {
			let sprite = entity.sprite;

			movableSelectedCount++;
			xTotal += sprite.x;
			yTotal += sprite.y;

			if(sprite.x > maxX) {
				maxX = sprite.x;
			} else if(sprite.x < minX) {
				minX = sprite.x;
			}

			if(sprite.y > maxY) {
				maxY = sprite.y;
			} else if(sprite.y < minY) {
				minY = sprite.y;
			}
		});

		rowCount = Math.sqrt(movableSelectedCount) | 0;
		colCount = ((entities.length / rowCount) + 0.5) | 0;
		formationCenterOffsetX = (slotWidth * (rowCount - 1)) / 2;
		formationCenterOffsetY = (slotWidth * (colCount - 1)) / 2;

		for(let x = 0; x < entities.length; x++) {
			let waypointQueue = entities[x]['waypoint-queue'];

			formationPositionX = groupMovementComponent.centralPoint.x + slotWidth * (x % rowCount) - formationCenterOffsetX;
			formationPositionY = groupMovementComponent.centralPoint.y + slotWidth * ((x / rowCount) | 0) - formationCenterOffsetY;

			if(groupMovementComponent.queue && waypointQueue) {
				waypointQueue.queue[waypointQueue.queue.length]({
					x: formationPositionX,
					y: formationPositionY,
					hyperspace: groupMovementComponent.hyperspace,
				});
			} else {
				GroupCoordinationSystem.ecsManager.addComponent(entities[x].id, 'waypoint', {
					x: formationPositionX,
					y: formationPositionY,
				});

				if(waypointQueue) {
					waypointQueue.queue = [];
				}
			}

			GroupCoordinationSystem.ecsManager.removeComponent(entities[x].id, 'group-movement');
		}

		if(!GroupCoordinationSystem.moveOrderSound.isPlaying) {
			GroupCoordinationSystem.moveOrderSound.play();
		}
	},
};

export default GroupCoordinationSystem;
