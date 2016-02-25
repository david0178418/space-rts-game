import {extend} from 'lodash';
import instanceManager from 'instance-manager';

import 'components/entity-spawner';
import 'components/entity-spawn-queue';
import 'components/physics';
import 'components/sprite';
import 'components/team';

export default
function(position) {
	let ecsManager = instanceManager.get('ecs-manager');
	let colonyShip = ecsManager.createEntity();

	return ecsManager.addComponents(colonyShip.id, {
		sprite: extend({graphic: 'colony-ship'}, position),
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
}
