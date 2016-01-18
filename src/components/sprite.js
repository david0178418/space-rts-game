import instanceManager from 'instance-manager';
import Phaser from 'phaser';

const game = instanceManager.get('game');
const defaultParams = {
	x: 0,
	y: 0,
	graphic: '',
};

instanceManager
	.get('ecs-manager')
	.registerComponent('sprite', {
		factory(params) {
			let sprite;

			params = params || defaultParams;

			sprite = new Phaser.Sprite(game, params.x, params.y, params.graphic);
			sprite.anchor.setTo(0.5, 0.5);
			sprite.autoCull = true;

			instanceManager.get('world-entities').add(sprite);

			return sprite;
		},
		remove(sprite) {
			sprite.destroy();
		},
	});
