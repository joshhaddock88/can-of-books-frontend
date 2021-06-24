import React from 'react';
import axios from 'axios';
import DeleteBook from './DeleteBook.js';
import carouselBackground from '../images/carouselBackground.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import Carousel from 'react-bootstrap/Carousel';
import UpdateBookForm from './UpdateBookForm.js';

class BestBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }
  
  getConfig = async() => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: {'authorization' : `Bearer ${jwt}`}
    };
    return config;
  }

  getBooks = async () => {
    const config = await this.getConfig();
    let bookData = await axios.get(`http://localhost:3001/books`,config);
    console.log(bookData);
    this.setState({bookData: bookData.data});
  }

  async componentDidMount() {
    this.getBooks();
  }

  toggleUpdateForm = () => {
    this.state.showModal ?
      this.setState({showModal: false}) :
      this.setState({showModal: true});
  }




  render() {
    const {user} = this.props.auth0;
    return(
      <>
        <h1>{user.name}'s Favorite Books</h1>
        <Carousel>
          {this.state.bookData? this.state.bookData.map(book => <Carousel.Item key={book._id}>
            <img
              src={carouselBackground}
              alt=''
            />
            <Carousel.Caption>
              <h3>{book.name}</h3>
              <p>{book.description}</p>
              <p>{book.status}</p>
              <UpdateBookForm 
                thisBook = {book}
                bookId = {book._id}
                bookData = {this.state.bookData}
                getBooks = {this.getBooks}
                toggleUpdateForm = {this.toggleUpdateForm}
                showModal = {this.state.showModal}
                getConfig = {this.getConfig}
              />
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
