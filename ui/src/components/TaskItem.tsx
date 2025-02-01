import { useEffect, useState } from "react";
import TaskModel from "../interfaces/TaskModel";

function TaskItem({
  id,
  title,
  description,
  completed,
  onCheckboxChange,
}: TaskModel) {
  const [isChecked, setIsChecked] = useState<boolean>(completed);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle local checkbox state
    onCheckboxChange(id, !isChecked); // Notify parent of the new state
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <p>ID: {id}</p>
        <h5
          className={`mb-1 ${
            isChecked ? "text-decoration-line-through text-muted" : ""
          }`}
        >
          {title}
        </h5>
        {description && <p className="mb-1 text-secondary">{description}</p>}
      </div>
      <div>
        <input
          className="form-check-input mx-3"
          type="checkbox"
          checked={isChecked}
          value=""
          id={"checkbox-" + id}
          onChange={() => handleCheckboxChange()}
        />
        <label className="form-check-label" htmlFor={"checkbox-" + id}>
          Completed
        </label>
      </div>
    </li>
  );
}

export default TaskItem;
