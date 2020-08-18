import React from 'react';
import { Button } from 'react-bootstrap';

import trivia from '../../shared/api/trivia-quiz';

const ModifyButtons = ({ score, modifiedScore }) => {
  const scoreOnDelete = async () => {
    try {
      await trivia.delete(`/scores/${score._id}`);

      modifiedScore(score._id);
    } catch (error) {}
  };

  const setModifyButtons = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;
    return (
      score.player._id === JSON.parse(localStorage.getItem('userData'))._id
    );
  };

  return (
    <>
      {setModifyButtons() && (
        <>
          <Button
            variant="outline-warning"
            size="sm"
            className="vxz-scoreboard-button"
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            className="vxz-scoreboard-button"
            onClick={() => scoreOnDelete()}
          >
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default ModifyButtons;
