import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import StatefulAlbums from './StatefulAlbums';
import SingleAlbum from './SingleAlbum';
import AllArtists from './AllArtists';
import SingleArtist from './SingleArtist';
import NewPlaylist from './NewPlaylist';
import Sidebar from './Sidebar';
import Player from './Player';
import Playlist from './Playlist';

export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      playlists: []
    }
    this.handleNewPlaylist = this.handleNewPlaylist.bind(this);
  }

  componentDidMount(){
    this.setPlaylists();  
  }

  setPlaylists(){
    axios.get('/api/playlists')
    .then(playlists => this.setState({playlists: playlists.data}));
  }

  handleNewPlaylist(name){
    axios.post('/api/playlists', { name })
    .then( () => {
      this.setPlaylists();
    });
  }

  render () {
    const { playlists } = this.state;
    return (
      <Router>
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar playlists={playlists}/>
          </div>
          <div className="col-xs-10">
            <Switch>
              <Route exact path="/albums" component={StatefulAlbums} />
              <Route path="/albums/:albumId" component={SingleAlbum} />
              <Route exact path="/artists" component={AllArtists} />
              <Route path="/artists/:artistId" component={SingleArtist} />
              <Route exact path="/playlists/new" render={() => <NewPlaylist handleNewPlaylist={this.handleNewPlaylist}/> } />
              <Route path="/playlists/:playlistId" component={Playlist} />
              <Route component={StatefulAlbums} />
            </Switch>
          </div>
          <Player />
        </div>
    </Router>
    );
  }
}
