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
                this.renderMap(res.list);
            }
        })
    };

    //初始化地图
    renderMap = (result) => {
        let areaArr = result.position_list;
        let first = areaArr[0];

        this.map = new window.BMap.Map("orderDetailMap");    // 创建Map实例
        this.map.centerAndZoom(new window.BMap.Point(first.lon, first.lat), 11);  // 初始化地图

        //添加地图类型控件
        this.addMapControl();
        this.drawBikeRoute(result);
        this.drawServiceArea(result);
        console.log(result);
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

    //添加覆盖物绘制用户路线
    drawBikeRoute = (result) => {
        let map = this.map;
        let areaArr = result.position_list;

        if(areaArr.length>0){
            //起点
            let first = areaArr[0],
                pt = new window.BMap.Point(first.lon, first.lat),
                myIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36,42),{
                    imageSize: new window.BMap.Size(36,42),
                    anchor: new window.BMap.Size(36,42)
                });
            var marker2 = new window.BMap.Marker(pt,{icon:myIcon});  // 创建标注
            map.addOverlay(marker2);  // 将标注添加到地图中

            //终点
            let last = areaArr[areaArr.length-1],
                pt2 = new window.BMap.Point(last.lon, last.lat),
                myIcon2 = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36,42),{
                    imageSize: new window.BMap.Size(36,42),
                    anchor: new window.BMap.Size(36,42)
                });
            let marker3 = new window.BMap.Marker(pt2,{icon:myIcon2});  // 创建标注
            map.addOverlay(marker3);  // 将标注添加到地图中

            //连接路线图
            let trackPoint = [];
            for(let i=0; i<areaArr.length; i++){
                let point = areaArr[i];
                trackPoint.push(new window.BMap.Point(point.lon, point.lat))
            }

            let polyline = new window.BMap.Polyline(trackPoint, {
                strokeColor: '#1869AD',
                strokeWeight: 3,
                strokeOpacity: 1
            });
            map.addOverlay(polyline);
        }
    };

    //绘制服务区
    drawServiceArea = (positionList) => {
        let areaArr = positionList.area;
        let trackPoint = [];
        for(let i=0; i<areaArr.length; i++){
            let point = areaArr[i];
            trackPoint.push(new window.BMap.Point(point.lon, point.lat))
        }

        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4
        });
        this.map.addOverlay(polygon);
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
