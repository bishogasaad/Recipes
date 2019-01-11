import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductCard from '../base/product';
import Slider from 'react-slick';
import axios from 'axios';
export default class Section3 extends Component {
    constructor(props){
        super();
        this.state={
            products:[]
        }
    }
    componentDidMount(){

    }
    render() {
        var settings = {
            dots: true,
            arrows:false,
            infinite: false,
            speed: 500,
            rows:2,
            slidesToShow:6,
            swipeToSlide:true,
            appendDots: dots => (
                <div>
                  <ul> {dots} </ul>
                </div>
              ),
              customPaging: i => (
                <div className="round p-2 border-white border">
                <div className="round w0 bg-white p-1"></div>
                </div>
              ),
            responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 3,
                    rows:2,
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    rows:2,
                    vertical:true,
                    verticalSwiping:true
                  }
                }
              ]
          };
          var product={name:'sdf f sfsdfgsergvdd gdf gdfs gd',price:323,type:'kg'}
        return (
            <div className="p-1 py-md-5 col-12 h-100">
                <div className="d-flex col flex-column align-items-center h-100 py-4">
                    <div className="col-1"></div>
                    <div className="col-auto blue h4 text-center text-white m-0 round-top">Feautered Products</div>
                    <div className="round-1 border-blue bordered-2x col-10 p-1 align-items-center" id="products" styles="zIindex: 100">
                        <Slider className="col-12 h-100 d-flex" {...settings}>
                            {}
                        </Slider>
                    </div>
                </div>
                <div className="col p-2 justify-content-center row align-items-center">
                    <div className="p-1 px-4 round col-8 col-md-3 d-flex red text-white text-center pointer">
                        <p className="m-auto h5">Browse by Ingredients</p>
                    </div>
                </div>
            </div>
        );
    }
}
if (document.getElementById('product_sec')) {
    ReactDOM.render(<Section3 />, document.getElementById('product_sec'));
}