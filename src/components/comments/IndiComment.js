import React from 'react'
import './comments.css'
import NavbarItem from '../sidebar/NavbarItem'

function IndiComment({comment, view}) {
  const userInit = comment?.user[0].toUpperCase();

  return (
    <div>
<div
    className={` m-4 w-11/12 rounded-lg px-4 py-2 ml-7 actual-comments ${
      view ? "vis" : "invis"
    }`}
  >
    <div className="grid grid-cols-10 w-full">
      <div className="col-span-1 flex items-center">
      <NavbarItem sizes={true} size={"text-xl"} User={userInit} />
        
      </div>
      <div className="col-span-9">
        <div>{comment?.user}</div>
        <div className='flex justify-between'>
            <div className='try'>{comment?.text}</div>
            <div className=''>{comment?.created_at.split('T')[0]}</div>

         </div>
      </div>
    </div>
  </div>
    </div>
    
  )
}

export default IndiComment