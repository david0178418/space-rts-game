import _ from 'lodash';
import instanceManager from 'instance-manager';

export default {
	components: [
		'entity-spawn-queue',
	],

	init() {
		this.game = instanceManager.get('game');
		this.ui = instanceManager.get('ui');
	},

	run: _.throttle(function(entities) {
		console.debug(1);
	}, 100),
};
