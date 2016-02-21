import instanceManager from 'instance-manager';

let ecsManager = instanceManager.get('ecs-manager');

ecsManager
	.registerSystem('universe-creation', require('./universe-creation').default)
	.registerSystem('camera', require('./camera').default)
	.registerSystem('breaking', require('./breaking').default)
	.registerSystem('colonize', require('./colonize').default)
	.registerSystem('entity-spawn-dequeue', require('./entity-spawn-dequeue').default)
	.registerSystem('group-coordination', require('./group-coordination').default)
	.registerSystem('movement', require('./movement').default)
	.registerSystem('order-processing', require('./order-processing').default)
	.registerSystem('selection', require('./selection').default)
	.registerSystem('waypoint-dequeue', require('./waypoint-dequeue').default)
	.registerSystem('render-production-options', require('./render-production-options').default)
	.registerSystem('render-build-queue', require('./render-build-queue').default)
	.registerSystem('radar-detection', require('./radar-detection').default)
	.registerSystem('weapon-detonation', require('./weapon-detonation').default);
