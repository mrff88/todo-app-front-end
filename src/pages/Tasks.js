import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createTaskAsync,
  deleteTaskAsync,
  getAllTaskAsync,
  selectCreatedTask,
  selectDeletedTask,
  selectEditedTask,
  selectTasks,
  updateTaskAsync,
} from '../redux/slices/taskSlice';
import { msgActions } from '../redux/slices/messageSlice';

import Formulario from '../components/formulario';
import ListaTareas from '../components/listaTareas';
import Alert from '../components/alert';

function Tasks() {
  const [editable, setEditable] = useState(null);

  const tasks = useSelector(selectTasks);
  const newTask = useSelector(selectCreatedTask);
  const editedTask = useSelector(selectEditedTask);
  const deletedTask = useSelector(selectDeletedTask);
  const message = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    (Object.keys(newTask).length !== 0 ||
      Object.keys(editedTask).length !== 0 ||
      Object.keys(deletedTask).length !== 0) &&
      dispatch(getAllTaskAsync());
  }, [dispatch, deletedTask, editedTask, newTask]);

  // función para agregar una nueva tarea
  const handleRegistrar = (tarea) => {
    dispatch(createTaskAsync(tarea));
    dispatch(msgActions.createTaskMessage());
  };

  // función para cambiar el estado de una tarea
  const handleToggle = (id) => {
    const toggledTask = { ...tasks.find((tarea) => tarea._id === id) };
    dispatch(updateTaskAsync({ id, isComplete: !toggledTask.isComplete }));
    dispatch(msgActions.editTaskMessage());
  };

  // funcion para recibir una tarea que se va a editar
  const recibirEditable = (tarea) => {
    setEditable(tarea);
  };

  // funcion para editar una tarea
  const handleEditar = (nuevaTarea) => {
    dispatch(updateTaskAsync(nuevaTarea));
    dispatch(msgActions.editTaskMessage());
    setEditable(null);
  };

  // Eliminar una tarea
  const handleEliminar = (id) => {
    dispatch(deleteTaskAsync(id));
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

export default Tasks;
