import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import User from "../interfaces/User";

interface CreateTaskProps {
  handleAddTask: () => void;
}

function CreateTask({ handleAddTask }: CreateTaskProps) {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const user: User = useLocation().state?.user;
  const [creatingTask, setCreatingTask] = useState<boolean>(false);
  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  const inputDescriptionRef = useRef<HTMLInputElement | null>(null);

  const handleSaveTask = async () => {
    if (
      inputTitleRef.current?.value != "" &&
      inputDescriptionRef.current?.value != ""
    ) {
      await fetch(apiUrl + "/api/task/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          title: inputTitleRef.current!.value,
          description: inputDescriptionRef.current!.value,
        }),
      }).then(() => {
        setCreatingTask(false);
        handleAddTask();
      });
    }
  };

  return (
    <>
      {creatingTask && (
        <div>
          <div className="row py-1">
            <div className="col-4 offset-8">
              <input
                className="form-control"
                ref={inputTitleRef}
                type="text"
                placeholder="Enter Title"
              />
            </div>
          </div>
          <div className="row py-1">
            <div className="col-4 offset-8">
              <input
                className="form-control"
                ref={inputDescriptionRef}
                type="text"
                placeholder="Enter Description"
              />
            </div>
          </div>
        </div>
      )}
      <button
        className="btn btn-primary float-end"
        onClick={creatingTask ? handleSaveTask : () => setCreatingTask(true)}
      >
        {creatingTask ? "Save" : "Create Task"}
      </button>
    </>
  );
}

export default CreateTask;
