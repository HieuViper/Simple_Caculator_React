import React from 'react'
import { ACTIONS } from './App'

const DeleteButton = ({ operation, dispatch }) => {
  return (
    <button className='operator' onClick={ () => dispatch({ type: ACTIONS.DELETE_DIGIT }) }>{ operation }</button>
  )
}

export default DeleteButton