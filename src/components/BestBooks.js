import React from 'react';
import axios from 'axios';
import DeleteBook from './DeleteBook.js';
import carouselBackground from '../images/carouselBackground.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';

class BestBooks extends React.Component {

  getBooks = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {'Authorization' : `Bearer ${jwt}`}
    };
    let bookData = await axios.get(`http://localhost:3001/books`,config);
    console.log(bookData);
    this.setState({bookData: bookData.data});
  }

  async componentDidMount() {
    this.getBooks();
  }

  // newBooks = (newBookData) => {
  //   this.setstate({
  //     bookData: newBookData
  //   });
  // }

  render() {
    const {user} = this.props.auth0;
    return(
      <>
        <h1>{user.name}'s Favorite Books</h1>
        <Carousel>
          {this.state? this.state.bookData.map(book => <Carousel.Item key={book._id}>
            <img
              src={carouselBackground}
              alt=''
            />
            <Carousel.Caption>
              <h3>{book.name}</h3>
              <p>{book.description}</p>
              <p>{book.status}</p>
              <DeleteBook 
                bookId = {book._id}
                bookData = {this.state.bookData}
                getBooks = {this.getBooks}
              />
            </Carousel.Caption>
          </Carousel.Item>) : ''}
        </Carousel>
      </>
    );
  }
}

export default withAuth0(BestBooks);
