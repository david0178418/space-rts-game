import instanceManager from 'instance-manager';

let ecsManager = instanceManager.get('ecs-manager');

ecsManager
	.registerSystem('universe-creation', require('./universe-creation-system').default)
	.registerSystem('camera', require('./camera-system').default)
	.registerSystem('breaking', require('./breaking-system').default)
	.registerSystem('colonize', require('./colonize-system').default)
	.registerSystem('entity-spawn-dequeue', require('./entity-spawn-dequeue-system').default)
	.registerSystem('group-coordination', require('./group-coordination-system').default)
	.registerSystem('movement', require('./movement-system').default)
	.registerSystem('order-processing', require('./order-processing-system').default)
	.registerSystem('selection', require('./selection-system').default)
	.registerSystem('shield-hit', require('./shield-hit-system').default)
	.registerSystem('shield-regen', require('./shield-regen-system').default)
	.registerSystem('waypoint-dequeue', require('./waypoint-dequeue-system').default)
	.registerSystem('render-production-options', require('./render-production-options-system').default)
	.registerSystem('render-build-queue', require('./render-build-queue-system').default)
	.registerSystem('radar-detection', require('./radar-detection-system').default)
	.registerSystem('weapon-detonation', require('./weapon-detonation-system').default);
