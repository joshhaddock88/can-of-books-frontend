import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Login.css';
import { withAuth0 } from '@auth0/auth0-react';

class Login extends React.Component {
  render() {
    const {
      isAuthenticated,
      loginWithRedirect,
    } = this.props.auth0;

    return !isAuthenticated && (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>Log In</Card.Title>
          <Card.Text>
            Click Below to Log In
          </Card.Text>
          <Button onClick={()=>loginWithRedirect()}>Login</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default withAuth0(Login);


