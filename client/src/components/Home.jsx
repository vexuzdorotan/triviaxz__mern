import React, { useState, useEffect, useContext } from 'react';
import {
  Jumbotron,
  Button,
  Alert,
  ProgressBar,
  Spinner,
} from 'react-bootstrap';

import { GlobalContext } from '../context/GlobalState';
import Completed from './Completed';
import Option from './Option';

const Home = () => {
  const {
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

  const [alert, setAlert] = useState(false);
  const [choices, setChoices] = useState([]);
  const [correct, setCorrect] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    if (start) {
      fetchQA()();
    } else if (!start) {
      setAlert(false);
      setChoices([]);
      setCorrect(true);
    }
  }, [start]);

  useEffect(() => {
    if (questionNumber < qa.length) {
      const randomChoices = [
        ...qa[questionNumber].incorrect_answers,
        `${qa[questionNumber].correct_answer} ^_^`,
      ]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      setChoices(randomChoices);
    }

    if (questionNumber === qa.length && qa.length !== 0) {
      // setTimeout(() => {
      setModalShow(true);
      // }, 2000);
    }
  }, [qa, questionNumber]);

  const answerOnClick = (ans) => {
    if (questionNumber < qa.length) {
      const correct =
        qa[questionNumber].correct_answer + ' ^_^' === ans ? true : false;

      if (correct) {
        saveScore(score + 1);
        setBoolScore(true);
      } else if (!correct) {
        setBoolScore(false);
      }

      setCorrect(correct);
      setAlert(true);
      incrementQNumber(questionNumber);
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
          <h1>Question {`${qN + 1}`}</h1>
          <span>{qa[qN].question}</span>
        </>
      );
    };

    return (
      <Jumbotron style={{ padding: '1rem' }}>
        <h4>Score: {score}</h4>
        <ProgressBar label={`${((questionNumber + 1) / qa.length) * 100}%`}>
          {progressBoolScore()}
        </ProgressBar>
        {questionText()}
        <hr />
        <p>{answerButtons()}</p>
        {alert ? (
          <Alert variant={correct ? 'success' : 'danger'}>
            {correct
              ? 'Correct!'
              : `Wrong! Correct answer: ${
                  qa[questionNumber - 1].correct_answer
                }`}
          </Alert>
        ) : (
          ''
        )}

        <Completed show={modalShow} onHide={() => setModalShow(false)} />
      </Jumbotron>
    );
  };

  const renderFinal = () => {
    if (!start && qa.length === 0) {
      return <Option />;
    } else if (start && qa.length === 0) {
      return (
        <Spinner animation="border" variant="primary" className="spinner" />
      );
    } else if (start && questionNumber <= qa.length) {
      return showQuiz();
    }
  };

  return <>{renderFinal()}</>;
};

export default Home;
