import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

import { useEffect, useState } from "react"

/*const initialTodos = [
  {id: 1, text:"Aprender React.js"},
  {id: 2, text:"Aprender JS"},
  {id: 3, text:"Aprender Vue.js"},
  {id: 4, text:"Aprender Angular"},
]*/

const initialTodos = JSON.parse(localStorage.getItem('todos')) || 
[ {id: 1, text:"Aprender React.js"},
{id: 2, text:"Aprender JS"},
{id: 3, text:"Aprender Vue.js"},
{id: 4, text:"Aprender Angular"}]

const App = () => {

  const [todos,setTodos] = useState(initialTodos)

  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos)) 
  },[todos])

  const handleDragEnd = result => {
    //console.log(result)
    if (!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const copyArray = [...todos] // copia los todos en una variable para preservarlos
        
    const [reorderedItem] = copyArray.splice(startIndex,1) // coge el primer elemento
    // [reorderedItem] va entre corchetes para obtener el objeto (destructuring) 
    // ya que copyArray es un array y solo necesitamos el objeto
    //console.log(reorderedItem)

    // la funcion splice muta el array (lo modifica), como el caso de la variable copyArray
    // a diferencia del map que SI devuelve otro array 
    //console.log(copyArray)

    copyArray.splice(endIndex, 0, reorderedItem)

    setTodos(copyArray)

  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}> {/* envuelve seccion para hacerla drag and drop */}
    <h1>Todo app</h1>
    <Droppable droppableId='todos'> 
    {/* indica area donde se van a arrastar y soltar elementos 
    Permite acceder a los estados del Droppable y la capturamos en el callBack
    con el nombre droppableProvider*/}
    {
      (droppableProvider) => (  /*informacion de estado de la biblioteca */ 
        <ul ref={droppableProvider.innerRef} {...droppableProvider.droppableProps}>  
        {
        /* a través del callBack capturamos la informacion de estado de biblioteca drag and drop 
        y para relacionar la referencia de la biblioteca usamos el hook UseRef de React
        que permite acceder al element HTML del elemento de la lista 
        en resumen, el droppable puede acceder a la lista ul para identificar que ese elemento HTML será drag and drop*/
        }
            {
              todos.map((todo,index) => (
                <Draggable index={index} key={todo.id} draggableId={`${todo.id}`}>  
                { /* draggableId requiere valor string, como id es entero se realiza la conversion
                /* con el template string e interpolación, ahora el id se vuelve string
                /* elemento que tendrá la habilidad de drag and drop */}
                {/* la propiedad key debe estar en el elemento principal, NO en el elemento anidado */}
                  {
                    (draggableProvider) => (
                      <li ref={draggableProvider.innerRef}
                      {...draggableProvider.dragHandleProps}
                      {...draggableProvider.draggableProps}
                      >{todo.text}
                      </li>
                    )
                  }
                </Draggable>
              ))
            }
            {droppableProvider.placeholder}
        </ul>
      )
    }
    
    </Droppable>
    </DragDropContext>
    
  )
}

export default App