import ComponentTaskSelector from '../ComponentTaskSelector.jsx';
import MyDispatcher from '../dispatcher/appDispatcher.js';
import ActionTypes from '../actions/ActionTypes.js';

let ComponentActions = {
    createComponent: function(){
        console.log('[ComponentActions] - LLega');
        //let newComponent = ComponentTaskSelector.CargarLosComponentes();
        MyDispatcher.dispatch({
            actionType: ActionTypes.LOAD_COMPONENT,
            // acciones a realizar
        });
    }
};

export default ComponentActions;