import defer from 'lodash/defer';
import InstanceManager from 'instance-manager';

import 'resource-registry';
import 'component-registry';

import 'states/play';

const game = InstanceManager.get('game');

game.state.start('play');

defer(function() {
	game.canvas.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	});
});
