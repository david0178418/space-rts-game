import Config from 'config';
import instanceManager from 'instance-manager';
import MouseControls from 'interface/mouse-controls';
import Phaser from 'phaser';


const game = instanceManager.get('game');

game.state.add('play', {
	preload: function(game) {
		game.load.image('battleship', '');
		game.load.image('colony-ship', '');
		game.load.image('fighter', '');
		game.load.image('planet', '');
		game.load.image('probe', '');

		game.load.image('selection', '', 50, 50);
		game.load.image('waypointMarker', '', 20, 20);

		game.load.image('background1-layer1', '', 512, 512);
		game.load.image('background1-layer2', '', 512, 512);

		game.load.audio( 'move-order', '');
		game.load.audio( 'lasting-hope', '');
	},

	create: function(game) {
		game.scale.setShowAll();

		window.addEventListener('resize', function(e) {
			game.scale.setShowAll();
			game.scale.refresh();
		});
		game.world.setBounds(0, 0, Config.stage.width, Config.stage.height);
		game.scale.refresh();
		// this.ecs = require('ecs/ecs');

		// require('components/registry');
		// require('systems/registry');

		// this.ecs.runSystemInits();

		this.bgm = game.add.audio('lasting-hope');
		this.bgm.loop = true;
		this.bgm.play();

		MouseControls.init();
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
	},
	update: function() {
		MouseControls.update();
		// this.ecs.runSystems();

	},

	paused: function() {
	},
});
