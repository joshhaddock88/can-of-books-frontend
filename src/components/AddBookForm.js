import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class AddBookForm extends React.Component {

  createBook = async (e) => {
    e.preventDefault();
    let data = {
      name: e.target.name.value,
      description: e.target.description.value,
      status: e.target.status.value
    };

    let config = await this.props.getConfig();
    const responseData = await axios.post('http://localhost:3001/books', data, config);
    console.log(responseData);
    this.props.toggle();
  };

  render() {
    return (
      <Modal
        show={this.props.showModal}
        onHide={this.props.toggle}>
        <Form onSubmit={this.createBook}>
          <Form.Group controlId='name'>
            <Form.Label>Book Name</Form.Label>
            <Form.Control type='text'/>
          </Form.Group>
          <Form.Group controlId='description'>
            <Form.Label>Summary</Form.Label>
            <Form.Control as='textarea' rows={3}/>
          </Form.Group>
          <Form.Group controlId='status'>
            <Form.Label>Status</Form.Label>
            <Form.Control />
          </Form.Group>
          <Button type='submit'>Add book to favorites!</Button>
        </Form>
      </Modal>
    );
  }
}

export default withAuth0(AddBookForm);
