import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

interface TaskProp {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function TaskList() {
  const [tasks, setTasks] = useState<TaskProp[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("http://localhost:3000/api/task");
      if (!response.ok) throw new Error("Fail TEST");

      const data: TaskProp[] = await response.json();
      setTasks(data);
      console.log(data);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Task List</h2>
        {tasks.length === 0 ? (
          <p className="text-center text-muted">No tasks available.</p>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <TaskItem key={task.id} {...task} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TaskList;
