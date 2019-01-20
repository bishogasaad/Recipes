import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card';
import Axios from 'axios';
import Slider from 'react-slick'
import Filter from '../base/filter';

class Guest extends Component{
    render() {  
        return(
        <div className="my-auto d-flex justify-content-between">
            <a href={window.location.origin+"/login"}>
                <div className="round blue px-3 text-white">
                    <i className="fas fa-sign-in-alt"></i>
                    {(window.outerWidth>767)?" LOGIN":""}
                </div>
            </a>
            <a href={window.location.origin+"/register"}>
                <div className="round blue mx-2 px-3 text-white">
                    <i className="fas fa-user-plus"></i>
                    {(window.outerWidth>767)?" SignUp":""}
                </div>
            </a>
        </div>
        )
    }
}
class SignedIn extends Component{
    constructor(props){
        super(props);
    }
    render() {  
        return(
        <div className="my-auto d-flex justify-content-between">
            <a href={window.location.origin+"/user/"+this.props.user.name.replace(new RegExp(" ", "g"), '-')+"?id="+this.props.user.id}>
                <div className="round blue px-3 text-white">
                    <i className="fas fa-user"></i>
                    { (window.outerWidth>767)?" "+this.props.user.name:""}
                </div>
            </a>
            <a href={window.location.origin+"/logout"}>
                <div className="round blue mx-2 px-3 text-white">
                    <i className="fas fa-sign-out-alt"></i>
                    { (window.outerWidth>767)?" SignOut":""}
                </div>
            </a>
        </div>
        )
    }
}

export default class Header extends Component {
    constructor(){
        super();
        this.slider=React.createRef();
        this.state={
            result:[],
            filtered:[],
            user:{name:null,id:null},
            authenticated:false,
            url:window.location.origin
        }
        this.Filter=this.Filter.bind(this);
    };
    handleSearch(query){
        if(query==''){this.setState({result:[]});}
        else
        {Axios.get(this.state.url+'/search/',{
            params:{
                query:query
            }
        })
        .then(res=> {
            this.setState({result:res.data});
          });}
    }
    componentDidMount(){
        Axios.get(this.state.url+'/user')
        .then((res)=>{
            if(res.data!='')
            this.setState({user:{name:res.data[0],id:res.data[1]},authenticated:true});
            else
            this.setState({authenticated:false});
        })
        .catch(()=>{
            this.setState({authenticated:false});
        });
    }
    Filter(recipes){
        this.setState({filtered:recipes})
    }
    render() {
        let num=1;
        if(this.state.result.length>4)num=2;
        var settings = {
            dots: true,
            arrows:false,
            infinite: false,
            speed: 500,
            rows:num,
            swipeToSlide:true,
            slidesToShow:4,
            appendDots: dots => (
                <div>
                  <ul> {dots} </ul>
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
                    dots:false,
                    rows:2,
                    vertical:true,
                    verticalSwiping:true
                  }
                }
              ]
          };
          return (
            <header className="h0 height_trans 1 d-15">
            <div className="absolute hidden h0 2 diagonal_trans w0 d-10">
                <div className="gradient-3 absolute none w0 h0 p-0 d-md-flex" id="white_background">
                    <div className="h-100 d-flex w-100 m-auto op-0 op_trans absolute toggle" id="bars_switch">
                        <i className="fas fa-bars fa-5x m-auto d-none d-md-block"></i>
                    </div>
                    <div className="col-12 col-md-10 h-100 m-auto p-3 pt-5 op-0 op_trans" id="menu_content">
                        <div className="col-12 col-md-10 col-lg-8 h-75 my-auto pt-5 pt-md-3">
                            <div className="h-100 row justify-content-around mt-5">
                            
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>
                                <div className="col-3 h-25 bordered border-red round-1 m-3 pointer"></div>

                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="h-100 w-100 absolute row none m-0 justify-content-md-end justify-content-center" id="search_back">
                    <div className="h-100 col-12 p-0 my-md-auto mt-5 all_trans round-1 op-0 d-flex flex-column align-content-start" id="search_container">
                        <div className="mw-100 d-flex float-right justify-content-end py-md-3 p-0 m-auto" id="search_bar">
                            <div className="col-6 d-none bg-dark rounded all d-md-flex" id="filter">
                                <Filter display={true} filter={this.Filter} recipes={this.state.result} dark={true}></Filter>
                            </div>
                            <div className="col-9 col-md-5 all align-self-stretch p-0 op_trans op-0 invisible d-5" id="search_input">
                                <input type="search" onChange={(e)=>{this.handleSearch(e.target.value);}} name="query" className="col-12 rounded h-100 border-0"></input>
                            </div>
                            <div className="gradient-1 h0 fa-5x col-1 col-md-2 all_trans-op p-3 p-md-2 rounded r-0 op-80 d-flex d-md-flex pointer toggle all" id="search_switch">
                                <i className="fas fa-search m-auto text-white icon op-0 op_trans" id="search_icon"></i>
                            </div>
                        </div>
                        <div className="col-11 col-md-10 mw-100 d-flex flex-wrap pt-2 p-0 px-1 op-0 d-none op_trans" id="search_content">
                            <div className="flex-wrap h-100 col-12 m-auto d-flex justify-content-start p-0 all" id="search">
                                {<Slider ref={this.slider} className="col-12 d-flex" {...settings}>{
                                    this.state.filtered.map((element)=>{
                                        return(<Card key={element.id} data={element}/>)
                                        })}</Slider>}
                            </div>
                        </div>
    
                    </div>
                </div>
                <div className="menu_bg he-100 we-100"></div>
            </div>        
            <div className="align-items-center text-center d-flex flex-column relative none">
                <div className="col-12 d-flex justify-content-between p-0 all" id="header">
                    <div className="my-auto bg-white justify-content-between d-flex rounded h-100 square-2x pointer">
                        <div className="w-50 h-100 d-flex rounded" id="open_menu">
                            <i className="fas fa-bars fa-2x m-auto bars"></i>
                        </div>
                        <div className="w-50 rounded text-white gradient-1 op-80 h-100 d-flex" id="open_search">
                            <i className="fas fa-search fa-2x m-auto search"></i>
                        </div>
                    </div>
                    {
                        this.state.authenticated? (<SignedIn user={this.state.user} />):(<Guest/>)
                        }
                </div>
                <div id="header_bg" >
                    <svg width="100%" viewBox="0 0 37.32 15.577" xmlns="http://www.w3.org/2000/svg"><path d="M0 0a18.979 18.979 0 0 0 18.663 15.577A18.979 18.979 0 0 0 37.319 0z" fill="#da4d55c8" paintOrder="fill markers stroke"/></svg>
                </div>
                <a className="absolute p-1 pt-2 p-md-2 px-lg-0 col-lg-1 col-2 pointer all" href={this.state.url}><img className="m-auto" src={this.state.url+'/images/logo.svg'} id="logo"></img></a>
            </div>
        </header>
    

        );
    }
}

if (document.getElementById('head')) {
    ReactDOM.render(<Header />, document.getElementById('head'));
}
