import {extend} from 'lodash';
import instanceManager from 'instance-manager';

export default
function(position) {
	let ecsManager = instanceManager.get('ecs-manager');
	let colonyShip = ecsManager.createEntity();

	ecsManager.addComponents(colonyShip.id, {
		sprite: extend({graphic: 'colony-ship'}, position),
		shield: {
			currentPower: 100,
			rechargeRate: 10,
			maxPower: 100,
		},
		physics: {},
		selectable: {},
		team: {},
		'waypoint-queue': {},
		colonizer: {},
		health: {
			max: 500,
			current: 500,
		},
		gun: {
			power: 70,
			cooldown: 500,
			remainingCooldown: 0,
		},
		environment: {
			type: '',
			habitability: 0,
			resources: {},
		},
		population: {
			fertility: 0,
			longevity: 0,
			count: 0,
		},
		movable: {
			acceleration: 75,
			currentSpeed: 0,
			topSpeed: 25,
		},
	});

	colonyShip.sprite.scale.x = 1;
	colonyShip.sprite.scale.y = 1;

	return colonyShip;
}
