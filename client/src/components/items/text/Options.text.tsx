import React from 'react'

interface Props {
    text: string;
}

function Options({text}:Props) {
  return (
    <p>{text}</p>
  )
}

export default Options