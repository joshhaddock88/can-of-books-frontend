import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { isAuthenticated, logout} = useAuth0();

  return isAuthenticated && (<Button variant='primary' onClick={()=>logout({returnTo: window.location.origin})}>Logout</Button>);
};

export default Logout;
