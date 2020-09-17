import React, { useState, useContext } from 'react';
import {
  Row,
  Col,
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

import trivia from '../../shared/api/trivia-quiz';
import Login from '../../user/pages/Login';
import { GlobalContext } from '../../shared/context/GlobalState';

const Completed = (props) => {
  const { isLoggedIn, score, option, start, clearQA } = useContext(
    GlobalContext
  );
  const [modalShow, setModalShow] = useState(false);
  const [clickedSave, setClickedSave] = useState(false);
  const [alertSave, setAlertSave] = useState(null);
  const [note, setNote] = useState('');

  const saveOnClick = async () => {
    if (!isLoggedIn) return setModalShow(true);

    let message, variant;
    if (!clickedSave) {
      try {
        await trivia.post('/scores', {
          scored: score,
          category: option.categoryName,
          note,
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
      setClickedSave(false);
      setAlertSave(null);
      props.onHide();
      clearQA();
    }
  };

  const CompleteSchema = Yup.object().shape({
    note: Yup.string().max(15, 'Must be 15 characters or less.'),
  });

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            triViaXZ Completed
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Thank you for playing!</h4>
          <p>
            You got {score} correct {pluralize('answer', score)}.
          </p>

          <Formik
            initialValues={{
              note: '',
            }}
            validationSchema={CompleteSchema}
            onSubmit={(values, { setSubmitting }) => {
              saveOnClick();
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
                    <FormGroup controlId="note">
                      <FormLabel>Note: </FormLabel>
                      <FormControl
                        type="text"
                        name="note"
                        onChange={(e) => {
                          handleChange(e);

                          setNote(e.target.value);
                        }}
                        onBlur={(e) => {
                          handleBlur(e);
                        }}
                        value={values.note}
                        isInvalid={touched.note && errors.note}
                        autoComplete="off"
                      />
                      <ErrorMessage name="note" component={FormText} />
                    </FormGroup>
                  )}
                </Field>
                <Row>
                  <Col className="text-right mb-2">
                    <Button type="submit" disabled={isSubmitting}>
                      Save Score
                    </Button>
                    <Button onClick={() => playAgainOnClick()} className="ml-2">
                      Play Again
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>

          {alertSave && (
            <Alert variant={alertSave.variant}>{alertSave.message}</Alert>
          )}
        </Modal.Body>
      </Modal>
      {!isLoggedIn && (
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </>
  );
};

export default Completed;
