import { useId, useMemo } from "react";
import { useTable, useGlobalFilter, usePagination } from "react-table";
import { COLUMNS } from "./columns.js";
import GlobalFilter from "./GlobalFilter.js";

const OrderTable = ({ apiData }) => {
  console.log(apiData, "in table");
  console.log(COLUMNS, "in table");
  const id = useId();
  const columns = useMemo(() => COLUMNS, []);

  const dateformatter = (arr) => {
    arr.forEach((ele) => {
      let val = new Date(ele.date);
      console.log(val.toString());
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

  return (
    <>
      <div className="w-100 ">
        <p className="fs-4 fw-bold pb-2">Latest Orders</p>
      </div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <div className=" mt-3">
        <table className="table  " {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr key={id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className=" text-secondary"
                    key={id}
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="font-responsive bg-white" {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr key={id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        className="ps-2 py-2 "
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
