import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/radar';
import 'components/sprite';
import 'components/team';
import 'components/waypoint-queue';

import Beam from './beam';

export default
function(color) {
	return function(position) {
		return instanceManager.get('ecs-manager')
			.createEntity()
			.addComponent('sprite', _.extend({graphic: `${color}-fighter`}, position))
			.addComponent('radar', {
				range: 500,
			})
			.addComponent('dockable', {
				size: 10,
			})
			.addComponent('gun', {
				power: 10,
				cooldown: 2000,
				remainingCooldown: 0,
				prefab: Beam,
				sound: instanceManager.get('game').add.audio('laser'),
			})
			.addComponent('health', {
				max: 100,
				current: 100,
			})
			.addComponent('team')
			.addComponent('selectable')
			.addComponent('waypoint-queue')
			.addComponent('movable', {
				acceleration: 150,
				currentSpeed: 0,
				topSpeed: 100,
			});
	};
}
