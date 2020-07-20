import React, { useState, useContext } from 'react';

import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const Option = () => {
  const { setOption, startGame } = useContext(GlobalContext);

  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [amount, setamount] = useState('');

  const category1Radios = [
    { name: 'Mathematics', value: '19' },
    { name: 'Computers', value: '18' },
    { name: 'Gadgets', value: '30' },
  ];
  const category2Radios = [
    { name: 'Geography', value: '22' },
    { name: 'History', value: '23' },
    { name: 'Animals', value: '27' },
  ];
  const category3Radios = [
    { name: 'Mythology', value: '20' },
    { name: 'Books', value: '10' },
    { name: 'Vehicles', value: '28' },
  ];
  const difficultyRadios = [
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' },
  ];
  const amountRadios = [
    { name: '5', value: '5' },
    { name: '10', value: '10' },
    { name: '20', value: '20' },
  ];

  // const radios = [category1Radios, category2Radios, category3Radios, difficultyRadios, amountRadios]

  const startOnClick = () => {
    setOption({
      category,
      difficulty,
      amount,
    });
    startGame(true);
  };

  const renderList = () => {
    return (
      <>
        <h4>Select Category:</h4>
        <ButtonGroup toggle>
          {category1Radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="category-radio"
              value={radio.value}
              checked={category === radio.value}
              onChange={(e) => setCategory(e.currentTarget.value)}
              style={{ display: 'block' }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <br />
        <ButtonGroup toggle>
          {category2Radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="category-radio"
              value={radio.value}
              checked={category === radio.value}
              onChange={(e) => setCategory(e.currentTarget.value)}
              style={{ display: 'block' }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <br />
        <ButtonGroup toggle>
          {category3Radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="category-radio"
              value={radio.value}
              checked={category === radio.value}
              onChange={(e) => setCategory(e.currentTarget.value)}
              style={{ display: 'block' }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
        <br />

        <h4>Select Difficulty:</h4>
        <ButtonGroup toggle>
          {difficultyRadios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="difficulty-radio"
              value={radio.value}
              checked={difficulty === radio.value}
              onChange={(e) => setDifficulty(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <h4>Number of Questions:</h4>
        <ButtonGroup toggle>
          {amountRadios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="amount-radio"
              value={radio.value}
              checked={amount === radio.value}
              onChange={(e) => setamount(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <Button
          variant="primary"
          size="md"
          block
          onClick={() => startOnClick()}
        >
          Start Game
        </Button>
      </>
    );
  };

  return renderList();
};

export default Option;
