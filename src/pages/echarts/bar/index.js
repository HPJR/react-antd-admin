import React , { Component } from 'react';
import { Card } from 'antd';
//导入主题
import echartTheme from './../echartTheme'
import themeLight from './../themeLight'
//全部加载
// import echarts from 'echarts'
//按需引用
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/bar'
import ReactEcharts from 'echarts-for-react'

//必需基础组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default class Bar extends Component {
    componentWillMount(){
        echarts.registerTheme('Default', echartTheme);
    }

    getOption = () => {
      let option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            title: {
                text: '用户骑行订单'
            },
            xAxis: {  //X轴
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {  //Y轴
                type: 'value'
            },
            series: [ //整体数据源
                {
                    name: '订单量',
                    type: 'bar',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800]
                }
            ]
        };
      return option;
    };

    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: { //可过滤父标题
                data: ['OFO','摩拜','小蓝']
            },
            tooltip: {
                trigger: 'axis',
                type : 'line'
            },
            xAxis: {
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [ //整体数据源
                {
                    name: 'OFO',
                    type: 'bar',
                    data: [2000, 3000, 5500, 7000, 8000, 12000, 20000]
                },
                {
                    name: '摩拜',
                    type: 'bar',
                    data: [1500, 3000, 4500, 6000, 8000, 10000, 15000]
                },
                {
                    name: '小蓝',
                    type: 'bar',
                    data: [1000, 2500, 4000, 4500, 6000, 7000, 8000]
                }
            ]
        };
        return option;
    };

    render(){
        return(
            <div>
                <Card title="柱形图表之一" className="card-wrap">
                    <ReactEcharts option={this.getOption()} theme="Default" style={{height: 500}}/>
                </Card>
                <Card title="柱形图表之二" className="card-wrap">
                    <ReactEcharts option={this.getOption2()} theme="Default" style={{height: 500}}/>
                </Card>
            </div>
        )
    }
}
