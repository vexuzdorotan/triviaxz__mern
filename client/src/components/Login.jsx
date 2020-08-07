import React, { useState, useEffect, useContext } from 'react';
import {
  Button,
  Modal,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { GlobalContext } from '../context/GlobalState';

const Login = (props) => {
  const {
    resetHttpError,
    resetSignup,
    httpError,
    isSignedUp,
    signup,
    login,
  } = useContext(GlobalContext);

  const [isSignupMode, setIsSignupMode] = useState(false);

  useEffect(() => {
    if (isSignedUp) {
      setIsSignupMode(false);
      resetSignup();
    }
  }, [isSignedUp]);

  const loginShape = {
    name: Yup.string()
      .min(5, 'Must be 5 characters or more.')
      .max(15, 'Must be 15 characters or less.')
      .required('Please enter your name.'),
    email: Yup.string()
      .email('Your email is invalid.')
      .required('Please enter your email.'),
    password: Yup.string().required('Please enter your password.'),
    confirmPassword: Yup.string().when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Both password need to be the same'
      ),
    }),
  };

  if (!isSignupMode) {
    delete loginShape.name;
    delete loginShape.confirmPassword;
  }
  const LoginSchema = Yup.object().shape(loginShape);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {isSignupMode ? 'Sign up to' : 'Login to'} Trivia Quiz
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            if (isSignupMode) {
              signup(values.name, values.email, values.password);
            } else {
              login(values.email, values.password);
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              {isSignupMode && (
                <Field>
                  {() => (
                    <FormGroup controlId="name">
                      <FormLabel>Name: </FormLabel>
                      <FormControl
                        type="text"
                        name="name"
                        onChange={(e) => {
                          handleChange(e);
                          resetHttpError();
                        }}
                        onBlur={handleBlur}
                        value={values.name}
                        isInvalid={touched.name && errors.name}
                      />
                      <ErrorMessage name="name" component={FormText} />
                    </FormGroup>
                  )}
                </Field>
              )}

              <Field>
                {() => (
                  <FormGroup controlId="email">
                    <FormLabel>Email: </FormLabel>
                    <FormControl
                      type="email"
                      name="email"
                      onChange={(e) => {
                        handleChange(e);
                        resetHttpError();
                      }}
                      onBlur={handleBlur}
                      value={values.email}
                      isInvalid={touched.email && errors.email}
                    />
                    <ErrorMessage name="email" component={FormText} />
                  </FormGroup>
                )}
              </Field>

              <Field>
                {() => (
                  <FormGroup controlId="password">
                    <FormLabel>Password: </FormLabel>
                    <FormControl
                      type="password"
                      name="password"
                      onChange={(e) => {
                        handleChange(e);
                        resetHttpError();
                      }}
                      onBlur={handleBlur}
                      value={values.password}
                      isInvalid={touched.password && errors.password}
                    />
                    <ErrorMessage name="password" component={FormText} />
                  </FormGroup>
                )}
              </Field>

              {isSignupMode && (
                <Field>
                  {() => (
                    <FormGroup controlId="confirmPassword">
                      <FormLabel>Confirm Password: </FormLabel>
                      <FormControl
                        type="password"
                        name="confirmPassword"
                        onChange={(e) => {
                          handleChange(e);
                          resetHttpError();
                        }}
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        isInvalid={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                      <ErrorMessage
                        name="confirmPassword"
                        component={FormText}
                      />
                    </FormGroup>
                  )}
                </Field>
              )}

              {httpError && (
                <FormText className="text-warning">{httpError}</FormText>
              )}

              <Button type="submit" disabled={isSubmitting} block>
                {isSignupMode ? 'Sign up' : 'Login'}
              </Button>

              <FormText className="ml-auto mt-5">
                {isSignupMode ? 'Already registered? ' : 'No account yet? '}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setIsSignupMode(!isSignupMode)}
                >
                  {isSignupMode ? 'Back to Login ' : 'Sign up for free! '}
                </Button>
              </FormText>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
