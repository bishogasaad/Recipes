import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactText from 'react-fittext';
export default class product extends Component {
    constructor(props){
        super(props);
        this.onhover=this.onhover.bind(this);
        this.offhover=this.offhover.bind(this);
    }
    onhover(e){
        if(this.props.Available)
        e.target.innerHTML='Buy Now';
    }
    offhover(e){
        if(this.props.Available)
        e.target.innerHTML='Available';
    }
    render(){
        let base=JSON.parse(this.props.product.multiples)[0];
        return(
        <div className="p-1 product item">
            <div className="text-red bg-white round-1 align-items-center flex-column p-1">
                <ReactText compressor={1.1}>
                    <h4 className="text-center h4 pointer">{this.props.product.name}</h4>
                </ReactText>
                <div className="relative d-flex">
                    <div>
                        <img className={"round-1 m-auto col img-fluid p-0 border-red bordered-2x cover"}
                        src={'./images/StockSnap_IZBN5G7AAB.jpg'}></img>
                    </div>
                    <div className="d-flex flex-wrap text-white justify-content-center bg-white absolute h-100 col p-1 align-items-center op_trans info">
                        <div className={(this.props.Available?"text-success":"text-danger")+" col-12 p-1 text-center"}>
                            <div>
                                <ReactText compressor={0.6}>
                                    <h1>{'Price: '+ this.props.product.price}<br/>{' $ / '+base+' '+this.props.product.type}</h1> 
                                </ReactText>
                            </div>
                        </div>
                        <div className="col-12 p-2 text-center">
                            <div className={(this.props.Available?"bg-success":"bg-danger")+" round p-1 pointer"} onMouseLeave={this.offhover} onMouseEnter={this.onhover} >
                                {this.props.Available?'Available':'Unavailable'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}