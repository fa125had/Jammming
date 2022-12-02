
import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';
import Popup from '../Popup/Popup';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.closePopup = this.closePopup.bind(this);

    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: [],
      popup: false,
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
    this.setState({ playlistName: newPlaylistName });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        popup: true
      })
    });
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
  }

  closePopup() {
    this.setState({ popup: false });
  }
  componentDidMount() {
    Spotify.getAccessToken();
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          {/* <!-- SearchBar component --> */}
          <SearchBar
            onSearch={this.search} />

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
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist} />
          </div>
        </div>
        <Popup popup={this.state.popup} closePopup={this.closePopup} />
      </div>
    );
  }
}
export default App;
