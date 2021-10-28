import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/services")
            .then(res => res.json())
            .then(data => setServices(data));
    },[])
    return (
      <Container fluid bg="primary" className="pt-3 py-5" style={{backgroundColor: 'black'}}>
        <Container>
            <h2 className="text-white mb-2">Our Services</h2>
            <div className="divider bg-info rounded mb-3 mx-auto"></div>
          <Row className="g-4 text-white">
            {services.map((service) => (
              <Col key={service.key}>
                <div className="d-flex justify-content-evenly">
                  <img height="40px" src={service.image} alt="" />
                  <div>
                    <p><b>{service.name}</b></p>
                    <small className="text-secondary">Morbi leo risus, porta ac</small>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    );
};

export default Services;