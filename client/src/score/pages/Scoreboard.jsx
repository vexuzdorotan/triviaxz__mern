import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { Container, Table, Spinner, Button } from 'react-bootstrap';

import { GlobalContext } from '../../shared/context/GlobalState';
import trivia from '../../shared/api/trivia-quiz';
import EditNote from '../components/EditNote';
import ScoreItem from '../components/ScoreItem';

const Scoreboard = () => {
  const { isLoggedIn, user, logout, clearQA } = useContext(GlobalContext);
  const [loadedScores, setLoadedScores] = useState();
  const [selectedScore, setSelectedId] = useState();
  const [playerName, setPlayerName] = useState('');
  const [playerEmail, setPlayerEmail] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const playerId = useParams().playerId;
  const history = useHistory();

  useEffect(() => {
    clearQA();
    setLoadedScores(undefined);
    const fetchScores = async () => {
      try {
        const url = playerId
          ? `/scores/record/${playerId}`
          : '/scores/?sortBy=createdAt:desc';
        const response = await trivia.get(url);

        if (response.data.length > 0)
          setPlayerName(response.data[0].player.name);
        setPlayerEmail(response.data[0].player.email);

        setLoadedScores(response.data);
      } catch (error) {
        console.log(error);
        if (!error.response) {
          history.push('/');
        } else {
          setPlayerName(error.response.data.name);
          setPlayerEmail(error.response.data.email);
        }
      }
    };
    fetchScores();
  }, [playerId, clearQA, history]);

  const deleteUserOnClick = async () => {
    try {
      await trivia.delete('/users/delete');
      setLoadedScores((prevLoadedScores) =>
        prevLoadedScores.filter((score) => score.player._id !== user._id)
      );
      localStorage.removeItem('userData');
      logout(true);
      history.push('/');
    } catch (error) {}
  };

  const renderTable = () => {
    return (
      <div>
        <EditNote
          show={modalShow}
          onHide={() => setModalShow(false)}
          score={selectedScore}
          setLoadedScores={setLoadedScores}
        />

        <h6>
          {(playerId &&
            (`${playerName} | ${playerEmail} | ` || (
              <Spinner animation="grow" />
            ))) ||
            'All Players'}
          {playerId && <Link to="/scoreboard">See All Players</Link>}
        </h6>

        <Table
          striped
          bordered
          hover
          size="sm"
          responsive="lg"
          variant="dark"
          className="mx-0 mt-0 mb-1"
        >
          <thead>
            <tr>
              {!playerId && <th>Player</th>}
              <th>Score</th>
              <th>Category</th>
              <th>Note</th>
              <th>Date</th>
              {isLoggedIn && playerId === user._id && <th></th>}
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
        <p className="text-muted m-0 vxz-table-swipe">
          Swipe table left and right if its width is too small.
        </p>
        {user && user._id === playerId && (
          <Button
            variant="outline-danger"
            size="sm"
            className="float-right"
            onClick={() => deleteUserOnClick()}
          >
            Delete My Account
          </Button>
        )}
      </div>
    );
  };

  return <Container className="mt-5">{renderTable()}</Container>;
};

export default Scoreboard;
