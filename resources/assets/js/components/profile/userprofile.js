import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Slider from 'react-slick';
import axios from 'axios';
import Card from '../base/card'
import Header from '../base/header';
import Filter from '../base/filter';
export default class UserProfile extends Component{
    constructor(){
        super();
        this.handle_edit=this.handle_edit.bind(this);
        this.titleChange=this.titleChange.bind(this);
        this.Filter=this.Filter.bind(this);
        this.state={
            recipes:[],
            filtered:[],
            user_id:null,
            edit:false,
            edit_index:null,
            edit_recipe:null
        }
    }
    componentWillMount(){
        var url_string =window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        this.setState({user_id:id});
    }
    handle_edit(target){
        $('#exampleModal').modal({
          })
          if(!isNaN(target)){
          let index = this.state.recipes.findIndex((elem) => elem.id == target);
          this.setState({edit_index:index});
          let recipe =Object.assign({},this.state.recipes[index]);
          this.setState({edit_recipe:recipe})
        }
        else {
            this.setState({edit_recipe:null})
        }
    }
    componentDidMount(){
        axios.get(window.location.origin+"/user/")
        .then((res)=>{
            if(res.data[1]==this.state.user_id)
            {
                this.setState({edit:true});
            }
        });
        axios.get(window.location.href.split('?')[0]+"/recipes",{
            params:{
                id:this.state.user_id
            }
        }).then((res)=>{
            this.setState({recipes:res.data});
        });
    }
    titleChange(e){
        if(temp!=null){
        var temp = this.state.edit_recipe;
        temp.title=e.target.value;
        this.setState({edit_recipe:temp});}
        else{
            var temp;
            temp={title:e.target.value}
            this.setState({edit_recipe:temp})
        }
    }
    Filter(recipes){
        this.setState({filtered:recipes})
    }
    render(){
        var settings = {
            dots: true,
            arrows:false,
            infinite: false,
            speed: 500,
            rows:this.state.edit?2:3,
            appendDots: dots => (
                <div>
                  <ul> {dots} </ul>
                </div>
              ),
              customPaging: i => (
                <div className="round p-2 border-blue border pointer">
                <div className="round w0 blue p-1"></div>
                </div>
              ),
            swipeToSlide:true,
            slidesToShow:this.state.edit?5:6,
            responsive: [
                {
                  breakpoint: 991,
                  settings: {
                    slidesToShow: 3,
                    rows:2,
                  }
                },
                {
                  breakpoint: 767,
                  settings: {
                    dots:false,
                    rows:2,
                    vertical:true,
                    verticalSwiping:true
                  }
                }
              ]
          };
          let recipe="";
          if(this.state.edit_index!=null)
          recipe = this.state.recipes[this.state.edit_index];
          let in_styles={
            border: 'none',
            'borderBottom': '2px solid grey'
          }
          var options=[];
          for (let index = 0; index < 10; index++) {
              options.push(<option key={index.toString()}>{index+1}</option>)     
          }
          var hours=[];
          for (let index = 0; index < 12; index++) {
              hours.push(<option key={index.toString()}>{index}</option>)     
          }
          var mins=[];
          for (let index = 0; index < 60; index++) {
              mins.push(<option key={index.toString()}>{index}</option>)     
          }
        return(
            <div className="d-flex flex-wrap h-100 gradient-1">
                <div className="modal fade bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="container-fluid">
                                    <form method="post">
                                        <div className="container-fluid row">
                                            <div className="m-1 col-12">
                                                <label className="p-1 col-2" htmlFor="title">Title</label>
                                                <input style={in_styles} required className="col-10 p-0" id="title" name="title" onChange={this.titleChange} type="text" value={this.state.edit_recipe?this.state.edit_recipe.title:''}/>
                                            </div>
                                            <div className="m-1 col-12 row justify-content-between">
                                                <div className="col-5 p-0">
                                                    <label className="p-1" htmlFor="persons">No of persons</label>
                                                    <select required>
                                                        {options}
                                                    </select>
                                                </div>
                                                <div className="col-7 text-right p-0">
                                                <label className="p-1">Cooking Time</label>
                                                <select required>
                                                    {hours}
                                                </select>
                                                <select required>
                                                    {mins}
                                                </select>
                                            </div>
                                            </div>
                                            <div className="m-1 col">
                                                <label className="p-1 col-2"  htmlFor="products">products</label>
                                                <ul>
                                                    
                                                </ul>
                                            </div>
                                            <div className="m-1 col">
                                                <label className="p-1 col-2"  htmlFor="title">instructions</label>
                                                <textarea required name="Text1" cols="40" rows="5" value={this.state.edit_recipe?this.state.edit_recipe.instruction:''}></textarea>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.edit?<div className="col-3 h-100 d-none d-md-flex flex-column">
                    <div className="col-1"></div>
                    <div className="col pt-1 p-0">
                        <div className="h-100 d-flex flex-column p-0">
                            <div className="col-8 mw-100 p-1">
                                <div className="col bordered border-white p-2 rounded h-100">
                                    <div className="col bg-white rounded h-100 p-2">
                                        <div onClick={this.handle_edit} id="user_add_recipe" className="d-flex text-white rounded blue p-2 pointer">
                                            <i className="fas fa-plus-square fa-3x"></i>
                                            <h5 className="m-auto">Add Recipe</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4 mw-100 p-1">
                                <div className="col bordered border-white p-2 rounded h-100">
                                    <div className="col bg-white rounded h-100 d-flex flex-wrap p-0">
                                        <div className="col-12 d-flex">
                                            <a className="m-auto btn btn-lg btn-outline-primary" href={window.location.origin+"/Recipes/public/changeName/"}>Change UserName</a>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <a className="m-auto btn btn-lg btn-outline-primary" href={window.location.origin+"/Recipes/public/changePassword/"}>Change Password</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:""}
                <div className={(this.state.edit?"col-md-9":"col-md-12")+" col-12 d-flex flex-column"}>
                    <div className="col-1"></div>
                    <div className="col pt-1 p-0">
                        <div className="col d-flex flex-column p-1 h-100">
                            <div className="col-1 bg-white mw-100 d-flex">
                                <div className={(this.state.edit?"col-6 offset-6":"col-5 offset-7")+" my-auto"}>
                                    <Filter display={true} filter={this.Filter} recipes={this.state.recipes} dark={false}/>
                                </div>
                            </div>
                            <div className="bordered border-white rounded-bottom p-2 col">
                                <div className="col bg-white rounded p-0 h-100 d-flex flex-row">
                                    <Slider className="col-12 d-flex p-0 h-100" {...settings}>
                                        {this.state.filtered.map((element)=>{
                                            return(<Card key={element.id} editRecipe={this.handle_edit} edit={this.state.edit} data={element}/>)
                                            })}
                                    </Slider>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
if(document.getElementById('userProfile')){
    ReactDOM.render(<UserProfile/>,document.getElementById('userProfile'));
}