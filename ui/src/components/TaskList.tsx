import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskModel from "../interfaces/TaskModel";
import CreateTask from "./CreateTask";
import { useLocation } from "react-router-dom";
import User from "../interfaces/User";

function TaskList() {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const location = useLocation();
  const user: User = location.state?.user;

  useEffect(() => {
    const fetchTasks = async () => {
      //Add into try catch statement incase of failure in future
      const response = await fetch(`${apiUrl}/api/user/${user.id}/tasks`);
      const data: TaskModel[] = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  //In the future move all API requests into child element, and callback handleAddTask to update parent
  //Refresh tasks by pulling again from server
  const handleRefreshTask = () => {
    const fetchTasks = async () => {
      //Add into try catch statement incase of failure in future
      const response = await fetch(`${apiUrl}/api/user/${user.id}/tasks`);
      const data: TaskModel[] = await response.json();
      setTasks(data);
    };

    fetchTasks();
  };

  //Handle completion checkbox value change, update task via API automatically
  const handleTaskCompletionChange = async (
    taskId: number,
    completed: boolean
  ) => {
    //Send API to update completion change for task
    await fetch(apiUrl + `/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
    //const data = await response.json();
  };

  const handleTitleSave = async (taskId: number, newTitle: string) => {
    await fetch(apiUrl + `/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
  };

  const handleDescriptionSave = async (
    taskId: number,
    newDescription: string
  ) => {
    await fetch(apiUrl + `/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ description: newDescription }),
    });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, description: newDescription } : task
      )
    );
  };

  const handleDeleteClick = async (taskId: number) => {
    await fetch(apiUrl + `/api/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTasks((prevItems) => prevItems.filter((item) => item.id !== taskId));
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
                onCheckboxChange={handleTaskCompletionChange}
                onTitleSave={handleTitleSave}
                onDescriptionSave={handleDescriptionSave}
                onDeleteClick={handleDeleteClick}
              />
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default TaskList;
