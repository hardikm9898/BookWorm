import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export default function AddBook() {
const [title,setTitle]=useState('')
const [price,setPrice]=useState('')
const [description,setDescription]=useState('')
const [imageUrl,setImageUrl]=useState('')
  const [Add, setAdd] = useState(false);

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    const data={title,price,description,imageUrl}
    try {
      await axios.post(`http://localhost:3001/user/book`, data, {
        headers: {
          Authorization: `Bearer ${cookies.get('TOKEN')}`,
        },
      });
      alert('Book Created');
      window.location.href = '/admin';
      setAdd(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Please try again and make sure fill all fields.');
    }
  };

  const token = cookies.get('TOKEN');

  


  return (
    <>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        style={{
          width: '500px',
          margin: 'auto',
          paddingTop: '120px',
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Book Title"
          />
        </Form.Group>
        <Form.Group controlId="formBasicprice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />
        </Form.Group>
        <Form.Group controlId="formBasicImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image URL"
          />
        </Form.Group>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          CREATE
        </Button>
        <a href="/admin">
          <Button variant="primary">BACK</Button>
        </a>
        {Add ? (
          <p className="text-success"> Book is Added successfully</p>
        ) : (
          <p className="text-danger">Book not Added</p>
        )}
      </Form>
    </>
  );
}
