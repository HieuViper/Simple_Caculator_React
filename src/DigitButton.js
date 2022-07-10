import React from 'react'
import { ACTIONS } from './App'

const DigitButton = ({ digit, dispatch }) => {
  return (
    <button className='number' onClick={ () => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit} }) }>{ digit }</button>
  )
}

export default DigitButton