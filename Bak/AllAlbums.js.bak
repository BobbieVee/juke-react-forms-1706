import React from 'react'

const AllAlbums = ({ albums, handleClick })=> {
  return (
    <div>
      {
        albums.map(album=>
          <div className="col-xs-4" key={ album.id } onClick={ ()=> handleClick(album) }>
            <a className="thumbnail" href="#">
              <img src={ album.imageUrl } />
              <div className="caption">
                <h5>
                  <span>{ album.name }</span>
                </h5>
                <small>{ album.songs.length } songs</small>
              </div>
            </a>
          </div>
        )
      }
    </div>
  )
}

export default AllAlbums
