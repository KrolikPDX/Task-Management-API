import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TaskListNew = () => {
  // Simulated logged-in user
  const user = { name: "John Doe" };
  const [showModal, setShowModal] = useState(false);
  const [task, setTask] = useState({ title: "", description: "" });
  const [error, setError] = useState("");

  const handleCreateTask = () => {
    console.log("Create Task button clicked");
    setShowModal(true);
    setError("");
  };

  const handleSaveTask = () => {
    if (!task.title.trim() || !task.description.trim()) {
      setError("Both title and description are required.");
      return;
    }
    console.log("Task Saved:", task);
    setShowModal(false);
  };

  return (
    <div className="container mt-5">
      {/* Darkened Background when Modal is Open */}
      {showModal && <div className="modal-backdrop show"></div>}

      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Task List</h2>
        <div>
          <strong>Logged in as:</strong> {user.name}
        </div>
      </div>

      {/* Create Task Button */}
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleCreateTask}>
          Create Task
        </button>
      </div>

      {/* Task List Area (Placeholder) */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Your Tasks</h5>
          <p className="text-muted">No tasks available.</p>
        </div>
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
                  type="text"
                  className="form-control mb-2"
                  placeholder="Task Title"
                  value={task.title}
                  onChange={(e) => setTask({ ...task, title: e.target.value })}
                />
                <textarea
                  className="form-control"
                  placeholder="Task Description"
                  value={task.description}
                  onChange={(e) =>
                    setTask({ ...task, description: e.target.value })
                  }
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
    </div>
  );
};

export default TaskListNew;
