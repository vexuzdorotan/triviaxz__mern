import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  Jumbotron,
  Button,
  Alert,
  ProgressBar,
  Spinner,
  Card,
} from 'react-bootstrap';

import { GlobalContext } from '../../shared/context/GlobalState';
import Completed from '../components/Completed';
import Option from '../components/Option';

const Play = () => {
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
  const [timer, setTimer] = useState(10);
  const [choices, setChoices] = useState([]);
  const [alert, setAlert] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [disableToAnswer, setDisableToAnswer] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const intervalId = useRef(null);

  const startInterval = () => {
    setTimer(10);
    intervalId.current = window.setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);
  };

  const stopInterval = () => {
    window.clearInterval(intervalId.current);
  };

  useEffect(() => {
    let isMounted = true;

    if (start && isMounted) {
      fetchQA();
      setDisableToAnswer(false);
    } else {
      setAlert(false);
      setChoices([]);
      setCorrect(true);
    }

    return () => (isMounted = false);
  }, [start, fetchQA]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted && questionNumber < qa.length) {
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

    return () => {
      stopInterval();
      isMounted = false;
    };
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

  useEffect(() => {
    let isMounted = true;

    if ((isMounted && timer === 0) || playingStatus !== 'PLAYING') {
      answerOnClick(null);
      stopInterval();
    }

    return () => {
      isMounted = false;
    };
  }, [timer, playingStatus]);

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
            variant="secondary"
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
            <Card bg="primary" text="light" style={{ width: '8rem' }}>
              <Card.Header className="text-center p-0">Question</Card.Header>
              <Card.Body className="text-center p-0">
                <Card.Text>{`${qN + 1}`}</Card.Text>
              </Card.Body>
            </Card>

            <Card bg="primary" text="light" style={{ width: '8rem' }}>
              <Card.Header className="text-center p-0">Category</Card.Header>
              <Card.Body className="text-center p-0">
                <Card.Text>{option.categoryName}</Card.Text>
              </Card.Body>
            </Card>
          </div>

          <ProgressBar
            label={`${((questionNumber + 1) / qa.length) * 100}%`}
            className="my-3"
          >
            {progressBoolScore()}
          </ProgressBar>

          <Alert variant="secondary">{qa[qN].question}</Alert>
        </>
      );
    };

    return (
      <Jumbotron style={{ padding: '1rem', marginTop: '2vh' }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <Card bg="primary" text="light" style={{ width: '8rem' }}>
            <Card.Header className="text-center p-0">Score</Card.Header>
            <Card.Body className="text-center p-0">
              <Card.Text>{score}</Card.Text>
            </Card.Body>
          </Card>
          {playingStatus !== 'COMPLETED' && (
            <Card bg="primary" text="light" style={{ width: '8rem' }}>
              <Card.Header className="text-center p-0">Time</Card.Header>
              <Card.Body className="text-center p-0">
                <Card.Text
                  className={timer <= 3 ? 'text-danger' : 'text-light'}
                >
                  {timer}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
          {!modalShow && playingStatus === 'COMPLETED' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalShow(true)}
              className="vxz-blinking"
            >
              Save Score
            </Button>
          )}
        </div>

        {questionText()}

        <hr />
        <p>{answerButtons()}</p>
        {alert ? (
          <Alert
            variant={correct ? 'success' : 'danger'}
            className="vxz-blinking py-2"
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

export default Play;
