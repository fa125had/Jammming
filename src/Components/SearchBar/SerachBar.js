import React, { Component } from 'react';
import './SearchBar.css';

export default class SerachBar extends Component {
  render() {
    return (
        <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" />
        <button className="SearchButton">SEARCH</button>
      </div>
    )
  }
}
