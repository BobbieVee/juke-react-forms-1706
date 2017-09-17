import React, { Component } from 'react';
import axios from 'axios';
import Songs from './Songs';

export default class Playlist extends Component{
	constructor(){
		super();
		this.state = {
			playlist:{}
		}
	}

	componentDidMount(){
		const id = this.props.match.params.playlistId;
		this.setPlaylist(id)
	}

	setPlaylist(id){
		axios.get(`/api/playlists/${id}`)
			.then( playlist => {
				this.setState({playlist: playlist.data});
			})		
	}

	componentWillReceiveProps(nextProps){
    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;
    if (nextPlaylistId !== currentPlaylistId) {
    	this.setPlaylist(nextPlaylistId);
    }
	}

	render(){
		const { playlist } = this.state;
		return(
			<div>
			  <h3>{ playlist.name }</h3>
			  <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
			  { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
			  <hr />
			</div>
		)
	}
	
}

