import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "../chartSetup"; // 👈 important

export default function Dashboard() {
  const [stats, setStats] = useState({
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = res.data;

        const counts = { todo: 0, inProgress: 0, completed: 0 };

        data.forEach((task) => {
          if (task.status === "Todo") counts.todo++;
          if (task.status === "In Progress") counts.inProgress++;
          if (task.status === "Completed") counts.completed++;
        });

        setStats(counts);
      } catch (err) {
        navigate("/");
      }
    };

    loadStats();
  }, [navigate]);

  const chartData = {
    labels: ["Todo", "In Progress", "Completed"],
    datasets: [
      {
        label: "Tasks",
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: ["#facc15", "#38bdf8", "#22c55e"],
      },
    ],
  };

  return (
    <div className="page">
      <div className="card">
        <h2>Task Dashboard</h2>

        <Bar data={chartData} />

        <button style={{ marginTop: "20px" }} onClick={() => navigate("/tasks")}>
          Back to Tasks
        </button>
      </div>
    </div>
  );
}
