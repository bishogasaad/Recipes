import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Parallax} from 'react-parallax';
export default class Section1 extends Component {
    render() {
        let strength = 800;
        return (
            <Parallax bgImage={"../../../images/alternate.jpg"} 
                      bgClassName=" col-12 w-100 p-0 " 
                      contentClassName='col-12 p-0 d-flex h-100 gradient-2' 
                      className="col-12 p-0"
                      bgImageStyle={{height:'150%', top: strength/2 +'px'}}
                      strength={strength}>   
                <div className="text-dark justify-content-end col-12 d-flex p-0">       
                    <div className="d-flex flex-column col-9 col-md-auto px-5">
                        <div className="col-3"></div>
                        <div className="col-auto row p-1 moto_bg no-bg-md round">
                            <h1 id="moto" className="m-auto px-md-3 m-md-0 text-center">Cooking is ART &amp;<br/> Simplicity</h1>
                        </div>
                        <div className="col-4"></div>
                        <div className="col p-0 d-flex flex-column align-items-center">
                            <a href="/browse" className="row col-8 col-lg-7 orange justify-content-center round-1 text-white pointer m-0 p-2 p-lg-1">
                                <div className="text-center row px-2">
                                    <p className="m-auto h4">Browse</p>
                                </div>
                            </a>
                            <div className="row m-0 justify-content-center">
                                <p id="search" className="text-center">or search for Recipe</p>
                            </div>
                        </div>
                        <div className="col"></div>
                    </div>
                    <div className="col-1 d-none d-md-block"></div>
                </div>
            </Parallax>
        );
    }
}
if (document.getElementById('main_sec')) {
    ReactDOM.render(<Section1 />, document.getElementById('main_sec'));
}