import React, { Component, useImperativeMethods } from 'react';
import ReactDOM from 'react-dom';
import Slider from '../../Slick';
import axios from 'axios';
import Card from '../base/card'
import Filter from '../base/filter';
import Product from '../base/product';
import { array } from 'prop-types';

class Form extends Component
{
    constructor(props){
        super(props);
        this.valueChange = this.valueChange.bind(this);
    }
    valueChange (e,type) {
        switch (type) {
            case 'title':
               this.props.recipe.recipe.title = e.target.value;
                break;
            case 'persons':
               this.props.recipe.recipe.person = Number(e.target.value);
                break;
            case 'timeH':
                let mins = Math.floor(this.props.recipe.recipe.time%1*100);
               this.props.recipe.recipe.time = Number(e.target.value) + (mins * 0.01);
                break;
            case 'timeM':
                let hours = Math.floor(this.props.recipe.recipe.time);
               this.props.recipe.recipe.time = (Number(e.target.value) * 0.01) + hours;
                break;
            case 'instruction':
               this.props.recipe.recipe.instruction = e.target.value;
                break;
            case 'type':
               this.props.recipe.recipe.type = Number(e.target.value);
                break;
            default:
                break;
        }
        this.props.onRecipeChange(this.props.recipe);
    }
    render() {
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
            <form>
                <div className="container-fluid d-flex flex-wrap justify-content-between align-items-start">
                    <div className="m-1 col-12 col-md-6 p-1 bordered rounded">
                        <label className="p-1 col-2 m-0 text-danger" htmlFor="title">Title</label>
                        <input onChange={(e)=>this.valueChange(e,'title')} required className="col-10 px-1 bordered border-danger rounded" id="title" name="title" type="text" defaultValue={this.props.recipe.recipe.title.replace(/-/g,' ')}/>
                    </div>
                    <div className="m-1 col-12 col-md-5 p-1 row justify-content-between bordered rounded">
                        <div className="col-auto p-0">
                            <label className="p-1 m-0 text-danger" htmlFor="persons">No of persons</label>
                            <select defaultValue={this.props.recipe.recipe.persons} onChange={(e)=>this.valueChange(e,'persons')} required>
                                {options}
                            </select>
                        </div>
                        <div className="col text-right p-0">
                            <label className="p-1 m-0 text-danger">Cooking Time</label>
                            hours
                            <select required defaultValue={String(Math.floor(this.props.recipe.recipe.time))} onChange={(e)=>this.valueChange(e,'timeH')}>
                                {hours}
                            </select>
                            mins
                            <select required defaultValue={String(Math.floor(this.props.recipe.recipe.time %1*100))} onChange={(e)=>this.valueChange(e,'timeM')}>
                                {mins}
                            </select>
                        </div>
                    </div>
                    <div id="user_recipeEdit_products" className="m-1 p-1 col col-md-6 d-flex flex-column flex-wrap bordered rounded">
                        <div className="p-1 m-0 col-auto mw-100 text-danger d-flex justify-content-between">
                            <label htmlFor="products" >Products</label>
                            <button type="button" onClick={()=>{$('#productsEditModal').modal()}} className="mr-1 bordered rounded btn btn-outline-danger p-1 px-4">Edit</button>
                        </div>
                        <div className="pl-2 d-flex col">
                            <div className="overflow col p-0 bordered rounded border-danger">
                                <ul className="col-12 h-100 d-flex flex-wrap align-content-start">
                                    {this.props.recipe.products.map((product,i)=>{
                                            return(
                                            <div className="p-1 col-6" key={i} style={{fontSize:'0.6em'}}>
                                                <div className="bordered rounded p-1 d-flex justify-content-between">
                                                    <div>{product.name.replace(/-/g,' ')}</div>
                                                    <div>{product.amount + ' ' + product.type+(product.type=='gm'||product.type=='ml'?'':(product.amount>1?'s':''))}</div>
                                                </div>
                                            </div>)
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col p-0 m-1">
                        <div className="col p-1 bordered rounded">
                            <label className="p-1 col-2 m-0 text-danger" htmlFor="title">Instructions</label>
                            <div className="p-2">
                                <textarea placeholder="Required"
                                required id="instruction_text_area" name="Text1" cols="40" rows="5" defaultValue={this.props.recipe.recipe.instruction} onChange={(e)=>this.valueChange(e,'instruction')}></textarea>
                            </div>
                        </div>
                        <div className="p-4 col text-center">
                            <select required defaultValue={this.props.recipe.recipe.type} onChange={(e)=>this.valueChange(e,'type')}>
                                <option value={1}>Beef / Chicken</option>
                                <option value={2}>Seafood</option>
                                <option value={3}>Vegetables</option>
                                <option value={4}>Quick Recipe</option>
                            </select>
                        </div>
                    </div>  
                </div>
            </form>  
        )
    }
}


class Remove extends Component {
    handleClick () {
        this.props.onRemoveClick(this.props.value);
    }
    render() {
      return (
        <div onClick={this.handleClick.bind(this)} className="pointer text-danger p-0 d-flex">
            <i className="fas fa-times-circle m-auto"></i>
        </div>
      );
    }
  }


export default class UserProfile extends Component{
    constructor(){
        super();
        this.handle_edit=this.handle_edit.bind(this);
        this.Filter=this.Filter.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
        this.removeProduct=this.removeProduct.bind(this);
        this.addProduct=this.addProduct.bind(this);
        this.updateProducts=this.updateProducts.bind(this);
        this.checkProducts=this.checkProducts.bind(this);
        this.setAmount=this.setAmount.bind(this);
        this.processRecipe=this.processRecipe.bind(this);
        this.productSearch=React.createRef();
        this.recipeChange=this.recipeChange.bind(this);
        this.state={
            recipes:[],
            filtered:[],
            user_id:null,
            edit:false,
            edit_index:null,
            edit_recipe:null,
            products:[],
            edited_products:[]
        }
    }
    componentWillMount(){
        var url_string =window.location.href
        var url = new URL(url_string);
        var id = url.searchParams.get("id");
        this.setState({user_id:id});
    }
    handle_edit(target){
        $('#recipeEditModal').modal();
        if(!isNaN(target)){
            let index = this.state.recipes.findIndex((elem) => elem.id == target);
            this.setState({edit_index:index});
            let recipe =Object.assign({},this.state.recipes[index]);
            axios.get(window.location.origin + '/recipe/products',{
                params:{
                    id:recipe.id
                }
            }).then((res)=>{
                this.setState({edit_recipe:{recipe:recipe,products:res.data}});
                this.setState({edited_products:[]})
            });
        }
        else {
            var recipe = {
                recipe:{
                    title:'',
                    persons:0,
                    time:0,
                    instruction:'',
                    type:1
                },
                products:[]
            }
            this.setState({edit_recipe:recipe})
            this.setState({edited_products:[]})
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
    handleSearch(){
        let query = this.productSearch.current.value;
        if(query==''){this.setState({products:[]});}
        else
        {
            query = query.replace(/ /g,'-')
            axios.get(window.location.origin+'/products/search',{
                params:{
                    query:query
                }
            })
            .then(res=> {
                this.setState({products:res.data},this.updateProducts);
            });
        }
    }
    removeProduct(i){
        var temp = this.state.edit_recipe;
        if(temp!=null){
            let product = this.state.edit_recipe.products[i];
            let index = this.state.edited_products.indexOf(product)
            if (index == -1) {
                product.amount = 0;
                this.state.edited_products.push(product);
            }
            else {
                this.state.edited_products[index].amount = 0;
            }
            temp.products.splice(i,1);
            this.setState({edit_recipe:temp},this.handleSearch);
        }
    }
    addProduct(product) {
        var temp = this.state.edit_recipe;
        if(temp!=null){
            temp.products.push(product);
            this.setState({edit_recipe:temp},this.updateProducts);
        }
    }
    updateProducts(){
        var products = this.state.products;

        this.state.edit_recipe.products.forEach(product => {
            products.forEach((prod,i) => {
                if(prod.id==product.id) 
                products.splice(i,1);
            });
        });
        this.setState({products:products});
    }
    setAmount(e,product){
        var temp = product;
        temp.amount = e.currentTarget.value;
        var i = this.state.edit_recipe.products.indexOf(product);
        var recipe = this.state.edit_recipe;
        let index = this.state.edited_products.indexOf(product)
        if (index == -1) {
            this.state.edited_products.push(temp);
        }
        else {
            this.state.edited_products[index].amount = temp.amount;
        }
        recipe.products[i] = temp;
        this.setState({edit_recipe:recipe});
    }
    checkProducts(){
        var flag = true;
        this.state.edit_recipe.products.forEach(product=>{
            if(product.amount == null) flag=false;
        });
        if(flag) {
            $("#productsEditModal").modal('toggle');
            $("#productAmountError").addClass('invisible');
        }
        else {
            $("#productAmountError").removeClass('invisible');
        }
    }
    recipeChange(recipe) {
        this.setState({edit_recipe:recipe});
    }
    processRecipe(){
        var recipe = this.state.edit_recipe;
        recipe.products = this.state.edited_products;
        if(this.state.edit_recipe.recipe.created_at==null){
            if (recipe.recipe.instruction ==""){
                $("#instruction_text_area").addClass("bordered border-red");
                $("#instruction_text_area").attr("placeholder", "Please add your intructions");
            }
            else{
                axios.post(window.location.origin +"/recipe",recipe);
                $('#recipeEditModal').modal('hide');
            }
        }
        else{
            axios.put(window.location.origin +"/recipe/" + this.state.edit_recipe.recipe.id,recipe)
            $('#recipeEditModal').modal('hide');
        }
        axios.get(window.location.href.split('?')[0]+"/recipes",{
            params:{
                id:this.state.user_id
            }
        }).then((res)=>{
            this.setState({recipes:res.data});
        });
    }
    Filter(recipes){
        this.setState({filtered:recipes})
    }
    customPaging(i,element){
        var content = (
        <div className="round p-2 border-white border pointer dot" onClick={(event) => element.select(event,i-1)}>
            <div className="round w0 bg-white p-1"></div>
        </div>
        )
        return content;
    }
    render() {
        const settings = {
            slides: this.state.edit?4:6,
            step: 2,
            timing: 0.6,
            dots: true,
            dotsNumbered: false,
            dotsPosition: true,
            buttons: false,
            column: true,
            rows: 2,
            responsive: [
                {
                  breakPoint: 600,
                  settings: {
                    slides: 2,
                    step: 3,
                    timing: 0.6,
                    dots: false,
                    dotsNumbered: false,
                    dotsPosition: 1,
                    buttons: true,
                    column: true,
                    rows: 3,
                  }
                }
              ]
          }
          const style = {
            rightButtonStyle: {
                backgroundColor: 'white',
                zIndex: '1',
                borderRadius: '100%',
                display: 'inline-flex',
                margin: 'auto',
                width:  '2em',
                height: '2em',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #76b6d9',
                outline: '0',
                color: '#76b6d9'
            },
            leftButtonStyle: {
                backgroundColor: 'white',
                zIndex: '1',
                borderRadius: '100%',
                display: 'inline-flex',
                margin: 'auto',
                width:  '2em',
                height: '2em',
                textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px solid #76b6d9',
                outline: '0',
                color: '#76b6d9'
            },
            dotStyle : {
              padding: '0.4em'
            }
          };
        return(
            <div className="d-flex flex-wrap h-100 gradient-1">
                <div className="modal fade" id="recipeEditModal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="container-fluid">
                                {
                                    this.state.edit_recipe?
                                        <Form key={this.state.edit_recipe.recipe.id} recipe={this.state.edit_recipe} onRecipeChange={this.recipeChange}></Form>:''
                                }
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss ="modal">Close</button>
                                <button type="button" onClick={this.processRecipe} className ="btn btn-success">Finish</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="productsEditModal" tabIndex="1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="container-fluid d-flex flex-wrap">
                                    <div className="col-12 p-0">
                                        Search for Products
                                        <input className="mx-2" ref={this.productSearch} name="pQuery" type="search" onChange={this.handleSearch}></input>
                                    </div>
                                    <div className="col-4 h-100 p-0 pt-2">
                                        <div className="bordered rounded border-dark p-2">
                                            <div className="overflow col-12 p-0 userEditProducts">
                                                <div className="col-12 d-flex flex-wrap p-0">
                                                    {this.state.edit_recipe?this.state.edit_recipe.products.map((product,i)=>{
                                                        return(
                                                            <div className="p-1 col-12" key={i}>
                                                                <div className={"bordered rounded d-flex flex-wrap justify-content-between px-1 "+(product.amount==null?"border-danger":"border-dark")}>
                                                                    <div>
                                                                        {product.name.replace(/-/g,' ')}
                                                                    </div>
                                                                    <div className="d-flex flex-wrap col-12 justify-content-end p-1">
                                                                        <div className="col-5 p-1 pr-3 d-flex">
                                                                            <div className="p-0 px-1 col-8">
                                                                                <input className={"p-0 rounded col-12 bordered "+(product.amount==null?"border-danger":"")} defaultValue={product.amount} onChange={(e)=>this.setAmount(e,product)} required type="number" />
                                                                            </div>
                                                                            <div>{product.type}</div>
                                                                        </div>
                                                                        <Remove value={i} onRemoveClick={this.removeProduct}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }):''}
                                                </div>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="p-2 col-8">
                                        <div className="p-2 bg-dark rounded p-0 col-12">
                                            <div className="overflow col-12 p-0 userEditProducts">
                                                <div className="col-12 d-flex flex-wrap p-0">
                                                    {this.state.products.map((product,i)=>{
                                                        return (
                                                        <div className="col-3 d-flex p-1 rotate pointer" onClick={()=>this.addProduct(product)} key={i}>
                                                            {<Product className="w-100" max={0.8} product={product} edit={true}></Product>}
                                                        </div>     
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <div id="productAmountError" className="text-danger invisible">Missing amount for red marked Product Please Enter amount.</div>
                                <button type="button" className="btn btn-success" onClick={this.checkProducts}>Finish</button>
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
                                            <a className="m-auto btn btn-lg btn-outline-primary" href={window.location.origin+"/changeName/"}>Change UserName</a>
                                        </div>
                                        <div className="col-12 d-flex">
                                            <a className="m-auto btn btn-lg btn-outline-primary" href={window.location.origin+"/changePassword/"}>Change Password</a>
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
                                <div className="col bg-dark rounded p-0 h-100 d-flex flex-row">
                                    <Slider settings={settings} style={style} customPaging={this.customPaging.bind(this)}>
                                        {this.state.filtered.map((element, i)=>{
                                            return( <div key={i} className="h-100 p-0 px-3">
                                                <Card key={element.id} max={1} lines={2} editRecipe={this.handle_edit} edit={this.state.edit} data={element}/>
                                            </div>)
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