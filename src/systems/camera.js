import _ from 'lodash';
import Config from 'config';
import instanceManager from 'instance-manager';

instanceManager.get('ecs-manager').registerSystem('camera', {
	dirtyBackground: true,
	panSpeed: 8,
	zoomIncrement: 5, // %
	zoomMax: 100,
	zoomMin: 15,
	zoomTween: null,
	zoomTarget: 100, // %

	init() {
		this.game = instanceManager.get('game');
		this.controls = instanceManager.get('pan-controls');
		this.world = this.game.world;
		this.worldEntities = instanceManager.get('world-entities');

		// this.background1layer1 = this.game.add.tileSprite(Config.screen.width * -0.25, Config.screen.width * -0.25, Config.screen.width * 1.25, Config.screen.width * 1.25, 'background1-layer1');
		this.background1layer2 = this.game.add.tileSprite(Config.screen.width * -0.5, Config.screen.width * -0.5, Config.screen.width * 1.5, Config.screen.width * 1.5, 'background1-layer2');

		window.addEventListener('mousewheel', _.bind(function(e) {
			this.updateZoomTarget(e.wheelDelta);
		}, this));
	},

	run() {
		// Vertial pan
		if(this.controls.panUp.isDown) {
			this.dirtyBackground = true;
			this.worldEntities.y += this.panSpeed;
		} else if(this.controls.panDown.isDown) {
			this.dirtyBackground = true;
			this.worldEntities.y -= this.panSpeed;
		}

		// Horizontal pa
		if(this.controls.panRight.isDown) {
			this.dirtyBackground = true;
			this.worldEntities.x -= this.panSpeed;
		} else if(this.controls.panLeft.isDown) {
			this.dirtyBackground = true;
			this.worldEntities.x += this.panSpeed;
		}

		if(!this.dirtyBackground) {
			return;
		}

		this.updateBackground();
		this.updateZoom();
		this.limitView();

		this.dirtyBackground = false;
	},
	limitView() {
		// Limit view
		// Run check each tick to account for
		// other position mutators such as zooming
		if(this.worldEntities.y > 0) {
			this.worldEntities.y = 0;
		} else if(this.worldEntities.y < -(this.world.height * this.worldEntities.scale.y - this.game.camera.height)) {
			this.worldEntities.y = -(this.world.height * this.worldEntities.scale.y - this.game.camera.height);
		}

		if(this.worldEntities.x < -(this.world.width * this.worldEntities.scale.x - this.game.camera.width)) {
			this.worldEntities.x = -(this.world.width * this.worldEntities.scale.x - this.game.camera.width);
		} else if(this.worldEntities.x > 0) {
			this.worldEntities.x = 0;
		}
	},

	updateBackground() {
		// this.background1layer1.position.x = this.background1layer1.width * 0.005  * this.worldEntities.x / this.game.width;
		// this.background1layer1.position.y = this.background1layer1.height * 0.005 * this.worldEntities.y / this.game.height;
		this.background1layer2.position.x = this.background1layer2.width * 0.01 * this.worldEntities.x / this.game.width;
		this.background1layer2.position.y = this.background1layer2.height * 0.01* this.worldEntities.y / this.game.height;
	},

	updateZoom() {
		let zoom = this.zoomTarget / 100;
		let localPosition = this.game.input.getLocalPosition(this.worldEntities, this.game.input.mousePointer);

		this.worldEntities.position.x += localPosition.x * (this.worldEntities.scale.x - zoom);
		this.worldEntities.position.y += localPosition.y * (this.worldEntities.scale.y - zoom);
		this.worldEntities.scale.setTo(zoom);
	},

	updateZoomTarget(delta) {
		if(this.game.paused) {
			return;
		}

		this.zoomTarget += this.zoomIncrement * (delta > 0 ? 1 : -1);

		if(this.zoomTarget >= this.zoomMin && this.zoomTarget <= this.zoomMax) {
			this.updateZoom();
		} else {
			this.zoomTarget = delta > 0 ? this.zoomMax : this.zoomMin;
		}

		this.limitView();
		this.updateBackground();
	},
});
