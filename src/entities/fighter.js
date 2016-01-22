import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';
import 'components/team';

export default
function(position) {
	return instanceManager.get('ecs-manager')
		.createEntity()
		.addComponent('sprite', _.extend({graphic: 'fighter'}, position))
		.addComponent('dockable', {
			size: 10,
		})
		.addComponent('team')
		.addComponent('selectable')
		.addComponent('movable', {
			acceleration: 1,
			currentSpeed: 0,
			topSpeed: 5,
		});
}
