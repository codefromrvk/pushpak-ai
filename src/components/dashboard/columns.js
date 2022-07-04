export const COLUMNS = [
  {
    Header: "Date ",
    accessor: "date",
  },
  {
    Header: "Id",
    accessor: "id",
  },
  {
    Header: "Billing name",
    accessor: "billing_name",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Order status",
    accessor: "order_status",
    Cell: ({ row }) => {
      const data = row.original;
      console.log(data);
      return data.order_status === "delivered" ? (
        <div className="bg-success text-center rounded bg-opacity-25 text-success">
          Delivered
        </div>
      ) : data.order_status === "in delivery" ? (
        <div className="bg-primary text-center rounded bg-opacity-25 text-primary">
          In delivery
        </div>
      ) : data.order_status === "processing" ? (
        <div className="px-1 bg-warning text-center rounded bg-opacity-25 text-warning">
          Processing
        </div>
      ) : data.order_status === "cancelled" ? (
        <div className="bg-danger text-center rounded bg-opacity-25 text-danger">
          Cancelled
        </div>
      ) : data.order_status === "refund" ? (
        <div className="px-1 bg-secondary text-center rounded bg-opacity-25 text-secondary ">
          Refund
        </div>
      ) : null;
      // return data.order_status;
    },
  },
];
