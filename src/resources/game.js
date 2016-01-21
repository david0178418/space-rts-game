import Config from 'config';
import Phaser from 'phaser';
import instanceManager from 'instance-manager';

instanceManager.registerResource('game', {
	init() {
		return window.game = new Phaser.Game(Config.screen.width, Config.screen.height, Phaser.AUTO, 'phaser', undefined, false);
	},
});
