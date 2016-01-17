import Config from 'config';
import Phaser from 'phaser';
import InstanceManager from 'instance-manager';

InstanceManager.registerResource('game', {
	init() {
		return new Phaser.Game(Config.screen.width, Config.screen.height, Phaser.AUTO, 'phaser', undefined, false);
	},
});
