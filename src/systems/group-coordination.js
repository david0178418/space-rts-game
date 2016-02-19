import _ from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: [
		'group-movement',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
		this.moveOrderSound = this.game.add.audio('move-order');
	},

	run: function(entities) {
		let colCount;
		let formationCenterOffsetX;
		let formationCenterOffsetY;
		let formationPositionX;
		let formationPositionY;
		// Theortically, only one is needed since all groups are processed
		// together.  If multiple group commands are issued simultaniously,
		// this may need to be changed.
		let groupMovementComponent = entities[0].getComponent('group-movement');
		let maxX = this.game.world.height * 10;
		let maxY = this.game.world.width * 10;
		let minX = -1;
		let minY = -1;
		let movableSelectedCount = 0;
		let rowCount;
		let slotWidth = 80;
		let xTotal = 0;
		let yTotal = 0;

		_.each(entities, function(entity) {
			let sprite = entity.getComponent('sprite');

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

		_.each(entities, function(entity, i) {
			let waypointQueue = entity.getComponent('waypoint-queue');

			formationPositionX = groupMovementComponent.centralPoint.x + slotWidth * (i % rowCount) - formationCenterOffsetX;
			formationPositionY = groupMovementComponent.centralPoint.y + slotWidth * ((i / rowCount) | 0) - formationCenterOffsetY;

			if(groupMovementComponent.queue && waypointQueue) {
				waypointQueue.queue.push({
					x: formationPositionX,
					y: formationPositionY,
					hyperspace: groupMovementComponent.hyperspace,
				});
			} else {
				entity.addComponent('waypoint', {
					x: formationPositionX,
					y: formationPositionY,
				});

				if(waypointQueue) {
					waypointQueue.queue = [];
				}
			}

			entity.removeComponent('group-movement');
		});

		if(!this.moveOrderSound.isPlaying) {
			this.moveOrderSound.play();
		}
	},
};
