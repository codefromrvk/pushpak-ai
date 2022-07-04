import React, { useEffect, useState } from "react";
import { Stack, Button } from "react-bootstrap";
import axios from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import OrderTable from "./OrderTable";
import { PulseLoader } from "react-spinners";

const OrderList = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const {
    auth: { token },
  } = useAuth();

  useEffect(() => {
    fetchData(pageNum);
  }, [pageNum]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `/api/orders?page=${pageNum}&limit=10&order_status=`,
        {
          headers: { authorization: token },
        }
      );

      setApiData(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack className=" d-flex align-items-center justify-content-center mt-4">
      <div>
        {loading ? (
          // <Triangle ariaLabel="loading-indicator" color="grey" />
          <div
            className="d-flex align-items-center"
            style={{ height: "100vh" }}
          >
            <PulseLoader />
          </div>
        ) : apiData.message ? (
          <div
            className="d-flex align-items-center flex-column justify-content-center"
            style={{ height: "100vh" }}
          >
            <span className=" fs-3 text-dark"> No more records</span>

            <Button
              variant="primary"
              className="rounded-pill py-1 mt-2"
              onClick={() => {
                setLoading(true);
                setPageNum((prev) => prev - 1);
              }}
            >
              Got to Previous Page
            </Button>
          </div>
        ) : (
          <>
            <OrderTable apiData={apiData} />
            <div className="d-flex justify-content-end py-3">
              <Button
                className="rounded-pill"
                variant="primary"
                onClick={() => {
                  setLoading(true);
                  setPageNum(apiData.pagination.next.page);
                }}
              >
                {" "}
                More Orders
              </Button>
            </div>

            {/* <div className="d-flex justify-content-center my-3">
              {apiData?.pagination?.previous?.page && (
                <button
                  className="bg-transparent border-0 text-secondary"
                  onClick={() => {
                    setLoading(true);
                    setPageNum(apiData.pagination.previous.page);
                  }}
                  disable={!apiData?.pagination?.previous?.page + ""}
                >
                  {apiData?.pagination?.previous?.page}
                </button>
              )}
              <span className="fs-4 px-3">
                {apiData.pagination.currentPage}
              </span>

              <button
                className="bg-transparent border-0 text-secondary"
                onClick={() => {
                  setLoading(true);
                  setPageNum(apiData.pagination.next.page);
                }}
              >
                {apiData.pagination.next.page}
              </button>
            </div> */}
          </>
        )}
      </div>
    </Stack>
  );
};

export default OrderList;
