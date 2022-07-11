import React from 'react'
import { ACTIONS } from './App'
import { FiDelete } from 'react-icons/fi'

const DeleteButton = ({ dispatch }) => {
  return (
    // <button className='operator' onClick={ () => dispatch({ type: ACTIONS.DELETE_DIGIT }) }>{ operation }</button>
    <div className="flex justify-center items-center operator cursor-pointer">

      <FiDelete className='' onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })} />

    </div>
  )
}

export default DeleteButton