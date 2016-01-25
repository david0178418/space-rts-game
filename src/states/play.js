import Config from 'config';
import instanceManager from 'instance-manager';
import MouseControls from 'interface/mouse-controls';
import Phaser from 'phaser';

const game = instanceManager.get('game');
const ecsManager = instanceManager.get('ecs-manager');

game.state.add('play', {
	preload(game) {
		game.load.image('battleship', 'assets/images/battleship.png');
		game.load.image('colony-ship', 'assets/images/colony-ship.png');
		game.load.image('fighter', 'assets/images/fighter.png');
		game.load.image('planet', 'assets/images/planet.png');
		game.load.image('probe', 'assets/images/probe.png');

		game.load.image('selection', 'assets/images/selection.png', 50, 50);
		game.load.image('waypoint-marker', 'assets/images/waypoint.png', 20, 20);

		game.load.image('background1-layer1', 'assets/images/backdrop-black-little-spark-black.png', 512, 512);
		game.load.image('background1-layer2', 'assets/images/backdrop-black-little-spark-transparent.png', 512, 512);

		game.load.audio( 'move-order', 'assets/audio/move-order.ogg');
		game.load.audio( 'lasting-hope', 'assets/audio/bgm-lasting-hope.mp3');
	},

	create(game) {
		game.scale.setShowAll();
		game.world.setBounds(0, 0, Config.stage.width, Config.stage.height);
		game.scale.refresh();

		this.bgm = game.add.audio('lasting-hope');
		this.bgm.loop = true;
		this.bgm.play();

		MouseControls.init();

		this.game.physics.startSystem(Phaser.Physics.ARCADE);

		ecsManager.runSystemInits();

		instanceManager.get('ui');
	},
	update() {
		MouseControls.update();
		ecsManager.runSystems();
	},

	paused() {
	},
});
