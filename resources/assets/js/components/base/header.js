import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Card from './card';
import Axios from 'axios';
import Slider from '../../Slick'
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
        }
        this.Filter=this.Filter.bind(this);
        this.onHover=this.onHover.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    };
    handleSearch(e) {
        let query = e.currentTarget.value;
        if(query==''){this.setState({result:[]});}
        else
        {
            Axios.get(window.location.origin+'/search',{
                params:{
                    query:query
                }
            })
            .then(res=> {
                this.setState({result:res.data});
            });
        }
    }
    componentDidMount() {
        Axios.get(window.location.origin+'/user')
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
    Filter(recipes) {
        this.setState({filtered:recipes})
    }
    onHover(e,bool,color) {
        if(bool) e.currentTarget.classList.add(color, 'text-white');
        else e.currentTarget.classList.remove(color, 'text-white')
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
        let num=1;
        if(this.state.result.length>4)num=2;
        const settings = {
            slides: 5,
            step: 2,
            timing: 0.6,
            dots: true,
            dotsNumbered: false,
            dotsPosition: true,
            buttons: false,
            column: true,
            rows: 2,
            responsive: [
                {
                  breakPoint: 600,
                  settings: {
                    slides: 2,
                    step: 3,
                    timing: 0.6,
                    dots: false,
                    dotsNumbered: false,
                    dotsPosition: 1,
                    buttons: true,
                    column: true,
                    rows: 3,
                  }
                }
              ]
          }
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
          return (
            <header className="h0 height_trans 1 d-15">
            <div className="absolute hidden h0 2 diagonal_trans w0 d-10">
                <div className="gradient-3 absolute w0 h0 p-0 d-md-flex" id="white_background">
                    <div className="h-100 d-flex w-100 m-auto op-0 op_trans absolute toggle" id="bars_switch">
                        <i className="fas fa-bars fa-5x m-auto d-none d-md-block"></i>
                    </div>
                    <div className="col-12 col-md-10 h-100 m-auto p-3 pt-5 op-0 op_trans" id="menu_content">
                        <div className="col-12 col-md-10 col-lg-8 h-75 my-auto pt-5 pt-md-3">
                            <div className="h-100 row justify-content-around mt-5">
                                <a href="/browse?type=red" onMouseEnter={(e)=>this.onHover(e,true, 'red')} onMouseLeave={(e)=>this.onHover(e,false, 'red')} className="col-4 col-md-3 h-25 bordered border-red round-1 m-3 justify-content-center align-items-center d-flex pointer text-red"><h4>Beef/Chicken</h4></a>
                                <a href="/browse?type=blue" onMouseEnter={(e)=>this.onHover(e,true, 'blue')} onMouseLeave={(e)=>this.onHover(e,false, 'blue')} className="col-4 col-md-3 h-25 bordered border-blue round-1 m-3 justify-content-center align-items-center d-flex pointer text-blue"><h4>Seafood</h4></a>
                                <a href="/browse?type=green" onMouseEnter={(e)=>this.onHover(e,true, 'green')} onMouseLeave={(e)=>this.onHover(e,false, 'green')} className="col-4 col-md-3 h-25 bordered border-green round-1 m-3 justify-content-center align-items-center d-flex pointer text-green"><h4>Vegetables</h4></a>
                                <a href="/browse?type=orange" onMouseEnter={(e)=>this.onHover(e,true, 'orange')} onMouseLeave={(e)=>this.onHover(e,false, 'orange')} className="col-4 col-md-3 h-25 bordered border-orange round-1 m-3 justify-content-center align-items-center d-flex pointer text-orange"><h4>Quick Recipes</h4></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-100 w-100 absolute row none m-0 justify-content-md-end justify-content-center" id="search_back">
                    <div className="h-100 col-12 p-0 my-md-auto mt-5 all_trans round-1 op-0 d-flex flex-column align-content-start" id="search_container">
                        <div className="mw-100 d-flex float-right justify-content-end p-0 m-auto" id="search_bar">
                            <div className="col-6 d-none bg-dark rounded all d-md-flex" id="filter">
                                <Filter display={true} filter={this.Filter} recipes={this.state.result} dark={true}></Filter>
                            </div>
                            <div className="col-9 col-md-5 all align-self-stretch p-0 op_trans op-0 invisible d-5" id="search_input">
                                <input type="search" onChange={this.handleSearch} name="query" className="col-12 rounded h-100 border-0"></input>
                            </div>
                            <div className="gradient-1 h0 fa-5x col-1 col-md-2 all_trans-op p-0 rounded r-0 op-80 d-flex d-md-flex pointer toggle all" id="search_switch">
                                <i className="fas fa-search m-auto text-white icon op-0 op_trans" id="search_icon"></i>
                            </div>
                        </div>
                        <div className="col-11 col-md-10 mw-100 d-flex flex-wrap pt-2 p-0 px-1 op-0 d-none op-trans" id="search_content">
                            <div className="flex-wrap h-100 col-12 m-auto d-flex justify-content-start p-0 all" id="search">
                                {<Slider settings={settings} style={style} customPaging={this.customPaging.bind(this)}>{
                                    this.state.filtered.map((element)=>{
                                        return(<Card key={element.id} max = {0.7} data={element}/>)
                                        })}</Slider>}
                            </div>
                        </div>
    
                    </div>
                </div>
                <div className="menu_bg he-100 we-100"></div>
            </div>        
            <div className="align-items-center text-center d-flex flex-column relative none">
                <div className="col-12 d-flex justify-content-between p-0 all" id="header">
                    <div className="my-auto bg-white justify-content-between d-flex rounded h-100 pointer">
                        <div className="w-50 h-100 d-flex rounded p-2" id="open_menu">
                            <i className="fas fa-bars fa-2x m-auto bars"></i>
                        </div>
                        <div className="w-50 rounded text-white p-2 gradient-1 op-80 h-100 d-flex" id="open_search">
                            <i className="fas fa-search fa-2x m-auto search"></i>
                        </div>
                    </div>
                    {
                        this.state.authenticated? (<SignedIn user={this.state.user} />):(<Guest/>)
                        }
                </div>
                <div id="header_bg" >
                    <svg width="100%" viewBox="0 0 37.32 15.577" xmlns="https://www.w3.org/2000/svg"><path d="M 0,0 A 18.979,18.979 0 0 0 18.663,15.577 18.979,18.979 0 0 0 37.319,0 Z" fill="#da4d55c8" paintOrder="fill markers stroke"/></svg>
                </div>
                <a className="absolute p-1 pt-2 p-md-2 p-lg-2 col-lg-1 col-2 pointer all" href={window.location.origin}><img className="m-auto" src='/images/logo.svg' id="logo"></img></a>
            </div>
        </header>
        );
    }
}

if (document.getElementById('head')) {
    ReactDOM.render(<Header />, document.getElementById('head'));
}
