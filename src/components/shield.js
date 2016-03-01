import instanceManager from 'instance-manager';
import Phaser from 'phaser';

const game = instanceManager.get('game');

export default {
	factory(state = {currentPower: 0, maxPower: 0, rechargeRate: 0}) {
		let sprite;
		let size = Math.max(this.sprite.width, this.sprite.height) * 1.2;

		sprite = new Phaser.Sprite(game, 0, 0, 'shield');
		sprite.anchor.setTo(0.5, 0.5);
		sprite.smoothed = false;
		sprite.width = size;
		sprite.height = size;
		sprite.alpha = 0;

		this.sprite.addChild(sprite);

		state._sprite = sprite;

		return {
			currentPower: 100,
			rechargeRate: 10,
			maxPower: 100,
			sprite,
		};
	},
	onRemove(sprite) {
		if(sprite._sprite) {
			sprite._sprite.destroy();
		}
	},
};
