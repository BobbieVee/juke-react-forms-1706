import React from 'react'
import axios from 'axios'

const SingleAlbum = ({ album, clickPlay, currentSong })=> {
  return (
    <div className="album col-xs-10">
      <div>
        <h3>{ album.name }</h3>
        <img src={ album.imageUrl || `https://placeholdit.imgix.net/~text?txtsize=33&txt=IshouldBEanIMAGE&w=300&h=300` } className="img-thumbnail" />
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Artists</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {
            album.songs.map(song=>
              <tr key={ song.id }>
                <td>
                  {
                    currentSong.id != song.id ?
                    <button className="btn btn-default btn-xs" onClick={ ()=> clickPlay(song) }>
                      <span className="glyphicon glyphicon-play"></span>
                    </button> :
                    <span></span>
                  }
                </td>
                <td>{ song.name }</td>
                <td>
                  {
                    album.artists.map(artist=> <span key={ artist.id }>{ artist.name }</span>)
                  }
                </td>
                <td>{ song.genre }</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

/*
  API STUFF
  All albums /api/albums
  A specific album /api/albums/:albumId
  A specific album's cover art (the actual image file) /api/albums/:albumId/image
  A specific song's audio file api/albums/:albumId/songs/:songId
  All songs from an album api/albums/:albumId/songs/
*/

export default SingleAlbum
