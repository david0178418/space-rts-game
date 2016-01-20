import bind from 'lodash/bind';
import each from 'lodash/each';
import instanceManager from 'instance-manager';
import Phaser from 'phaser';

instanceManager.get('ecs-manager').registerSystem('selection', {
	SELECTION_PADDING: 30,

	components: [
		'selectable',
	],

	init: function() {
		this.game = instanceManager.get('game');
		this.worldEntities = instanceManager.get('world-entities');
		// this.uiViewModel = instanceManager.get('uiViewModel');
		this.selectionChanged = false;

		this.checkSelection = bind(this.checkSelection, this);
	},

	run: function(entities) {
		each(entities, this.checkSelection, this);

		if(this.selectionChanged) {
			// this.uiViewModel.update();
			this.selectionChanged = false;
		}
	},

	checkSelection: function(entity) {
		let selectableComponent = entity.getComponent('selectable');
		let sprite = entity.getComponent('sprite');
		let graphic;

		if(entity.hasComponent('selected')) {
			if(!selectableComponent.graphic) {
				graphic = new Phaser.Sprite(this.game, 0, 0, 'selection');
				graphic.anchor.setTo(0.5, 0.5);
				// Set the height and width to the greater of the two plus padding
				graphic.width = graphic.height =
					(sprite.width > sprite.height ? sprite.width : sprite.height)
					+ this.SELECTION_PADDING;
				this.worldEntities.addChild(graphic);
				selectableComponent.graphic = graphic;
				this.selectionChanged = true;

				sprite.events.onDestroy.addOnce(graphic.kill, graphic);
				// sprite.events.onDestroy.addOnce(this.uiViewModel.update, this.uiViewModel);
			} else if(!selectableComponent.graphic.visible) {
				selectableComponent.graphic.visible = true;
				this.selectionChanged = true;
			}

			selectableComponent.graphic.position.x = sprite.position.x;
			selectableComponent.graphic.position.y = sprite.position.y;
		} else if(selectableComponent.graphic && selectableComponent.graphic.visible) {
			this.selectionChanged = true;
			selectableComponent.graphic.visible = false;
		}
	},
});
