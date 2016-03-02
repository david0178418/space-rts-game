import instanceManager from 'instance-manager';
import {Sprite} from 'phaser';

let ShieldHitSystem = {
	components: {
		with:[
			'shieldHit',
		],
	},

	ecsManager: null,
	game: null,

	init() {
		ShieldHitSystem.ecsManager = instanceManager.get('ecs-manager');
		ShieldHitSystem.game = instanceManager.get('game');
	},

	runOne(entity) {
		let fadeInTween = null;
		let shieldHit = entity.shieldHit;
		let shieldSprite =  new Sprite(this.game,0, 0, 'shield');

		ShieldHitSystem.ecsManager.removeComponent(entity.id, 'shieldHit');

		shieldSprite.alpha = 0;
		shieldSprite.rotation = shieldHit.angle;
		shieldSprite.anchor.setTo(0.5, 0.5);
		shieldSprite.height = shieldHit.size * 3;
		shieldSprite.width = shieldHit.size * 3;
		shieldSprite.smoothed = false;

		entity.sprite.addChild(shieldSprite);

		fadeInTween = ShieldHitSystem.game.add.tween(shieldSprite);
		fadeInTween.to({alpha: .5}, 75);

		fadeInTween.onComplete.add(function() {
			let fadeOutTween = ShieldHitSystem.game.add.tween(shieldSprite);
			fadeOutTween.to({alpha: 0}, 75);

			fadeOutTween.onComplete.add(function() {
				if(!shieldSprite.alpha) {
					fadeOutTween.stop();
					shieldSprite.destroy();
				}
			});
			fadeInTween.stop();
			fadeOutTween.start();
		});
		fadeInTween.start();
	},
};

export default ShieldHitSystem;
