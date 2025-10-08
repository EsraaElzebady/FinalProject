import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

export default function Loader() {
  return (
    <div className="flex justify-center items-center min-h-screen">
    <ClipLoader size={60} color="#2563eb" />
  </div>
  )
}
