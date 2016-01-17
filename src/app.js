import defer from 'lodash/defer';
import InstanceManager from 'instance-manager';

import 'resources/game';
import 'resources/pan-controls';
import 'resources/group';
import 'resources/world-entites';

import 'states/play';

const game = InstanceManager.get('game');

game.state.start('play');

defer(function() {
	game.canvas.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	});
});
