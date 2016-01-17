import Config from 'config';
import Phaser from 'phaser';
import InstanceManager from 'instance-manager';

InstanceManager.get('game', {
	init() {
		//TODO remove debug global
		return window.game = new Phaser.Game(Config.screen.width, Config.screen.height, Phaser.AUTO, 'phaser', undefined, false);
	},
});
