import React from 'react';
import ReactDOM from 'react-dom';

// ficheros JSON que importamos
// para ahorrar líneas de código
import InfoComponentes from './InfoComponentes.json';
import InfoCompPintar from './InfoComponentesPintar.json';

let ComponentTaskSelectorEvents = {}; //objeto para guardar los event listener del componente padre


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
        }
    },

    componentDidMount: function(){
        console.log("[ComponentTaskSelector].[componentDidMount] (solo se ejecuta la primera vez que se monta) Ya tenemos montado el objeto y dibujado en el DOM real, por lo que se pueden definir los eventos.")

        // carga de datos JSON
        this.setState({           
            data: InfoComponentes
        })

        /////////////
        // Eventos
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
            
            // Realiza la llamada al servidor
            // Resultado de la llamada al servidor
            var arrayTasks = FiltradoJson(ids);

            //llamamos a la función para que dibuje 
            // en caso de que se seleccione algun item
            if(arrayTasks.length > 0){
                PintarSeleccionados(arrayTasks);
            }

            //this.state({selectedItems : selectItems});
            console.log("nº items añadidos que se enviarán " + this.state.selectedItems.length);
            
        }.bind(this));
    },

    componentWillUnmount: function () {
        console.log("[ComponentTaskSelector].[componentWillUnmount] Se quita la comunicación con los distintos objetos.");
        $(ComponentTaskSelectorEvents).off('select'); //desmontar los listeners
        $(ComponentTaskSelectorEvents).off('unselect'); // desmontar los listeners
        $(ComponentTaskSelectorEvents).off('sendselect'); 
    },

    render(){
        console.log("[ComponentTaskSelector].[render] Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
        return (
            <div>
                <div>
                    <ComponetTaskDataSelector /><ComponentTaskSelectorButton />
                </div>
                <ComponentTaskButtonSection key="ctbs" />
                <i>La consulta ha devuelto los siguientes registros: {this.state.data.length}</i>                                       
                <ComponentTaskItemsSection key="cits" items={this.state.data} />    
               
            </div>
        )
     }
});

