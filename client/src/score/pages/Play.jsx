import React, { useRef, useState, useEffect, useContext } from 'react';
import {
  Container,
  Jumbotron,
  Button,
  Alert,
  ProgressBar,
  Spinner,
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
  const [correct, setCorrect] = useState(undefined);
  const [answer, setAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(undefined)
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

  const answerOnClick = (ans, i) => {
    setAnswer(i)
    
    if (questionNumber < qa.length) {
      const correct = qa[questionNumber].correct_answer === ans;
      setCorrectAnswer(qa[questionNumber].correct_answer)

      setDisableToAnswer(true);
      stopInterval();

      if (correct) {
        saveScore(score + 1);
        setBoolScore(true);
      } else if (!correct) {
        setBoolScore(false);
      }

      setCorrect(correct);

      setTimeout(() => {
        setCorrectAnswer(undefined)
        setAnswer(undefined)
        setCorrect(undefined)

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
      answerOnClick(null, null);
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
            className={correctAnswer === choice && 'vxz-blinking'}
            onClick={(e) => answerOnClick(e.target.textContent, i)}
            variant={correctAnswer === choice ? 'success' :
              answer === i && !correct ? 'danger' : 'secondary'
            }
            key={i}
            disabled={disableToAnswer}
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
          <ProgressBar
            label={`${((questionNumber + 1) / qa.length) * 100}%`}
            className="mb-3"
          >
            {progressBoolScore()}
          </ProgressBar>

          <Alert variant="primary">{qa[qN].question}</Alert>
        </>
      );
    };

    return (
      <Jumbotron className="my-auto px-2 pt-0 pb-2 vxz-jumbotron">
        <div className="d-flex justify-content-center align-items-center">
          {playingStatus !== 'COMPLETED' && (
            <h1 className={timer <= 3 ? 'text-danger m-0' : 'text-success m-0'}>
              {timer}
            </h1>
          )}

          {!modalShow && playingStatus === 'COMPLETED' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setModalShow(true)}
              className="vxz-blinking my-2"
            >
              Save Score
            </Button>
          )}
        </div>

        {questionText()}

        <hr />
        <p className="m-0">{answerButtons()}</p>
      </Jumbotron>
    );
  };

  return (
    <Container className="h-100 d-flex justify-content-center align-items-center overflow-auto">
      <Completed show={modalShow} onHide={() => setModalShow(false)} />
      {playingStatus === 'OPTION' && <Option />}
      {playingStatus === 'LOADING' && (
        <Spinner animation="border" variant="primary" className="spinner" />
      )}
      {(playingStatus === 'PLAYING' || playingStatus === 'COMPLETED') &&
        showQuiz()}
    </Container>
  );
};

export default Play;
