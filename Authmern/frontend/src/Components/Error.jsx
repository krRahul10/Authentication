import React from 'react'
import { NavLink } from 'react-router-dom'

export const Error = () => {
  return (
    <div>
    <div>
        <img src="./404.jpg" alt="" style={{height:"350px", width:"600px" ,margin:"0px 0px 0px 27%"}} />
        <h1 style={{margin:"0px 0px 0px 35%", color:"teal"} }>Opps! Page Not Found</h1>
        <NavLink to="/" style={{margin:"30px 0px 0px 43%", color:"teal"} }>Back To Login Page</NavLink>
    </div>
    </div>
  )
}
