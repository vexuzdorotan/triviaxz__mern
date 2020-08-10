import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import moment from 'moment';

import { GlobalContext } from '../../shared/context/GlobalState';
import trivia from '../../shared/api/trivia-quiz';

const Scoreboard = () => {
  const { user } = useContext(GlobalContext);
  const [loadedScores, setLoadedScores] = useState();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await trivia.get('/scores');

        setLoadedScores(response.data);
      } catch (error) {}
    };
    fetchScores();
  }, [trivia]);

  const renderTable = () => {
    return (
      <Table striped bordered hover size="sm" responsive="lg">
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
            <th>Category</th>
            <th>Note</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {loadedScores &&
            loadedScores.map((score, i) => (
              <tr key={i}>
                <td>{score.player.name}</td>
                <td>{score.scored}</td>
                <td>{score.category}</td>
                <td>{score.note}</td>
                <td>{moment(score.createdAt).format('lll')}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    );
  };

  return <>{renderTable()}</>;
};

export default Scoreboard;
