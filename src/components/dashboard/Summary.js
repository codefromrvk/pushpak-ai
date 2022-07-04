import React, { useEffect, useState } from "react";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";
import { PulseLoader } from "react-spinners";
import {
  Truck,
  BagCheck,
  ArrowClockwise,
  XSquare,
  CashStack,
} from "react-bootstrap-icons";

const Summary = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const {
    auth: { token, username },
  } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/analytics/summary", {
          headers: { authorization: token },
        });
        setApiData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);
  return (
    <Stack className="d-flex  justify-content-center mt-4">
      <div className="d-flex flex-column pb-2">
        <span
          className="fs-6 mb-0 text-secondary"
          style={{ fontWeight: "400" }}
        >
          Welcome @{username}
        </span>
        <span className="fs-4 fw-bold mb-0">Overview Shop</span>
      </div>

      {loading ? (
        <div
          className="d-flex align-items-center justify-content-center "
          style={{ height: "200px" }}
        >
          <PulseLoader />
        </div>
      ) : (
        <>
          {/* sm={2} md={3} */}
          <Row className="g-4 ">
            <Col xs={12} sm={6} md={4}>
              {" "}
              <Card bg={"warning"} className=" bg-opacity-25">
                <Card.Body>
                  <Card.Subtitle className="py-2">New orders</Card.Subtitle>
                  <Card.Text className="fs-5 fw-bold">
                    {apiData.overview.new_orders[0].new_orders}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card bg={"primary"} className=" bg-opacity-25">
                <Card.Body>
                  <Card.Subtitle className="py-2">Average Sale</Card.Subtitle>
                  <Card.Text className="fs-5 fw-bold">
                    Rs.{" "}
                    {Math.round(apiData.overview.average_sale[0].average_sale)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Card bg={"success"} className=" bg-opacity-25">
                <Card.Body>
                  <Card.Subtitle className="py-2">Total Earnings</Card.Subtitle>
                  <Card.Text className="fs-5 fw-bold">
                    Rs.{" "}
                    {Math.round(
                      apiData.overview.total_earnings[0].total_earnings
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="w-100 mt-3 d-flex flex-row  justify-content-between ">
            <ListGroup className="w-100">
              <ListGroup.Item className=" d-flex justify-content-between">
                <div>
                  <Truck
                    color="white"
                    size={25}
                    className=" mx-3 px-1 rounded bg-primary  "
                  />
                  In delivery
                </div>
                <div>
                  <span>{apiData.summary[2].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  <BagCheck
                    color="white"
                    size={25}
                    className="mx-3 px-1  rounded bg-success"
                  />
                  Delivered
                </div>
                <div>
                  <span>{apiData.summary[1].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  <ArrowClockwise
                    color="white"
                    size={25}
                    className="mx-3 px-1  rounded bg-warning"
                  />
                  Processing
                </div>
                <div>
                  <span>{apiData.summary[0].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  {/* img */}
                  <XSquare
                    color="white"
                    size={25}
                    className="mx-3 px-1  rounded bg-danger"
                  />
                  Cancelled
                </div>
                <div>
                  <span>{apiData.summary[4].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  {/* img */}
                  <CashStack
                    color="white"
                    size={25}
                    className="mx-3 px-1  rounded bg-secondary"
                  />
                  Refund
                </div>
                <div>
                  <span>{apiData.summary[3].count}</span>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </>
      )}
    </Stack>
  );
};

export default Summary;
