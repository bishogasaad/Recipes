import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ReactText from 'react-fittext';
import $ from 'jquery';
export default class Filter extends Component {
    constructor(props){
        super(props);
        this.state={
            orderby:'rating',
            recipes:[],
            dir:false
        }
        this.orderBy=this.orderBy.bind(this);
        this.Options=this.Options.bind(this);   
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.recipes!==this.props.recipes)
        {
            let recipes=nextProps.recipes;
            this.setState({recipes:recipes});
        }
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.recipes !== this.props.recipes)
        this.orderBy(this.state.orderby);
        let flag=false;
        prevState.recipes.forEach(recipe=>{
            let found = false;
            this.state.recipes.forEach(recipee=>{
                if(recipe.id===recipee.id)
                found = true
            })
            if(!found)flag=true;
        });
        if(prevState.recipes.length!==this.state.recipes.length)flag=true;
        if(flag)
        this.orderBy(this.state.orderby);
    }
    handleclick(e){
        $(".on").toggleClass('bg-secondary');
        let remove = false;
        if($(".on").hasClass('bg-secondary'))
        remove = true;
        let id = parseInt ($(".on").attr('id'))
        let recipes = [];
        if(this.state.recipes)
        {
            if(remove) {
                this.state.recipes.forEach(recipe => {
                    if(recipe.type!=id)
                    recipes.push(recipe);
                });
                this.setState({recipes:recipes});
            }
            else{
                recipes = Object.assign([],this.state.recipes);
                this.props.recipes.forEach(recipe => {
                    if(recipe.type==id)
                    recipes.push(recipe);
                });
                this.setState({recipes:recipes});
            }
        }
    }
    M_Enter(e){
        $(e.target).addClass('p-1 col-12 absolute w-100 on');
        $(e.target).children('span').removeClass('d-none');
        $(e.target).children('span').addClass('absolute col-12 none');
        $(e.target).siblings('#curtain').removeClass('d-none');
    }
    M_Leave(){
        $(".on").children('span').addClass('d-none absolute col-12');
        $(".on").children('span').removeClass('none');
        $(".on").siblings('#curtain').addClass('d-none');
        $(".on").removeClass('p-1 col-12 absolute w-100 on');
    }
    orderBy(selected=this.state.orderby,dir=this.state.dir){
        if(selected!=this.state.orderby)
        this.setState({orderby:selected})
        if(dir!=this.state.dir)
        this.setState({dir:dir})
        let recipes = [];
        if(this.state.recipes)
        {
            recipes = this.state.recipes.sort((a,b)=>{
                let first,second;
                if(selected=='title')
                {first=b[selected].replace(new RegExp("-", "g"), ' ');
                second=a[selected].replace(new RegExp("-", "g"), ' ');}
                else{
                    first=b[selected];
                    second=a[selected];
                }
                if(selected=='title')
                {
                    if(dir)
                    {
                        if(first>second)return -1;
                        if(first<second)return 1;
                        return 0;
                    }
                    else
                    {
                        if(first>second)return 1;
                        if(first<second)return -1;
                        return 0;
                    }
                }
                else
                {
                    if(dir)
                    return second-first;
                    else 
                    return first-second;}
                });
            this.setState({recipes:recipes})     
            this.props.filter(this.state.recipes);
        }
    }
    Options(){
        handleDir=handleDir.bind(this)
        order_change=order_change.bind(this)
        function handleDir(){
            $(".fas").toggleClass("fa-arrow-up fa-arrow-down");
            if($('.fas').hasClass('fa-arrow-up'))
            this.orderBy(this.state.orderby,true);
            else
            this.orderBy(this.state.orderby,false);
        }
        function order_change(e){
            var index = e.nativeEvent.target.selectedIndex;
            var selected=e.nativeEvent.target[index].value;
            this.orderBy(selected);
        }
        if(this.props.display==true)
            return(
            <div className="d-flex">
                <div className="text-center text-dark">
                    <select id="filter_orderby" defaultValue={this.state.orderby} onChange={order_change} className="rounded m-1 p-1 pointer">
                        <option value="title">Title</option>
                        <option value="rating">Rating</option>                            
                        <option value="time">Cook Time</option>
                    </select>
                    <i className={"fas fa-arrow-down pointer p-1 "+(this.props.dark?"text-white":"")} onClick={handleDir}></i>
                </div>
            </div>
            )
            else return null;
    }
    render(){
        return(
            <div className="d-none col d-lg-flex text-white m-auto justify-content-between">
                <div className="col-7 d-flex relative justify-content-center align-items-center p-0">
                    <div id="1" onMouseEnter={(e)=>this.M_Enter(e)}
                    className="pointer w0 width_trans round m-auto border-white bordered p-3 red text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">Beef/Chicken</span></div>
                    <div id="3" onMouseEnter={(e)=>this.M_Enter(e)} 
                    className="pointer w0 width_trans round m-auto border-white bordered p-3 blue text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">Seafood</span></div>
                    <div id="2" onMouseEnter={(e)=>this.M_Enter(e)}
                    className="pointer w0 width_trans round m-auto border-white bordered p-3 green text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">vegetables</span></div>
                    <div id="4" onMouseEnter={(e)=>this.M_Enter(e)}
                    className="pointer w0 width_trans round m-auto border-white bordered p-3 orange text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">&lt;15 min</span></div>
                    <div id="curtain" onClick={(e)=>this.handleclick(e)}  onMouseLeave={this.M_Leave} className="absolute col-12 p-4 d-none pointer"></div>
                </div>
                <this.Options/>
            </div>
        )
    }
}