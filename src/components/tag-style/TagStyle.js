import React from 'react'
import './tagStyle.css'

function TagStyle({tag}) {
  return (
    <div className='NewsOutline-tag'>#{tag}</div>
  )
}

export default TagStyle