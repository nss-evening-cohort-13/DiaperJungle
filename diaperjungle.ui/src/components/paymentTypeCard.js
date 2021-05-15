import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';

export default function PyamentTypeCard({ payment, removePaymentType }) {
  return (
    <>
      <Col>
        <Card>
          <Card.Header><Button variant='danger' onClick={() => removePaymentType(payment.id)}>X</Button></Card.Header>
          <Card.Body>
            <Card.Title>{payment.pay_type}</Card.Title>
            <Card.Text>
              {payment.account_number}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
