import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Bluebird from 'bluebird';
import axios from 'axios';
import AllAlbums from './AllAlbums';
import Songs from './Songs';

class SingleArtist extends React.Component {

  constructor () {
    super();
    this.state = {
      artist: {}
    };
  }

  componentDidMount () {
    const artistId = this.props.match.params.artistId;
    this.setArtistInfo(artistId);
    
  }

  setArtistInfo(artistId){
    const mainPath = `/api/artists/${artistId}`;
    const paths = [mainPath, `${mainPath}/albums`, `${mainPath}/songs`];
    Bluebird
      .map(paths, path => axios.get(path))
      .map(res => res.data)
      .spread((artist, albums, songs) => {
        artist.albums = albums;
        artist.songs = songs;
        this.setState({ artist });
      });
  }

  componentWillReceiveProps(nextProps){
    const artistId = this.props.match.params.artistId;
    const artistNextId = nextProps.match.params.artistId;
    if (artistId !== artistNextId) 
      this.setArtistInfo(artistNextId);
  }

  render () {

    const artist = this.state.artist;
    const albums = artist.albums || [];
    const songs = artist.songs || [];

    return (
      <div>
        <h3>{ artist.name }</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${artist.id}/albums`}>ALBUMS</Link></li>
          <li><Link to={`/artists/${artist.id}/songs`}>SONGS</Link></li>
        </ul>
        <Switch>
          <Route path={`/artists/${artist.id}/albums`} render={() => (
            <AllAlbums albums={albums} />
          )} />
          <Route path={`/artists/${artist.id}/songs`} render={() => (
            <Songs songs={songs} />
          )} />
        </Switch>
      </div>
    );
  }
}

export default SingleArtist;

