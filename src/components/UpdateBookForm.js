import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class UpdateBookForm extends React.Component {

  updateBook = async (e) => {
    e.preventDefault();
    let config = await this.props.getConfig();
    let data = {
      name: e.target.name.value,
      description: e.target.description.value,
      status: e.target.status.value
    };
    console.log(data);
    console.log(config);
    console.log(this.props.bookId);
    const responseData = await axios.put(`http://localhost:3001/books/${this.props.bookId}`, data, config);
    console.log(responseData.data);
    this.props.toggleUpdateForm();
    this.props.getBooks();
  };

  render() {
    console.log('this book =',  this.props.thisBook);
    return (
      <>
        <Button onClick={this.props.toggleUpdateForm}>Update</Button>
        <Modal
          show={this.props.showModal}
          onHide={this.props.toggleUpdateForm}>
          <Form onSubmit={this.updateBook}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' placeholder={this.props.thisBook.name}/>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Summary</Form.Label>
              <Form.Control as='textarea' rows={3}/>
            </Form.Group>
            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control />
            </Form.Group>
            <Button type='submit'>Update</Button>
          </Form>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateBookForm);
