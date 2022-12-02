import React, { Component } from 'react';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends Component {
    render() {
        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track
                            track={track}
                            key={track.id}
                            onAdd={this.props.onAdd}
                            onRemove={this.props.onRemove}
                            isRemoval={this.props.isRemoval} />
                    })

                }
            </div>
        )
    }
}
export default  TrackList;