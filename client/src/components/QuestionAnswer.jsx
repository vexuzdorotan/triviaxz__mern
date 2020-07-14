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

const QuestionAnswer = () => {
  const {
    option,
    start,
    startGame,
    qa,
    questionNumber,
    fetchQA,
    incrementQNumber,
    saveScore,
  } = useContext(GlobalContext);

  const [alert, setAlert] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQA()();
  }, [start]);

  if (completed && !start) {
    console.log(score);
    saveScore(score);
    startGame(false);
  }

  const answerOnClick = (ans) => {
    const correct =
      qa[questionNumber].correct_answer + ' ^_^' === ans ? true : false;

    if (correct) {
      setScore(() => score + 1);
    }

    setCorrect(correct);

    setAlert(true);
    // setAlert(false);

    incrementQNumber(questionNumber);
  };

  let answers = [];

  // if completed
  if (questionNumber !== qa.length) {
    answers = [
      ...qa[questionNumber].incorrect_answers,
      `${qa[questionNumber].correct_answer} ^_^`,
    ];
  }

  // shuffle array
  if (answers.length !== 1) {
    answers = answers
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
  }

  const [ans1, ans2, ans3, ans4] = answers;

  const renderQA = () => {
    return (
      <Jumbotron className="mt-5">
        <h4>Score: {score}</h4>
        <h1>Question {`${questionNumber + 1}`}</h1>
        <span>{qa[questionNumber].question}</span>
        <hr />
        <p>
          <Button
            onClick={(e) => answerOnClick(e.target.textContent)}
            variant="primary"
            block
          >
            {ans1}
          </Button>
          <Button
            onClick={(e) => answerOnClick(e.target.textContent)}
            variant="primary"
            block
          >
            {ans2}
          </Button>
          <Button
            onClick={(e) => answerOnClick(e.target.textContent)}
            variant="primary"
            block
          >
            {ans3}
          </Button>
          <Button
            onClick={(e) => answerOnClick(e.target.textContent)}
            variant="primary"
            block
          >
            {ans4}
          </Button>
        </p>
        <ProgressBar
          striped
          variant="info"
          animated
          now={((questionNumber + 1) / qa.length) * 100}
          label={`${((questionNumber + 1) / qa.length) * 100}%`}
        />
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
      </Jumbotron>
    );
  };

  const quizCompleted = () => {
    if (!completed) {
      setCompleted(true);
    }

    return <Completed />;
  };

  console.log(start);

  const renderFinal = () => {
    if (!start) {
      return <Option />;
    } else if (qa.length === 1) {
      return <Spinner animation="border" variant="primary" />;
    } else if (questionNumber !== qa.length) {
      return renderQA();
    } else if (questionNumber === qa.length) {
      return quizCompleted();
    }
  };

  return <>{renderFinal()}</>;
};

export default QuestionAnswer;
