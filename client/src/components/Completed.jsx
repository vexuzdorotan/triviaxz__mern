import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';

const Completed = (props) => {
  const { score, clearQA } = useContext(GlobalContext);

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
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => clearQA()}>Play Again</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Completed;
