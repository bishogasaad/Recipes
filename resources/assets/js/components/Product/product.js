import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export default class Product extends Component {
    constructor(props){
        super(props);
        this.state={
            Available:false,
            name:'',
            description:'',
            company:null,
            price:0,
            multiples:[],
            selectedValue:null
        }
    }
    componentDidMount(){
        let element=document.getElementById('product');
        if(element.getAttribute('data-company')!=='')
        {
            this.setState({company:element.getAttribute('data-company')});
        }
        this.setState({
            Available:element.getAttribute('data-available'),
            name:element.getAttribute('data-name'),
            price:element.getAttribute('data-price'),
            description:element.getAttribute('data-description'),
            multiples:JSON.parse(element.getAttribute('data-multiples')),
            type:element.getAttribute('data-type'),
            selectedValue:JSON.parse(element.getAttribute('data-multiples'))[0]
        });
    }
    handlechange(e){
        this.setState({selectedValue:e.target.value});
      }
    render(){
        let divstyle={
            zIndex: 1
        };
        let list=[];
        this.state.multiples.forEach(element => {
            list.push(<option key={list.length.toString()} value={element}>{element}</option>)
        });
        return (
            <div className="h-100 p-0 flex-wrap d-flex justify-content-center">
                <div className="col-12 col-xl-8 h-100 p-3 p-md-5 d-flex flex-column flex-wrap">
                    <div className="col-2"></div>
                    <div className="py-3 col d-flex mx-auto">
                        <div className="bordered rounded border-blue h-100 m-auto col d-flex flex-column p-3">
                            <div className="py-2 text-blue"><h4>{this.state.name}</h4></div>
                            <div className="d-flex flex-row flex-wrap p-0">
                                <div className="col-12 col-xl align-items-start p-0 d-flex flex-wrap hidden">
                                    <img className="col-6 col-xl p-0 rounded" src={"/images/StockSnap_IZBN5G7AAB.jpg"} />
                                    <div className={"col d-xl-none text-"+(this.state.Available?'success':'danger')}>{this.state.Available?'Available':'Unavailable'}</div>
                                </div>
                                <div className="pl-xl-4 py-3 p-xl-0 col mw-100 col-xl-8 text-white p-0">
                                    <div className="rounded blue col p-2 h-100">
                                        <h3>Description</h3>
                                        <p className="col p-0">{this.state.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-2 mw-100 d-flex py-3 p-0 m-auto align-items-start justify-content-between">
                                <div className="d-flex justify-content-between col align-items-baseline">
                                    <div className="d-flex align-items-baseline">
                                        <h2 className=" text-blue">Price:</h2>
                                        <h3>&nbsp; {this.state.price} Usd</h3>
                                    </div>
                                    <p className="text-secondary">per {this.state.multiples[0]} {this.state.type}</p>
                                </div>
                                <div className="d-flex mw-100 text-white d-xl-none">
                                    <div className="rounded col-12 m-auto bg-success text-center p-2 pointer">Add to Cart</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-4 h-100 py-5 px-4 d-none d-xl-flex flex-column flex-wrap">
                    <div className="col-2"></div>
                    <div className="py-3 px-0 col">
                        <div className="blue rounded h-100 m-auto col p-2 d-flex flex-column flex-wrap">
                            <div className="p-3 col">
                                <div className="bg-white h-100 rounded p-3 d-flex flex-wrap">
                                    <div className={"text-center text-"+(this.state.Available?'success':'danger')+" col-12"}>{this.state.Available?'Available':'Unavailable'}</div>
                                    <div className="col-12 d-flex justify-content-between text-secondary"><div>company</div><div className="text-dark">{this.state.company}</div></div>
                                    <div className="justify-content-between m-auto col-12 d-flex align-items-baseline">
                                        <div className="d-flex text-secondary">Select Quantity :</div>
                                        <div className="row align-items-center justify-content-between">
                                            <div className="py-3 d-inline px-2">
                                                <select className="rounded" onChange={(e)=>this.handlechange(e)}>
                                                    {list}
                                                </select>
                                            </div>
                                            <div>{this.state.type}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 d-flex justify-content-start"><div className="text-secondary">Total Price:&nbsp;</div><div>{(this.state.selectedValue/this.state.multiples[0]*this.state.price).toFixed(2)}</div></div>
                                </div>
                            </div>
                            <div className="px-3 col-2 d-flex mw-100">
                                <span className="col p-0">
                                    <input type="submit" value={this.state.Available?'Add to Cart':'Notify Me'} className={"rounded col text-white btn m-auto btn-"+(this.state.Available?'success':'danger')+" text-center p-2 pointer absolute border-0"}/>
                                </span>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );}
}
if (document.getElementById('product')) {
    ReactDOM.render(<Product />, document.getElementById('product'));
}