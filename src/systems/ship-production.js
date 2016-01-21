import _ from 'lodash';
import instanceManager from 'instance-manager';

instanceManager.get('ecs-manager').registerSystem('ship-production', {
	components: [
		'ship-generator',
	],

	init() {
		this.worldEntities = instanceManager.get('world-entities');
		this.game = instanceManager.get('game');

		this.runOne = _.bind(this.runOne, this);
	},

	runOne(entity) {
		let newShip;
		let shipGenerator = entity.getComponent('ship-generator');
		let activeGenerator = entity.getComponent(shipGenerator.activeGenerator);
		let entitySprite = entity.getComponent('sprite');

		activeGenerator.currentUnitBuildTime += this.game.time.elapsed;

		if(activeGenerator.currentUnitBuildTime >= activeGenerator.buildTime) {
			activeGenerator.currentUnitBuildTime = 0;
			newShip = activeGenerator.prefab({
				x: entitySprite.x,
				y: entitySprite.y,
			});
			newShip.getComponent('team').name = entity.getComponent('team').name;

			// TODO Figure out why rally point reference is being copied
			// even though deep cloning
			newShip.addComponent('waypoints', {
				queued: [_.cloneDeep(shipGenerator.rallyPoint)],
			});
		}
	},
});
