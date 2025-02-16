import { useRef, useState } from "react";
import TaskModel from "../interfaces/TaskModel";

function TaskItem({
  id,
  title,
  description,
  completed,
  handleRefreshTask,
}: TaskModel) {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const [isChecked, setIsChecked] = useState<boolean>(completed);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  const inputDescriptionRef = useRef<HTMLInputElement | null>(null);

  const handleClickTitle = () => {
    if (!isChecked) {
      setEditTitle(!editTitle); //Set editTitle toggle
      editDescription && setEditDescription(false);
    }
  };

  const handleDescriptionClick = () => {
    if (!isChecked) {
      setEditDescription(!editDescription); //Set editTitle toggle
      editTitle && setEditTitle(false); //Disable title edit if its enabled
    }
  };

  const handleCheckboxChange = async () => {
    await fetch(apiUrl + `/api/task/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: !isChecked }),
    }).then(() => {
      handleRefreshTask(); //Notify parent to refresh tasks
      setIsChecked(!isChecked); //Toggle local checkbox state
    });
  };

  const handleSaveTitle = async () => {
    if (inputTitleRef.current?.value != "") {
      await fetch(apiUrl + `/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: inputTitleRef.current!.value }),
      }).then(() => {
        handleRefreshTask(); //Notify parent to refresh tasks
        setEditTitle(false);
      });
    } else {
      inputTitleRef.current!.value = title;
    }
  };

  const handleSaveDescription = async () => {
    if (inputDescriptionRef.current?.value != "") {
      await fetch(apiUrl + `/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: inputDescriptionRef.current!.value,
        }),
      }).then(() => {
        handleRefreshTask(); //Notify parent to refresh tasks
        setEditDescription(false);
      });
    } else {
      inputDescriptionRef.current!.value = description;
    }
  };

  const handleDeleteClick = async () => {
    await fetch(apiUrl + `/api/task/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      handleRefreshTask(); //Notify parent to refresh tasks
    });
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <div className="row flex-grow-1">
        <p>ID: {id}</p>
        <div className="col-10">
          {editTitle ? (
            <input
              className="form-control"
              ref={inputTitleRef}
              type="text"
              placeholder={title}
            />
          ) : (
            <h5
              className={`mb-1 ${
                isChecked ? "text-decoration-line-through text-muted" : ""
              }`}
              onClick={handleClickTitle}
            >
              {title}
            </h5>
          )}

          {editDescription ? (
            <input
              className="form-control"
              ref={inputDescriptionRef}
              type="text"
              placeholder={description}
            />
          ) : (
            <p className="mb-1 text-secondary" onClick={handleDescriptionClick}>
              {description}
            </p>
          )}
        </div>
        <div className="col-2">
          {!isChecked && (editTitle || editDescription) && (
            <button
              className="btn btn-primary"
              onClick={editTitle ? handleSaveTitle : handleSaveDescription}
            >
              {editTitle ? "Save Title" : "Save Description"}
            </button>
          )}
        </div>
      </div>

      <div className="d-flex align-items-center">
        <input
          className="form-check-input mx-3"
          type="checkbox"
          id={"checkbox-" + id}
          checked={isChecked}
          disabled={editTitle || editDescription}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor={"checkbox-" + id}>
          Completed
        </label>
        <button className="btn btn-danger mx-3" onClick={handleDeleteClick}>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
