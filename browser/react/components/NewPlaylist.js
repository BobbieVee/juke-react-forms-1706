import React, { Component } from 'react';
import axios from 'axios';

class NewPlaylist extends Component {
  constructor() {
    super()
    this.state = {
      input: ''
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(e){
    const input = e.target.value;
    this.setState({input});
    event.preventDefault();
  }

  handleSubmit(){
    const input = this.state.input;
    axios.post('/api/playlists', { name: input })
    .then( () => {
      this.setState({input: ''})
    })
  }

  render() {
    const input = this.state.input;
    return (
      <div className="well">
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Playlist</legend>
            <div className="form-group">
              <label className="col-xs-2 control-label">Name</label>
              <div className="col-xs-10">
                <input className="form-control" type="text" value={input} onChange={this.handleInput}/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default NewPlaylist
