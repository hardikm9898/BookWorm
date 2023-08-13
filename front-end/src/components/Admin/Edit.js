import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function Edit() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  const [update, setUpdate] = useState(false);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/user/book/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${cookies.get('TOKEN')}`,
        },
      });
      alert('Data Updated');
      window.location.href = '/admin';
      setUpdate(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again and fill all fields.');
    }
  };

  const token = cookies.get('TOKEN');

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/book/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = response;
      setFormData(data.results.book);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  useEffect(() => {
    const id = window.location.href.split('/');
    fetchProduct(id[4]);
  }, []);

  return (
    <>
      <Form
        onSubmit={(e) => {
          const url = window.location.href.split('/');
          const id = url[4];
          handleSubmit(e, id);
        }}
        style={{
            width:"500px",
          margin: 'auto',
        paddingTop:"120px"
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Book Title"
          />
        </Form.Group>
        <Form.Group controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="Image URL"
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          UPDATED
        </Button>
        <a href="/admin">
          <Button variant="primary">BACK</Button>
        </a>
        {update ? (
          <p className="text-success">Your data was updated successfully</p>
        ) : (
          <p className="text-danger">Data not updated</p>
        )}
      </Form>
    </>
  );
}
