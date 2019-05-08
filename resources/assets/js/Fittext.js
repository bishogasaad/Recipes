import React, {Component} from 'react';

class Fittext extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontSize : 17,
            lineHeight : 24,
            height : 0,
            linesCount : 10,
            min : 9,
        };
        this.update = this.update.bind(this);
        this._element = React.createRef();
    }
    
    componentWillMount () {
        if(this.props.max != null)
        this.setState({fontSize:this.props.max});
        if(this.props.min != null)
        this.setState({min:this.props.min + 0.1});
    }
    
    componentDidMount () {
        this.update(null);
    }
    componentDidUpdate (prevProps, prevState) {
        this.update(prevState);
        let lines = Math.floor(this.state.height/this.state.lineHeight);
        if(prevState.linesCount!=lines)
        {
            this.setState({linesCount:lines});
        }
        if (this.state.linesCount>this.props.lines&&this.state.fontSize > this.state.min)
        {
            this.setState({fontSize:this.state.fontSize-0.05});
        }
    }
    update (prevState) {
        let lineHeight = Number(window.getComputedStyle(this._element.current, null).getPropertyValue('line-height').match(/\d*/g)[0]);
        let height = Number(window.getComputedStyle(this._element.current, null).getPropertyValue('height').match(/\d*/g)[0]);
        if(prevState==null){
            this.setState({lineHeight:lineHeight});
            this.setState({height:height});
        }
        else {
            if(prevState.lineHeight!=lineHeight)
            {
                this.setState({lineHeight:lineHeight});
            }
            if(prevState.height!=height)
            {
                this.setState({height:height});
            }
        }
    }
    render(){
        const style = {
            fontSize : this.state.fontSize+'em',
            boxSizing : 'content-box',
            height: '100%'
        };
        return(
        <div ref={this._element} className={this.props.className} style={style}>{this.props.children}</div>
    )}
    
}

export default Fittext;