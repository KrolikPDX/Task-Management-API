import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskModel from "../interfaces/TaskModel";
import CreateTask from "./CreateTask";
import { useLocation } from "react-router-dom";
import User from "../interfaces/User";

function TaskList() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const user: User = useLocation().state?.user;

  //Initial refresh tasks upon load
  useEffect(() => {
    handleRefreshTask();
  }, []);

  //Gets list of all tasks for user
  const handleRefreshTask = () => {
    try {
      const fetchTasks = async () => {
        const response = await fetch(`${apiUrl}/api/user/${user.id}/tasks`);
        const tasks: TaskModel[] = await response.json();
        tasks.sort((a, b) => Number(a.completed) - Number(b.completed)); //Sort tasks by completed status (false = top)
        setTasks(tasks);
      };
      fetchTasks();
    } catch (error) {
      console.log("Error fetching tasks: " + error);
    }
  };

  //prevTask.filter(item => item.id !== taskId);
  return (
    <>
      <h2 className="text-center my-4">Task List for {user.username}:</h2>
      <div className="row my-4">
        <div className="col">
          <CreateTask handleAddTask={handleRefreshTask} />
        </div>
      </div>
      <div className="row">
        {tasks.length === 0 ? (
          <p className="text-center text-muted">No tasks available.</p>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                {...task}
                handleRefreshTask={handleRefreshTask}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TaskList;
