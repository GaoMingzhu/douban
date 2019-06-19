import React from 'react';
import './login.css';
import {Link} from 'react-router-dom';
class Login extends React.Component{
	render(){
		return(
			<div className="setting">
				<div className="lg-cancel"></div>
				<div className="head-box">
					<div className="lg-headTitle">登录豆瓣</div>
					<p className="lg-text1">登录注册表示同意   </p>
					<p className="lg-text2">豆瓣使用协议、隐私政策</p>
				</div>
				<div className="lg-container">
					<input className="lg-inputBox lg-border1" placeholder="手机号 | 邮箱" >
					</input>
					<input className="lg-inputBox lg-border2" placeholder="密码" >
					</input>
					<div className="lg-loginBtn">登录</div>
				</div>
			</div>
			)
	}
}
export default Login;