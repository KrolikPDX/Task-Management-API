interface TaskProp {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

function TaskItem({ id, title, description, completed }: TaskProp) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <p>ID: {id}</p>
        <h5
          className={`mb-1 ${
            completed ? "text-decoration-line-through text-muted" : ""
          }`}
        >
          {title}
        </h5>
        {description && <p className="mb-1 text-secondary">{description}</p>}
      </div>
      <span
        className={`badge ${
          completed ? "bg-success" : "bg-warning"
        } text-white`}
      >
        {completed ? "Completed" : "Pending"}
      </span>
    </li>
  );
}

export default TaskItem;
