import { useRef, useState } from "react";
import TaskModel from "../interfaces/TaskModel";

function TaskItem({
  id,
  title,
  description,
  completed,
  onCheckboxChange,
  onTitleSave,
  onDescriptionSave,
  onDeleteClick,
}: TaskModel) {
  const [isChecked, setIsChecked] = useState<boolean>(completed);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  const inputDescriptionRef = useRef<HTMLInputElement | null>(null);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle local checkbox state
    onCheckboxChange(id, !isChecked); // Notify parent of the new state
  };

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

  const handleSaveTitle = () => {
    if (inputTitleRef.current?.value != "") {
      onTitleSave(id, inputTitleRef.current!.value);
    } else {
      inputTitleRef.current!.value = title;
    }
    setEditTitle(false);
  };

  const handleSaveDescription = () => {
    if (inputDescriptionRef.current?.value != "") {
      onDescriptionSave(id, inputDescriptionRef.current!.value);
    } else {
      inputDescriptionRef.current!.value = description;
    }
    setEditDescription(false);
  };

  const handleDeleteClick = () => {
    onDeleteClick(id);
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
