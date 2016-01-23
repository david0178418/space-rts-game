import _ from 'lodash';
import instanceManager from 'instance-manager';

instanceManager.get('ecs-manager').registerSystem('orders-interpretation', {
	components: [
		'order',
	],

	init() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
	},

	run: function(entities) {
		// TODO Optimize
		let localPoint = this.game.input.getLocalPosition(this.worldEntities, this.game.input.mousePointer);
		let movableEntities = [];
		let playerEntities = [];
		let shipGeneratingEntities = [];

		// TODO Perhaps change this to make the largest selected entity type
		// the dominate action?
		for(let i = 0; i < entities.length; i++) {
			let entity = entities[i];

			entity.removeComponent('order');

			if(entity.getComponent('team').name === 'player') {
				playerEntities.push(entity);

				if(entity.hasComponent('movable')) {
					movableEntities.push(entity);
				}
			}
		}

		if(movableEntities.length) {
			if(movableEntities.length === 1) {
				movableEntities[0].addComponent('waypoint', {
					x: localPoint.x,
					y: localPoint.y,
				});
			} else {
				for(let i = 0; i < movableEntities.length; i++) {
					movableEntities[i].addComponent('group-movement', {
						override: instanceManager.get('keyboard-controls').shiftModifier.isDown,
						centralPoint: localPoint,
					});
				}
			}
		} else {
			for(let i = 0; i < shipGeneratingEntities.length; i++) {
				shipGeneratingEntities[0].addComponent('waypoint', {
					x: localPoint.x,
					y: localPoint.y,
				});
			}
		}
	},
});
