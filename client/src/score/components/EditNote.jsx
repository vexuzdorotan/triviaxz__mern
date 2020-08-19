import React, { useState, useEffect, useContext } from 'react';
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

import trivia from '../../shared/api/trivia-quiz';
import Login from '../../user/pages/Login';
import { GlobalContext } from '../../shared/context/GlobalState';

const EditNote = (props) => {
  const { setLoadedScores, ...rest } = props;

  const { isLoggedIn } = useContext(GlobalContext);
  const [modalShow, setModalShow] = useState(false);
  const [alertSave, setAlertSave] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!isLoggedIn) {
      setModalShow(false);
    }
  }, [isLoggedIn]);

  const updateOnClick = async () => {
    let message, variant;

    try {
      await trivia.patch(`/scores/${props.score._id}`, {
        note,
      });

      message = 'Successfully saved to scoreboard.';
      variant = 'success';
    } catch (error) {
      message = 'Unknown error. Failed to save to scoreboard.';
      variant = 'danger';
    }

    setLoadedScores((prevScores) => {
      prevScores.find((score) => score._id === props.score._id).note = note;
      return prevScores;
    });

    setAlertSave({
      message,
      variant,
    });

    setTimeout(() => {
      setAlertSave(null);
    }, 2000);
  };

  const EditSchema = Yup.object().shape({
    note: Yup.string().max(15, 'Must be 15 characters or less.'),
  });

  return (
    <>
      {props.score && (
        <Modal
          {...rest}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          animation={true}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Note
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                note: props.score.note,
              }}
              validationSchema={EditSchema}
              onSubmit={(values, { setSubmitting }) => {
                updateOnClick();
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
                          onBlur={handleBlur}
                          value={values.note}
                          isInvalid={touched.note && errors.note}
                          autoComplete="off"
                        />
                        <ErrorMessage name="note" component={FormText} />
                      </FormGroup>
                    )}
                  </Field>
                  <Row>
                    <Col className="text-right">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="mb-2"
                      >
                        Update Score
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
      )}

      {!isLoggedIn && (
        <Login show={modalShow} onHide={() => setModalShow(false)} />
      )}
    </>
  );
};

export default EditNote;
