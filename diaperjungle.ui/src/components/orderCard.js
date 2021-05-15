import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, CardText, CardBody,
  CardTitle,
} from 'reactstrap';

export default function OrderCard({ order }) {
  return (
    <div>
    <Card className='m-2'>
      <CardBody>
        <CardTitle tag="h5">Order # {order.id}</CardTitle>
        <CardText>Payment Type: {order.pay_type}</CardText>
        <CardText>Customer Name: {order.first_name} {order.last_name}</CardText>
        <CardText>Total_Cost: ${order.total_cost}</CardText>
        <Link className="btn btn-primary" to={`/order-details/${order.id}`}>View Order Details</Link>{' '}
      </CardBody>
    </Card>
  </div>
  );
}
