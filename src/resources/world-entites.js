import instanceManager from 'instance-manager';

instanceManager.registerResource('world-entities', {
	init: function() {
		// TODO: Remove global debug
		return window.worldEntities = instanceManager.get('group');
	},
});
