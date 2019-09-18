import React, { useContext, useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

import { useForm } from '../utils/hooks';
import { AuthContext } from "../context/auth";

const Login = props => {
  const context = useContext(AuthContext);
  console.log(context);
  const initialState = {
    username: '',
    password: ''
  };
  const [errors, setErrors] = useState({});
  const {onChange, onSubmit, values} = useForm(loginUserCallback, initialState);
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, {data: {login: userData}}) {
      console.log('userData ', userData);
      context.login(userData);
      props.history.push('/');
    },
    onError(err){
      const errorMessage = err.graphQLErrors[0].extensions.exception.errors;
      console.log(errorMessage);
      setErrors(errorMessage);
    },
    variables: values
  });

  function loginUserCallback() { // coz of hoisted feature of JS, so define a function to call another function, and then call the new defined function ask callback.
    loginUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login Page</h1>
        <Form.Input type="username" label="username" placeholder="username" name="username" value={values.username} error={errors.username ? true: false} onChange={onChange} />
        <Form.Input type="password" label="password" placeholder="password" name="password" value={values.password} error={errors.password ? true: false} onChange={onChange} />
        <Button type="submit" primary>Login</Button>
      </Form>
      {
        Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  )
}

const LOGIN_USER = gql`
  mutation login(
    $username: String!
    $password: String!
  ) {
    login(
      username: $username
      password: $password
    ){
      id email username createdAt token
    }
  }
`;

export default Login;
