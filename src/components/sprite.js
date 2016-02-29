import instanceManager from 'instance-manager';
import Phaser from 'phaser';

const game = instanceManager.get('game');
const defaultParams = {
	x: 0,
	y: 0,
	graphic: '',
};

export default {
	factory(params) {
		let sprite;

		params = params || defaultParams;

		sprite = new Phaser.Sprite(game, params.x, params.y, params.graphic);
		sprite.anchor.setTo(0.5, 0.5);
		sprite.smoothed = false;

		instanceManager.get('world-entities').add(sprite);

		return sprite;
	},
	onRemove(sprite) {
		sprite.destroy();
	},
};
