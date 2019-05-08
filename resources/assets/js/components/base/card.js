import React, { Component } from 'react';
import Fittext from '../../Fittext.js';
import axios from 'axios';
import Time from './time.js';
import Persons from './persons.js';
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
        let color,col;
        if(this.props.data.type==1) {color = '#da4d55';col="red";}
        if(this.props.data.type==2) {color = '#76b6d9';col="blue";}
        if(this.props.data.type==3) {color = '#5da759';col="green";}
        if(this.props.data.type==4) {color = '#f5833a';col="orange";}
        let lines = 2;
        if(this.props.lines!=null) {lines = this.props.lines;}
        var content=(
            <div className="p-1 h-100 recipe">
                <div id="card" className={"text-"+col+" bg-white justify-content-between d-flex wrap round-1 h-100 flex-column p-1"}>
                    <div className='text-center pb-1'>
                        <Fittext lines = {lines} max = {this.props.max} min = {this.props.min?this.props.min:0.1}>
                            {this.props.data.title.replace(new RegExp("-", "g"), ' ')}
                        </Fittext>
                    </div>
                    <div className="relative d-flex align-items-center">
                        <div className="d-flex h-100 justify-content-center">
                            <img className={"round-1 h-100 col-12 img-fluid p-0 border-"+col+" bordered-2x cover"}
                            src={url+'/images/StockSnap_IZBN5G7AAB.jpg'}/>
                        </div>
                        {this.props.edit?
                        <div className="d-flex round-1 absolute op_trans bg-white col-12 h-100 info">
                            <i onClick={this.editRecipe} className="pointer fas fa-edit fa-3x m-auto p-1"/>
                            <i onClick={this.deleteRecipe} className="pointer text-danger fas fa-trash fa-3x m-auto p-1"/>
                        </div>:
                        <div className="d-flex round-1 absolute p-1 align-items-center op_trans h-100 info">
                            <div className="col-6 p-1">
                                <Time time={this.props.data.time} color={color}/>
                            </div>
                            <div className="col-6 p-1">
                                <Persons persons={this.props.data.persons} color={color}/>
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
            <a className="item pointer align-self-end d-flex h-100" href={window.location.origin+"/recipe/"+this.props.data.title}>
                {content}
            </a>
        );
    }

}