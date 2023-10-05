import React from 'react'

const Option = ({ option, index, selectOption, isCorrect, isSelected }) => {

  const style = {};
  if (isCorrect === true) {
    style.backgroundColor = "green";
  } else if (isCorrect === false) {
    style.backgroundColor = "grey";
  }

  if (isSelected) {
    style.border = "2px solid blue";
  }

  return (
    <button className='option' style={style} onClick={() => selectOption(index)} >
      {option}
    </button>
  )
}

export default Option