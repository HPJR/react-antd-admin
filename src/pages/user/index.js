import React , { Component } from 'react';
import { Card, Form, Table , Button,Select,DatePicker,Modal,Input,Radio,message} from 'antd';
import axios from '../../axios';
import Utils from "../../untils/untils"
import BaseForm from '../../component/BaseForm';
import moment from 'moment';

const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;
const FormItem = Form.Item;


export default class Users extends Component{
    constructor(){
        super();
        this.state = {
            modalStatus:false,
            orderList:[],
            pagination:{},
            title:''
        };
        //表单定义
        this.formList = [
            {
                type: 'INPUT',
                label: '用户名',
                field: 'user_name',
                placeholder: '请输入名称',
                width: 130
            },
            {
                type: 'INPUT',
                label: '手机号',
                field: 'user_mobile',
                placeholder: '请输入手机号',
                width: 130
            },
            {
                type: 'DATE',
                label: '入职日期',
                field: 'user_date',
                placeholder: '请输入日期'
            }
        ]
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
            url:"/user/list",
            data:{
                param:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            console.log(res);
            if(res.code === 0){
                this.setState({
                    selectedRowKeys: [],//重置
                    orderList:res.list.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.getOrdersList();
                    })
                });
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


    //创建员工
    handleOperate = (type) => {
        let item = this.state.selectedItem;
        switch (type) {
            case "create":
                this.setState({
                    type,
                    modalStatus: true,
                    title: '创建员工'
                });
                break;
            case "edit":
                if(!item){
                    message.error('请选择一个员工');
                    return;
                }
                else{
                    this.setState({
                        type,
                        modalStatus: true,
                        title: '编辑员工',
                        userInfo:item
                    });
                }
                break;
            case "detail":
                if(!item){
                    message.error('请选择一个员工');
                    return;
                }
                else{
                    this.setState({
                        type,
                        modalStatus: true,
                        title: '员工详情',
                        userInfo:item
                    });
                }
                break;
            case "delete":
                if(!item){
                    message.error('请选择一个员工');
                    return;
                }
                let _this = this;
                Modal.confirm({
                    title: '确认删除',
                    content: `是否要删除当前选中的员工${item.id}`,
                    onOk(){
                        axios.ajax({
                            url: '/user/del',
                            data: {
                                params: {
                                    id:item.id
                                }
                            }
                        }).then((res) => {
                            if(res.code === 0){
                                _this.setState({
                                    modalStatus: false
                                });
                                _this.getOrdersList();
                            }
                        })
                    }
                })
        }
    };

    //确定创建
    handleCreate = () => {
        let type = this.state.type;
        let data = this.editForm.props.form.getFieldsValue();
        axios.ajax({
            url: type=='create' ? '/user/add':'/user/edit',
            data: {
                params: data
            }
        }).then((res) => {
            console.log(res);
            if(res.code === 0){
                this.editForm.props.form.resetFields();
                this.setState({
                    modalStatus: false
                });
                this.getOrdersList();
            }
        })

    };

    //删除员工

    //表单自定义事件
    handleFilter = (params) => {
        this.params = params;
        this.getOrdersList();
    };


    render(){
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex ==1 ?'男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1':'状态one一',
                        '2':'状态two二',
                        '3':'状态three三',
                        '4':'状态four四',
                        '5':'状态five五'
                    };
                    return config[state];
                }
            },
            {
                title: '婚姻',
                dataIndex: 'isMarried',
                render(isMarried){
                    return isMarried == 1 ?'已婚':'未婚'
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
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

        let footer = {};
        if(this.state.type == 'detail'){
            footer = {
                footer: null
            }
        }

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        };

        return(
            <div>
                <Card>
                    <BaseForm formList={ this.formList } filterSubmit={ this.handleFilter }/>
                </Card>

                {/*订单列表渲染*/}
                <div className="city-table-wrap">
                    <div className="button-wrap">
                        <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>创建员工</Button>
                        <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>编辑员工</Button>
                        <Button type="primary" onClick={() => this.handleOperate('detail')}>员工详情</Button>
                        <Button type="primary" icon="delete" onClick={() => this.handleOperate('delete')}>删除员工</Button>
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
                    title={this.state.title}
                    visible={this.state.modalStatus}
                    onCancel={() => {
                        this.setState({
                            modalStatus: false
                        })
                    }}
                    onOk={this.handleCreate}
                    width={600}
                    {...footer}>

                    <EditUserForm type={this.state.type} userInfo={this.state.userInfo} wrappedComponentRef={(form)=>{this.editForm = form}}/>
                </Modal>
            </div>
        )
    }
}

class EditUserForm extends Component{
    getState = (state) => {
        let config = {
            '1':'状态one一',
            '2':'状态two二',
            '3':'状态three三',
            '4':'状态four四',
            '5':'状态five五'
        };
        return config[state];
    };

    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};

        console.log(userInfo);

        const { getFieldDecorator } = this.props.form;
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

        return(
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.userName :
                            getFieldDecorator('userName',{
                                initialValue:userInfo.userName
                            })(
                                <Input type="text" placeholder="请输入用户名"/>
                            )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.sex == 1 ? '男' : '女' :
                            getFieldDecorator('sex',{
                                initialValue:userInfo.sex
                            })(
                                <RadioGroup>
                                    <Radio value={1}>男</Radio>
                                    <Radio value={2}>女</Radio>
                                </RadioGroup>
                            )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type == 'detail' ? this.getState(userInfo.state) :
                            getFieldDecorator('state',{
                                initialValue: userInfo.state
                            })(
                                <Select>
                                    <Option value={1}>状态one一</Option>
                                    <Option value={2}>状态two二</Option>
                                    <Option value={3}>状态three三</Option>
                                    <Option value={4}>状态four四</Option>
                                    <Option value={5}>状态five五</Option>
                                </Select>
                            )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.birthday :
                            getFieldDecorator('birthday',{
                                initialValue: moment(userInfo.birthday)
                            })(
                                <DatePicker format="YYYY-MM-DD"/>
                            )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type == 'detail' ? userInfo.address :
                            getFieldDecorator('address',{
                                initialValue: userInfo.address
                            })(
                                <TextArea rows={3} placeholder="请输入联系地址"/>
                            )
                    }
                </FormItem>
            </Form>
        )
    }
}
EditUserForm = Form.create({})(EditUserForm);



