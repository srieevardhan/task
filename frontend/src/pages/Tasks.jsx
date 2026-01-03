import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../services/api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
  dispatch(logout());
  navigate("/");
};

  // Fetch tasks
  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.error("Error loading tasks", err);
    }
  };

  // Add task
  const addTask = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Task title required");
      return;
    }

    try {
      await api.post("/tasks", {
        title,
        status: "Todo",
      });
      setTitle("");
      loadTasks(); // refresh list
    } catch (err) {
      console.error("Error adding task", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      loadTasks();
    } catch (err) {
      console.error("Error deleting task", err);
    }
  };


  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="page">
  <div className="card">

    <h2>My Tasks</h2>

    <form onSubmit={addTask}>
      <input
        placeholder="New task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button>Add</button>
    </form>

    {tasks.map((task) => (
      <div key={task.id} className="task-item">
        <span>{task.title} ({task.status})</span>
        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          ❌
        </button>
      </div>
    ))}
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
  <Link to="/dashboard">📊 Dashboard</Link>
  <button className="logout" onClick={handleLogout}>Logout</button>
</div>
  </div>
</div>

  );
}
