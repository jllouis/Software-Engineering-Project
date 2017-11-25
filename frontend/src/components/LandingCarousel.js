import React, { Component } from 'react';
import Carousel from 'nuka-carousel'
//import '../css/carousel.css'

class LandingCarousel extends Component {
    render() {
        return (
          <div>
            <div className="LandingCarousel">
              <Carousel>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide1"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide2"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide3"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide4"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide5"/>
                <img src="http://placehold.it/1000x400/ffffff/c0392b/&text=slide6"/>
              </Carousel>
            </div>
          </div>
        );
      }
}

export default LandingCarousel;