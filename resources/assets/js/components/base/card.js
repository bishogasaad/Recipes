import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactText from 'react-fittext';
import axios from 'axios';
export default class Card extends Component {
    constructor(props){
        super(props)
        this.editRecipe=this.editRecipe.bind(this);
        this.deleteRecipe=this.deleteRecipe.bind(this);
    }
    editRecipe(){
        this.props.editRecipe(this.props.data.id);
    }
    deleteRecipe(){
        if (confirm('Are you sure you want to Delete this Recipe ?')) {
            axios.delete(window.location.origin+"/recipe/"+this.props.data.id)
            .then(res=>{window.location=res.data});
        }
    }
    render(){
        let url=window.location.origin;
        let hour = Math.floor(this.props.data.time);
        let min = (this.props.data.time*100).toFixed(0)-Math.floor(this.props.data.time)*100;
        let value=(min/60*360)-180;
        let m, r=128;
        if(value<0)m=0;else m=1;
        let x=(Number(r*Math.sin(-value/180*Math.PI))+parseFloat(r));
        let y=(Number(r*Math.cos(value/180*Math.PI))+parseFloat(r));
        let hourdraw="M"+r+" 0 A"+r+" "+r+ " 0 "+m+",1 "+ x+" "+ y;
        value=(hour/12*360)-180;
        if(value<0)m=0;else m=1;
        x=(Number(r*Math.sin(-value/180*Math.PI))+parseFloat(r));
        y=(Number(r*Math.cos(value/180*Math.PI))+parseFloat(r));      
        let mindraw="M"+r+" 0 A"+r+" "+r+ " 0 "+m+",1 "+ x+" "+ y;

        let color,col;
        let person=(a,i)=>{
            let rotate="rotate("+a+" 128 128)"
            return(
            <g key={i.toString()} transform={rotate}>
            <g transform="translate(105)" id="person">
            <rect x="38.5" y="24" width="7.5" height="30" ry="4" fill="#5481e9"/>
            <rect y="24" width="7.5" height="30" ry="4" fill="#5481e9"/>
            <circle cx="23" cy="24" r="13.5" fill="#f6aa79"/>
            <rect x="5" width="36" height="8" ry="3" fill="#643f2a"/>
            </g></g>);}
        
        let chair =(a,i)=>{
            let rotate="rotate("+a+" 128 128)"
            return(
                <g key={i.toString()} transform={rotate}>
                <rect transform="translate(110)" width="36" height="55" ry="5" fill="#a06543" id="chair"/>
                </g>
            );
        }
        let chairs=[];let persons=[];
        for(var i = 0;i<this.props.data.persons;i++)
        {
            let a=360/this.props.data.persons*i;
            persons.push(person(a,i));
            chairs.push(chair(a,i));
        }
        if(this.props.data.type==0){color = '#f5833a';col="orange";}
        if(this.props.data.type==1){color = '#da4d55';col="red";}
        if(this.props.data.type==2){color = '#5da759';col="green";}
        if(this.props.data.type==3){color = '#76b6d9';col="blue";}
        if(this.props.data.type==4){color = '#f5833a';col="orange";}
        var content=(
            <div className="col-12 p-1 h-100 recipe">
                <div id="card" className={"text-"+col+" bg-white justify-content-end d-flex round-1 h-100 flex-column p-1"}>
                    <ReactText compressor={1.5}>
                        <p className="text-center m-auto">{this.props.data.title.replace(new RegExp("-", "g"), ' ')}</p>
                    </ReactText>
                    <div className="relative d-flex">
                        <div>
                            <img className={"round-1 m-auto img-fluid p-0 border-"+col+" bordered-2x cover"}
                            src={url+'/images/StockSnap_IZBN5G7AAB.jpg'}></img>
                        </div>
                        {this.props.edit?
                        <div className="d-flex round-1 absolute h-100 op_trans bg-white col-12 info">
                            <i onClick={this.editRecipe} className="pointer fas fa-edit fa-3x m-auto"/>
                            <i onClick={this.deleteRecipe} className="pointer text-danger fas fa-trash fa-3x m-auto"/>
                        </div>:
                        <div className="d-flex round-1 absolute h-100 p-1 align-items-center op_trans info">
                            <div className="col-6 p-1">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="100%" className='d-flex m-auto' xmlns="http://www.w3.org/1999/xlink" viewBox="-1 -1 256 256">
                                    <clipPath id="circle">
                                        <circle cx="127" cy="127" r="127"/>
                                    </clipPath>
                                    <g clipPath="url(#circle)">
                                        <circle id="circle" cx="128" cy="128" r="128" fill="#fff"/> 
                                        <path strokeWidth="55" stroke="#FFC15E"  fill="transparent" d={mindraw}/>
                                        <path stroke={color} strokeWidth="30"  fill="transparent" d={hourdraw}/>
                                        <text fill={color} fontFamily="sans-serif" alignmentBaseline="central" textAnchor="middle" x="50%" y="45%" fontSize="320%">
                                            <tspan alignmentBaseline="central">{hour}</tspan> :<tspan alignmentBaseline="central">{min}</tspan></text>
                                        <text fill={color} fontFamily="sans-serif" fontSize="120%" x="50%" y="70%" textAnchor="middle">
                                            <tspan x="28%">hours</tspan> <tspan x="68%">minutes</tspan>
                                        </text>
                                    </g>
                                </svg>
                            </div>
                            <div className="col-6 p-1">
                                <svg version="1" viewBox="0 0 256 256" width='100%' className='d-flex m-auto' xmlns="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/1999/xlink">
                                    <circle cx="128" cy="128" r="128" fill={color}/>
                                    <g transform="translate(6.4 6.4) scale(0.95)">
                                    <g id="chairs">
                                        {chairs}
                                    </g>
                                    <circle cx="50%" cy="50%" r="85" fill="#fff"/>
                                    <text fill={color} fontFamily="sans-serif" textalign="center" textAnchor="middle" wordSpacing="0px" xml="preserve">
                                    <tspan id="num" x="50%" y="42%" fontSize="430%" textAnchor="middle" alignmentBaseline="central">{this.props.data.persons}</tspan>
                                    <tspan x="50%" y="63%" fontSize="130%" alignmentBaseline="central" letterSpacing="2px">persons</tspan></text>
                                    {persons}
                                    </g>
                                </svg>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        )
        if(this.props.edit)
            return(content)
        else
            return (
            <a className="item pointer align-self-center h-100" href={"http://localhost:8080/recipe/"+this.props.data.title}>
                {content}
            </a>
        );
    }

}