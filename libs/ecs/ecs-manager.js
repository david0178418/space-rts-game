import {
	each,
	isUndefined,
	keys,
	uniqueId,
	values,
} from 'lodash';

class Entity {
	constructor() {
		this.id = id;
	}
}

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
		this._components = {};
		this._entities = {};
		this._entityIndex = [];
		this._initSystems = {};
		this._runSystems = {};
		this._runSystemsIndex = [];
	}

	addComponent(entityId, component, props) {
		let entity = this._entities[entityId];

		if(entity[component] && !props) {
			return entity;
		}

		entity[component] = this.createComponent(component, props, entity);
	}

	addComponents(entityId, components) {
		let componentNames = keys(components);

		for(let x = 0; x < componentNames.length; x++) {
			this.addComponent(entityId, componentNames[x], components[componentNames[x]]);
		}

		return this._entities[entityId];
	}

	createEntity() {
		let id = uniqueId('entity-');

		this._entities[id] = {
			id,
		};
		this._entityIndex.push(id);

		return this._entities[id];
	}

	// @param {string} name - component name.  If component with matching name doesn't
	//		exist, a new one will be created using the provided properties as defaults
	// @param {object} [props={}] - component instant overrides.
	// @return {object}
	// TODO Consider case of over-writing a component that has an
	// "onRemove" callback (such as "sprite")
	createComponent(name, state = {}, entityContext) {
		let component = this._components[name];

		if(!component) {
			this.registerComponent(name, {state});
			return state;
		} else if(component.factory) {
			return component.factory.call(entityContext, state);
		} else {
			return extend({}, component.state, state);
		}
	}

	destroyEntity(entityId) {
		let entityIndexPosition = this._entityIndex.indexOf(entityId);

		this.removeComponents(entityId);

		delete this._entities[entityId];

		if(entityIndexPosition !== -1) {
			this._entityIndex.splice(this._entityIndex.indexOf(entityId), 1);
		}
	}

	entityDoesNotHaveComponent(entityId, componentName) {
		return !this._entities[entityId][componentName];
	}

	entityDoesNotHaveComponents(entityId, componentNames) {
		for(let x = 0; x < componentNames.length; x++) {
			if(this._entities[entityId][componentNames[x]]) {
				return false;
			}
		}

		return true;
	}

	getComponent(entityId, componentName) {
		return this._entities[entityId][componentName];
	}

	getComponentCleanup(name) {
		if(name === 'id') {
			return () => {};
		}
		return this._components[name].onRemove || (() => {});
	}

	getEntityComponents(entityId) {
		// TODO Cache this
		return keys(this._entities[entityId]);
	}

	getEntity(entityId) {
		return this._entities[entityId];
	}

	getEntities(withComponents, withoutComponents) {
		let matchedEntities;

		if(!(withComponents || withoutComponents)) {
			return this._entities.slice(0);
		}

		matchedEntities = [];

		for(let x = 0; x < this._entityIndex.length; x++) {
			let entityId = this._entityIndex[x];

			if(
				(!withComponents || this.hasComponents(entityId, withComponents)) &&
				(!withoutComponents || this.entityDoesNotHaveComponents(entityId, withoutComponents))
			) {
				matchedEntities.push(this._entities[entityId]);
			}
		}

		return matchedEntities;
	}

	hasComponent(entityId, componentName) {
		return !!this._entities[entityId][componentName];
	}

	hasComponents(entityId, componentNames) {
		for(let x = 0; x < componentNames.length; x++) {
			if(!this._entities[entityId][componentNames[x]]) {
				return false;
			}
		}

		return true;
	}

	// @param {string} name
	// @param {object} [defaultData={}] - provide an optional baseline for a component
	registerComponent(name, defaultData) {
		this._components[name] = defaultData;

		// Initialize potential component names for all components to ensure
		// the hidden classes are uniform between all entities
		Entity.prototype[name] = null;

		return this;
	}

	// @param {string} name
	// @param {object} system
	// @param {array} system.components - listing of components required for system operation
	// @param {function} system.run - system tick logic.  Receives array of all matching entities.
	// @param {function} system.init - system initialization.
	registerSystem(name, system) {
		if(system.init) {
			this._initSystems[name] = system;
		}

		if(system.run || system.runOne) {
			this._runSystems[name] = system;
			this._runSystemsIndex.push(name);
		}

		return this;
	}

	removeComponent(entityId, componentName) {
		let component;
		let entity = this._entities[entityId];

		component = entity[componentName];

		if(!component) {
			return;
		}

		this.getComponentCleanup(componentName)(component, entity);
		entity[componentName] = null;
	}

	removeComponents(entityId) {
		let componentNames = this.getEntityComponents(entityId);

		for(let x = 0; x < componentNames.length; x++) {
			this.removeComponent(entityId, componentNames[x]);
		}
	}

	runSystemInits() {
		each(values(this._initSystems), function(system) {
			system.init();
		});
	}

	runSystems() {
		let system = null;

		for(let x = 0; x < this._runSystemsIndex.length; x++) {
			system = this._runSystems[this._runSystemsIndex[x]];

			if(system.components) {
				let matchedEntities = this.getEntities(system.components.with, system.components.without);

				if(matchedEntities.length) {
					if(system.run) {
						system.run(matchedEntities);
					}

					if(system.runOne) {
						for(let x = 0; x < matchedEntities.length; x++) {
							system.runOne(matchedEntities[x]);
						}
					}
				}
			} else {
				system.run();
			}
		}
	}

	toggleComponent(entityId, componentName, addComponent, props) {
		addComponent = isUndefined(addComponent) ? !this._entities[entityId][componentName] : addComponent;

		addComponent ? this.addComponent(entityId, componentName, props): this.removeComponent(entityId, componentName);
	}
}
