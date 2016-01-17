import InstanceManager from 'instance-manager';

InstanceManager.registerResource('group', {
	cache: false,
	init: function() {
		return InstanceManager.get('game').add.group();
	},
});
