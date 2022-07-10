import React from 'react'
import { ACTIONS } from './App'

const OperationButton = ({ operation, dispatch }) => {
  return (
    <button className='operator' onClick={ () => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: {operation} }) }>{ operation }</button>
  )
}

export default OperationButton