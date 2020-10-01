import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';

import { GlobalContext } from '../../shared/context/GlobalState';
import ModifyButtons from './ModifyButtons';

const ScoreItem = ({ score, setSelectedId, setLoadedScores, setModalShow }) => {
  const { isLoggedIn, user } = useContext(GlobalContext);
  const playerId = useParams().playerId;

  const handleDeletedScore = (id) => {
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
      {!playerId && (
        <td className="text-center">
          <Image
            src={`${process.env.REACT_APP_ASSET_URL}/${score.player.image}`}
            className="my-auto mr-1"
            roundedCircle
            fluid
            style={{ height: '3vh' }}
          />

          <OverlayTrigger
            placement="right"
            overlay={
              <Tooltip id={`tooltip-right`}>{score.player.email}</Tooltip>
            }
          >
            <Link to={`/scoreboard/${score.player._id}`} className="text-light">
              {score.player.name}
            </Link>
          </OverlayTrigger>
        </td>
      )}
      <td className="text-center">{score.scored}</td>
      <td className="text-center">{score.category}</td>
      <td className="text-center">{score.note}</td>
      <td className="text-center">
        {moment(score.createdAt).format('L, h:mm a')}
      </td>
      {isLoggedIn && playerId === user._id && (
        <td className="text-center">
          <ModifyButtons
            score={score}
            deletedScore={(id) => handleDeletedScore(id)}
            edit={(selectedScore) => handleEditClicked(selectedScore)}
          />
        </td>
      )}
    </tr>
  );
};

export default ScoreItem;
