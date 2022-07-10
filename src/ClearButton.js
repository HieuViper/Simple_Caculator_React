import React from 'react'
import { ACTIONS } from './App'

const ClearButton = ({ operation, dispatch }) => {
  return (
    <button className='clear col-span-2' onClick={ () => dispatch({ type: ACTIONS.CLEAR }) }>{ operation }</button>
  )
}

export default ClearButton