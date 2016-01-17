const INSTANCES_KEY = Symbol('instances');
const RESOURCES_KEY = Symbol('resources');

class InstanceManager {
	constructor() {
		this[INSTANCES_KEY] = {};
		this[RESOURCES_KEY] = {};
	}

	get(resourceName) {
		let resourceInstance = this[INSTANCES_KEY][resourceName];
		const resources = this[RESOURCES_KEY];

		if(!resourceInstance) {
			resourceInstance = resources[resourceName].init();

			if(resources[resourceName].cache || resources[resourceName].cache === undefined) {
				this[INSTANCES_KEY][resourceName] = resourceInstance;
			}
		}

		return resourceInstance;
	}

	reset(dependency) {
		this[INSTANCES_KEY][dependency] = this[RESOURCES_KEY][dependency]();
	}

	registerResource(name, resource) {
		this[RESOURCES_KEY][name] = resource;
	}
}

export default new InstanceManager();
