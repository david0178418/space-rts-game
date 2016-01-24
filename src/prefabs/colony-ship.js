import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/entity-spawner';
import 'components/entity-spawn-queue';
import 'components/sprite';
import 'components/team';

export default
function(position) {
	return instanceManager.get('ecs-manager')
		.createEntity()
		.addComponent('sprite', _.extend({graphic: 'colony-ship'}, position))
		.addComponent('selectable')
		.addComponent('team')
		.addComponent('waypoint-queue')
		.addComponent('environment', {
			type: '',
			habitability: 0,
			resources: {},
		})
		.addComponent('population', {
			fertility: 0,
			longevity: 0,
			count: 0,
		})
		.addComponent('movable', {
			acceleration: 75,
			currentSpeed: 0,
			topSpeed: 25,
		});
}
