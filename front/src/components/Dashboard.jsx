import Lottie from 'lottie-web'
import React, { useEffect, useRef, useState } from 'react'
import Api from '../services/api'
import animationData from '../assets/animationData.json'

const Dashboard = () => {
  const [data, setData] = useState()
  const animationRef = useRef()
  useEffect(() => {
    (async () => {
      const response = await Api.getProfile()
      setData(response)
      Lottie.loadAnimation({
        container: animationRef.current, 
        renderer: 'canvas',
        loop: true,
        autoplay: true,
        animationData,
      });
    })()
  }, [])
  return (
    <div className="container my-5">
      {data && data.username && <div className="notification is-secondary">
        <h1 className="title">Dashboard</h1>
        <h2 className="title">Hi {data.username}</h2>
        <div ref={animationRef}></div>
      </div>}
    </div>
  )
}

export default Dashboard