////pintar el resultado de la llamada
//// detallamos el contenedor padre y dentro sus componentes
function PintarSeleccionados(components){                                

    let CallTaskSelector = React.createClass ({ 
        getInitialState: function(){         
            console.log('[CallTaskSelector].[getInitialState]- Establecemos es estado inicial - Comienza con CallTaskSelector');
            return{
                components:[] //declaramos array vacío, todos los datos de cada Componente seleccionado
            }
        },
        componentWillMount: function(){
            console.log('[CallTaskSelector].[componentWillMount] - Propiedad components.length '+ this.state.components.length);
            console.log('[CallTaskSelector].[componentWillMount] - components.length '+ components.length);
            this.setState({
                components: components
            })                        
        },
        render(){
            console.log('[CallTaskSelector].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
            console.log('[CallTaskSelector].[render]   -> Estado components.length '+ this.state.components.length);
            //TODO: hacer un foreach por cada uno de las agrupaciones de los componentes.
            return (
                <div className='level1'>                    
                    <h2>Resultado de la llamada</h2>
                    <CallTaskItemList groups={this.state.components}>   
                    </CallTaskItemList>                                                                        
                </div>
            )
        }
    });         
///
    let CallTaskItemList = React.createClass({
        getInitialState: function(){     
            console.log('[CallTaskItemList].[getInitialState] - Establecemos el estado inicial');
            return{ groups:[] }
        },
        componentWillMount: function() {
            console.log('[CallTaskItemList].[componentWillMount] - Cambiamos el valor del estado');
            console.log('[CallTaskItemList].[componentWillMount] - Propiedad groups.length '+ this.props.groups.length);
            this.setState({
                groups: this.props.groups
            });
        },
        render(){
            console.log('[CallTaskItemList].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
            console.log('[CallTaskItemList].[render]   -> Estado groups.length '+ this.state.groups.length)
            let myStyle = {listStyle:'none'};
            var thisGroup = this.state.groups
            return(
                <div className='level2'>
                    <h3>Listado de "resultados"</h3>
                    <ul style={myStyle}>                   
                        {thisGroup.map(function(group){
                            return(
                                    <CallTaskItem key={group.Id} tests={[group]} >
                                    </CallTaskItem >
                                ) 
                            })
                        }
                    </ul>
                </div>
            )
        }
    });
///                
    let CallTaskItem = React.createClass({
        getInitialState: function(){     
            console.log("[CallTaskItem].[getInitialState] Establecemos las estados iniciales. Comienza con CallTaskItem");                        
            return{ tests:[] }
        },
        componentWillMount: function() {    
            console.log('[CallTaskItem].[componentWillMount] - Propiedad props tests.length '+ this.props.tests.length);        
            this.setState({            
                tests: this.props.tests
            })
      
        },
        render(){                            
            console.log("[CallTaskItem].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
            console.log('[CallTaskItem].[render]   -> Estado tests.length '+ this.state.tests.length);
            console.log('[CallTaskItem].[render]   -> Estado tests '+ this.state.tests);
            console.log('[CallTaskItem].[render]   -> Props tests '+ this.props.tests);
        
            let myStyle = {listStyle:'none'};
            return(
                <li className='level3'>
                    <span className="componente">
                        Componente:
                    </span>
                    <ul style={myStyle}>
                    {this.props.tests.map(function(test,i){
                    return(
                        <FinalItem key={i}                                                             
                                idtask = {test.Id}
                                group = {test.Group}
                                description = {test.Description}
                                test = {test.test}
                                testid = {test.testid}
                                fieldid = {test.FieldId} 
                                fieldtype = {test.FieldType} 
                                value = {test.Value} 
                                options = {test.Options}
                                obslangmain = {test.ObservationLanguageMain} >                                                       
                                </FinalItem>
                        )
                    })
                    }
                    </ul>
                </li>
             )
        }
    });
///                
    let FinalItem = React.createClass({
        render(){
            console.log("[FinalItem].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
            return(
                <li className='level4'>
                    <p className="componente">                                        
                    IdTask:{this.props.idtask} 
                    - Grupo:{this.props.group} 
                    - Test:{this.props.test} 
                    - TestID:{this.props.testid}
                    - Descripcion:{this.props.description}
                    - FieldId:{this.props.fieldid} 
                    - FieldType:{this.props.fieldtype} 
                    - Value:{this.props.value}
                    - Options:{this.props.Options} 
                    - Obser.Language Main:{this.props.obslangmain}
                    </p>
                </li>
            )
        }
    });                
                
    ReactDOM.render(<CallTaskSelector />, document.getElementById('contenedor2'));
}
 

///////////////////////////////
// ComponentTaskSelectorButton
///////////////////////////////    
let ComponentTaskSelectorButton = React.createClass({
    cargaDatos(){
        console.log('[ComponentTaskSelectorButton].[cargaDatos] - Pulsado botón de carga de datos');
        //$(ComponentTaskSelectorEvents).trigger('loadData');
    },
    render(){
        console.log('[ComponentTaskSelectorButton].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
            <button onClick={this.cargaDatos}>CARGA DE DATOS!</button>
        )
    }  
})

///////////////////////////////////////////////
// ComponentTaskDataSelector - PARA LAS FECHAS
///////////////////////////////////////////////
let ComponetTaskDataSelector = React.createClass({
    render(){
        console.log('[ComponentTaskDataSelector].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <div>
                    <ComponentTaskDataSelectorItemA />
                    <ComponentTaskDataSelectorItemB />
                </div>
            )
    }
})

/////////////////////////////////////
// ComponentTaskDataSelectorItemA
/////////////////////////////////////
let ComponentTaskDataSelectorItemA = React.createClass({
    render(){
        console.log('[ComponentTaskDataSelectorItemA].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <label>Fecha Desde</label>
            )
    }

})

/////////////////////////////////////
// ComponentTaskDataSelectorItemB
/////////////////////////////////////
let ComponentTaskDataSelectorItemB = React.createClass({
    render(){
        console.log('[ComponentTaskDataSelectorItemB].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return(
                <label>Fecha Hasta</label>
            )
    }

})

/////////////////////////////////
// ComponentTaskButtonSection
///////////////////////////////// 
let ComponentTaskButtonSection = React.createClass ({
    render(){
        console.log('[ComponentTaskButtonSection].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.');
        return (<div>
               <ButtonSelect /><ButtonDeselect /><ButtonSend /><ButtonValidate /> 
            </div>)
    }
});

/////////////////////////////////////
// ButtonDeselect
/////////////////////////////////////
let ButtonDeselect = React.createClass({
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
let ButtonSelect = React.createClass({
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
let ButtonSend = React.createClass({
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
let ButtonValidate = React.createClass({
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

// uso de la ventana modal
// pero se utiliza la que disponen en COWLABS

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

    //componentDidMount: function(){        
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta) - Dibujamos el componente");
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta) - Antes de establecer el estado:");
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta)   - Tamaño propertiesParentms " + this.state.propertiesParent.length);
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta)   - Tamaño items " + this.props.items.length);
    //    this.setState({
    //        propertiesParent: this.props.items        
    //    })
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta) - Despues de establecer el estado:");
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta)   - Tamaño propertiesParentms " + this.state.propertiesParent.length);
    //    console.log("[ComponentTaskItemsSection].[componentDidMount] (solo se ejecuta la primera vez que se monta)   - Tamaño items " + this.props.items.length);

    //},

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
let ItemsList = React.createClass ({
    getInitialState: function(){     
        console.log("llega a ItemsList " + this.props.items.length);

        return{ items:[] }
    },
    componentDidMount: function() {            
        this.setState({
            items: this.state.items
        })
        console.log("llega a ItemsList state " + this.state.items.length);
    },
    render:function(){
        console.log("[ItemsList].[render] - Montamos el objeto en el DOM virtual. Al finalizar se refleja en el DOM real.");
        //let myStyle = {color:'red'};
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
    )}
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

// FIN COMPONENTTASKITEMSECTION
// ***********************************
export default ComponentTaskSelector;

// Renderizado del contenedor principal
ReactDOM.render(< ComponentTaskSelector />, document.getElementById('contenedor'));


///////////////////////
// Función para filtrar
///////////////////////
function FiltradoJson(ids){
    
    var arrayTasks = InfoCompPintar; //fichero JSON en /site/js/InfoComponentesPintar.json          
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
/////////////////////////