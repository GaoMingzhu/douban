import React from 'react';
import Axios from 'axios';
import './shoppingCart.css';
class ShoppingCart extends React.Component{
	constructor(){
		super();
		this.state={
			cartList:[],
			zPrice:{price:'0.00'},
			is_choosed:false,
		}
	}
	componentDidMount(){
		Axios({
			url:'http://yapi.demo.qunar.com/mock/63674/api/shoppingCart',
			method:'get',
		})
		.then((res)=>{
			console.log(res);
			this.setState({
				cartList:res.data.data.cart.map((item,index)=>{
					item.is_selected=false;
					item.are_selected=false;
					item.id=index;
					return(item)
				}),
			})
		})
	}
	delete = (item) =>{
		let li=this.state.cartList;
		li.forEach((va,index)=>{
			if(item.id===va.id){
				item.is_selected=true
			}
		})
		this.setState({
			cartList:li,
		})
	}
	tipCancel=(item)=>{
		let li=this.state.cartList;
		li.forEach((va,index)=>{
			if(item.id===va.id){
				item.is_selected=false
			}
		})
		this.setState({
			cartList:li,
		})
	}
	jian = (item) => {
		let lis=this.state.cartList;
		lis.forEach((all,index)=>{
			if(item.id===all.id){
				if(item.num>0){
					item.num--
				}
				else{
					item.num=0
				}
			}
		})
		this.setState({
			cartList:lis
		})
	}
	jia = (item) => {
	    let lis=this.state.cartList;
	    lis.forEach((all,index)=>{
	    	if(item.id===all.id){
	    		item.num++
	    	}
	    })
	    this.setState({
	    	cartList:lis
	    })
	}
	cancelCon=(item)=>{
		this.setState({
			cartList:this.state.cartList.filter((dItem)=>dItem.id!==item.id),
		})
	}
	gouxuan = (list) =>{
		let lis=this.state.cartList;
		let choosed=this.state.is_choosed;
		let danjia=this.state.zPrice.price;
		lis.forEach((item)=>{
				if(list.id===item.id){
					if(item.are_selected){
						danjia='0.00';
						item.are_selected=false;
						choosed=false;
					}
					else{
						danjia=item.price;
						item.are_selected=true;
						choosed=true;
					}
				}
		})
		console.log(choosed);
		let zPrice=this.state.zPrice;
		zPrice.price=danjia;
		this.setState({
				cartList:lis,
				is_choosed:choosed,
				zPrice:zPrice,
		})	
	}
	quanxuan = () =>{
		// 全选框打钩：
		let choosed=this.state.is_choosed;
		let lis=this.state.cartList;
		let zPrice=this.state.zPrice;
		if(this.are_selected){
			this.are_selected=false;
			lis.forEach((item)=>{
				item.are_selected=true;
				zPrice='0.00';
			})
		}
		else{
			this.are_selected=true;
			lis.forEach((item)=>{
				item.are_selected=false;
				zPrice+=item.price;
			})
		}
		// 单选框打钩：
		lis.forEach((item)=>{
			if(item.are_selected){
				item.are_selected=false;
				choosed=false;
			}
			else{
				item.are_selected=true;
				choosed=true;
			}
		})
		this.setState({
			cartList:lis,
			is_choosed:choosed,
		})
	}
	render(){
		return( 
			<div>
				<div className="sc-title">豆瓣 | 豆品</div>
				<div className="sc-allBox">
					<div className="quanxuan" onClick={this.quanxuan}>
						{this.are_selected && <div className="gouxuanEffect"></div>}
					</div>
					豆瓣豆品
				</div>
				{this.state.cartList.map((list,index)=>{
					return(
					<div className="sc-proItem" key={index}>
						<div className="gouxuan" onClick={()=>{this.gouxuan(list)}}>
							{list.are_selected && <div className="gouxuanEffect"></div>}
						</div>
						<span className="sc-proImg">
							<img src={list.backimg}/>
						</span>
						<span className="sc-proDesc">
							<p className="sc-descTitle">{list.name}</p>
							<p className="sc-descDesc">{list.color}</p>
							<div className="sc-numberBox">
								<span className="sc-jian" onClick={()=>{this.jian(list)}}>-</span>
								<span className="sc-number">{list.num}</span>
								<span className="sc-jia" onClick={()=>{this.jia(list)}}>+</span>
							</div>
						</span>
						{list.is_selected && <div className="sc-tip">
							<div className="sc-tip-cancel" onClick={()=>{this.tipCancel(list)}}>取消</div>
							<div className="sc-tip-delete" onClick={()=>{this.cancelCon(list)}}>确定删除</div>
						</div> }
						<span className="sc-buyDesc">
							<p className="sc-delete" onClick={()=>{this.delete(list)}}>删除</p>
							<p className="sc-unitPrice">¥ {list.price}</p>
						</span>
					</div>
					)
				})}
				
				<div className="sc-wicket">
					<div className="sc-wicketQuanxuanBox">h
						<div className="quanxuan" onClick={this.quanxuan}>
							{this.are_selected && <div className="gouxuanEffect"></div>}
						</div>
						<p className="sc-textQuanxuan">全选</p>
					</div>
					<div className="sc-buyRightNow">
					    {this.state.is_choosed && <div className="sc-buyRightNow-effect">结算</div>}
						请选择
					</div>
					<div className="sc-price">¥ {this.state.zPrice.price}<p className="freight">(不含运费)</p></div>
				</div>
			</div>
			)
	}
}
export default ShoppingCart;