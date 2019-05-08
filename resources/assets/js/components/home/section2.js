import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from '../base/card';
import axios from 'axios';
import Slider from '../../Slick';
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
    customPaging(i,element){
        var content = (
        <div className="round p-2 border-white border pointer dot" onClick={(event) => element.select(event,i-1)}>
            <div className="round w0 bg-white p-1"></div>
        </div>
        )
        return content;
    }
    render() {
        const settings = {
            slides: 6,
            step: 5,
            timing: 0.6,
            dots: true,
            dotsNumbered: false,
            dotsPosition: false,
            buttons: false,
            column: false,
            rows: 1,
            responsive: [
                {
                  breakPoint: 600,
                  settings: {
                    slides: 2,
                    step: 3,
                    timing: 0.6,
                    dots: false,
                    dotsNumbered: false,
                    dotsPosition: true,
                    buttons: true,
                    column: true,
                    rows: 3,
                  }
                }
              ]
          };
          const style = {
            rightButtonStyle: {
                backgroundColor: 'white',
                zIndex: '1',
                borderRadius: '100%',
                display: 'inline-flex',
                margin: 'auto',
                width:  '2em',
                height: '2em',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #76b6d9',
                outline: '0',
                color: '#76b6d9'
            },
            leftButtonStyle: {
                backgroundColor: 'white',
                zIndex: '1',
                borderRadius: '100%',
                display: 'inline-flex',
                margin: 'auto',
                width:  '2em',
                height: '2em',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #76b6d9',
                outline: '0',
                color: '#76b6d9'
            },
            dotStyle : {
              padding: '0.4em'
            }
          };
          const recipes=this.state.featured;
        return (
            <div className="col d-flex h-100 flex-column wrap p-2" id="section2_container">
                <div className="col-11 col-md-auto w100 justify-content-center d-flex row m-0 p-1" id="featured">                   
                    <Slider settings = {settings} style = {style} customPaging = {this.customPaging.bind(this)}>
                    {this.state.filtered.map((element)=>{
                        return(<Card key={element.id} max={1} data={element}/>)
                        })}</Slider>
                </div>
                <div className="col-auto d-flex justify-content-center text-white m-0 row wrap">
                    <Filter display={false} filter={this.Filter} recipes={recipes} dark={false}></Filter>
                    <div className="col-3 d-lg-none"></div>
                    <div className="col text-center">
                        <div>
                            <div className="bg-white round col-9 col-sm-6 col-md-8 col-xl-6 p-1 m-auto text-yellow">
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
            </div>
        );
    }
}
if (document.getElementById('section2')) {
    ReactDOM.render(<Section2 />, document.getElementById('section2'));
}