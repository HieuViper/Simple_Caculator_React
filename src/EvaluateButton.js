import React from 'react'
import { ACTIONS } from './App'

const EvaluateButton = ({ operation, dispatch }) => {
  return (
    <button className='operator col-span-2' onClick={ () => dispatch({ type: ACTIONS.EVALUATE }) }>{ operation }</button>
  )
}

export default EvaluateButton