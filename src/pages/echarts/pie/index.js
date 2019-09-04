import React , { Component } from 'react';
import { Card } from 'antd';
//导入主题
import themeLight from './../themeLight';

//全部加载
// import echarts from 'echarts'
//按需引用
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/pie'
import ReactEcharts from 'echarts-for-react'

//必需基础组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'

export default class Pie extends Component {
    componentWillMount(){
        echarts.registerTheme('Light', themeLight);
    }

    getOption = () => {
        let option = {
            title : {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        }
                    ]
                }
            ]
        };
        return option;
    };

    getOption2 = () => {
        let option = {
            title : {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '用户骑行订单',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        }
                    ]
                }
            ]
        };
        return option;
    };

    getOption3 = () => {
        let option = {
            title : {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            series : [
                {
                    name: '用户骑行订单',
                    type: 'pie',
                    radius: '55%',
                    data: [
                        {
                            value: 1000,
                            name: '周一'
                        },
                        {
                            value: 1000,
                            name: '周二'
                        },
                        {
                            value: 2000,
                            name: '周三'
                        },
                        {
                            value: 1500,
                            name: '周四'
                        },
                        {
                            value: 3000,
                            name: '周五'
                        },
                        {
                            value: 2000,
                            name: '周六'
                        },
                        {
                            value: 1200,
                            name: '周日'
                        }
                    ].sort((a,b) => {  //数据排序
                        return a.value - b.value;
                    }),
                    roseType: 'angle'
                }
            ]
        };
        return option;
    };

    render(){
        return(
            <div>
                <Card title="饼形图表" className="card-wrap">
                    <ReactEcharts option={this.getOption()} theme="Light" style={{height: 500}}/>
                </Card>
                <Card title="环形图表" className="card-wrap">
                    <ReactEcharts option={this.getOption2()} theme="Light" style={{height: 500}}/>
                </Card>
                <Card title="南丁格尔图表" className="card-wrap">
                    <ReactEcharts option={this.getOption3()} theme="Light" style={{height: 500}}/>
                </Card>
            </div>
        )
    }
}
