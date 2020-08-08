import React, { useState, useContext } from 'react';
import {
  Button,
  Modal,
  Alert,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
} from 'react-bootstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import pluralize from 'pluralize';

import trivia from '../api/trivia-quiz';
import { GlobalContext } from '../context/GlobalState';

const Completed = (props) => {
  const { isLoggedIn, user, score, option, start, clearQA } = useContext(
    GlobalContext
  );
  const [clickedSave, setClickedSave] = useState(false);
  const [alertSave, setAlertSave] = useState(null);

  const saveOnClick = async () => {
    let message, variant;
    if (!clickedSave) {
      try {
        await trivia.post('/scores', {
          scored: score,
          category: option.categoryName,
          note: '',
          player: user._id,
        });

        message = 'Successfully saved to scoreboard.';
        variant = 'success';
        setClickedSave(true);
      } catch (error) {
        message = 'Unknown error. Failed to save to scoreboard.';
        variant = 'danger';
      }
    } else {
      message = 'Already saved to scoreboard.';
      variant = 'warning';
    }

    setAlertSave({
      message,
      variant,
    });
  };

  const playAgainOnClick = () => {
    if (start) {
      props.onHide();
      clearQA();
    }
  };

  const CompleteSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Must be 5 characters or more.')
      .max(15, 'Must be 15 characters or less.')
      .required('Please enter your name.'),
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
        <Modal.Title id="contained-modal-title-vcenter">
          Trivia Quiz Completed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Thank you for playing!</h4>
        <p>
          You got {score} correct {pluralize('answer', score)}.
        </p>
        {!isLoggedIn && (
          <Formik
            initialValues={{
              name: 'Guest',
            }}
            validationSchema={CompleteSchema}
            onSubmit={(values, { setSubmitting }) => {
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
                    <FormGroup controlId="name">
                      <FormLabel>Name: </FormLabel>
                      <FormControl
                        type="text"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        isInvalid={touched.name && errors.name}
                      />
                      <ErrorMessage name="name" component={FormText} />
                    </FormGroup>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        )}

        {alertSave && (
          <Alert variant={alertSave.variant}>{alertSave.message}</Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => saveOnClick()}>Save to Scoreboard</Button>
        <Button onClick={() => playAgainOnClick()}>Play Again</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Completed;
