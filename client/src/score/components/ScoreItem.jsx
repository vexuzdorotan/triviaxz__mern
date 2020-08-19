import React, { useContext } from 'react';
import { Image } from 'react-bootstrap';
import moment from 'moment';

import { GlobalContext } from '../../shared/context/GlobalState';
import ModifyButtons from './ModifyButtons';

const ScoreItem = ({ score, setSelectedId, setLoadedScores, setModalShow }) => {
  const { isLoggedIn } = useContext(GlobalContext);

  const handleModifiedScore = (id) => {
    setLoadedScores((prevScores) =>
      prevScores.filter((score) => score._id !== id)
    );
  };

  const handleEditClicked = (selectedScore) => {
    setSelectedId(selectedScore);
    setModalShow(true);
  };

  return (
    <tr key={score._id}>
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
            edit={(selectedScore) => handleEditClicked(selectedScore)}
          />
        </td>
      )}
    </tr>
  );
};

export default ScoreItem;
