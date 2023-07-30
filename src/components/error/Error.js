import React from 'react'
import "./error.css"

function Error({error}) {
  return (
    <div className="hide error">{error}</div>
  )
}

export default Error