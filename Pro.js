import React from 'react';
import './Main.css';
import Axios from 'axios';
import {Link} from 'react-router-dom';
class Pro extends React.Component{
      constructor(props){
          super(props);
          this.state={
             goods:[]
          }
      }
      componentDidMount(){
        this.getProInfo()
      }
      getProInfo(){
         Axios.get('http://yapi.demo.qunar.com/mock/63674/api/main')
         .then((res)=>{
           console.log(res)
             this.setState({
                 goods:res.data.data.goods
             })
         })
      }
      render(){
        console.log(this.state.goods)
        return(
          <div>
            <Link to={`/shoppingCart`}>
              <div className="item">购物车</div>
            </Link>
            <Link to={`/login`}>
              <div className="item">我的豆品</div>
            </Link>
                 <div className="content">
                     <div className="title">新品首发</div>
                     <ul className="pro">
                          {this.state.goods.map((item,index)=>{
                            return(
                              <Link to={`/detail/${item.id}`}>
                                  <li key={index}>
                                       <img key={index} src={item.img} alt=""/>
                                      <div className="desc-box">
                                          <p className="title-pro">{item.title}</p>
                                          <p className="desc-pro">{item.desc}</p>
                                          <p className="price-pro">{item.price}</p>
                                      </div>
                                  </li>
                              </Link>
                              )
                          })}
                     </ul>
               </div>
             </div>
          )
      }
 }
   export default Pro;