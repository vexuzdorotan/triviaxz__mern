import React, { useState, useEffect, useContext } from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import opentdb from '../api/opentdb';
import { GlobalContext } from '../context/GlobalState';

const QuestionAnswer = () => {
  const { questionNumber, incrementQNumber } = useContext(GlobalContext);

  const initialState = {
    category: '',
    type: '',
    difficulty: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  };
  const [qa, setQa] = useState([initialState]);

  const answers = [
    ...qa[questionNumber].incorrect_answers,
    qa[questionNumber].correct_answer,
  ];

  useEffect(() => {
    (async () => {
      const response = await opentdb.get('', {
        params: {
          amount: 10,
          type: 'multiple',
        },
      });

      setQa(response.data.results);
    })();
  }, []);

  return (
    <Jumbotron className="mt-5">
      <h1>Question {`${questionNumber + 1}`}</h1>
      <span>{qa[questionNumber].question}</span>
      <hr />
      <p>
        <Button
          onClick={() => incrementQNumber(questionNumber)}
          variant="primary"
          block
        >
          {answers[0]}
        </Button>
        <Button
          onClick={() => incrementQNumber(questionNumber)}
          variant="primary"
          block
        >
          {answers[1]}
        </Button>
        <Button
          onClick={() => incrementQNumber(questionNumber)}
          variant="primary"
          block
        >
          {answers[2]}
        </Button>
        <Button
          onClick={() => incrementQNumber(questionNumber)}
          variant="primary"
          block
        >
          {answers[3]}
        </Button>
      </p>
    </Jumbotron>
  );
};

export default QuestionAnswer;
