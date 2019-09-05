import React,{ Component } from 'react';
import { Row, Col } from 'antd';
import Unti from '../../untils/untils';
import axios from '../../axios';
import './index.less';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'  //连接器

class Header extends Component {
    componentWillMount(){

        this.setState({
            username:"测试账号"
        });

        //时间设置
        setInterval(()=>{
            let sysTime = Unti.formateData(new Date().getTime());
            this.setState({
                sysTime
            })
        });
        this.getWeatherAPIDate();
    }

    //天气api获取
    getWeatherAPIDate(){
        let city = encodeURIComponent('常州');
        axios.jsonp({
            url:"http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
        }).then((res)=>{
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather + ' ' + data.temperature + ' ' + data.wind
            })
            }
        })
    }

    render(){
        const { menuName,menuType } = this.props;
        return(
            <div className={menuType ? "header header-detail" : "header" }>
                <Row className="header-top">
                    {
                        menuType ?
                            <Col span={6} className="logo">
                                <Link to='/home'>
                                    <img src="/assets/antLogo.svg" alt="通用管理系统" />
                                    <span>ANT 通用管理系统</span>
                                </Link>
                            </Col> : ''
                    }
                    <Col span={menuType ? 18 : 24}>
                        <span>欢迎，{ this.state.username }</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {/*判断*/}
                {
                    menuType? '':
                        <Row className="breadcrumb">
                            <Col span={4} className="breadcrumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span={20} className="weather">
                                <span className="data">{ this.state.sysTime }</span>
                                <span className="weather-detail">
                            <img src={ this.state.dayPictureUrl } alt={  this.state.weather }/>
                            <span>{ this.state.weather }</span>
                        </span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}


//将state.menuName 绑定到 props 的menuName
const mapStateToProps = state => {
    console.log(state);
    return {
        menuName: state.menuName
    }
};
export default connect(mapStateToProps)(Header)
