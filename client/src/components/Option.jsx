import React, { useState, useContext } from 'react';
import { Button, ButtonGroup, ToggleButton, Row, Col } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const Option = () => {
  const { setOption, startGame } = useContext(GlobalContext);

  const [category, setCategory] = useState('');

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

  // const radios = [category1Radios, category2Radios, category3Radios, difficultyRadios, amountRadios]

  const startOnClick = () => {
    setOption({
      category,
    });
    startGame(true);
  };

  const renderList = () => {
    return (
      <>
        <h6>Select Category:</h6>

        <ButtonGroup toggle className="option-buttons">
          {category1Radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="category-radio"
              value={radio.value}
              size="sm"
              checked={category === radio.value}
              onChange={(e) => setCategory(e.currentTarget.value)}
              className="option-button"
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <ButtonGroup toggle className="option-buttons">
          {category2Radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="category-radio"
              value={radio.value}
              size="sm"
              checked={category === radio.value}
              onChange={(e) => setCategory(e.currentTarget.value)}
              style={{ display: 'block' }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <ButtonGroup toggle className="option-buttons">
          {category3Radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type="radio"
              variant="secondary"
              name="category-radio"
              value={radio.value}
              size="sm"
              checked={category === radio.value}
              onChange={(e) => setCategory(e.currentTarget.value)}
              style={{ display: 'block' }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <Button
          variant="primary"
          size="sm"
          block
          onClick={() => startOnClick()}
          className="start-button"
        >
          Start Game
        </Button>
      </>
    );
  };

  return renderList();
};

export default Option;
