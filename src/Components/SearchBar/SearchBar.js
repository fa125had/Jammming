import React, { Component } from 'react';
import './SearchBar.css';

export default class SerachBar extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);

  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleTermChange(eo) {
    this.setState({ term: eo.target.value });
  }

  render() {
    return (
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleTermChange} />
        <button onClick={this.search} className="SearchButton">SEARCH</button>
      </div>
    )
  }
}
