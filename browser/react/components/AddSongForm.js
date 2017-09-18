import React, {Component} from 'react';
import axios from 'axios';


export default class AddSongForm extends Component{
	constructor(props){
		super();
		this.state = {
			value: 1,
			dropdownSongs: [],
			hidden: true,
			error: ''
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.playlistAddSong = props.playlistAddSong;
		this.playlistSongs = props.playlistSongs	;
		this.playlistId = props.playlistId;
		this.error = props.error;
	}

	componentDidMount(){
		const playlistId = this.playlistId;
					console.log('CDM playlist = ', playlistId)

		Promise.all([
			axios.get('/api/songs'),
			axios.get(`/api/playlists/${playlistId}/songs`)
		])
		.then(([songs, _playlistSongs]) => {
			const allSongs = songs.data;
			const playlistSongs = _playlistSongs.data;
			// const dropdownSongs = playlistSongs.reduce((memo, playlistSong) => {
			// 	return memo.filter(song => {
			// 		return song.id !== playlistSong.id;
			// 	} )
			// }, allSongs);
			// console.log('dropdownSongs:', dropdownSongs)
			this.setState({ dropdownSongs: allSongs });
		})
	}

	componentWillReceiveProps(){

	}

	handleChange(e){
		this.setState({value: e.target.value});
	}

	handleSubmit(e){
		e.preventDefault();
		console.log('this.state: ', this.state)
		this.playlistAddSong(this.state.value)
		.then(() => {
			console.log('here')
			this.setState({value: 1, error: '', hidden: true});
		} )
		.catch((err) => {
			console.log(err)
			this.setState({error: "Song already exists in list!", hidden: ''} )
	}) ;
	}

	render(){
		const {dropdownSongs, value, hidden, error} = this.state;
		const {handleSubmit, handleChange, playlist} = this;
		return(
			<div className="well">
		    <form className="form-horizontal" noValidate name="songSelect" onSubmit={handleSubmit}>
		      <fieldset>
		        <legend>Add to Playlist</legend>
		        <div className="form-group" >
		          <label htmlFor="song" className="col-xs-2 control-label">Song</label>
		          <div className="col-xs-10">
		            <select className="form-control" value={value} name="song" onChange={handleChange}>
		            {dropdownSongs.map(song => {
		              return (<option key={song.id} value={song.id}>{song.name}</option>)		
		            })}
		            </select>
		          </div>
		        </div>
            <div className="alert alert-warning"  hidden={hidden} >{error}</div>

		        <div className="form-group"    >
		          <div className="col-xs-10 col-xs-offset-2">
		            <button type="submit" className="btn btn-success">Add Song</button>
		          </div>
		        </div>
		      </fieldset>
		    </form>
		  </div>
		)
	}
}