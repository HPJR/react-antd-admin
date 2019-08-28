import React,{ Component } from 'react';
import { Row, Col } from 'antd';
import Unti from '../../untils/untils';
import axios from '../../axios';
import './index.less'

export default class Header extends Component {
    componentWillMount(){
        this.setState({
            username:"测试账号"
        });
        setInterval(()=>{
            let sysTime = Unti.formateData(new Date().getTime());
            this.setState({
                sysTime
            })
        });
        this.getWeatherAPIDate();
    }
    getWeatherAPIDate(){
        let city = encodeURIComponent('常州');
        axios.jsonp({
            url:"http://api.map.baidu.com/telematics/v3/weather?location="+city+"&output=json&ak=3p49MVra6urFRGOT9s8UBWr2"
        }).then((res)=>{
            console.log(res);
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                console.log(data);
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather + ' ' + data.temperature + ' ' + data.wind
            })
            }
        })
    }
    render(){
        return(
            <div className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>欢迎，{ this.state.username }</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="data">{ this.state.sysTime }</span>
                        <span className="weather-detail">
                            <img src={ this.state.dayPictureUrl } alt={  this.state.weather }/>
                            <span>{ this.state.weather }</span>
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
