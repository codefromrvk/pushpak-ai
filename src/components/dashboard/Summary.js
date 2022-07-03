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
          <Row sm={2} xl={3} className="g-4 ">
            <Col>
              {" "}
              <Card bg={"info"} className="w-100 h-100">
                <Card.Body>
                  <Card.Subtitle className="py-2">New orders</Card.Subtitle>
                  <Card.Text className="fs-5 fw-bold">
                    {apiData.overview.new_orders[0].new_orders}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg={"info"}>
                <Card.Body>
                  <Card.Subtitle className="py-2">Average Sale</Card.Subtitle>
                  <Card.Text className="fs-5 fw-bold">
                    {Math.round(apiData.overview.average_sale[0].average_sale)}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card bg={"info"}>
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
                  <Truck color="#0dcaf0" size={20} className="mx-3" />
                  In delivery
                </div>
                <div>
                  <span>{apiData.summary[2].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  <BagCheck color="#0dcaf0" size={20} className="mx-3" />
                  Delivered
                </div>
                <div>
                  <span>{apiData.summary[1].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  <ArrowClockwise color="#0dcaf0" size={20} className="mx-3" />
                  Processing
                </div>
                <div>
                  <span>{apiData.summary[0].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  {/* img */}
                  <XSquare color="#0dcaf0" size={20} className="mx-3" />
                  Cancelled
                </div>
                <div>
                  <span>{apiData.summary[4].count}</span>
                </div>
              </ListGroup.Item>
              <ListGroup.Item className=" d-flex justify-content-between ">
                <div>
                  {/* img */}
                  <CashStack color="#0dcaf0" size={20} className="mx-3" />
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
