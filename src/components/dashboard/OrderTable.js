import { useId, useMemo, useState } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { COLUMNS } from "./columns.js";
import GlobalFilter from "./GlobalFilter.js";
import { Filter, PlusLg, Search, Bell } from "react-bootstrap-icons";

const OrderTable = ({ apiData }) => {
  const [filterOption, setFilterOption] = useState(false);
  const [search, setSearch] = useState(false);
  const id = useId();
  const columns = useMemo(() => COLUMNS, []);

  const dateformatter = (arr) => {
    arr.forEach((ele) => {
      let val = new Date(ele.date);

      ele.date = val.toString().slice(4, 15);
    });
    return arr;
  };
  const data = useMemo(() => dateformatter(apiData.data), [apiData.data]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );

  const { globalFilter } = state;

  const handleClick = () => {
    setFilterOption((prev) => !prev);
  };
  const handleSearch = () => {
    setSearch((prev) => !prev);
  };
  return (
    <>
      <div className="d-flex justify-content-end align-items-center">
        {search && (
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        )}

        <Search
          className="text-dark fs-5 mx-2 "
          onClick={handleSearch}
          style={{ cursor: "pointer" }}
        />
        <Bell className="text-dark fs-5" style={{ cursor: "pointer" }} />
      </div>
      <div className="w-100 ">
        <p className="fs-4 fw-bold pb-2 text-dark">Latest Orders</p>
      </div>
      {/* eslint-disable  */}
      <div
        className="bg-light text-dark rounded-pill d-flex align-items-center justify-content-between px-2 py-1 "
        style={{ cursor: "pointer" }}
        onClick={handleClick}
      >
        <Filter />
        {/* <button type="button" className="border-0 bg-transparent"> */}
        Filters
        {/* </button> */}
        <PlusLg />
      </div>
      {filterOption && (
        <div className="text-dark d-flex justify-content-center ">
          Filters section
        </div>
      )}
      {/* eslint-enable  */}
      <div className=" mt-3">
        <table className="text-dark  " {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="text-secondary"
                    key={id}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="font-responsive " {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className=" padding-cell"
                        key={id}
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "400px" }}
        >
          No records found
        </div>
      )}
    </>
  );
};

export default OrderTable;
