// import { useEffect } from "react";
// import axios from "../../api/axios";
// import { useAuth } from "../../hooks/useAuth";
import Chart from "./Chart";
import OrderList from "./OrderList";
import Summary from "./Summary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Stack } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col className=" padding-large " xl={6} sm={12}>
          <Stack classname="d-flex  align-items-center justify-content-center">
            <Summary />
            <Chart />
          </Stack>
        </Col>
        <Col
          className="py-2 text-white"
          style={{ backgroundColor: "#e9e9e9" }}
          xl={6}
          sm={12}
        >
          <OrderList />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
