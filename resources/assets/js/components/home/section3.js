import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ProductCard from '../base/product';
import Slider from '../../Slick';
import axios from 'axios';
import {Parallax} from 'react-parallax';
export default class Section3 extends Component {
    constructor(props){
        super();
        this.state={
            products:[]
        }
    }
    componentDidMount(){
        axios.get(window.location.origin+'/products/featured')
        .then((res)=>{
             this.setState({products:res.data});
        });
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
		let strength = 800
        return (
			<Parallax bgImage={"../../../images//products_sec.jpg"} 
					  bgClassName=" col-12 w-100 p-0" 
					  contentClassName='col-12 pt-2 d-flex products_sec' 
					  className="col-12 p-0 d-flex h-100"
					  bgImageStyle={{height:'110%', top: strength/2 +'px'}}
					  strength={strength}>
				<div className="p-1 pt-5 col-12 h-100">
					<div className="d-flex col flex-column align-items-center h-90">
						<div className="col-1"></div>
						<div className="col-auto blue h4 text-center text-white m-0 round-top">Feautered Products</div>
						<div className="round-1 border-blue bordered-2x col-10 p-1 align-items-center" id="products" styles="zIindex: 100">
							<Slider settings={settings} style={style} customPaging={this.customPaging.bind(this)}>
								{
								this.state.products.map((element,i)=>{
									return(<ProductCard key={i} max={0.9} product={element}/>)
									})
								}
							</Slider>
						</div>
					</div>
					<div className="col p-2 justify-content-center row align-items-center m-0">
						<div className="p-1 px-4 round col-7 col-md-3 d-flex red text-white text-center pointer">
							<p className="m-auto h5">Browse by Ingredients</p>
						</div>
					</div>
				</div>
			</Parallax>
        );
    }
}
if (document.getElementById('product_sec')) {
    ReactDOM.render(<Section3 />, document.getElementById('product_sec'));
}