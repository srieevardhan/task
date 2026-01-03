import { useEffect, useState } from "react";
import api from "../services/api";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({
    todo: 0,
    inProgress: 0,
    completed: 0,
  });

  useEffect(() => {
    api.get("/tasks/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  const data = {
    labels: ["Todo", "In Progress", "Completed"],
    datasets: [
      {
        data: [stats.todo, stats.inProgress, stats.completed],
        backgroundColor: ["#facc15", "#38bdf8", "#4ade80"],
      },
    ],
  };

  return (
    <div className="page">
  <div className="card">
    <h2>Dashboard</h2>
    <Pie data={data} />
    <p style={{ textAlign: "center" }}>
      <Link to="/tasks">Back to Tasks</Link>
    </p>
  </div>
</div>

  );
}
