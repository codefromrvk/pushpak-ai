import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { PulseLoader } from "react-spinners";

import axios from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

function restructure(obj) {
  let data = [];
  Object.keys(obj).forEach((ele) => {
    data.push({
      date: ele.slice(8, 10) + " " + ele.slice(0, 3),
      value: obj[ele],
    });
  });
  return data.reverse();
}

const Chart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    auth: { token },
  } = useAuth();

  // console.log(username, token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/analytics/last7Days", {
          headers: { authorization: token },
        });

        const data = restructure(response.data.data.last7Days);

        setChartData(data);

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    // setTimeout(fetchData, 2000);
    fetchData();
  }, [token]);

  return loading ? (
    <div
      className="d-flex align-items-center justify-content-center "
      style={{ height: "400px" }}
    >
      <PulseLoader />
    </div>
  ) : (
    <>
      <div className="my-4 ps-1">
        <span
          className="fs-5 fw-bold border-primary border-bottom border-3
        "
        >
          Revenue
        </span>
      </div>
      <ResponsiveContainer className="repsonsive-chart" height={260}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d6efd" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#0d6efd" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value"
            stroke="#0d6efd"
            fill="url(#color)"
            strokeWidth={2}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tickMargin={6}
            style={{
              fontWeight: "600",
              color: "black",
              fontSize: "0.8rem",
            }}
          />

          <YAxis
            datakey="value"
            axisLine={false}
            tickLine={false}
            tickCount={7}
            tickMargin={16}
            style={{
              fontWeight: "600",
              color: "black",
              fontSize: "0.8rem",
            }}
          />

          <Tooltip
            contentStyle={{ background: "cyan", fontWeight: "600" }}
            itemStyle={{ fontWeight: "600", color: "black" }}
          />
          <Legend />

          <CartesianGrid opacity={0.5} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
};

export default Chart;
3;
