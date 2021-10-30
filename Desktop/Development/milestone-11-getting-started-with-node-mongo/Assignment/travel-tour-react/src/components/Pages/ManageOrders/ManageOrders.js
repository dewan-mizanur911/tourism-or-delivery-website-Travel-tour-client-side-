import React, { useState, useEffect } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import './ManageOrders.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        fetch("https://infinite-stream-42915.herokuapp.com/addOffer")
          .then((res) => res.json())
          .then((data) => setOrders(data));
    }, []);

  const handleApprove = (id, info) => {
    const { _id, key, image, name, description, price, time, rating } = info;
    const update = {
        _id: _id,
        key: key,
        image: image,
        name: name,
        description: description,
        price: price,
        time: time,
        rating: rating,
          status: "approved"
}
    // const url = `https://infinite-stream-42915.herokuapp.com/addOffer/${id}`;
    const url = `http://localhost:5000/addOffer/${id}`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify(update)
    })
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
        fetch("https://infinite-stream-42915.herokuapp.com/addOffer")
          .then((res) => res.json())
          .then((data) => setOrders(data));
      }
    })
  }
  
  const del = <FontAwesomeIcon icon={faTrashAlt} />;
  
  const handleDelete = (id) => {
    const rest = orders.filter(order => order._id !== id);
    setOrders(rest);
  }

    return (
      <Container fluid className="bg-dark pb-5">
        <h2 className="text-white mb-2">All Orders</h2>
        <div className="divider bg-info rounded mb-3 mx-auto"></div>
        <Container className="bg-light rounded-2 p-3 mb-5">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Preserved Offer</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Approve</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>{order.info.name}</td>
                  <td>$ {order.info.price}</td>
                  <td>{order.info.status}</td>
                  <td>
                    {order.info.status === "approved" ? (
                      <Button
                        variant="primary"
                        onClick={() => handleApprove(order._id, order.info)}
                        disabled
                      >
                        Approve
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleApprove(order._id, order.info)}
                      >
                        Approve
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" onClick={()=> handleDelete(order._id)}>{del}</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <div className="divider bg-info rounded mx-auto"></div>
      </Container>
    );
};

export default ManageOrders;