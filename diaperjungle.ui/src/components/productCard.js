import React from 'react';
import {
  Card, Button, CardTitle, CardText, Row, Col
} from 'reactstrap';

const ProductCard = ({ allProducts }) => (
    <Row>
      <Col sm="6">
        <Card body>
          <CardTitle tag="h5">{allProducts.title}</CardTitle>
          <CardText>{allProducts.description}</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
    </Row>
);

export default ProductCard;
