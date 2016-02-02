import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';
import 'components/team';
import 'components/waypoint-queue';

export default
function(color) {
	return function(position) {
		return instanceManager.get('ecs-manager')
			.createEntity()
			.addComponent('sprite', _.extend({graphic: `${color}-fighter`}, position))
			.addComponent('dockable', {
				size: 10,
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
