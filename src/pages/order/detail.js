import React , { Component } from 'react';
import { Card, Form, Table , Button,Select,DatePicker,Modal,message} from 'antd';
import axios from '../../axios';
import './detail.less';

export default class Detail extends Component{
    constructor(){
        super();
        this.state = {
            orderInfo:{}
        }
    }

    componentWillMount(){
        let orderId = this.props.match.params.orderId;
        if(orderId){
            this.getOrderDetail(orderId);
        }
    };

    //获取订单详情数据
    getOrderDetail = (id) => {
        axios.ajax({
            url:"/order/detail",
            data:{
                param:{
                    orderId:id
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderInfo:res.list
                });
                this.renderMap();
            }
        })
    };

    //初始化地图
    renderMap = () => {
        this.map = new window.BMap.Map("orderDetailMap");    // 创建Map实例
        this.map.centerAndZoom(new window.BMap.Point(116.404, 39.915), 11);  // 初始化地图

        //添加地图类型控件
        this.addMapControl();
    };

    //添加地图类型控件
    addMapControl = () => {
        let map = this.map;
        // 添加带有定位的导航控件
        let navigationControl = new window.BMap.NavigationControl({
            // 靠左上角位置
            anchor: window.BMAP_ANCHOR_TOP_LEFT,
            // LARGE类型
            type: window.BMAP_NAVIGATION_CONTROL_LARGE,
            // 启用显示定位
            enableGeolocation: true
        });
        map.addControl(navigationControl);
    };

    render(){
        const info = this.state.orderInfo || {};
        return(
            <div>
                <Card>
                    <div id="orderDetailMap" className="order-map"></div>
                </Card>
                <Card>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{info.mode === 1 ? '服务器' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{info.order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{info.bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用户姓名</div>
                                <div className="detail-form-content">{info.user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{info.mobile}</div>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <ul className="detail-form">
                            <li>
                                <div className="detail-form-left">行驶起点</div>
                                <div className="detail-form-content">{info.start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶终点</div>
                                <div className="detail-form-content">{info.end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行驶里程</div>
                                <div className="detail-form-content">{info.distance/1000}Km</div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}
