import defer from 'lodash/defer';
import instanceManager from 'instance-manager';
import Phaser from 'phaser';

import 'resources/_registry';
import 'systems/_registry';

import 'states/play';

const game = instanceManager.get('game');

game.state.start('play');

defer(function() {
	window.addEventListener('keyup', function(e) {
		if(e.keyCode === Phaser.Keyboard.F) {
			document.body.webkitRequestFullScreen();
		}
	});

	game.canvas.addEventListener('contextmenu', function (e) {
		e.preventDefault();
	});
});
