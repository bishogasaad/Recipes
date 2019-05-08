import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Rating from 'react-rating';
import axios from 'axios';
export default class Recipe extends Component {
    constructor(){
        super();
        this.state={
            products:[]
        }
        this.addRating=this.addRating.bind(this);
    }
    componentDidMount(){
        axios.get(window.location.origin+"/recipe/products",{
            params:{
                id:document.getElementById('recipe').getAttribute('data-id')
            }
        }).then((res)=>this.setState({products:res.data}))
    }
    
    addRating(e){
        axios.put(window.location.origin+"/recipe/"+document.getElementById('recipe').getAttribute('data-id'),{
            rating:e
        })
        .then(res=>{
            if(res.data=='error')
            alert('Please login to save your rating')
        })
    }
    render() {
        let url=window.location.origin;
        var s=[];
        var element=document.getElementById('recipe');
        var rating_num=parseFloat( element.getAttribute('data-rating'));

        this.state.products.forEach(product => {
            s.push(             
                <li key={s.length} className="col-12 d-flex text-white py-1">
                    <a className="col-12 rounded bordered p-0" href={window.location.origin + '/product/' + product.name}>
                        <span className="row col-12 justify-content-between m-0 p-0"> 
                            <span className="px-1">{product.name.replace(new RegExp("-", "g"), ' ')}</span>
                            <span className="green px-1 rounded">{product.amount}&nbsp;{product.type+(product.type=='gm'||product.type=='ml'?'':(product.amount>1?'s':''))}</span>
                        </span>
                    </a>
                </li>)
        });
        return (
            <div className="h-100 container-fluid p-0 d-flex flex-column">
            <div className="col-1"></div>
            <div className="col-2 align-items-end d-flex mw-100 p-2 justify-content-between">
                <div className="d-flex col-5 p-0 text-white">
                    <h5 className="h5 green rounded my-auto p-2">{element.getAttribute('data-title').replace(new RegExp("-", "g"), ' ')}</h5>
                </div>
                <div className="justify-content-start d-flex col-5 p-1 text-white">
                    <div className="green h5 py-2 px-3 m-auto round">Chef: <a className="text-white" href={url+"/user/"+element.getAttribute('data-creator').replace(new RegExp(" ", "g"), '-')+"?id="+element.getAttribute('data-user')}>{element.getAttribute('data-creator')}</a></div>
                    <div className="green round py-2 px-3 m-auto text-yellow">
                        <Rating onChange={this.addRating} placeholderRating={rating_num} placeholderSymbol="fas fa-star fa-lg" fractions={2} emptySymbol="far fa-star fa-lg" fullSymbol="fas fa-star fa-lg"/>
                    </div>
                </div>
            </div>
            <div className="col d-flex p-0">
                <div className="h-100 d-none col-3 d-md-flex flex-column pb-4 p-0">
                    <div className="col d-flex">
                        <div className="col green-dark text-center rounded p-3 text-green">
                        <h1>Ingredients</h1>
                        <div className="overflow col h-90 p-0">
                            <div className="text-left row m-0"><ul className="p-0 col-12">{s}</ul></div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="h-100 col d-flex flex-column flex-wrap p-0">
                    <div className="d-flex col flex-wrap mw-100 pb-2 pb-4">
                        <div className="col-12 d-flex pb-2 h-70 rounded-top">
                            <div className="d-flex h-100 col pr-1 pb-2">
                                <iframe className="col-12 mx-auto p-0 rounded" src="https://www.youtube-nocookie.com/embed/d2go1QxoCag?rel=0&iv_load_policy=3" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                            </div>
                            <div className="col-3 h-100 d-none d-md-flex pb-2 pr-2">
                                <div className="green-light col h-100 rounded">

                                </div>
                            </div>
                        </div>
                        <div className="col-8 px-3 col-md h-30 rounded-bottom">
                            <div className="green-light flex-column flex-wrap rounded d-flex px-2 py-1 px-lg-3 h-100">
                                <h4 className="text-green-dark">INSTRUCTIONS</h4>
                                <div className="col overflow p-0">
                                    <p>{element.getAttribute("data-instructions")}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 d-md-none pr-3 p-0 h-40 rounded-bottom">
                            <div className="blue-light flex-column flex-wrap rounded p-2 d-flex h-100">
                                <h5>Ingredients</h5>
                                <div className="col overflow p-0">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi porro accusantium dolores? Alias explicabo culpa in minima, doloremque molestias, earum recusandae magni voluptas aut, laudantium tempore quasi expedita. Molestiae, ab.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
if (document.getElementById('recipe')) {
    ReactDOM.render(<Recipe />, document.getElementById('recipe'));
}