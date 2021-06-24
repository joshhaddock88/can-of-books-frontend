import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class DeleteBook extends React.Component{

  deleteBook = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {'authorization' : `Bearer ${jwt}`}
    };
    let response = await axios.delete(`http://localhost:3001/books/${this.props.bookId}`, config);
    console.log(response);
    this.props.getBooks();
  }
  render() {
    return (
      <Button onClick={this.deleteBook}>Remove Book from Favorites</Button>
    );
  }
}

export default withAuth0(DeleteBook);
