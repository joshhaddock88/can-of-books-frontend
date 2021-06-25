import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class UpdateBookForm extends React.Component {

  updateBook = async (e) => {
    console.log(this.props.modalData);
    e.preventDefault();
    let config = await this.props.getConfig();
    let data = {
      name: e.target.name.value,
      description: e.target.description.value,
      status: e.target.status.value
    };
    const responseData = await axios.put(`http://localhost:3001/books/${this.props.modalData._id}`, data, config);
    console.log(responseData.data);
    this.props.toggleUpdateForm({});
    this.props.getBooks();
  };

  render() {

    return (
      <>
        <Modal
          show={this.props.showModal}
          onHide={this.props.toggleUpdateForm}>
          <Form onSubmit={this.updateBook}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' defaultValue={this.props.modalData.name}/>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>Summary</Form.Label>
              <Form.Control as='textarea' rows={3} defaultValue={this.props.modalData.description}/>
            </Form.Group>
            <Form.Group controlId='status'>
              <Form.Label>Status</Form.Label>
              <Form.Control defaultValue={this.props.modalData.status}/>
            </Form.Group>
            <Button type='submit'>Update</Button>
          </Form>
        </Modal>
      </>
    );
  }
}

export default withAuth0(UpdateBookForm);
