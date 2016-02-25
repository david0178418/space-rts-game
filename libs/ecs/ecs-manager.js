import {
	each,
	every,
	filter,
	isUndefined,
	keys,
	map,
	uniqueId,
	values,
} from 'lodash';

const components = 'components';// Symbol('components');
const entities = 'entities'; // Symbol('entities');
const entityIndex = 'entityIndex'; // Symbol('entityIndex');
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
		this[entities] = {};
		this[entityIndex] = [];
		this[initSystems] = {};
		this[runSystems] = {};
	}

	addComponent(entityId, component, props) {
		let entity = this[entities][entityId];

		if(entity[component] && !props) {
			return entity;
		}

		entity[component] = this.createComponent(component, props, entity);
	}

	addComponents(entityId, components) {
		let componentNames = keys(components);

		for(let x = 0; x <= componentNames.length; x++) {
			this.addComponent(entityId, componentNames[x], components[componentNames[x]]);
		}

		return this[entities][entityId];
	}

	createEntity() {
		let id = uniqueId('entity-');

		this[entities][id] = {
			id,
		};
		this[entityIndex].push(id);

		return this[entities][id];
	}

	// @param {string} name - component name.  If component with matching name doesn't
	//		exist, a new one will be created using the provided properties as defaults
	// @param {object} [props={}] - component instant overrides.
	// @return {object}
	// TODO Consider case of over-writing a component that has an
	// "onRemove" callback (such as "sprite")
	createComponent(name, state = {}, entityContext) {
		let component = this[components][name];

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
		let entityIndexPosition = this[entityIndex].indexOf(entityId);

		this.removeComponents(entityId);

		delete this[entities][entityId];

		if(entityIndexPosition !== -1) {
			this[entityIndex].splice(this[entityIndex].indexOf(entityId), 1);
		}
	}

	entityDoesNotHaveComponent(entityId, componentName) {
		return !this[entities][entityId][componentName];
	}

	entityDoesNotHaveComponents(entityId, componentNames) {
		return every(componentNames, (componentName) => {
			this.doesNotHaveComponent(entityId, componentName);
		});
	}

	getComponent(entityId, componentName) {
		return this[entities][entityId][componentName];
	}

	getComponentCleanup(name) {
		return this[components][name].onRemove || function() {};
	}

	getEntityComponents(entityId) {
		// TODO Cache this
		return keys(this[entities][entityId]);
	}

	getEntity(entityId) {
		return this[entities][entityId];
	}

	getEntities(withComponents, withoutComponents) {
		let matchedEntities;

		if(!(withComponents || withoutComponents)) {
			return this[entities].slice(0);
		}

		matchedEntities = [];

		for(let x = 0; x < this[entityIndex].length; x++) {
			let entityId = this[entityIndex][x];

			if(this.hasComponents(entityId, withComponents) && this.doesNotHaveComponents(entityId, withoutComponents)) {
				matchedEntities.push(this[entities][entityId]);
			}
		}

		return filter(this[entities], (entity) => {
			return entity.hasComponents(withComponents) && entity.doesNotHaveComponents(withoutComponents);
		});
	}

	hasComponent(entityId, componentName) {
		return !!this[entities][entityId][componentName];
	}

	hasComponents(entityId, componentNamess) {
		return every(componentNamess, (componentName) => {
			this.hasComponent(entityId, componentName);
		});
	}

	// @param {string} name
	// @param {object} [defaultData={}] - provide an optional baseline for a component
	registerComponent(name, defaultData) {
		this[components][name] = defaultData;

		return this;
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

		return this;
	}

	removeComponent(entityId, componentName) {
		let component;
		let entity = this[entities][entityId];

		component = entity[componentName];

		if(!component) {
			return;
		}

		this.getComponentCleanup(componentName)(component, entity);
		delete entity[componentName];
	}

	removeComponents(entityId) {
		each(this.getEntityComponents(entityId), (componentName) => {
			this.removeComponent(entityId, componentName);
		});
	}

	runSystemInits() {
		each(values(this[initSystems]), function(system) {
			system.init();
		});
	}

	runSystems() {
		each(this[runSystems], (system) => {
			if(system.components) {
				let matchedEntities = this.getEntities(system.components.with, system.components.without);

				if(matchedEntities.length) {
					system.run && system.run(matchedEntities);
					system.runOne && map(matchedEntities, system.runOne);
				}
			} else {
				system.run();
			}
		});
	}

	toggleComponent(entityId, componentName, addComponent, props) {
		addComponent = isUndefined(addComponent) ? !this[entities][entityId][componentName] : addComponent;

		addComponent ? this.addComponent(entityId, componentName, props): this.removeComponent(entityId, componentName);
	}
}
