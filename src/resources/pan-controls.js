import Config from 'config';
import Phaser from 'phaser';
import InstanceManager from 'instance-manager';

InstanceManager.registerResource('controls', {
	init() {
		const KeyCodes = Phaser.Keyboard;
		let game = InstanceManager.get('game');
		let keyboard = game.input.keyboard;

		return {
			panUp: keyboard.addKey(KeyCodes[Config.controls.panUp]),
			panRight: keyboard.addKey(KeyCodes[Config.controls.panRight]),
			panDown: keyboard.addKey(KeyCodes[Config.controls.panDown]),
			panLeft: keyboard.addKey(KeyCodes[Config.controls.panLeft]),
			shiftModifier: keyboard.addKey(KeyCodes[Config.controls.modifier]),
		};
	},
});
