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
    start,
    qa,
    questionNumber,
    fetchQA,
    incrementQNumber,
    score,
    saveScore,
  } = useContext(GlobalContext);

  const [alert, setAlert] = useState(false);
  const [choices, setChoices] = useState([]);
  const [correct, setCorrect] = useState(true);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (start) {
      fetchQA()();
    }
  }, [start]);

  useEffect(() => {
    if (questionNumber !== qa.length) {
      const randomChoices = [
        ...qa[questionNumber].incorrect_answers,
        `${qa[questionNumber].correct_answer} ^_^`,
      ]
        .map((a) => ({ sort: Math.random(), value: a }))
        .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value);

      setChoices(randomChoices);
    }
  }, [qa, questionNumber]);

  const [ans1, ans2, ans3, ans4] = choices;

  const answerOnClick = (ans) => {
    const correct =
      qa[questionNumber].correct_answer + ' ^_^' === ans ? true : false;

    if (correct) {
      saveScore(score + 1);
    }

    setCorrect(correct);
    setAlert(true);
    incrementQNumber(questionNumber);
  };

  const showQuiz = () => {
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

  const renderFinal = () => {
    console.log(`${start} .. ${qa.length}`);
    if (!start && qa.length === 0) {
      console.log('start');
      return <Option />;
    } else if (start && qa.length === 0) {
      return <Spinner animation="border" variant="primary" />;
    } else if (start && questionNumber !== qa.length) {
      return showQuiz();
    } else if (start && questionNumber === qa.length) {
      return quizCompleted();
    }
  };

  return <>{renderFinal()}</>;
};

export default QuestionAnswer;
