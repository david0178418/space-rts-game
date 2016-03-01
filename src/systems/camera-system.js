import Config from 'config';
import instanceManager from 'instance-manager';

let CameraSystem = {
	background1layer2: null,
	dirtyBackground: true,
	game: null,
	keyboardControls: null,
	panSpeed: 8,
	world: null,
	worldEntities: null,
	zoomIncrement: 5, // %
	zoomMax: 100,
	zoomMin: 15,
	zoomTween: null,
	zoomTarget: 100, // %

	init() {
		CameraSystem.game = instanceManager.get('game');
		CameraSystem.keyboardControls = instanceManager.get('keyboard-controls');
		CameraSystem.world = CameraSystem.game.world;
		CameraSystem.worldEntities = instanceManager.get('world-entities');

		// CameraSystem.background1layer1 = CameraSystem.game.add.tileSprite(Config.screen.width * -0.25, Config.screen.width * -0.25, Config.screen.width * 1.25, Config.screen.width * 1.25, 'background1-layer1');
		CameraSystem.background1layer2 = CameraSystem.game.add.tileSprite(Config.screen.width * -0.5, Config.screen.width * -0.5, Config.screen.width * 1.5, Config.screen.width * 1.5, 'background1-layer2');

		window.addEventListener('mousewheel', (e) => {
			CameraSystem.updateZoomTarget(e.wheelDelta);
		});
	},

	run() {
		// Vertial pan
		if(CameraSystem.keyboardControls.panUp.isDown) {
			CameraSystem.dirtyBackground = true;
			CameraSystem.worldEntities.y += CameraSystem.panSpeed;
		} else if(CameraSystem.keyboardControls.panDown.isDown) {
			CameraSystem.dirtyBackground = true;
			CameraSystem.worldEntities.y -= CameraSystem.panSpeed;
		}

		// Horizontal pa
		if(CameraSystem.keyboardControls.panRight.isDown) {
			CameraSystem.dirtyBackground = true;
			CameraSystem.worldEntities.x -= CameraSystem.panSpeed;
		} else if(CameraSystem.keyboardControls.panLeft.isDown) {
			CameraSystem.dirtyBackground = true;
			CameraSystem.worldEntities.x += CameraSystem.panSpeed;
		}

		if(!CameraSystem.dirtyBackground) {
			return;
		}

		CameraSystem.updateBackground();
		CameraSystem.updateZoom();
		CameraSystem.limitView();

		CameraSystem.dirtyBackground = false;
	},
	limitView() {
		// Limit view
		// Run check each tick to account for
		// other position mutators such as zooming
		if(CameraSystem.worldEntities.y > 0) {
			CameraSystem.worldEntities.y = 0;
		} else if(CameraSystem.worldEntities.y < -(CameraSystem.world.height * CameraSystem.worldEntities.scale.y - CameraSystem.game.camera.height)) {
			CameraSystem.worldEntities.y = -(CameraSystem.world.height * CameraSystem.worldEntities.scale.y - CameraSystem.game.camera.height);
		}

		if(CameraSystem.worldEntities.x < -(CameraSystem.world.width * CameraSystem.worldEntities.scale.x - CameraSystem.game.camera.width)) {
			CameraSystem.worldEntities.x = -(CameraSystem.world.width * CameraSystem.worldEntities.scale.x - CameraSystem.game.camera.width);
		} else if(CameraSystem.worldEntities.x > 0) {
			CameraSystem.worldEntities.x = 0;
		}
	},

	updateBackground() {
		// CameraSystem.background1layer1.position.x = CameraSystem.background1layer1.width * 0.005  * CameraSystem.worldEntities.x / CameraSystem.game.width;
		// CameraSystem.background1layer1.position.y = CameraSystem.background1layer1.height * 0.005 * CameraSystem.worldEntities.y / CameraSystem.game.height;
		CameraSystem.background1layer2.position.x = CameraSystem.background1layer2.width * 0.01 * CameraSystem.worldEntities.x / CameraSystem.game.width;
		CameraSystem.background1layer2.position.y = CameraSystem.background1layer2.height * 0.01* CameraSystem.worldEntities.y / CameraSystem.game.height;
	},

	updateZoom() {
		let zoom = CameraSystem.zoomTarget / 100;
		let localPosition = CameraSystem.game.input.getLocalPosition(CameraSystem.worldEntities, CameraSystem.game.input.mousePointer);

		CameraSystem.worldEntities.position.x += localPosition.x * (CameraSystem.worldEntities.scale.x - zoom);
		CameraSystem.worldEntities.position.y += localPosition.y * (CameraSystem.worldEntities.scale.y - zoom);
		CameraSystem.worldEntities.scale.setTo(zoom);
	},

	updateZoomTarget(delta) {
		if(CameraSystem.game.paused) {
			return;
		}

		CameraSystem.zoomTarget += CameraSystem.zoomIncrement * (delta > 0 ? 1 : -1);

		if(CameraSystem.zoomTarget >= CameraSystem.zoomMin && CameraSystem.zoomTarget <= CameraSystem.zoomMax) {
			CameraSystem.updateZoom();
		} else {
			CameraSystem.zoomTarget = delta > 0 ? CameraSystem.zoomMax : CameraSystem.zoomMin;
		}

		CameraSystem.limitView();
		CameraSystem.updateBackground();
	},
};

export default CameraSystem;
