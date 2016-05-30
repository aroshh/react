/// importar paquetes
import React from 'react';
import ReactDOM from 'react-dom';

/// ficheros JSON que importamos
/// para ahorrar líneas de código
import InfoComponentes from './InfoComponentes.json';
import InfoCompPintar from './InfoComponentesPintar.json';

/// FLUX dispatcher
import ComponentStore from './store/ComponentStore.js';
import ComponentActions from './actions/ComponentActions.js';

/// importar paquetes para realizar
/// reestructuración del JSON después del filtrado
/// realizado por componentes
import Lazy from 'lazy.js';

/// importar JSON select de las agrupaciones
import groupstoci from './GroupsToCI.json';

///
let data = [];
///objeto para guardar los event listener del componente padre
let ComponentTaskSelectorEvents = {}; 

/// guardamos el select de la agrupación seleccionado
let selectOption = '';

/////////////////////////////////
// ComponentTaskSelector 
/////////////////////////////////
let ComponentTaskSelector = React.createClass ({ 
    getInitialState: function(){         
        console.log("[ComponentTaskSelector].[getInitialState] Establecemos las estados iniciales. Comienza con ComponentTaskSelector");
        return{
            data:[], //declaramos array vacío
            selectItems:[], //declaramos array vacío para los items seleccionados
            selectedItems:[], //array auxiliar de elementos seleccionados  
            components: [],
            agrupation: [] // array JSON del select de las agrupaciones
            
        }
    },
    componentDidMount: function(){
        console.log("[ComponentTaskSelector].[componentDidMount] (solo se ejecuta la primera vez que se monta) Ya tenemos montado el objeto y dibujado en el DOM real, por lo que se pueden definir los eventos.")
        // carga de datos JSON
        this.setState({           
            components: [],
            agrupation: groupstoci //fichero JSON con el detalle de las agrupaciones            
        })
        
        /////////////
        /// Eventos
        /////////////        
        $(ComponentTaskSelectorEvents).on('select', function(e, id) {
            console.log("[ComponentTaskSelector].[onSelect] Opción activada -> selectItem a añadir: " + id);
            var currentSelectedItems = this.state.selectItems;
            console.log("[ComponentTaskSelector].[onSelect] nº elementos seleccionados en el DOM virtual antes de insertar: " + currentSelectedItems.length);
            //TOREVIEW: En caso de necesitar mejorar el rendimiento, no es necesario la comprobación, pues siempre se tiene que deseleccionar, para poderlo añadir despues.
            var indexElement = currentSelectedItems.indexOf(id);
            console.log("[ComponentTaskSelector].[onSelect] indexElement (Si tiene valor quiere decir que ya estaba seleccionado): " + indexElement);
            if (indexElement === -1) {
                currentSelectedItems.push(id);
                console.log("[ComponentTaskSelector].[onSelect] selectItem añadido: " + id);
                console.log("[ComponentTaskSelector].[onSelect]   nº elementos seleccionados state: " + this.state.selectItems.length);
                console.log("[ComponentTaskSelector].[onSelect]   nº elementos seleccionados current: " + currentSelectedItems.length);
                this.setState({ selectItems: currentSelectedItems });
            } else {
                console.log("[ComponentTaskSelector].[onSelect] No ha añadido nada. Ya estaba.");
            }
        }.bind(this));
    
        $(ComponentTaskSelectorEvents).on('unselect', function(e, id) {
            console.log("[ComponentTaskSelector].[onUnselect] Opción desactivada -> selectItem a eliminar: " + id);
            var currentSelectedItems = this.state.selectItems;
            console.log("[ComponentTaskSelector].[onUnselect] nº elementos seleccionados en el DOM virtual antes de eliminar: " + currentSelectedItems.length);
            //TOREVIEW: En caso de necesitar mejorar el rendimiento, no es necesario la comprobación, pues siempre se tiene que deseleccionar, para poderlo añadir despues.
            var indexElement = currentSelectedItems.indexOf(id);
            console.log("[ComponentTaskSelector].[onUnselect] indexElement (Si tiene valor quiere decir que sí estaba seleccionado): " + indexElement);
            if(indexElement === -1) {
                console.log("[ComponentTaskSelector].[onUnselect] selectItem: " + id + " no eliminado por no estar seleccionado.");
            } else {
                currentSelectedItems.splice(indexElement, 1);
                this.setState({selectItems: currentSelectedItems});
                console.log("[ComponentTaskSelector].[onUnselect] selectItem eliminado: " + id);
                console.log("[ComponentTaskSelector].[onUnselect]   nº elementos seleccionados state: " + this.state.selectItems.length);
                console.log("[ComponentTaskSelector].[onUnselect]   nº elementos seleccionados current: " + currentSelectedItems.length);
            }
        }.bind(this));

        $(ComponentTaskSelectorEvents).on('sendselects', function() {
            console.log("[ComponentTaskSelector].[onSendSelects]: Vamos a enviar los elementos seleccionados " + this.state.selectItems.length + " elementos en total.");
            var ids = this.state.selectItems;
            var json = this.state.data;
            for (var i = 0; i < json.length; i++) {
                for (var j = 0; j < ids.length; j++) {
                    if(json[i].Id == ids[j]) {                                        
                        this.state.selectedItems.push(json[i]);
                        console.log('[ComponentTaskSelector].[onSendSelects]: se registra este valor para ser enviado  '+ json[i].Id);
                        console.log('[ComponentTaskSelector].[onSendSelects]:   nº elementos que enviaremos: '+ this.state.selectedItems.length);
                        break;
                    }
                }
            }
            
            /// Realiza la llamada al servidor
            /// Resultado de la llamada al servidor
            var arrayTasks = FiltradoJson(ids);
            
            var groupedTasks = FilterLazy(arrayTasks);

            //llamamos a la función para que dibuje 
            // en caso de que se seleccione algun item
            if(groupedTasks.length > 0){
                console.log("[ComponentTaskSelector].[onSendSelects].[arrayTasks] - Establecemos el valor al estado this.setState");
                this.setState({
                    components: groupedTasks
                })
                console.log("[ComponentTaskSelector].[onSendSelects].[arrayTasks] - Tamaño componentes:" + this.state.components.length)
            }
            //this.state({selectedItems : selectItems});
            console.log("[ComponentTaskSelector].[onSendSelects] - Nº items añadidos que se enviarán " + this.state.selectedItems.length);
            
        }.bind(this));
    },
    componentWillUnmount: function () {
        console.log("[ComponentTaskSelector].[componentWillUnmount] Se quita la comunicación con los distintos objetos.");
        $(ComponentTaskSelectorEvents).off('select'); //desmontar los listeners
        $(ComponentTaskSelectorEvents).off('unselect'); // desmontar los listeners
        $(ComponentTaskSelectorEvents).off('sendselect');
        //$(ComponentTaskSelectorEvents).off('loadData'); //desmontar listener del botón de carga inicial
    },
    render(){
        console.log("[ComponentTaskSelector].[render] Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
        console.log("[ComponentTaskSelector].[render]  --> "+this.state.components.length );        
        return (
            <div>
                <div>Total registros de la agrupación: {this.state.agrupation.length}
                    <ComponentTaskAgrupation agrupation={this.state.agrupation} />
                </div>
                <div>
                    <ComponetTaskDataSelector /><ComponentTaskSelectorButton />
                </div>
                <ComponentTaskButtonSection key="ctbs" />
                <i>La consulta ha devuelto los siguientes registros: {this.state.data.length}</i>                                       
                <ComponentTaskItemsSection key="cits" items={this.state.data} />
                <div>
                    <CallSelector components={this.state.components}/>
                </div>
            </div>
        )
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////
// Mostrar tareas agrupadas de los componentes 
// seleccionados y agrupados obtenidos del JSON ya filtrado y agrupado
////////////////////////////////////////////////////////////////////////////////////////////////////
let CallSelector = React.createClass ({ 
    getInitialState: function(){         
        console.log('[CallSelector].[getInitialState]- Establecemos es estado inicial - Comienza con CallTaskSelector');
        return{
            components:[], //declaramos array vacío, todos los datos de cada Componente seleccionado            
        }
    },   
    render(){
        console.log('[CallSelector].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        console.log('[CallSelector].[render] -->'+this.props.components.length);
        //TODO: hacer un foreach por cada uno de las agrupaciones de los componentes.
        var thisComponents = this.props.components
        if (thisComponents===undefined){
            thisComponents=[];
        }
        return (
            <div className='level1'>                                                                                 
                {thisComponents.map(function(item){
                    return(
                        <div key={"cts"+item.id}>
                            <h2>Componente: {item.name} - Id: {item.id}</h2>                         
                            <CallSelectorGroup  group={item.groups}></CallSelectorGroup>                                 
                        </div>
                        ) 
                    })
                }                                                                                     
            </div>
        )
    }
});
///
let CallSelectorGroup = React.createClass({
    getInitialState: function(){
        console.log('[CallSelectorGroup].[getInitialState] - Establecido estado inicial');
        return {groups:[]}
    },
    render(){
        console.log('[CallSelectorGroup].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        console.log('[CallSelectorGroup].[render]   -> Estado groups.length '+ this.state.groups.length);
        let myStyle = {listStyle:'none'};
        var thisGroup = this.props.group
        if (thisGroup===undefined){
            thisGroup=[];
        }
        return(                        
            <div style={myStyle}>                   
                {thisGroup.map(function(group,i){
                    return(
                            <div className='level2' key={i}>
                                <h2 className='page-header cabeceraGrupo'>Grupo Id: {group.id} - Grupos: {group.name} - Norma de la agrupación: {group.standard}</h2>
                                <CallSelectorGroupTest test={group.tests}>
                                </CallSelectorGroupTest >
                            </div>
                        ) 
                    })
                }
            </div>            
        )    
    }
});
///
let CallSelectorGroupTest = React.createClass({
    getInitialState: function(){
        console.log('[CallSelectorGroupTest].[getInitialState] - Establecido estado inicial');
        return {tests:[]}
    },
    render(){
        console.log('[CallSelectorGroupTest].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        //console.log('[CallSelectorGroupTest].[render]   -> Estado groups.length '+ this.props.tests.length);
        let myStyle = {listStyle:'none'};
        var thisTest = this.props.test
        if (thisTest===undefined){
            thisTest=[];
        }
        return(                        
            <div>                   
                {thisTest.map(function(test,i){
                    return(
                            <div className='accordion-heading block-title' key={i}>
                                <div className='block-options'>
                                    <a className='btn btn-primary' href='#' data-toggle='tooltip' title='Ver Detalle'><i className='icon-search'>Buscar</i></a>
                                    <a className='btn btn-danger DeleteEnsayo' data-original-title='Eliminar el Ensayo' data-toggle='tooltip' title='' data-componentid='' data-groupid='' data-testid=''><i className='icon-remove'>Eliminar</i></a>
                                </div>
                                <div className={'containerensayo_'} className='accordion-body in collapse' style={{height:'auto'}}>
                                    <div className='accordion-inner block-content'>
                                        <span>EnsayoID: {test.id} - Ensayo: {test.name}</span>
                                        <CallSelectorGroupTestTask task={test.tasks}></CallSelectorGroupTestTask>
                                    </div>
                                </div>                                    
                            </div>
                        ) 
                    })
                }
            </div>            
            )    
    }
});
///
let CallSelectorGroupTestTask = React.createClass({
    getInitialState: function(){
        console.log('[CallSelectorGroupTestTask].[getInitialState] - Establecido estado inicial');
        return {tasks:[]}
    },
    render(){
        console.log('[CallSelectorGroupTestTask].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        //console.log('[CallSelectorGroupTestTask].[render]   -> Estado groups.length '+ this.state.task.length);
        let myStyle = {listStyle:'none'};
        var thisTask = this.props.task
        if (thisTask===undefined){
            thisTask=[];
        }
        return(                 
            <div className='row-fluid'>
                    {thisTask.map(function(task,i){
                        return(
                                <ul className='to-sort ui-sortable' key={i}>
                                    <li className='onetask' data-idtask={task.id} key={i}>
                                        <div id={'Task_'+task.id} class='accordion-group block block-themed'>
                                            <div className='accordion-heading block-title'>
                                                <div clasName='block-options'>
                                                    <a className='btn btn-primary' data-original-title='Ver Detalle de la Tarea' data-toggle='tooltip' title='' href={'/#/Task/Details'+task.id} >
                                                        <i className='icon-search'>Buscar</i>
                                                    </a>
                                                    <a id={'CopyTask_'+task.id} className='btn btn-success' data-original-title='Duplicar la Tarea' data-toggle='tooltip' title='' onclik='CopyTask(this,{task.id});'>
                                                        <i className='icon-magic'>Duplicar</i>
                                                    </a>
                                                    <a className='btn btn-danger DeleteTask' data-original-title='Eliminar la Tarea del Ensayo' data-toggle='tooltip' title='' data-taskid={task.id}>
                                                        <i className='icon-remove'>Eliminar</i>
                                                    </a>
                                                </div>
                                                <a className='accordion-toggle' data-toggle='collapse' data-parent={'#containerensayo_X'} href={'#containertask_'+task.id}>
                                                    <h4 style={{color:'#000'}}>Tarea: {task.name}</h4>
                                                </a>
                                            </div>
                                        </div>
                                        <span>TareaID: {task.id} - Tarea: {task.name}</span>
                                        <CallSelectorGroupTestTaskDetail
                                            id={task.id}
                                            fieldType={task.fieldType}
                                            fieldid={task.fieldid}
                                            observationLanguageMain={task.observationLanguage}
                                            observationLanguageAlternative={task.observationLanguageAlternative}
                                            option={task.option}
                                            standard={task.standard}
                                            validation={task.validationDocuement}
                                            value={task.value}
                                        >
                                        </CallSelectorGroupTestTaskDetail>
                                    </li>
                                </ul>
                                ) 
                        })
                    }
            </div> 
        )    
    }
});
///
let CallSelectorGroupTestTaskDetail = React.createClass({
    render(){
        console.log('[CallSelectorGroupTestTaskDetail].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        //console.log('[CallSelectorGroupTestTaskDetail].[render]   -> Estado groups.length '+ this.state.task.length);        
        return(                
                <div id={'containertask_'+this.props.id} className='accordion-body in collapse' style={{height: 'auto'}}>
                    <div id={'ai_'+this.props.id} className='accordion-inner block-content'>
                        <div className='block-section'>
                            <div className='pull-right'>
                                <a className='btn btn-success ButtonUpdateStandarToTask' data-original-title='Cambiar norma de la tarea' href='#' data-taskid={this.props.id} data-testid='' data-componentid='' data-groupid='' data-toggle='tooltip' title=''>
                                    <i className='icon-check'>Cambiar</i>
                                </a>
                            </div>
                            <small>
                                Norma de la Tarea: {this.props.standard}
                                <b id={'Label_TaskStandard_'+this.props.id}></b>
                            </small>
                        </div>
                        <p id={'Control_X_'+this.props.id} className='editable_text' data-idtask={this.props.id} oldval={this.props.value} data-componentid='' data-groupid=''>{this.props.value}</p>
                        <span>Idioma principal:</span>
                        <p id={'Control_X_'+ this.props.id+'ObservationsMainLanguage'} className='editable_text_observationsMainLanguage' data-idtask="{this.props.id}" oldval='' data-componentid='' data-groupid=''>Click to edit</p>
                        <span>Idioma alternativo:</span>
                        <p id={'Control_X_'+ this.props.id+'ObservationsAlternativeLanguage'} className='editable_text_observationsAlternativeLanguage' data-idtaks={this.props.id} oldval='' data-componentid='' data-groupid=''>Click to edit</p>
                    </div>
                </div>
        )    
    }
});

//////////////////////////////////////////////
/// ComponentTaskAgrupation
//////////////////////////////////////////////
let ComponentTaskAgrupation = React.createClass({
    getInitialState: function(){
        console.log("[ComponentTaskAgrupation].[getInitialState] Establecemos las estados iniciales. Comienza con ComponentTaskSelector");
        return{
            agrupation:[], //declaramos array vacío            
        }
    },
    handleChange: function(e) {
        var options = e.target.options;
        var value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
                selectOption = value; //guardamos la description seleccionada de la agrupacion
            }
        }
        console.log("[ComponentTaskAgrupation].[onHandleChange] - Valor de 'ID' del Select "+selectOption); 
    },
    componentDidMount: function(){
        console.log("[ComponentTaskAgrupation].[componentDidMount] (solo se ejecuta la primera vez que se monta) Ya tenemos montado el objeto y dibujado en el DOM real, por lo que se pueden definir los eventos.")        
    },
    componentWillUnmount: function () {
        console.log("[ComponentTaskAgrupation].[componentWillUnmount] - Se quita la comunicación con el objeto.");
        $(ComponentTaskSelectorEvents).off('loadData');
    },
    render(){
        console.log('[ComponentTaskAgrupation].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        var thisAgrupacion = this.props.agrupation
        if (thisAgrupacion===undefined){
            thisAgrupacion=[];
        }        
        return(
            <div>
                <span>Agrupaciones:</span>
                <select onChange={this.handleChange}>
                    <option key="-1" id="-1" value="-1">Seleccione Agrupación de Ensayos</option>
                    {this.props.agrupation.map(function(agrupation,i){
                        return(
                            <option key={i} id={agrupation.Id} value={agrupation.Id}>{agrupation.Id}/{agrupation.Description}</option>
                            )
                        })
                    } 
                </select>
            </div>
        )
    }
})

///////////////////////////////////////////////
// ComponentTaskDataSelector - PARA LAS FECHAS
///////////////////////////////////////////////
let ComponetTaskDataSelector = React.createClass({   
    componentDidMount: function(){
        console.log('[ComponentTaskDataSelector].[componentDidMount] - Cargado');
        // datapickers montados en el renderizado del componente       
        $('#dateBefore').datepicker();
        $('#dateAfter').datepicker();
    },
    render(){
        console.log('[ComponentTaskDataSelector].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
            <div><span>Fecha de la creación de las Tareas:</span>
                <div className='mydatepicker'>
                    <ComponentTaskDataSelectorBefore></ComponentTaskDataSelectorBefore>
                </div>
                <div className='mydatepicker'>
                    <ComponentTaskDataSelectorAfter />
                </div>
            </div>
            )
    }
})

/////////////////////////////////////
// ComponentTaskDataSelectorBefore
/////////////////////////////////////
let ComponentTaskDataSelectorBefore = React.createClass({
    render(){
        console.log('[ComponentTaskDataSelectorBefore].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <div className='boostrap-datetimepicker-widget dropdown.menu bottom'>                        
                    <input className='datepicker' id='dateBefore' onClick={this.handleChange}  placeholder='Fecha Desde'/>
                </div>
            )
    }
});

/////////////////////////////////////
// ComponentTaskDataSelectorAfter
/////////////////////////////////////
const ComponentTaskDataSelectorAfter = React.createClass({
    render(){
        console.log('[ComponentTaskDataSelectorAfter].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <div className='boostrap-datetimepicker-widget dropdown.menu bottom'>                 
                    <input className='datepicker'  id='dateAfter' placeholder='Fecha Hasta'/>
                </div>
            )
    }
});

///////////////////////////////
// ComponentTaskSelectorButton
///////////////////////////////
let ComponentTaskSelectorButton = React.createClass({
    componentDidMount: function(){
        console.log('[ComponentTaskSelectorButton].[componentDidMount] - Entra');
        ComponentStore.getAllComponents();
    },
    componentWillMount: function(){
        console.log('[ComponentTaskSelectorButton].[componentWillMount] - Entra');
        ComponentStore.addChangeListener(this.cargaDatos);
    },
    componentWillUnmount: function(){
        console.log('[ComponentTaskSelectorButton].[componentWillUnmount] - Entra');
        ComponentStore.removeChangeListener();
    },
    cargaDatos(){
        console.log('[ComponentTaskSelectorButton].[cargaDatos] - Pulsado botón de carga de datos');
        //ComponentActions.createComponent();
        var dateBefore = $('#dateBefore').val();
        var dateAfter = $('#dateAfter').val();
        if(selectOption==="" || dateBefore===""){
            alert("Debes introducir la agrupación / fecha desde");
            this.setState({
                data: [] //borra el listado de componentes según la agrupación indicada
            })

        }else{
            //console.log("[ComponentTaskSelector].[onLoadData] Tamaño del estado del objeto "+this.state.agrupation.length);
            console.log("[ComponentTaskSelector].[onLoadData] Option seleccionado "+selectOption);
            console.log("[ComponentTaskSelector].[onLoadData] valor fecha desde "+dateBefore);
            console.log("[ComponentTaskSelector].[onLoadData] valor fecha desde "+dateAfter);
            var result = filtrarPorAgrupacion(selectOption, dateBefore, dateAfter);  //filtrar JSON

            console.log("[ComponentTaskSelector].[onLoadData] data "+data);
            this.setState({
                data: result,
                data: ComponentStore.getAllComponents()
            })
        }
    },
    render(){
        console.log('[ComponentTaskSelectorButton].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
            <button onClick={this.cargaDatos}>CARGA DE DATOS!</button>
        )
    }
})

/////////////////////////////////
// ComponentTaskButtonSection
///////////////////////////////// 
const ComponentTaskButtonSection = React.createClass ({
    render(){
        console.log('[ComponentTaskButtonSection].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return (
                <div>
                   <ButtonSelect /><ButtonDeselect /><ButtonSend /><ButtonValidate /> 
                </div>
        )
    }
});

/////////////////////////////////////
// ButtonDeselect
/////////////////////////////////////
const ButtonDeselect = React.createClass({
    deseleccionaTodo(){
        console.log('[ComponentTaskButtonSection].[ButtonDeselect].[deseleccionaTodo] - Pulsado botón Deseleccionar todo');
        $(ComponentTaskSelectorEvents).trigger('unselectall');
    },
    render: function(){
        console.log('[ComponentTaskButtonSection].[ButtonDeselect].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
            <button onClick={this.deseleccionaTodo}>Deseleccionar Todo</button>
        )
    }
});

/////////////////////////////////////
// ButtonSelect
/////////////////////////////////////
const ButtonSelect = React.createClass({
    seleccionaTodo: function() {        
        console.log('[ComponentTaskButtonSection].[ButtonSelect].[seleccionaTodo] - Pulsado botón seleccionar todo');
        $(ComponentTaskSelectorEvents).trigger('selectall');
    },
    render: function(){
        console.log('[ComponentTaskButtonSection].[ButtonSelect].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(             
           <button onClick={this.seleccionaTodo}>Seleccionar Todo</button>
        )
    }
});

/////////////////////////////////////
// ButtonSend
/////////////////////////////////////
const ButtonSend = React.createClass({
    envioDatos: function(){      
        console.log('[ComponentTaskButtonSection].[ButtonSend].[envioDatos] - Pulsado botón de enviar datos');
        $(ComponentTaskSelectorEvents).trigger('sendselects');

    },
    render: function(){
        console.log('[ComponentTaskButtonSection].[ButtonSend].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <button onClick={this.envioDatos}>Enviar elementos seleccionados</button>
        )
    }
});

/////////////////////////////////////
// ButtonValidate
/////////////////////////////////////
const ButtonValidate = React.createClass({
    validarCompo: function(){
        console.log('[ComponentTaskButtonSection].[ButtonValidate].[validarCompo] - Pulsado botón de validar datos');        
    },
    render: function(){
        console.log('[ComponentTaskButtonSection].[ButtonValidate].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <button onClick={this.validarCompo}>Validar componentes</button>
        )
    }
});

/////////////////////////////////////
// ComponentTaskItemsSection
/////////////////////////////////////
const ComponentTaskItemsSection = React.createClass({
    getInitialState: function(){
        console.log("[ComponentTaskItemsSection] - Establecemos las propiedades iniciales");
        return{
            propertiesParent:[]
        }
    },
    render: function(){
        console.log("[ComponentTaskItemsSection].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
        return (
            <div>
                <ItemsList key="il" items={this.props.items}/>
            </div>
        )
    }
});

/////////////////////////////////////
// ItemsList
/////////////////////////////////////
const ItemsList = React.createClass ({
    getInitialState: function(){     
        console.log("[ItemsList].[getInitialState] - Estado inicial ItemsList " + this.props.items.length);

        return{ items:[] }
    },
    componentDidMount: function() {            
        console.log("[ItemsList].[componentDidMount] - ItemsList state " + this.state.items.length);
        this.setState({
            items: this.state.items
        })
        console.log("[ItemsList].[componentDidMount] - ItemsList state " + this.state.items.length);
    },
    render:function(){
        console.log("[ItemsList].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
        // No mostrar las viñetas para la lista no ordenada
        let myStyle = {listStyle:'none'};
                    
        return (
            <div>
                <h4>Listado de items</h4>
                <ul style={myStyle}>
                    {this.props.items.map(function(varlista,i){
                        return(
                                <Item idhref={varlista.Id} key={i} id={varlista.Id} cia={varlista.CompanyId} numinforme={varlista.ReportNumber} descripcion={varlista.Description} >
                                </Item > 
                                ) 
                        })                        
                    }
                </ul>
            </div>
        )
    }    
});

/////////////////////////////////////
// Item
/////////////////////////////////////
const Item = React.createClass ({
    getInitialState: function(){
        console.log('[ComponentTaskItemsSection].[Item] - Establecemos estados iniciales');
        return {
            showed: false,
            //mostrar: Boolean(this.props.mostrar)
            isModalOpen: false //estado ventana modal
        }
    },
    componentDidMount: function() {
        console.log('[ComponentTaskItemsSection].[Item].[componentDidMount] (solo se ejecuta la primera vez que se monta) Ya tenemos montado el objeto y dibujado en el DOM real, por lo que se pueden definir los eventos.');
        ///////////////////////
        //Eventos que escuchas
        ///////////////////////
        $(ComponentTaskSelectorEvents).on('selectall', function(e) {
            console.log("[ComponentTaskItemsSection].[Item].[onSelectAll]  - Pulsado botón de seleccionar todo ¿Está activo?" + $(this.refs[this.props.id]).prop('checked'));
            // Si está desmarcado, se marca
            if ($(this.refs[this.props.id]).prop('checked') === false) {
                this.refs[this.props.id].click();
                console.log('[ComponentTaskItemsSection].[Item].[onSelectall]  -> Seleccionado ');
            }
        }.bind(this));

        $(ComponentTaskSelectorEvents).on('unselectall', function(e) {
            console.log('[ComponentTaskItemsSection].[Item].[onUnselectall]  - Pulsado botón de deseleccionar todo ¿Está activo?' + $(this.refs[this.props.id]).prop('checked'));
            // Si está marcado, se desmarca
            if ($(this.refs[this.props.id]).prop('checked') === true) {
                this.refs[this.props.id].click();
                console.log('[ComponentTaskItemsSection].[Item].[onUnselectall]  -> Deseleccionado ');
            }
        }.bind(this));
    },
    componentWillUnmount: function () {
        console.log("[ComponentTaskItemsSection].[Item].[componentWillUnmount] - Se quita la comunicación con los distintos objetos.");
        $(ComponentTaskSelectorEvents).off('selectall');
        $(ComponentTaskSelectorEvents).off('unselectall');
        $(ComponentTaskSelectorEvents).off('sendselects');
    },

    changeShow: function(){
        console.log('[ComponentTaskItemsSection].[Item].[changeShow] - Se ha hecho clik sobre un checkbox.');
        this.setState({
            showed: !this.state.showed //cambiamos el valor booleano
        });
        // para actualizar el state "mostrar" del item
        if (this.state.showed) {
            console.log('[ComponentTaskItemsSection].[Item].[changeShow] - Se lanza el evento de cambio del checkbox ' + this.props.id + ' a deseleccionado.');
            $(ComponentTaskSelectorEvents).trigger('unselect', this.props.id);
        } else {
            console.log('[ComponentTaskItemsSection].[Item].[changeShow] - Se lanza el evento de cambio del checkbox ' + this.props.id + ' a seleccionado.');
            $(ComponentTaskSelectorEvents).trigger('select', this.props.id);
        }
    },

    render: function(){
        console.log('[ComponentTaskItemsSection].[Item].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return (
                <li>
                    <input className="componente" id={this.props.id} ref={this.props.id} type="checkbox" onChange={this.changeShow} defaultChecked={this.state.showed} />
                    <span>{this.props.descripcion} - {this.props.numinforme}</span>
                    <a id={this.props.idhref} title="" className="btn btn-success validategroup273027252"
                       href="javascript:void(0)"
                       data-original-title="Validar agrupación"
                       data-toggle="tooltip"
                       data-input="GroupAutocomplete273027">
                       <i class="icon-thumbs-up">Preguntas</i>
                    </a>
                </li>
        )
    }
});


/////////////////////////////////////////////
/// Renderizado del contenedor principal
/////////////////////////////////////////////
ReactDOM.render(< ComponentTaskSelector />, document.getElementById('contenedor'));

///////////////////////
/// Función para filtrar
///////////////////////
function FiltradoJson(ids){    
    var arrayTasks = InfoCompPintar; //fichero JSON en /site/js/InfoComponentesPintar.json          
    //console.log("imprimir: "+arrayTasks);
    
    // array auxiliar para guardar el filtrado
    var arrayTasksFiltered = [];    

    for (var i = 0; i < arrayTasks.length; i++) {
        for (var j = 0; j < ids.length; j++) {
            if(arrayTasks[i].ComponentId == ids[j]) {                                        
                arrayTasksFiltered.push(arrayTasks[i]);
                break;
            }
        }
    }
    return arrayTasksFiltered;
}

/////////////////////////////
/// Filtrado por los Componentes seleccionados
/// Uso de Lazy.js para realizar estructuración del JSON y su posterior agrupación
////////////////////////////
function FilterLazy(arrayTasksFiltered){
    var components = [];
    Lazy(arrayTasksFiltered).uniq('ComponentId').each(function(x){CreateAndPushComponents(components,x)});
    components.map(
        function(component){
            //Creación de las agrupaciones de ensayo del componente
            Lazy(arrayTasksFiltered).filter(function(x){ return x.ComponentId === component.id}).uniq('GroupId').each(function(x){CreateAndPushGroups(component,x)});
            //Como antes hemos creado todas las agrupaciones de ensayos, ahora le establecemos los ensayos a las distintas agrupaciones.
            component.groups.map(
                function(group){
                    Lazy(arrayTasksFiltered).filter(function(x){ return x.ComponentId === component.id && x.GroupId == group.id}).uniq('TestId').each(function(x){CreateAndPushTests(group,x)});
                    group.tests.map(
                        function(test){
                            Lazy(arrayTasksFiltered).filter(function(x){ return x.ComponentId === component.id && x.GroupId == group.id && x.TestId == test.id}).each(function(x){CreateAndPushTask(test,x)});
                        }
                    )
                }
            )
        }   
    )   
    console.log("LAZY.JS ->"+components);
    return components
}

function CreateComponent(item){
    return {
        id: item.ComponentId,
        name: item.Component,
        reportNumber: (item.ReportNumber===undefined || item.ReportNumber===null)?'':item.ReportNumber,
        composition: (item.Composition===undefined || item.Composition===null)?'':item.Composition,
        groups: []};
}

function CreateGroup(item){
    return {
        id: item.GroupId,
        name: item.Group,
        standard: (item.Standard===undefined || item.Standard===null)?'':item.Standard,
        tests: []};
}

function CreateTest(item){
    return {
        id: item.TestId,
        name: item.Test,
        tasks: []};
}

function CreateTask(item){
    return {
        id: item.Id,
        name: item.Description,
        fieldid: item.FieldId,
        fieldType: item.FieldType,
        value: item.Value,
        options: (item.Options===undefined || item.Options===null)?'':item.Options,
        observationLanguageMain: (item.ObservationLanguage===undefined || item.ObservationLanguage===null)?'':item.ObservationLanguage,
        observationLanguageAlternative: (item.ObservationLanguageAlternative===undefined || item.ObservationLanguageAlternative===null)?'':item.ObservationLanguageAlternative,
        validationDocumentId: (item.ValidationDocumentId===undefined || item.ValidationDocumentId===null)?'':item.ValidationDocumentId,
        standard: (item.Standard===undefined || item.Standard===null)?'':item.Standard,
    };
}

function CreateAndPushComponents(components,item){
    components.push(CreateComponent(item));
}

function CreateAndPushGroups(component,item){

    component.groups.push(CreateGroup(item));
}

function CreateAndPushTests(group,item){

    group.tests.push(CreateTest(item));
}

function CreateAndPushTask(test,item){

    test.tasks.push(CreateTask(item));
}

//////////////////////////////////////////
/// Filtrar desde la Selección Agrupación
//////////////////////////////////////////
function filtrarPorAgrupacion(selectOption, dateBefore, dateAfter){
    // array auxiliar para guardar el filtrado
    var arrayFiltered = [];

    for (var i = 0; i < InfoComponentes.length; i++) {
        if(InfoComponentes[i].GroupId == selectOption) {
            arrayFiltered.push(InfoComponentes[i]);
        }
    }
    
    return arrayFiltered;
}