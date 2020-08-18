import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { Table, Image } from 'react-bootstrap';
import moment from 'moment';

import { GlobalContext } from '../../shared/context/GlobalState';
import trivia from '../../shared/api/trivia-quiz';
import ModifyButtons from '../components/ModifyButtons';

const Scoreboard = () => {
  const { isLoggedIn } = useContext(GlobalContext);
  const [loadedScores, setLoadedScores] = useState();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await trivia.get('/scores/?sortBy=createdAt:desc');

        setLoadedScores(response.data);
      } catch (error) {}
    };
    fetchScores();
  }, [trivia]);

  const handleModifiedScore = (id) => {
    const modifiedScores = loadedScores.filter((score) => score._id !== id);
    setLoadedScores(modifiedScores);
  };

  const listScores = useCallback(() => {
    return loadedScores.map((score, i) => (
      <tr key={i}>
        <td>
          <Image
            src={`http://localhost:5000/${score.player.image}`}
            className="my-auto mr-1"
            roundedCircle
            fluid
            style={{ height: '3vh' }}
          />
          {score.player.name}
        </td>
        <td>{score.scored}</td>
        <td>{score.category}</td>
        <td>{score.note}</td>
        <td>{moment(score.createdAt).format('L, h:mm a')}</td>
        {isLoggedIn && (
          <td>
            <ModifyButtons
              score={score}
              modifiedScore={(id) => handleModifiedScore(id)}
            />
          </td>
        )}
      </tr>
    ));
  });

  const renderTable = () => {
    return (
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
        <tbody>{loadedScores && listScores()}</tbody>
      </Table>
    );
  };

  return <>{renderTable()}</>;
};

export default Scoreboard;
