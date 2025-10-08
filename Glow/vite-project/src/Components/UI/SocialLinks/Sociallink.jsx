import React from 'react'
import { Link } from 'react-router'

export default function Sociallink( {socialLink , socialIcon}) {
  return (
    <div>
      <Link to={socialLink} >{socialIcon}</Link>           
    </div>
  )
}
