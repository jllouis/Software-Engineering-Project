import React, { Component } from 'react';
import '../css/aboutus.css'

const pStyle = {
  padding: '12%'
};

class Signupheader extends Component {
  render() {
    return (
      <div className="AboutHeader">
        <header className="intro-header">
          <div className="container">
            <div className="intro-message" style={pStyle}>
              <h1>Start creating today!</h1>
            </div>
          </div>
        </header>

      </div>
    );
  }
}

export default Signupheader;
