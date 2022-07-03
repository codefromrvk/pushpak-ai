import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className="mt-3">
      Search:
      <input
        className="ms-1 ps-2 rounded-pill"
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalFilter;
