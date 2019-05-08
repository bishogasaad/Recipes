import React, { Component } from 'react'

export default class Persons extends Component {
    render () {
        let hour = Math.floor(this.props.time);
        let min = (this.props.time*100).toFixed(0)-Math.floor(this.props.time)*100;
        let value=(min/60*360)-180;
        let m, r = 128;
        if(value<0)m=0;else m=1;
        let x=(Number(r*Math.sin(-value/180*Math.PI))+parseFloat(r));
        let y=(Number(r*Math.cos(value/180*Math.PI))+parseFloat(r));
        let hourdraw="M"+r+" 0 A"+r+" "+r+ " 0 "+m+",1 "+ x+" "+ y;
        value=(hour/12*360)-180;
        if(value<0)m=0;else m=1;
        x=(Number(r*Math.sin(-value/180*Math.PI))+parseFloat(r));
        y=(Number(r*Math.cos(value/180*Math.PI))+parseFloat(r)); 
        let mindraw="M"+r+" 0 A"+r+" "+r+ " 0 "+m+",1 "+ x+" "+ y;
        let color = this.props.color;
        return (
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xlink= "http://www.w3.org/1999/xlink" width="100%" className='d-flex m-auto' xmlns="http://www.w3.org/1999/xlink" viewBox="-1 -1 256 256">
                <clipPath id="circle">
                    <circle cx="127" cy="127" r="127"/>
                </clipPath>
                <g clipPath="url(#circle)" >
                    <circle id="circle" cx="127" cy="127" r="128" fill="#fff" stroke={color} strokeWidth={this.props.border?"5":''}/> 
                    <path strokeWidth="55" stroke="#FFC15E"  fill="transparent" d={mindraw}/>
                    <path stroke={color} strokeWidth="30"  fill="transparent" d={hourdraw}/>
                    <text fill={color} fontFamily="sans-serif" dominantBaseline="central" textAnchor="middle" x="50%" y="45%" fontSize="300%">
                        <tspan dominantBaseline="central">{hour}</tspan> :<tspan dominantBaseline="central">{min}</tspan></text>
                    <text fill={color} fontFamily="sans-serif" fontSize="100%" x="50%" y="70%" textAnchor="middle">
                        <tspan x="28%">hours</tspan> <tspan x="68%">minutes</tspan>
                    </text>
                </g>
            </svg>
        )
    }
}
