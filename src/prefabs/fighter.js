import {extend} from 'lodash';
import instanceManager from 'instance-manager';

import Beam from './beam';

export default
function(color) {
	return function(position) {
		let ecsManager = instanceManager.get('ecs-manager');
		let fighter = ecsManager.createEntity();

		ecsManager.addComponents(fighter.id, {
			sprite: extend({graphic: `${color}-fighter`}, position),
			shield: {
				currentPower: 100,
				rechargeRate: 10,
				maxPower: 100,
			},
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

		fighter.sprite.scale.x = 0.4;
		fighter.sprite.scale.y = 0.4;

		return fighter;
	};
}
