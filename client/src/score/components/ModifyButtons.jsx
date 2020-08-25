import React from 'react';
import { Button } from 'react-bootstrap';

import trivia from '../../shared/api/trivia-quiz';

const ModifyButtons = ({ score, deletedScore, edit }) => {
  const scoreOnDelete = async () => {
    try {
      await trivia.delete(`/scores/${score._id}`);

      deletedScore(score._id);
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
            onClick={() => {
              edit(score);
              deletedScore(undefined);
            }}
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
