import React, { Component } from 'react'
import Sidebar from './Sidebar'
import Footer from './Footer'
import AllAlbums from './AllAlbums'
import fakeAlbums from './fakeAlbums'
import SingleAlbum from './SingleAlbum'
import axios from 'axios'

class Main extends Component {
  constructor() {
    super()
    this.state = { albums: [], selectedAlbum: {}, currentSong: {}, playing: false, progress: 0 }
  }
  componentDidMount() {
    axios.get('/api/albums')
    .then(response=> response.data)
    .then(albums=> {
      this.setState({ albums })
    })

    this.player = document.createElement('audio');
    this.player.addEventListener('ended', function() {
      this.clickNext()
    })
    this.player.addEventListener('timeupdate', () => {
      this.setState({
          progress: 100 * this.player.currentTime / this.player.duration
        })
    })
  }
  handleClick(selectedAlbum) {
    axios.get(`/api/albums/${selectedAlbum.id}`)
    .then(response=> this.setState({ selectedAlbum: response.data }))
  }
  allAlbumsClick() {
    this.setState({ selectedAlbum: { }})
  }
  clickPlay(currentSong) {
    if (!currentSong) {
      // to unpause
      this.setState({ playing: true })
      return this.player.play()
    }
    if (this.player) this.player.pause()
    // this.player = document.createElement('audio');
    this.player.src = currentSong.audioUrl;
    this.player.load();
    this.player.play();
    this.setState({ currentSong, playing: true })
  }
  clickPause() {
    // should Main know about the pause/play status or only footer?
    this.player.pause()
    this.setState({ playing: false })
  }
  clickNext() {
    // get current song -> album id -> find it in album -> find next?
    // then we can maintain the playlist here too
    //
    const { currentSong } = this.state
    axios.get(`api/albums/${currentSong.albumId}`)
    .then(response=> response.data)
    .then(album=> {
      const idx = album.songs.findIndex((s)=> currentSong.id == s.id),
        nextSong = album.songs[idx + 1]
      if (nextSong) this.clickPlay(nextSong)
    })
  }
  clickPrevious() {
    const { currentSong } = this.state
    axios.get(`api/albums/${currentSong.albumId}`)
    .then(response=> response.data)
    .then(album=> {
      const idx = album.songs.findIndex((s)=> currentSong.id == s.id),
        previousSong = album.songs[idx - 1]
      if (previousSong) this.clickPlay(previousSong)
    })
  }
  clickShuffle() {

  }
  clickScrub() {
    
  }
  render() {
    const { albums, selectedAlbum, currentSong, playing, progress } = this.state
    const state = this.state
    const handleClick = this.handleClick.bind(this)
    const allAlbumsClick = this.allAlbumsClick.bind(this)
    const clickPlay = this.clickPlay.bind(this)
    const clickPause = this.clickPause.bind(this)
    const clickNext = this.clickNext.bind(this)
    const clickPrevious = this.clickPrevious.bind(this)
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar allAlbumsClick={ allAlbumsClick }/>
        </div>
        <div className="col-xs-10">
          { selectedAlbum.id ?
            <SingleAlbum clickPlay={ clickPlay }
              album={ selectedAlbum } currentSong={ currentSong }/> :
            <AllAlbums handleClick={ handleClick } albums={ albums }/>}
        </div>
        {
          currentSong.id ?
          <Footer currentSong={ currentSong } playing={ playing }
            clickPause={ clickPause } clickPlay={ clickPlay }
            clickNext={ clickNext } clickPrevious={ clickPrevious } progress={ progress }/> :
          <span></span>
        }
      </div>
    )
  }
}

// const toJson = response=> response.data

export default Main
