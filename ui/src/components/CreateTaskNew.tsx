import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import User from "../interfaces/User";

interface CreateTaskProps {
  handleAddTask: () => void;
}

function CreateTaskNew({ handleAddTask }: CreateTaskProps) {
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const user: User = useLocation().state?.user;
  const inputTitleRef = useRef<HTMLInputElement | null>(null);
  const inputDescriptionRef = useRef<HTMLInputElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleCreateTaskClick = () => {
    setShowModal(true);
    setError("");
  };

  const handleSaveTask = async () => {
    const title = inputTitleRef.current!.value.trim();
    const description = inputDescriptionRef.current!.value.trim();
    if (title == "" || description == "") {
      setError("Both title and description are required.");
      return;
    } else {
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
        setShowModal(false);
        handleAddTask();
      });
    }
  };

  return (
    <>
      {/* Darkened Background when Modal is Open */}
      {showModal && <div className="modal-backdrop show"></div>}
      {/* Create Task Button */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleCreateTaskClick}>
          Create Task
        </button>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Task</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <input
                  className="form-control"
                  ref={inputTitleRef}
                  type="text"
                  placeholder="Enter Title"
                />
                <input
                  className="form-control mt-3"
                  ref={inputDescriptionRef}
                  type="text"
                  placeholder="Enter Description"
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSaveTask}>
                  Save Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CreateTaskNew;
