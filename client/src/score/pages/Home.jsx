import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  Jumbotron,
  Button,
  Alert,
  ProgressBar,
  Spinner,
} from 'react-bootstrap';

import { GlobalContext } from '../../shared/context/GlobalState';
import Completed from '../components/Completed';
import Option from '../components/Option';

const Home = () => {
  const {
    playingStatus,
    setPlayingStatus,
    start,
    qa,
    option,
    questionNumber,
    fetchQA,
    incrementQNumber,
    score,
    saveScore,
    boolScore,
    setBoolScore,
  } = useContext(GlobalContext);

  // OPTION, LOADING, PLAYING, COMPLETED
  const [timer, setTimer] = useState(3);
  const [choices, setChoices] = useState([]);
  const [alert, setAlert] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [disableToAnswer, setDisableToAnswer] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const intervalId = useRef(null);

  useEffect(() => {
    if (timer === 0 || playingStatus !== 'PLAYING') {
      answerOnClick(null);
      stopInterval();
    }
  }, [timer, playingStatus]);

  const startInterval = () => {
    setTimer(3);
    intervalId.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
  };

  const stopInterval = () => {
    window.clearInterval(intervalId.current);
  };

  useEffect(() => {
    if (start) {
      fetchQA();
    } else {
      setAlert(false);
      setChoices([]);
      setCorrect(true);
    }
  }, [start]);

  useEffect(() => {
    if (questionNumber < qa.length) {
      const randomChoices = [
        ...qa[questionNumber].incorrect_answers,
        qa[questionNumber].correct_answer,
      ]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      setChoices(randomChoices);
      startInterval();
    }
  }, [qa, questionNumber]);

  const answerOnClick = (ans) => {
    if (disableToAnswer) return;
    if (questionNumber < qa.length) {
      const correct = qa[questionNumber].correct_answer === ans;

      setDisableToAnswer(true);
      stopInterval();

      if (correct) {
        saveScore(score + 1);
        setBoolScore(true);
      } else if (!correct) {
        setBoolScore(false);
      }

      setCorrect(correct);
      setAlert(true);

      setTimeout(() => {
        setAlert(false);

        if (qa.length === questionNumber + 1) {
          setPlayingStatus('COMPLETED');
          setDisableToAnswer(true);
          setModalShow(true);
          return;
        }

        if (qa.length !== questionNumber + 1) {
          incrementQNumber(questionNumber);
        }
        setDisableToAnswer(false);
      }, 3000);
    }
  };

  const showQuiz = () => {
    const progressBoolScore = () => {
      return boolScore.map((bool, i) => {
        return (
          <ProgressBar
            striped
            variant={bool ? 'success' : 'danger'}
            now={100 / qa.length}
            key={i}
          />
        );
      });
    };

    const answerButtons = () => {
      return choices.map((choice, i) => {
        return (
          <Button
            onClick={(e) => answerOnClick(e.target.textContent)}
            variant="primary"
            key={i}
            block
          >
            {choice}
          </Button>
        );
      });
    };

    const questionText = () => {
      let qN = questionNumber;

      if (questionNumber === qa.length) {
        qN -= 1;
      }

      return (
        <>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h1>Question {`${qN + 1}`}</h1>
            <h1>{option.categoryName}</h1>
          </div>
          <span>{qa[qN].question}</span>
        </>
      );
    };

    return (
      <Jumbotron style={{ padding: '1rem' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 className="m-0">Score: {score}</h4>
          <h3>{timer}</h3>
          {!modalShow && questionNumber === qa.length && qa.length !== 0 && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalShow(true)}
            >
              Save Score
            </Button>
          )}
        </div>

        <ProgressBar label={`${((questionNumber + 1) / qa.length) * 100}%`}>
          {progressBoolScore()}
        </ProgressBar>
        {questionText()}
        <hr />
        <p>{answerButtons()}</p>
        {alert ? (
          <Alert
            variant={correct ? 'success' : 'danger'}
            className="vxz-blinking"
          >
            {correct
              ? 'Correct!'
              : `Oops! Correct answer: ${qa[questionNumber].correct_answer}`}
          </Alert>
        ) : (
          ''
        )}
      </Jumbotron>
    );
  };

  return (
    <>
      <Completed show={modalShow} onHide={() => setModalShow(false)} />
      {playingStatus === 'OPTION' && <Option />}
      {playingStatus === 'LOADING' && (
        <Spinner animation="border" variant="primary" className="spinner" />
      )}
      {(playingStatus === 'PLAYING' || playingStatus === 'COMPLETED') &&
        showQuiz()}
    </>
  );
};

export default Home;
