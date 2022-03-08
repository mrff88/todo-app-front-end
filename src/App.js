import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTaskAsync,
  getAllTaskAsync,
  selectCreatedTask,
  selectEditedTask,
  selectTasks,
  taskActions,
  updateTaskAsync,
} from './redux/taskSlice';
import { msgActions } from './redux/messageSlice';

import Formulario from './formulario';
import ListaTareas from './listaTareas';
import Alert from './alert';

function App() {
  const [editable, setEditable] = useState(null);

  const tasks = useSelector(selectTasks);
  const newTask = useSelector(selectCreatedTask);
  const editedTask = useSelector(selectEditedTask);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    (Object.keys(newTask).length !== 0 ||
      Object.keys(editedTask).length !== 0) &&
      dispatch(getAllTaskAsync());
  }, [dispatch, editedTask, newTask]);

  // función para agregar una nueva tarea
  const handleRegistrar = (tarea) => {
    // dispatch(taskActions.createTodo(tarea));
    dispatch(createTaskAsync(tarea));
    dispatch(msgActions.createTaskMessage());
  };

  // función para cambiar el estado de una tarea
  const handleToggle = (id) => {
    dispatch(taskActions.toggleTodo(id));
    dispatch(msgActions.editTaskMessage());
  };

  // funcion para recibir una tarea que se va a editar
  const recibirEditable = (tarea) => {
    setEditable(tarea);
  };

  // funcion para editar una tarea
  const handleEditar = (nuevaTarea) => {
    // dispatch(taskActions.editTodo(nuevaTarea));
    dispatch(updateTaskAsync(nuevaTarea));
    dispatch(msgActions.editTaskMessage());
    setEditable(null);
  };

  // Eliminar una tarea
  const handleEliminar = (id) => {
    dispatch(taskActions.deleteTodo(id));
    dispatch(msgActions.deleteTaskMessage());
  };

  // Renderizar el componente
  return (
    <>
      {message && message.showMessage && (
        <Alert state={message.status} message={message.message} />
      )}
      <div className="container">
        <h1 className="text-center mt-5 mb-5">Todo list</h1>
        <Formulario
          handleRegistrar={handleRegistrar}
          handleEditar={handleEditar}
          editable={editable}
        />
        <ListaTareas
          listaTareas={tasks}
          handleToggle={handleToggle}
          handleEliminar={handleEliminar}
          recibirEditable={recibirEditable}
        />
      </div>
    </>
  );
}

export default App;
