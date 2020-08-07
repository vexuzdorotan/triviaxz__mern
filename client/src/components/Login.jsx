import React, { useState, useContext } from 'react';
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
    httpError,
    isLoggedIn,
    user,
    login,
    logout,
  } = useContext(GlobalContext);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Your email is invalid.')
      .required('Please enter your email.'),
    password: Yup.string().required('Please enter your password.'),
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values, { setSubmitting }) => {
            login(values.email, values.password);
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

              {httpError && <FormText>Incorrect Credentials</FormText>}

              <Button type="submit" disabled={isSubmitting} block>
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
