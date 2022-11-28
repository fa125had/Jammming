import React, { Component } from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

export default class Playlist extends Component {
    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);

    }

    handleNameChange(eo) {
        this.props.onNameChange(eo.target.value);
    }

    render() {
        return (
            <div className="Playlist">
                <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>

                {/* <!-- Add a TrackList component --> */}
                <TrackList
                    tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true} />

                <button className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}
