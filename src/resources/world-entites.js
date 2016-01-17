import InstanceManager from 'instance-manager';

InstanceManager.registerResource('worldEntities', {
	init: function() {
		//TODO: Remove global debug
		var worldEntities = window.worldEntities = InstanceManager.get('group');

		return worldEntities;
	},
});
