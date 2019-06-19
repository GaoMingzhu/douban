import React from 'react';
import Axios from 'axios';
import "./detail.css";
import {Link} from 'react-router-dom';
class Detail extends React.Component{
	constructor(){
		super();
		this.state={
			info:[],
			style:[],
			desc:[],
			selected_id:'',
            tipVisible: false,
            num:1,
            img:'',
            styleDesc:'请选择"颜色"',
            typeId:'',
            typeName:'',
		}
	}
	componentDidMount(){
		this.getDetailInfo();
		this.setState({
			typeId:this.props.match.params.id,
		});
	}
	pass = () =>{
		Axios({
			url:"",
			method:"POST",
			data:{
				id:this.state.typeId,
				color:this.state.typeName,
				count:this.state.num,
				attr_id:this.state.selected_id,
				token:localStorage.getItem("token"),
			}
		})
	}
	buy = () => {
	    this.setState({
	        tipVisible: true
	    });
	}
	close = () =>{
		this.setState({
            tipVisible: false
		});
	}
	closeTip = (b) =>{
		b.stopPropagation();
	}
	jian = (e) => {
	    e.stopPropagation();
	    let a = this.state.num;
	    if(a>0){
		    this.setState({
		    	num:--a
		    });
		}
		else{
			this.setState({
				num:0
			});
		}
	}
	jia = (e) => {
	    e.stopPropagation();
	    let a = this.state.num;
	    this.setState({
	    	num:++a
	    });
	}
	selected = (a) => {
    	if(this.state.selected_id === 0){
    		this.setState({
        	selected_id: a.id,
	        img:a.backimg,
	        styleDesc:`已选择"${a.name}"`,
	        typeName:a.name,
	    })
	    let style=this.state.style;
	    style.forEach((item)=>{
	    	if(item.is_selected){
	    		item.is_selected = false;
	    	}else{
	    		if(item.id === a.id){
	    			item.is_selected = true
	    		}
	    	}	
	    })	
    	}else{
	    this.setState({
    			selected_id:0,
    			styleDesc:'请选择"颜色"',
    		})}
	    console.log(this.state.selected_id);
	  };
	getDetailInfo(){
		Axios.get('http://yapi.demo.qunar.com/mock/63674/api/detail')
		.then((res)=>{
			let style=res.data.data.style;
			this.setState({
				info:res.data.data.info,
				style:res.data.data.style,
				desc:res.data.data.desc,
				selected_id:0,
				img:style[0].backimg
			})

		        style.forEach((item) => {
		        style.is_selected = false
		    })

		    this.setState({
		        style: style,
		    })

		})
	}
	render(){
        let count=this.state.info;
        let manner=this.state.style;
        let descImg=this.state.desc;
		return(
			<div>
					<img className="titleImg" src={count.img} alt=""/>
					<div className="desc-title">{count.title}</div>
					<div className="desc-price">¥<span>{count.price}</span></div>
					<div className="desc-desc">{count.desc}</div>
					<div className="buy-btn" onClick={this.buy}>立即购买</div>
					<div className="dt-container">
						{descImg.map((item,index)=>{
							return(
								<img src={item.img} key={index} alt=""  />
							)
						})}
					</div>
					{this.state.tipVisible && <div className="tip" onClick={this.close}>
					    <div className="wicket" onClick={this.closeTip}>
					        <i className="cancel" onClick={this.close}></i>
						    <div className="pro-box">
						       <img className="proImg" src={this.state.img} alt=""/>
						       <p className="proTitle">{count.title}</p>
						       <p className="proPrice"><strong>{count.price}</strong></p>
						       <p className="proDesc">{this.state.styleDesc}</p>
						    </div>
						    <div className="choose clearfix">
						       <p className="wicketTitle">颜色:</p>



						       {manner.map((item,index)=>{
						       	return(
						       		<div key={index}>
						                <div onClick={()=>{this.selected(item)}} 
						                key={index} 
						                className={`chooseStyle ${this.state.selected_id === item.id? 'active' : ''}`}>
						                {item.name}
						                </div>
						            </div>
						           )
						       })}



						    </div>
						    <div>
						       <p className="wicketTitle">数量:</p>
						           <div className="numberBox">
						              <div className="jian" onClick={this.jian}>-</div>
						              <div className="number">{this.state.num}</div>
						              <div className="jia" onClick={this.jia}>+</div>
						           </div>
						    </div>
						    <div className="buyBox">
						      		<div className={`buyRightNow ${this.state.selected_id !==0 ? 'effect':''}`}>
						        	立即购买
						        	</div>
		                        <Link to={`/shoppingCart`}>
						      		<div onClick={this.pass} className={`addCart ${this.state.selected_id !==0 ? 'addEffect':''}`}>
								    加入购物车
								    </div>
							    </Link>
						    </div>
					    </div>
					</div>
				}
			</div>
			)
	}
}
export default Detail;