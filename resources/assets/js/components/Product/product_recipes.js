import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Slick from '../../Slick';
import Card from '../base/card';
export default class Product_recipes extends Component {
    constructor(props){
        super(props);
        this.state = {
            recipes:[]
        }
    }
    componentDidMount(){
        let element=document.getElementById('product');
        axios.get(window.location.origin +'/product/recipes',{
            params:{
                product_name:element.getAttribute('data-name').replace(' ','-')
            }
        })
        .then(res=>{
            this.setState({recipes:res.data})
            console.log(res.data)
        });
        
    }
    customPaging(i,element){
        var content = (
        <div className="round p-2 border-white border pointer dot" onClick={(event) => element.select(event,i-1)}>
            <div className="round w0 blue p-1"></div>
        </div>
        )
        return content;
    }
    render(){
        const settings = {
            slides: 6,
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
                    dotsPosition: false,
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
        return (
            <div className="col-12 h-100 p-3 blue d-flex justify-content-center flex-wrap">
                <h2 className="text-center col-12 p-2 text-white">Recipes Made with this Product</h2>
                <div className="col-12 h-90">
                    <Slick settings={settings} style={style} customPaging={this.customPaging.bind(this)}>
                        {
                            this.state.recipes.map( element=>{
                                return <Card max={0.9} data={element}/>
                            })
                        }
                    </Slick>
                </div>
            </div>
        );
    }
}
if (document.getElementById('product_recipes')) {
    ReactDOM.render(<Product_recipes />, document.getElementById('product_recipes'));
}