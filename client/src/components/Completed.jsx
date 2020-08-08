import React, { useState, useContext } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';

import trivia from '../api/trivia-quiz';
import { GlobalContext } from '../context/GlobalState';

const Completed = (props) => {
  const { user, score, option, start, clearQA } = useContext(GlobalContext);
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
      } catch (error) {
        message = 'Unknown error. Failed to save to scoreboard.';
        variant = 'danger';
      }

      setClickedSave(true);
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
        <p>You got {score} correct answers.</p>
        {clickedSave && (
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
