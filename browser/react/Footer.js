import React from 'react'

const Footer = (props)=> {
  const { clickPlay, clickPause, clickNext,
    clickPrevious, clickScrub, playing, progress } = props
  return (
    <footer>
      <div className="pull-left">
        <button className="btn btn-default" onClick={ ()=> clickPrevious() }>
          <span className="glyphicon glyphicon-step-backward"></span>
        </button>
        <button className="btn btn-default" onClick={ ()=> playing ? clickPause() : clickPlay() }>
          <span className={ playing ? "glyphicon glyphicon-pause" : "glyphicon glyphicon-play" }></span>
        </button>
        <button className="btn btn-default" onClick={ ()=> clickNext() }>
          <span className="glyphicon glyphicon-step-forward"></span>
        </button>
      </div>
      <div className="bar">
        <div className="progress">
          <div className="progress-bar" style={{width: `${progress}%`}} onClick={ ()=> clickScrub() }></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
