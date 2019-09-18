import React, { useContext, useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks';
import gql from "graphql-tag";

import { useForm } from '../utils/hooks';
import { AuthContext } from "../context/auth";

const Signup = props => {
  const context = useContext(AuthContext);
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  };
  const [errors, setErrors] = useState({});
  const {onChange, onSubmit, values} = useForm(registerUser, initialState);
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {data: {register: userData}}) {
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

  function registerUser() { // coz of hosited feature of JS, so define a function to call another function, and then call the new defined function ask callback.
    addUser();
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Sign up Page</h1>
        <Form.Input type="text" label="username" placeholder="username" name="username" value={values.username} error={errors.username ? true: false} onChange={onChange} />
        <Form.Input type="email" label="email" placeholder="email" name="email" value={values.email} error={errors.email ? true: false} onChange={onChange} />
        <Form.Input type="password" label="password" placeholder="password" name="password" value={values.password} error={errors.password ? true: false} onChange={onChange} />
        <Form.Input type="password" label="Confirm Password" placeholder="Confirm Password" name="confirmPassword" value={values.confirmPassword} error={errors.confirmPassword ? true: false} onChange={onChange} />
        <Button type="submit" primary>Register</Button>
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ){
      id email username createdAt token
    }
  }
`;

export default Signup;
