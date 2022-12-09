import './PlaylistList.css';
import React, { Component } from 'react';
import PlaylistListItem from '../PlaylistListItem/PlaylistListItem';

class PlaylistList extends Component {

    render() {
        return (
            <div className="PlaylistList">
                <h2>Your Playlists</h2>
                <div>
                    {this.props.playlists && this.props.playlists.map((playlist) => {
                        return (
                            <PlaylistListItem
                                name={playlist.playlistName}
                                key={playlist.playlistId}
                                id={playlist.playlistId}
                                selectPlaylist={this.props.selectPlaylist}
                            />
                        );
                    })}
                </div>
            </div>
        )
    }
    
}

export default PlaylistList;