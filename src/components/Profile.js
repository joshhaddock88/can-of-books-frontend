import AddBookForm from './AddBookForm.js';
// import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';
import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false
    };
  }

  // serverRequest = async () => {
  //   const config = getConfig();

  //   const requestToken = await axios.get('http://localhost:3001/test',config);

  //   console.log(requestToken);
  // };

  toggleForm = () => {
    this.state.showModal ?
      this.setState({showModal: false}) :
      this.setState({showModal: true});
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

  render() {
    const {user} = this.props.auth0;
    return (
      <>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>User Profile</Card.Title>
            <Card.Text>
              {user.name}
            </Card.Text>
            <Button onClick={this.toggleForm}>Add Book</Button>
          </Card.Body>
        </Card>
        {this.state.showModal ?
          <AddBookForm
            showModal = {this.state.showModal}
            toggle = {this.toggleForm}
            getConfig = {this.getConfig}
          /> : ''}
      </>
    );
  }
}

export default withAuth0(Profile);
