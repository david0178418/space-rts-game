import {extend} from 'lodash';
import instanceManager from 'instance-manager';

import 'components/radar';
import 'components/sprite';
import 'components/team';
import 'components/waypoint-queue';

import Beam from './beam';

export default
function(color) {
	return function(position) {
		let ecsManager = instanceManager.get('ecs-manager');
		let fighter = ecsManager.createEntity();

		return ecsManager.addComponents(fighter.id, {
			sprite: extend({graphic: `${color}-fighter`}, position),
			radar: {
				range: 500,
			},
			dockable: {
				size: 10,
			},
			gun: {
				power: 10,
				cooldown: 2000,
				remainingCooldown: 0,
				prefab: Beam,
				sound: instanceManager.get('game').add.audio('laser'),
			},
			health: {
				max: 100,
				current: 100,
			},
			team: {},
			selectable: {},
			'waypoint-queue': {},
			movable: {
				acceleration: 150,
				currentSpeed: 0,
				topSpeed: 100,
			},
		});
	};
}
