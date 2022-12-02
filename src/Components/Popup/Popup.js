import React, { Component } from "react";
import "./Popup.css";

class Popup extends Component {
  render() {
    return this.props.popup ? (
      <div className="popup-container">
        <div className="popup-inner">
          <button onClick={this.props.closePopup}>X</button>
          <h2>Your playlist saved successfully!</h2>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default Popup;