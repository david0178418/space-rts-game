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
		let noMovable = !_.some(entities, function(entity) {
			return entity.hasComponent('movable');
		});

		_.each(entities, function(entity) {
			// TODO Clean all this up
			if(noMovable && entity.hasComponent('ship-generator')) {
				entity.addComponent('waypoint', {
					x: localPoint.x,
					y: localPoint.y,
				});
			} else if(entity.getComponent('movable') && entity.getComponent('team').name === 'player') {
				if(entities.length === 1) {
					entity.addComponent('waypoint', {
						x: localPoint.x,
						y: localPoint.y,
					});
				} else {
					entity.addComponent('group-movement', {
						override: instanceManager.get('keyboard-controls').shiftModifier.isDown,
						centralPoint: localPoint,
					});
				}
			}

			entity.removeComponent('order');
		});
	},
});
