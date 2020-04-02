import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(task);
    setTask('');
    taskInput.current?.focus();
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  const toggleTask = (idx: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[idx].done = !newTasks[idx].done;
    setTasks(newTasks);
  };

  const deleteTask = (idx: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(idx, 1);
    setTasks(newTasks);
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Simple ToDo App</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  onChange={e => setTask(e.target.value)}
                  value={task}
                  className="form-control"
                  ref={taskInput}
                  autoFocus
                />
                <button className="btn btn-success btn-block mt-2">Guardar</button>
              </form>
            </div>
          </div>
          {tasks.map((task: ITask, idx: number) => (
            <div className="card card-body mt-2" key={idx}>
              <h2 style={{ textDecoration: task.done ? 'line-through' : '' }}>{task.name}</h2>
              <div>
                <button className="btn btn-primary mr-2" onClick={() => toggleTask(idx)}>
                  {task.done ? '✅' : '❌'}
                </button>
                <button className="btn btn-primary" onClick={() => deleteTask(idx)}>
                  🗑
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
