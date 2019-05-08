import React, { Component } from 'react';
import Fittext from '../../Fittext';
export default class productCard extends Component {
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
        if(this.props.edit!=null)
        return (
                <div className="product p-0 h-100 d-flex">
                    <div className="text-blue text-center bg-white round-1 align-items-center align-self-end flex-column p-1 front">
                        <Fittext className="pb-1" min = {0.1} max = {this.props.max} lines = {2} >
                            {this.props.product.name.replace("-", ' ')}
                        </Fittext>
                        <div className="relative d-flex">
                            <div>
                                <img className={"round-1 m-auto col img-fluid p-0 border-blue bordered-2x cover"}
                                src={window.location.origin + '/images/StockSnap_IZBN5G7AAB.jpg'}></img>
                            </div>
                        </div>
                    </div>
                    <div className="back round-1 blue h-100 p-1 align-content-between d-flex flex-wrap" id="productBack">
                        <p className="bordered round-1 col-12 p-0 px-1 m-0 border-white text-white">{this.props.product.description}</p>
                        {this.props.product.company?<div className="bordered round-1 col-12 p-0 px-1 text-center border-white text-white">Company <br/>{this.props.product.company}</div>:''}
                    </div>
                </div>)
        else 
        return(
            <a className='align-self-end' href={window.location.origin + '/product/' + this.props.product.name}>
                <div className="product item p-0 px-1">
                    <div className="text-blue text-center bg-white round-1 align-items-center flex-column p-1">
                        <Fittext className="pb-1" min = {0.1} max = {this.props.max} lines = {2} >
                            {this.props.product.name.replace("-", ' ')}
                        </Fittext>
                        <div className="relative d-flex">
                            <div>
                                <img className={"round-1 m-auto col img-fluid p-0 border-blue bordered-2x cover"}
                                src={window.location.origin + '/images/StockSnap_IZBN5G7AAB.jpg'}></img>
                            </div>
                            <div className="d-flex flex-wrap text-white justify-content-center h-101 bg-white absolute col p-1 align-items-center op_trans info">
                                <div className="col-12 p-1 text-center text-dark round-1 bordered">
                                    <div>
                                        <Fittext min = {0.1} max = {1.2*this.props.max} lines = {3} >
                                            {this.props.product.price}<br/>{' $/'+base+' '+this.props.product.type}
                                        </Fittext>
                                    </div>
                                </div>
                                <div className="col-12 p-2 text-center">
                                    <div className={(this.props.product.available?"bg-success":"bg-danger")+" round p-1"} onMouseLeave={this.offhover} onMouseEnter={this.onhover} >
                                        {this.props.product.available?'Available':'Unavailable'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        )
    }
}