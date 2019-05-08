import React, { Component } from 'react';
import reactDOM from 'react-dom';
import $ from 'jquery';
export default class Filter extends Component {
    constructor(props){
        super(props);
        this.state={
            orderby:'rating',
            recipes:[],
            dir:false,
            left:{
                red:null,
                blue:null,
                green:null,
                orange:null
            }
        }
        this.orderBy=this.orderBy.bind(this);
        this.Options=this.Options.bind(this);
        this.M_Enter = this.M_Enter.bind(this);
        this.M_Leave = this.M_Leave.bind(this);
        this.set_initial_position = this.set_initial_position.bind(this);
        this.red = React.createRef();
        this.blue = React.createRef();
        this.green = React.createRef();
        this.orange = React.createRef();
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.recipes!==this.props.recipes)
        {
            let recipes=nextProps.recipes;
            this.setState({recipes:recipes});
        }
    }
    set_initial_position() {
        this.red.current.style.left = this.state.left.red + 'px';
        this.blue.current.style.left = this.state.left.blue + 'px';
        this.green.current.style.left = this.state.left.green + 'px';
        this.orange.current.style.left = this.state.left.orange + 'px';
    }
    componentDidUpdate(prevProps,prevState){
        if(this.red.current.offsetLeft!=this.state.left.red){
            this.setState({left:{
                red:this.red.current.offsetLeft,
                blue:this.blue.current.offsetLeft,
                green:this.green.current.offsetLeft,
                orange:this.orange.current.offsetLeft
            }},()=>{
                this.set_initial_position();
            })
        }
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
        if($('.on').length<1) {
            let element = e.currentTarget
            let left = element.parentElement.children[0].offsetLeft;
            element.style.left = left+'px';
            let node = document.createElement('div');
            node.classList.add('round', 'w0', 'p-3', 'm-auto', 'fill-gap');
            element.parentElement.insertBefore(node,e.currentTarget.parentElement.children[Number(e.currentTarget.id)-1]);
            $(element).addClass('p-1 col-11 absolute w-100 on');
            $(element).children('span').removeClass('d-none');
            $(element).children('span').addClass('absolute col-12 none');
            $(element).siblings('#curtain').removeClass('d-none');
        }
    }
    M_Leave(){
        this.set_initial_position();
        $('#filter #curtain').addClass('d-none');
        $('.on').removeClass('p-1 col-11 w-100');
        $('.on').children('span').removeClass('absolute col-12 none');
        $('.on').children('span').addClass('d-none')
        setTimeout(()=>{
            $('.on').removeClass('absolute on');
            $('.fill-gap').remove();
        },250);
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
            $(".fas.direction").toggleClass("fa-arrow-up fa-arrow-down");
            if($('.fas.direction').hasClass('fa-arrow-up'))
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
                <div className="text-center text-dark align-items-center d-flex">
                    <select id="filter_orderby" defaultValue={this.state.orderby} onChange={order_change} className="rounded p-1 pointer">
                        <option value="title">Title</option>
                        <option value="rating">Rating</option>                            
                        <option value="time">Cook Time</option>
                    </select>
                    <i className={"fas fa-arrow-down pointer p-1 direction"+(this.props.dark?"text-white":"")} onClick={handleDir}></i>
                </div>
            </div>
            )
            else return null;
    }
    render(){
        return(
            <div className="d-none col d-lg-flex h-100 text-white m-auto justify-content-between">
                <div id='filter' className="col-7 d-flex relative justify-content-center align-items-center p-1">
                    <div id="1" ref={this.red} onMouseEnter={(e)=>this.M_Enter(e)}
                    className="w0 left-width_trans round m-auto border-white bordered p-3 red text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">Beef/Chicken</span></div>
                    <div id="2" ref={this.blue} onMouseEnter={(e)=>this.M_Enter(e)} 
                    className="w0 left-width_trans round m-auto border-white bordered p-3 blue text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">Seafood</span></div>
                    <div id="3" ref={this.green} onMouseEnter={(e)=>this.M_Enter(e)}
                    className="w0 left-width_trans round m-auto border-white bordered p-3 green text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">vegetables</span></div>
                    <div id="4" ref={this.orange} onMouseEnter={(e)=>this.M_Enter(e)}
                    className="w0 left-width_trans round m-auto border-white bordered p-3 orange text-center d-flex justify-content-center align-items-center pointer">
                    <span className="d-none absolute col-12">&lt;15 min</span></div>
                    <div id="curtain" onClick={(e)=>this.handleclick(e)}  onMouseLeave={this.M_Leave} className="absolute col-12 p-4 d-none pointer"></div>
                </div>
                <this.Options/>
            </div>
        )
    }
}