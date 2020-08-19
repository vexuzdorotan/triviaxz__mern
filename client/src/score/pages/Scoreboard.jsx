import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';

import { GlobalContext } from '../../shared/context/GlobalState';
import trivia from '../../shared/api/trivia-quiz';
import EditNote from '../components/EditNote';
import ScoreItem from '../components/ScoreItem';

const Scoreboard = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const [loadedScores, setLoadedScores] = useState();
  const [selectedScore, setSelectedId] = useState();
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await trivia.get('/scores/?sortBy=createdAt:desc');

        setLoadedScores(response.data);
      } catch (error) {}
    };
    fetchScores();
  }, []);

  const renderTable = () => {
    return (
      <>
        <EditNote
          show={modalShow}
          onHide={() => setModalShow(false)}
          score={selectedScore}
          setLoadedScores={setLoadedScores}
        />

        <Table striped bordered hover size="sm" responsive="lg" variant="dark">
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Category</th>
              <th>Note</th>
              <th>Date</th>
              {isLoggedIn && <th></th>}
            </tr>
          </thead>
          <tbody>
            {loadedScores &&
              loadedScores.map((score) => (
                <ScoreItem
                  key={score._id}
                  score={score}
                  setSelectedId={setSelectedId}
                  setLoadedScores={setLoadedScores}
                  setModalShow={setModalShow}
                />
              ))}
          </tbody>
        </Table>
      </>
    );
  };

  return <>{renderTable()}</>;
};

export default Scoreboard;
