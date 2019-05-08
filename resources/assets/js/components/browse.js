import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Fittext from "../Fittext";
import Slider from '../Slick.js';
import Persons from './base/persons.js';
import Time from './base/time.js';
import '../custom_lib';
import Axios from 'axios';
import Rating from 'react-rating';
import Card from './base/card.js';
export default class Browse extends Component {
    constructor(props){
        super(props);
        this.state = {
            persons: 0,
            time: {
                hours:0,
                mins:0,
                plusOne:false
            },
            type: [true,true,true,true],
            rating: 0.5,
            result:[]
        };
        this.onClick=this.onClick.bind(this);
        this.setPersons=this.setPersons.bind(this);
        this.setMins=this.setMins.bind(this);
        this.setHour=this.setHour.bind(this);
        this.setRating=this.setRating.bind(this);
        this.search=this.search.bind(this);
    }
    componentDidMount(){
        var url = new URL(window.location.href)
        var type = url.searchParams.get("type")
        var t = this.state.type;
        if (type=="red"){
            $("#browse-blue").toggleClass("blue border-blue text-blue text-white");
            $("#browse-green").toggleClass("green border-green text-green text-white");
            $("#browse-orange").toggleClass("orange border-orange text-orange text-white");
            t = [true,false,false,false];
        }
        if (type=="blue"){
            $("#browse-red").toggleClass("red border-red text-red text-white");
            $("#browse-green").toggleClass("green border-green text-green text-white");
            $("#browse-orange").toggleClass("orange border-orange text-orange text-white");
            t = [false,true,false,false];
        }
        if (type=="green"){
            $("#browse-red").toggleClass("red border-red text-red text-white");
            $("#browse-blue").toggleClass("blue border-blue text-blue text-white");
            $("#browse-orange").toggleClass("orange border-orange text-orange text-white");
            t = [false,false,true,false];
        }
        if (type=="orange"){
            $("#browse-red").toggleClass("red border-red text-red text-white");
            $("#browse-blue").toggleClass("blue border-blue text-blue text-white");
            $("#browse-green").toggleClass("green border-green text-green text-white");
            t = [false,false,false,true];
        }
        this.setState({type:t},()=>this.search());
    }
    setPersons(e){
        this.setState({persons:Number(e.currentTarget.value)},()=>this.search());
    }
    setHour(e){
        let time = this.state.time;
        time.hours = Number(e.currentTarget.value)
        if(this.state.time.plusOne){
            time.hours += 1;
        }
        this.setState({time:time},()=>this.search());
    }
    setMins(e){
        let time = this.state.time;
        time.mins = Number(e.currentTarget.value)%60
        if (e.currentTarget.value == 60){
            time.hours += 1;
            time.plusOne = true;
        }
        else if (time.plusOne){
            time.hours -= 1;
            time.plusOne = false;
        }
        this.setState({time:time},()=>this.search());
    }
    setRating(e){
        this.state.rating = e;
        this.setState({rating:this.state.rating},()=>this.search());
    }
    onClick(e){
        let type = [];
        if (e.currentTarget.classList.contains("red") || e.currentTarget.classList.contains("text-red"))
        {
            $(e.currentTarget).toggleClass("red border-red text-red text-white");
            type = this.state.type;type[0]=!type[0];
        }
        if (e.currentTarget.classList.contains("blue") || e.currentTarget.classList.contains("text-blue"))
        {
            $(e.currentTarget).toggleClass("blue border-blue text-blue text-white");
            type = this.state.type;type[1]=!type[1];
        }
        if (e.currentTarget.classList.contains("green") || e.currentTarget.classList.contains("text-green"))
        {
            $(e.currentTarget).toggleClass("green border-green text-green text-white");
            type = this.state.type;type[2]=!type[2];
        }
        if (e.currentTarget.classList.contains("orange") || e.currentTarget.classList.contains("text-orange"))
        {
            $(e.currentTarget).toggleClass("orange border-orange text-orange text-white");
            type = this.state.type;type[3]=!type[3];
        }
        this.setState({type:type},()=>this.search());
    }
    search(){
        let type = [1,2,3,4];
        for(var i=0; i< this.state.type.length; i++) {
            type[i] = this.state.type[i]*type[i];
        }
        type.sort();
        while(type[0]==0){
            type.shift();
        }
        type = type.join(',');
        let time = Number(this.state.time.hours+this.state.time.mins*0.01).toFixed(2);
        Axios.get(window.location.origin+'/recipe',{
            params: {
                type:type,
                persons:this.state.persons,
                time:time,
                rating:this.state.rating
            }
        }).then((res)=>{
            this.setState({result:res.data});
        });
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
        let persons = []
        for (var i=0;i<10;i++){
            persons.push(<option key={i}>{i+1}</option>)
        }
        let timeSel = []
        for (var i=0;i<12;i++){
            timeSel.push(<option key={i}>{i}</option>)
        }
        const settings = {
            slides: 6,
            step: 2,
            timing: 0.6,
            dots: true,
            dotsNumbered: false,
            dotsPosition: true,
            buttons: false,
            column: true,
            rows: 3,
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
        let time = Number(this.state.time.hours+this.state.time.mins*0.01).toFixed(2);
        return(
            <div className="d-flex flex-wrap h-100">
                <div className="col-2 bg-light h-100 pt-5">
                    <div className="py-2">
                        <div className="bordered rounded">
                            <div className="p-1"><div id="browse-red" onClick={this.onClick} className="p-1 no-select pointer text-white bordered red rounded text-center">Beef/Chicken</div></div>
                            <div className="p-1"><div id="browse-blue" onClick={this.onClick} className="p-1 no-select pointer text-white bordered blue rounded text-center">Seafood</div></div>
                            <div className="p-1"><div id="browse-green" onClick={this.onClick} className="p-1 no-select pointer text-white bordered green rounded text-center">Vegetables</div></div>
                            <div className="p-1"><div id="browse-orange" onClick={this.onClick} className="p-1 no-select pointer text-white bordered orange rounded text-center">15 min</div></div>
                        </div>
                    </div>
                    <div className={(this.state.rating>0.5?"text-yellow":"")+" text-center bordered border-dark rounded"}>
                        <Rating onChange={this.setRating} placeholderRating={this.state.rating} placeholderSymbol="fas fa-star fa-lg" fractions={2} emptySymbol="far fa-star fa-lg" fullSymbol="fas fa-star fa-lg"/>
                    </div>
                    <div className="py-2">
                        <div className="py-2 px-1 d-flex flex-wrap justify-content-center bordered rounded">
                            <div className="p-2 col-8"><Persons persons={this.state.persons} color={this.state.persons>0?"#28a745":"#212529"}/></div>
                            <div className="col-12 text-center">
                                <input className="col-12" onChange={this.setPersons} type="range" name="volume" defaultValue="0" min="0" max="10"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="py-2">
                        <div className="py-2 px-1 d-flex flex-wrap justify-content-center bordered rounded">
                            <div className="p-2 col-8"><Time time={time} color={time>0?"#28a745":"#212529"} border={true}/></div>
                            <div className="col-12 d-flex">
                            <select onChange={this.setHour}>
                            {timeSel}
                            </select>
                            <input className="col-8" onChange={this.setMins} type="range" name="volume" defaultValue="0" min="0" max="60" step="5"/>
                            </div>
                        </div>
                    </div>   
                </div>
                <div className="col-10 p-1 px-4 d-flex flex-wrap justify-content-center align-content-end h-100">
                    <div className="col-12 d-flex p-0">
                        {this.state.persons>0?<div className="p-0 py-1"><div className="border-red bordered text-red rounded d-inline-flex p-1">Showing Recipes for {this.state.persons} Person{this.state.persons>1?'s':''} or less</div></div>:''}
                        {time>0?<div className="p-0 py-1 ml-auto"><div className="border-red bordered text-red rounded d-inline-flex p-1">Showing Recipes with {this.state.time.hours} hours and {this.state.time.mins} mins or less</div></div>:''}
                    </div>
                    <div className="col-12 d-flex justify-content-center align-items-end h-80 bordered rounded bg-light">
                        <Slider settings={settings} style={style} customPaging={this.customPaging.bind(this)}>
                            {this.state.result.map((element, i)=>{
                                return( <div key={i} className="h-100 p-0 px-3">
                                    <Card key={i} max={0.7} lines={3} min={0.5} data={element}/>
                                </div>)
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}
if (document.getElementById('browse')) {
    ReactDOM.render(<Browse />, document.getElementById('browse'));
}