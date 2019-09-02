import React , { Component } from 'react';
import { Card, Form, Table , Button,Select,DatePicker,Modal,message} from 'antd';
import axios from '../../axios';
import Utils from "../../untils/untils"

const { RangePicker } = DatePicker;
const { Option } = Select;
const FormItem = Form.Item;


export default class cityOrders extends Component{
    constructor(){
        super();
        this.state = {
            modalStatus:false,
            orderList:[],
            orderInfo:{},
            pagination:{}
        }
    };

    params = {
        page:1
    };

    componentWillMount(){
       this.getOrdersList();
    }

    //获取订单列表
    getOrdersList = () => {
        let _this = this;
        axios.ajax({
            url:"/order/list",
            data:{
                param:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderList:res.result.list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.getOrdersList();
                    })
                })
            }
        })
    };

    //结束订单
    handleEndOrder = () =>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            });
            return;
        }
        axios.ajax({
            url:"/order/end",
            data:{}
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    orderInfo:res.list,
                    modalStatus:true
                })
            }
        })
    };

    //结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        console.log(item.id);
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if(res.code === 0){
                message.success('订单结束成功');
                this.setState({
                    modalStatus: false
                });
                this.getOrdersList();
            }
        })
    };

    //表格单行点击
    onRowClick = (record,index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    };

    //订单详情
    openOrderDetail = () => {
        let id = this.state.selectedItem.id;
        window.open(`#/common/order/detail/${id}`);
    };

    render(){
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ];

        const formItemLayout = {
            //label标签占据列数
            labelCol:{
                span:5
            },
            //Form表单占据列数
            wrapperCol:{
                span:19
            }
        };

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        };

        return(
            <div>
                <Card>
                    <FilterForm />
                </Card>

                {/*订单列表渲染*/}
                <div className="city-table-wrap">
                    <div className="button-wrap">
                        <Button type="primary" onClick={ this.openOrderDetail }>订单详情</Button>
                        <Button type="primary" style={{marginLeft: 10}} onClick={this.handleEndOrder}>结束订单</Button>
                    </div>

                    <Table
                        bordered={true}
                        columns={columns}
                        rowSelection={rowSelection}
                        dataSource={this.state.orderList}
                        pagination={this.state.pagination}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.modalStatus}
                    onCancel={() => {
                        this.setState({
                            modalStatus: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}>
                    <Form layout="horizontal">
                        <FormItem label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </FormItem>
                        <FormItem label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </FormItem>
                        <FormItem label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </FormItem>
                        <FormItem label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}



//查询表单
class FilterForm extends Component {
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout='inline'>
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{width:100}}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="时间查询">
                    {
                        getFieldDecorator('time')(
                            <RangePicker />
                        )
                    }
                </FormItem>
                <FormItem label="订单状态">
                    {
                        getFieldDecorator('status')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">进行中</Option>
                                <Option value="2">结束行程</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);