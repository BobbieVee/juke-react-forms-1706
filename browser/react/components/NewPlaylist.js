import React, { Component } from 'react';
import axios from 'axios';

class NewPlaylist extends Component {
  constructor(props) {
    super()
    this.state = {
      input: '',
      disabled: true,
      hidden: true, 
      tooLong: true
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log('props = ', props)
    this.handleNewPlaylist = props.handleNewPlaylist;
  }

  handleInput(e){
    e.preventDefault();
    const input = e.target.value;
    const disabled = input.length > 0 && input.length < 16 ? false : true;
    const hidden = input.length > 0 ? true : '';
    const tooLong = input.length > 16 ? '' : true;
    this.setState({ input, disabled, hidden, tooLong });
  }

  handleSubmit(){
    const name = this.state.input;
    this.handleNewPlaylist(name);
    this.setState({input: ''});
  }

  render() {
    const {input, disabled, hidden, tooLong } = this.state;
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
            <div className="alert alert-warning"  hidden={hidden}>Please enter a name</div>
            <div className="alert alert-warning"  hidden={tooLong}>Please keep under 16 characters</div>

            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" disabled={disabled} className="btn btn-success">Create Playlist</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default NewPlaylist
