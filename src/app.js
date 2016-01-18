import defer from 'lodash/defer';
import InstanceManager from 'instance-manager';

import 'resources/_registry';
import 'systems/_registry';

import 'states/play';

const game = InstanceManager.get('game');

game.state.start('play');

defer(function() {
	game.canvas.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	});
});
