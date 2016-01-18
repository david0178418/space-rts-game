import _ from 'lodash';
import Entity from './entity';

const components = Symbol('components');
const entities = Symbol('entities');
const initSystems = Symbol('init-systems');
const runSystems = Symbol('run-systems');

// Util function to copy getter definitions as well as properties.
const extend = function(obj) {
	Array.prototype.slice.call(arguments, 1).forEach(function(source) {
		let descriptor;
		let prop;

		if(source) {
			for (prop in source) {
				descriptor = Object.getOwnPropertyDescriptor(source, prop);
				Object.defineProperty(obj, prop, descriptor);
			}
		}
	});

	return obj;
};
// END Util function to copy getter definitions as well as properties.

export default
class ECSManager {
	constructor() {
		this[components] = {};
		this[entities] = [];
		this[initSystems] = {};
		this[runSystems] = {};
	}

	createEntity() {
		let entity = new Entity(this);

		this[entities].push(entity);
		return entity;
	}

	// @param {string} name - component name.  If component with matching name doesn't
	//		exist, a new one will be created using the provided properties as defaults
	// @param {object} [props={}] - component instant overrides.
	// @return {object}
	// TODO Consider case of over-writing a component that has an
	// "onRemove" callback (such as "sprite")
	createComponent(name, state = {}) {
		let component = this[components][name];

		if(!component) {
			this.registerComponent(name, {state});
			return state;
		} else if(component.factory) {
			return component.factory(state);
		} else {
			return extend({}, component.state, state);
		}
	}

	destroyEntity(entity) {
		this[entities].splice(this[entities].indexOf(entity), 1);
		entity.destroy();
		return this;
	}

	getComponentCleanup(name) {
		return this[components][name].onRemove || _.noop;
	}

	getEntityById(id) {
		return _.find(this[entities], function(entity) {
			return entity.id === id;
		});
	}

	getEntities(components) {
		if(!components) {
			return _.filter(this[entities].slice(0), function(entity) {
				return entity.alive;
			});
		}

		return _.filter(this[entities], function(entity) {
			return entity.alive && entity.hasComponents(components);
		});
	}

	// @param {string} name
	// @param {object} [defaultData={}] - provide an optional baseline for a component
	registerComponent(name, defaultData) {
		this[components][name] = defaultData;
	}

	// @param {string} name
	// @param {object} system
	// @param {array} system.components - listing of components required for system operation
	// @param {function} system.run - system tick logic.  Receives array of all matching entities.
	// @param {function} system.init - system initialization.
	registerSystem(name, system) {
		if(system.init) {
			this[initSystems][name] = system;
		}

		if(system.run || system.runOne) {
			this[runSystems][name] = system;
		}
	}

	runSystemInits() {
		_.each(this[initSystems], function(system) {
			system.init();
		});
	}

	runSystems() {
		_.each(this[runSystems], (system) => {
			if(system.components) {
				let entities = this.getEntities(system.components);

				if(entities.length) {
					system.run && system.run(entities);
					system.runOne && _.map(entities, system.runOne, system);
				}
			} else {
				system.run();
			}

		});
	}
}
