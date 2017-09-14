import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class AllArtists extends Component {

  constructor () {
    super();
    this.state = {
      artists: [],
      searchText: ''
    };
    this.onChangeHandler = this.onChangeHandler.bind(this)
  }

  onChangeHandler(event) {
    this.setState({ searchText: event.target.value })
  }

  componentDidMount () {
    axios.get('/api/artists')
      .then(res => res.data)
      .then(artists => this.setState({ artists, filteredArtists: artists }));
  }

  render () {
    let { artists, searchText } = this.state;
    const { onChangeHandler } = this
    artists = this.state.artists.filter(artist=> artist.name.toLowerCase().match(searchText.toLowerCase()))

    return (
      <div>
        <h3>Artists</h3>
        <form className="form-group" style={{marginTop: '20px'}}>
          <input
            className="form-control"
            placeholder="Enter artist name"
            onChange={ onChangeHandler }
            value={ searchText }
          />
        </form>
        <div className="list-group">
          {
            artists.map(artist => {
              return (
                <div className="list-group-item" key={artist.id}>
                  <Link to={`/artists/${artist.id}`}>{ artist.name }</Link>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
