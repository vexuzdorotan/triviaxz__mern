import React, { useState, useEffect, useContext } from 'react';
import { Alert, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const Option = () => {
  const { setOption, startGame } = useContext(GlobalContext);

  const [categoryName, setCategoryName] = useState('');
  const [category, setCategory] = useState('');
  const [alertSelect, setAlertSelect] = useState(false);

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

  useEffect(() => {
    if (category !== '') {
      setAlertSelect(false);
    }
  }, [category]);

  const startOnClick = () => {
    if (category === '') {
      return setAlertSelect(true);
    }

    setOption({
      category,
      categoryName,
    });
    startGame(true);
  };

  const renderList = () => {
    return (
      <>
        <h6>Select Category: {categoryName}</h6>

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
              onChange={(e) => {
                setCategory(e.currentTarget.value);
                setCategoryName(radio.name);
              }}
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
              onChange={(e) => {
                setCategory(e.currentTarget.value);
                setCategoryName(radio.name);
              }}
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
              onChange={(e) => {
                setCategory(e.currentTarget.value);
                setCategoryName(radio.name);
              }}
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
          className="start-button mb-2"
        >
          Start Game
        </Button>

        {alertSelect && (
          <Alert variant="warning">Please select a category.</Alert>
        )}
      </>
    );
  };

  return renderList();
};

export default Option;
