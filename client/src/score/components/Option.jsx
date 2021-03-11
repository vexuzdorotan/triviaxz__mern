import React, { useState, useEffect, useContext } from 'react'
import { Button, ButtonGroup, ToggleButton } from 'react-bootstrap'
import { GlobalContext } from '../../shared/context/GlobalState'

const Option = () => {
  const { setOption, startGame } = useContext(GlobalContext)

  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState('')
  const [select, setSelect] = useState(true)

  const categoryRadios = [
    { name: 'Mathematics', value: '19' },
    { name: 'Computers', value: '18' },
    { name: 'Gadgets', value: '30' },
    { name: 'Geography', value: '22' },
    { name: 'History', value: '23' },
    { name: 'Animals', value: '27' },
    { name: 'Mythology', value: '20' },
    { name: 'Books', value: '10' },
    { name: 'Vehicles', value: '28' },
  ]

  // const radios = [categoryRadios, difficultyRadios, amountRadios]

  useEffect(() => {
    if (category !== '') {
      setSelect(false)
    }
  }, [category])

  const startOnClick = () => {
    if (category === '') {
      return setSelect(true)
    }

    setOption({
      category,
      categoryName,
    })
    startGame(true)
  }

  const renderList = () => {
    return (
      <div className='vxz-option my-auto'>
        <h6 className={categoryName ? 'text-success' : 'text-danger'}>
          {categoryName ? categoryName : 'Select Category'}
        </h6>

        <ButtonGroup toggle className='option-buttons'>
          {categoryRadios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              type='radio'
              variant='secondary'
              name='category-radio'
              value={radio.value}
              size='sm'
              checked={category === radio.value}
              onChange={(e) => {
                setCategory(e.currentTarget.value)
                setCategoryName(radio.name)
              }}
              className='option-button'
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>

        <Button
          variant='primary'
          size='sm'
          block
          disabled={select}
          onClick={() => startOnClick()}
          className='start-button mb-2 mt-3'
        >
          Start Game
        </Button>
      </div>
    )
  }

  return renderList()
}

export default Option
