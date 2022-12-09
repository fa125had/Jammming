import './PlaylistListItem.css';
import React, { Component } from 'react';

class PlaylistListItem extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.selectPlaylist(this.props.id, this.props.name);
        // console.log(this.props.id);
    }
    render() {
        return (
            <div className="PlaylistItem">
                <h3
                    onClick={this.handleClick}
                    name={this.props.name}
                >
                    {this.props.name}
                </h3>
            </div>
        )
    }
}

export default PlaylistListItem;
