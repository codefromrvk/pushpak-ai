import React from "react";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <div className=" text-dark">
      Search:
      <input
        className="ms-1 ps-2 rounded-pill "
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default GlobalFilter;
