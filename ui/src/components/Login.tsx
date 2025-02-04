import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import User from "../interfaces/User";

function LoginPage() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const userInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoginClick = async () => {
    //Send API call to see if user exists, if so set userID
    if (userInputRef.current?.value != "") {
      const url = `${apiUrl}/api/user/by-username?username=${
        userInputRef.current!.value
      }`;
      await fetch(url)
        .then((response) => {
          if (response.status === 200) {
            return response.json(); //User exists, parse JSON
          } else if (response.status === 404) {
            throw new Error("User not found"); //Trigger catch block for 404 to run handleAddingUser()
          } else {
            throw new Error(`HTTP error! Status: ${response.status}`); //Handle other errors
          }
        })
        .then((data: User) => {
          navigate("/tasks", { state: { user: data } }); //Navigate if user exists
        })
        .catch((error) => {
          if (error.message === "User not found") {
            handleAddingUser(); //Run function to add user if it doesn't exist
          }
        });
    }
  };

  const handleAddingUser = async () => {
    console.log("Handle adding user!");
    const url = `${apiUrl}/api/user`;
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userInputRef.current!.value,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); //User exists, parse JSON
        } else {
          throw new Error(`Couldnt create user! Status: ${response.status}`); //Handle other errors
        }
      })
      .then((data: User) => {
        navigate("/tasks", { state: { user: data } }); //Navigate if user exists
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-secondary">
      <div className="card shadow-lg p-4 rounded-4" style={{ width: "22rem" }}>
        <div className="card-body text-center">
          <h2 className="card-title fw-bold text-dark">Task List App</h2>
          <p className="text-muted">
            Enter your username to continue (case sensitive)
          </p>
          <input
            type="text"
            ref={userInputRef}
            className="form-control mb-3 p-3 rounded-3"
            placeholder="Username"
          />
          <button
            className="btn btn-primary w-100 py-2 rounded-3"
            onClick={handleLoginClick}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
