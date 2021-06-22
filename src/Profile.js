import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Profile extends React.Component {
  serverRequest = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;
    console.log(jwt);
    const config = {
      headers: {'Authorization' : `Bearer ${jwt}`}
    };

    const requestToken = await axios.get('http://localhost:3001/test',config);

    console.log(requestToken);
  };
  render() {
    const {user} = this.props.auth0;
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            {user.name}
          </Card.Text>
          <Button onClick={this.serverRequest}>Request Stuff</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withAuth0(Profile);
