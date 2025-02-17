import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskModel from "../interfaces/TaskModel";
import { useLocation } from "react-router-dom";
import User from "../interfaces/User";
import CreateTaskNew from "./CreateTaskNew";
import TaskItem from "./TaskItem";

const TaskListNew = () => {
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

  return (
    <div className="container mt-5">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task List</h2>
        <div>
          <strong>Logged in as:</strong> {user.username}
        </div>
      </div>

      <CreateTaskNew handleAddTask={handleRefreshTask}></CreateTaskNew>
      {/* Task List Area (Placeholder) */}
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
    </div>
  );
};

export default TaskListNew;
