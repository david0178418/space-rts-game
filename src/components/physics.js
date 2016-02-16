import instanceManager from 'instance-manager';
import {Physics} from 'phaser';

instanceManager
	.get('ecs-manager')
	.registerComponent('physics', {
		factory: function(params = {}) {
			let sprite = this.components.sprite;

			instanceManager.get('game').physics.enable(sprite, Physics.ARCADE);

			// NOTE Is the body reference safe or does it get reassigned later?
			return sprite.body;
		},
	});
