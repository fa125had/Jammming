
import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist';
import SerachBar from '../SearchBar/SerachBar';
import SearchResults from '../SearchResults/SearchResults';
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);

    this.state = {
      searchResults: [{
        name: 'Baroon',
        artist: 'farshad',
        album: 'pichak',
        id: 1
      }, {
        name: 'Baraye',
        artist: 'Shervin',
        album: 'Zendegi',
        id: 2
      }, {
        name: 'pink',
        artist: 'pinkfloyd',
        album: 'triangle',
        id: 3
      }],
      playlistName: 'New Playlist',
      playlistTracks: [{
        name: 'paeez',
        artist: 'ebi',
        album: 'setareh',
        id: 4
      }, {
        name: 'shemshad',
        artist: 'dariush',
        album: 'nazanin',
        id: 5
      }]
    };
  }

  addTrack(newTrack) {
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === newTrack.id)) {
      return;
    }
    tracks.push(newTrack);
    this.setState({ playlistTracks: tracks });
  }

  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ playlistTracks: tracks });
  }

  updatePlaylistName(newPlaylistName) {
    this.setState({playlistName: newPlaylistName});
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          {/* <!-- SearchBar component --> */}
          <SerachBar />
          <div className="App-playlist">

            {/* <!-- SearchResults component --> */}
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack} />

            {/* <!-- Playlist component --> */}
            <Playlist 
            playlistName={this.state.playlistName} 
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName} />
          </div>
        </div>
      </div>
    );
  }
}

