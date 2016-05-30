import MyDispatcher from '../dispatcher/appDispatcher.js';
import {EventEmitter} from 'events';
import ActionTypes from '../actions/ActionTypes.js';

// Store para los componentes seleccionados a partir del
// select de la agrupación, por ID
let components = [];

let ComponentStore = Object.assign({}, EventEmitter.prototype, {
//var ComponentTaskSelectorStore = {
    addChangeListener: function (callback) {
        // TODO: Añadir una función callback como handler del evento 'change'
        console.log('[ComponentStore][addChangeListener] - LLega')
        this.on('change', callback);
    },

    removeChangeListener: function (callback) {
        // TODO: Eliminar una función callback como handler del evento 'change'
        //this.removeListener('change', callback);
        console.log('[ComponentStore][removeChangeListener] - LLega')
    },

    emitChange: function (callback) {
        // TODO: Lanzar un evento 'change'
        console.log('[ComponentStore][emitChange] - LLega')
        this.emit('change');
    },
    getAllComponents: function (callback) {
        return components;
    }

});

// nos suscribimos al Dispatcher
MyDispatcher.register(function (action) {
    console.log('[ComponentStore].[Dispatcher].[register] - Acción recibida '+action.actionType);
    switch (action.actionType) {
        case ActionTypes.LOAD_COMPONENT:
            ComponentStore.emitChange();            
            break;
    }

});

export default ComponentStore;