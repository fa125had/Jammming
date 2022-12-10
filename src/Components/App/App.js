import './App.css';
import React, { Component } from 'react';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';
import Popup from '../Popup/Popup';
import PlaylistList from '../PlaylistList/PlaylistList';

class App extends Component {
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.getUserPlaylists = this.getUserPlaylists.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);

    this.state = {
      searchResults: [],
      playlistName: '',
      playlists: [],
      playlistTracks: [],
      playlistId: null,
      popup: false,
    };
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults })
    })
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

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  getUserPlaylists() {
    Spotify.getUserPlaylists().then((playlists) => {
      this.setState({ playlists });
    });
  }

  selectPlaylist(playlistId, playlistName) {
    Spotify.getPlaylist(playlistId)
      .then(savedPlaylist => {
        this.setState({
          playlistTracks: savedPlaylist,
          playlistName: playlistName,
          playlistId: playlistId,
        });
      })
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs, this.state.playlistId).then(() => {
      this.getUserPlaylists();
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: [],
        playlistId: null,
        popup: true,
      });
    });
  }



  closePopup() {
    this.setState({ popup: false });
  }
  componentDidMount() {
    // Spotify.getAccessToken();
    this.getUserPlaylists();
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">

          <SearchBar
            onSearch={this.search} />

          <Playlist
            playlistName={this.state.playlistName}
            playlistTracks={this.state.playlistTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlaylistName}
            onSave={this.savePlaylist} />

          <PlaylistList selectPlaylist={this.selectPlaylist} playlists={this.state.playlists} />

          <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack} />

        </div>
        <Popup popup={this.state.popup} closePopup={this.closePopup} />
      </div>
    );
  }
}
export default App;
