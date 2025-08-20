import React from 'react'

function Simulator() {
  return (
    <>
      <div className="iphone-13">
        <div className="notch"></div>
        <div className="power-button"></div>
        <div className="silent"></div>
        <div className="volume-up"></div>
        <div className="volume-down"></div>
        <iframe src="http://localhost:3000"></iframe>
      </div>
  </>
  )
}

export default Simulator;