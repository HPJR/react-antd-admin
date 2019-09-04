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

export default class Rader extends Component {
    componentWillMount(){
        echarts.registerTheme('Light', themeLight);
    }

    getOption = () => {
        let option = {
            title: {
                text: '雷达图',
                x:'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                left:"right",
                data:['某软件','某主食手机','某水果手机','降水量','蒸发量']
            },
            radar: [
                {
                    indicator: [
                        {text: '品牌', max: 100},
                        {text: '内容', max: 100},
                        {text: '可用性', max: 100},
                        {text: '功能', max: 100}
                    ],
                    center: ['25%','40%'],
                    radius: 80
                },
                {
                    indicator: [
                        {text: '外观', max: 100},
                        {text: '拍照', max: 100},
                        {text: '系统', max: 100},
                        {text: '性能', max: 100},
                        {text: '屏幕', max: 100}
                    ],
                    radius: 80,
                    center: ['50%','60%'],
                },
                {
                    indicator: (function (){
                        var res = [];
                        for (var i = 1; i <= 12; i++) {
                            res.push({text:i+'月',max:100});
                        }
                        return res;
                    })(),
                    center: ['75%','40%'],
                    radius: 80
                }
            ],
            series: [
                {
                    type: 'radar',
                    tooltip: {
                        trigger: 'item'
                    },
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [
                        {
                            value: [60,73,85,40],
                            name: '某软件'
                        }
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 1,
                    data: [
                        {
                            value: [85, 90, 90, 95, 95],
                            name: '某主食手机'
                        },
                        {
                            value: [95, 80, 95, 90, 93],
                            name: '某水果手机'
                        }
                    ]
                },
                {
                    type: 'radar',
                    radarIndex: 2,
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data: [
                        {
                            name: '降水量',
                            value: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 75.6, 82.2, 48.7, 18.8, 6.0, 2.3],
                        },
                        {
                            name:'蒸发量',
                            value:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3]
                        }
                    ]
                }
            ]
        };
        return option;
    };


    render(){
        return(
            <div>
                <Card title="雷达图" className="card-wrap">
                    <ReactEcharts option={this.getOption()} theme="Light" style={{height: 500}}/>
                </Card>

            </div>
        )
    }
}
