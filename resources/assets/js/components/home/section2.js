import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '../base/card';
import axios from 'axios';
import Slider from 'react-slick';
import Filter from '../base/filter';
export default class Section2 extends Component {
    constructor(props){
        super(props);
        this.state={
            featured:[],
            filtered:[],
            url:window.location.origin
        }
        this.Filter=this.Filter.bind(this);
    }
    componentDidMount(){
        axios.get(this.state.url+'/featured')
        .then((res)=>{
             this.setState({featured:res.data});
        });
    }
    Filter(recipes){
        this.setState({filtered:recipes})
    }
    render() {
        var settings = {
            dots: true,
            arrows:false,
            infinite: false,
            speed: 500,
            rows:1,
            slidesToShow:5,
            swipeToSlide:true,
            appendDots: dots => (
                <div>
                  <ul className="flex-row"> {dots} </ul>
                </div>
              ),
              customPaging: i => (
                <div className="round p-2 border-white border pointer">
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
          const recipes=this.state.featured
        return (
            <div className="col d-flex flex-column p-0" id="section2_container">
                <div className="col-auto d-flex row m-0 pt-4" id="featured">                   
                    <Slider ref={this.slider} className="col-12 h-100" {...settings}>
                    {this.state.filtered.map((element)=>{
                        return(<Card key={element.id} data={element}/>)
                        })}</Slider>
                </div>
                <div className="col-auto d-flex justify-content-center text-white m-0 mt-4 row">
                    <Filter display={false} filter={this.Filter} recipes={recipes} dark={false}></Filter>
                    <div className="col-3 d-lg-none"></div>
                    <div className="col text-center">
                        <div>
                            <div className="bg-white round col-9 col-sm-6 col-md-7 col-xl-6 p-1 m-auto text-yellow">
                                <i className="fas px-1 fa-star"></i>
                                <i className="fas px-1 fa-star"></i>
                                <i className="fas px-1 fa-star"></i>
                                <i className="fas px-1 fa-star"></i>
                                <i className="fas px-1 fa-star"></i>
                            </div>
                        </div>
                        <div>
                            <p className="h2">This Month</p>
                        </div>
                    </div>
                    <div className="col-3 col-lg-4"></div>
                </div>
                <div className="col-6"></div>
            </div>
        );
    }
}
if (document.getElementById('section2')) {
    ReactDOM.render(<Section2 />, document.getElementById('section2'));
}