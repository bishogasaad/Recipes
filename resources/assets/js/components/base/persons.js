import React, { Component } from 'react'

export default class Time extends Component {
    render () {
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
        for(var i = 0;i<this.props.persons;i++)
        {
            let a=360/this.props.persons*i;
            persons.push(person(a,i));
            chairs.push(chair(a,i));
        }
        let color = this.props.color;
        return (
            <svg version="1" viewBox="0 0 256 256" width='100%' className='d-flex m-auto' xmlns="http://www.w3.org/2000/svg" xlink= "http://www.w3.org/1999/xlink">
                <circle cx="128" cy="128" r="128" fill={color}/>
                <g transform="translate(6.4 6.4) scale(0.95)">
                <g id="chairs">
                    {chairs}
                </g>
                <circle cx="50%" cy="50%" r="85" fill="#fff"/>
                <text fill={color} fontFamily="sans-serif" textalign="center" textAnchor="middle" y="50px" wordSpacing="0px" xml="preserve">
                    <tspan id="num" fontStretch="ultra-condensed" x="50%" y="42%" fontSize="400%" textAnchor="middle" dominantBaseline="central">{this.props.persons}</tspan>
                    <tspan x="50%" y="63%" fontSize="110%" dominantBaseline="central">person{this.props.persons>1?'s':''}</tspan>
                </text>
                {persons}
                </g>
            </svg>
        )
    }
}

