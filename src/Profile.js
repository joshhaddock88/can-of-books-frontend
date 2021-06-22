import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import { Card } from 'react-bootstrap';

class Profile extends React.Component {
  render() {
    console.log(this.props.auth0);
    const {user} = this.props.auth0;
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>User Profile</Card.Title>
          <Card.Text>
            {user.name}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default withAuth0(Profile);
