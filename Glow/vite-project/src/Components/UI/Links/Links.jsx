import React from 'react'
import { Link } from 'react-router'

export default function Links({link , linkText}) {
  return (
    <Link to={`/${link}`} className="flex flex-col font-[poppins] capitalize text-[15px] hover:text-black p-2 text-[var(--footer-links-color)]" > {linkText} </Link>
  )
}
