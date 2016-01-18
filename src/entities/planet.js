import _ from 'lodash';
import instanceManager from 'instance-manager';

import 'components/sprite';
import 'components/team';

export default
function(position) {
	return instanceManager.get('ecs-manager')
		.createEntity()
		.addComponent('sprite', _.extend({graphic: 'planet'}, position))
		.addComponent('selectable');
}
