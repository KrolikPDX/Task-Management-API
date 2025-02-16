import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import TaskList from "./components/TaskList";
import TaskListNew from "./components/TaskListNew";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/tasks" element={<TaskListNew />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
