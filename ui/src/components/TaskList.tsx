import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskModel from "../interfaces/TaskModel";

function TaskList() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      //Add into try catch statement incase of failure in future
      const response = await fetch("http://localhost:3000/api/task");

      const data: TaskModel[] = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  const handleLogTasks = () => {
    console.log("Logging all task values:");
    tasks.forEach((task) => {
      console.log(
        `Task ID: ${task.id}, Title: ${task.title}, Completed: ${task.completed}`
      );
    });
  };

  //Handle changes from child component (TaskItem)
  const handleTaskCompletionChange = (taskId: number, completed: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      )
    );
  };

  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Task List</h2>
        {tasks.length === 0 ? (
          <p className="text-center text-muted">No tasks available.</p>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                {...task}
                onCheckboxChange={handleTaskCompletionChange}
              />
            ))}
          </ul>
        )}
      </div>
      <button
        className="btn btn-primary float-end m-3"
        onClick={handleLogTasks}
      >
        Save
      </button>
    </>
  );
}

export default TaskList;
