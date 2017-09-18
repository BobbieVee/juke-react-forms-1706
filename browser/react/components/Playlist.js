import React, { Component } from 'react';
import axios from 'axios';
import Songs from './Songs';
import AddSongForm from './AddSongForm.js';

export default class Playlist extends Component{
	constructor(props){
		super();
		this.state = {
			playlist:{},
			playlistSongs: []
		}
		this.playlistAddSong = this.playlistAddSong.bind(this);
		this.playlistId = props.match.params.playlistId;
	}

	componentDidMount(){
		const id = this.playlistId;
		this.setPlaylist(id)
	}

	setPlaylist(id){
		Promise.all([
			axios.get(`/api/playlists/${id}`),
			axios.get(`/api/playlists/${id}/songs`)
		])
			.then( ([playlist, playlistSongs]) => {
				this.setState({playlist: playlist.data, playlistSongs: playlistSongs.data});
			})		
	}

	componentWillReceiveProps(nextProps){
    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;

    if (nextPlaylistId !== currentPlaylistId) {
    	this.setPlaylist(nextPlaylistId);
    }
	}

	playlistAddSong(id){
		const { playlist} = this.state;	
		return axios.post(`/api/playlists/${playlist.id}/songs`, {id: id})
			.then(() => {
				// console.log('HERER')
				return 	axios.get(`/api/playlists/${playlist.id}/songs`)
			})
			.then(playlistSongs => this.setState({playlistSongs: playlistSongs.data}));
	}

	render(){
		const { playlist, playlistSongs, error } = this.state;
		const playlistId = this.playlistId;
		return(
			<div>
			  <h3>{ playlist.name }</h3>
			  <Songs songs={playlistSongs} /> {/** Hooray for reusability! */}
			  { playlist.songs && !playlist.songs.length && <small>No songs.</small> }
			  <hr />
			  <AddSongForm playlistAddSong={this.playlistAddSong} playlistId={playlistId} playlistSongs={playlistSongs} error={error}/>
			</div>
		)
	}
	
}

