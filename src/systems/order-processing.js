import instanceManager from 'instance-manager';

let OrdersProcessingSystem = {
	components: {
		with: [
			'order',
		],
	},

	ecsManager: null,
	game: null,
	moveOrderSound: null,
	worldEntities: null,

	init() {
		OrdersProcessingSystem.ecsManager = instanceManager.get('ecs-manager');
		OrdersProcessingSystem.game = instanceManager.get('game');
		OrdersProcessingSystem.moveOrderSound = OrdersProcessingSystem.game.add.audio('move-order');
		OrdersProcessingSystem.worldEntities = instanceManager.get('world-entities');
	},

	run(entities) {
		// TODO Optimize
		let localPoint = this.game.input.getLocalPosition(this.worldEntities, this.game.input.mousePointer);
		let movableEntities = [];
		let playerEntities = [];
		let shipGeneratingEntities = [];

		// TODO Perhaps change this to make the largest selected entity type
		// the dominate action?
		for(let i = 0; i < entities.length; i++) {
			let entity = entities[i];

			this.ecsManager.removeComponent(entity.id, 'order');

			if(entity.team.name === 'player') {
				playerEntities.push(entity);

				if(entity.movable) {
					movableEntities.push(entity);
				} else if(entity['entity-spawner']) {
					shipGeneratingEntities.push(entity);
				}
			}
		}

		if(movableEntities.length) {
			if(movableEntities.length === 1) {
				if(instanceManager.get('keyboard-controls').shiftModifier.isDown) {
					movableEntities[0]['waypoint-queue'].queue.push({
						x: localPoint.x,
						y: localPoint.y,
					});
				} else if(!(movableEntities[0].colonizer && this.colonizeTarget(movableEntities[0], this.game.input.mousePointer.position))) {
					this.ecsManager.addComponent(movableEntities[0].id, 'waypoint', {
						x: localPoint.x,
						y: localPoint.y,
					});
				}

				if(!this.moveOrderSound.isPlaying) {
					this.moveOrderSound.play();
				}
			} else {
				for(let i = 0; i < movableEntities.length; i++) {
					// TODO Rather than directly read mousePointer, need to be able to
					// properly convert between screen and world coordinates.
					if(!(movableEntities[i].colonizer && this.colonizeTarget(movableEntities[i], localPoint))) {
						this.ecsManager.addComponent(movableEntities[i].id, 'group-movement', {
							queue: instanceManager.get('keyboard-controls').shiftModifier.isDown,
							centralPoint: localPoint,
						});
					}
				}
			}
		} else {
			for(let i = 0; i < shipGeneratingEntities.length; i++) {
				this.ecsManager.addComponent(shipGeneratingEntities[i].id, 'waypoint', {
					x: localPoint.x,
					y: localPoint.y,
				});
			}
		}
	},
	colonizeTarget(entity, location) {
		let colonizableEntities = this.ecsManager.getEntities(['colonizable']);

		for(let i = 0; i < colonizableEntities.length; i++) {
			let colonizableSprite = colonizableEntities[i].sprite;

			if(colonizableSprite.getBounds().contains(location.x, location.y)) {
				this.ecsManager.addComponents(entity.id, {
					colonize: {
						target: colonizableEntities[i],
					},
					waypoint: {
						x: colonizableSprite.x,
						y: colonizableSprite.y,
					},
				});

				return true;
			}
		}

		return false;
	},
};

export default OrdersProcessingSystem;
