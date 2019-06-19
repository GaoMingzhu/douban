import React from 'react';
import Axios from 'axios';
import { Carousel, WingBlank } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './Main.css';
import Pro from './Pro';

class Main extends React.Component{
	constructor(props){
		super(props);
		this.state={
			banner:[]
		}
	}
	componentDidMount() {//当页面加载完毕之后执行componentDidMount函数
      this.getMainInfo();//调用getMainInfo函数
    }//即当页面加载完毕之后调用接口
    getMainInfo(){//调用接口
    	Axios.get('http://yapi.demo.qunar.com/mock/63674/api/main')
    	.then((res)=>{
    		// console.log(res)
    		this.setState({
    			banner:res.data.data.banner
    		})
    	})
    }
	render(){
		 // console.log(this.state.banner)
		
		return(
		  <div>
				<WingBlank style={{margin:0,padding:0}}>
			        <Carousel
			          autoplay={true}
			          infinite
			        >
			        {this.state.banner.map((val,index)=>{
			        	return(
			        			<img
			        		key={index}
			                src={val.img}
			                alt=""
			                style={{ width: '100%', verticalAlign: 'top' }}
			                onLoad={() => {
			                  // fire window resize event to change height
			                  window.dispatchEvent(new Event('resize'));
			                  this.setState({ imgHeight: 'auto' });
			                }}
			              />
			        		)
			        })}
			        </Carousel>
		      </WingBlank>
	         <Pro/>
	      </div>
			)
	}
}
export default Main;