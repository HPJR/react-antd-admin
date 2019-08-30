import React , { Component } from 'react';
import {Card,Table,Button,Modal,message} from 'antd';
import axios from '../../axios';
import Utils from '../../untils/untils'

export default class BasicTable extends Component {
    componentWillMount(){
        //数据
        const dataSource = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Disabled User',
                age: 99,
                address: 'Sidney No. 1 Lake Park',
            },
        ];
        this.setState({
            dataSource,
            selectedRowKeys:[],
            selectedRows:[]
        });
        this.getRes();
    }
    params = {
        page: 1
    };
    //获取mock数据
    getRes = () => {
        let _this = this;
        axios.ajax({
            url:"/table/list",
            data:{
                params:{
                    page:this.params.page
                },
                isShowLoading:true
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    dataSource2:res.result,
                    pagination: Utils.pagination(res,(current) => {
                        _this.params.page = current;
                        this.getRes();
                    })
                });
            }
        })
    };

    //删除
    delTabs = () => {
        //selectedRowKeys === record.id
        //当前表格的 rowKey={record => record.id}
        //可以是id，name等
        Modal.confirm({
            title:"删除数据",
            content:`您删除的是 ${this.state.selectedRowKeys}`,
            onOk: () => {
                message.success('删除成功');
                this.setState({
                    selectedRowKeys: [],
                });
                this.getRes();  //重新刷新页面
            }
        });
    };

    render() {
        //表头一
        const columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
            },
        ];

        //表头二
        const columns2 = [
            {
                title: 'ID',
                dataIndex: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === "1" ? "男":"女"
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山'
                    };
                    return config[state];
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '注册时间',
                dataIndex: 'time',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
        ];

        const {  selectedRowKeys } = this.state;


        const rowSelection = {
            //选值状态
            //( radio/checkbox )
            type:'checkbox',
            selectedRowKeys,
            //获取选取值
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows
                });
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },

        };

        return (
            <div>
                <Card title="基础表格" className="card-wrap">
                    <Table
                        rowKey={record => record.key}
                        bordered={true}
                        columns={columns}
                        dataSource={this.state.dataSource} />,
                </Card>
                <Card title="动态渲染表格" className="card-wrap">
                    <Button onClick={ this.delTabs } style={{marginBottom:20}}>删除所选</Button>
                    <Table
                        rowKey={record => record.id}
                        bordered={true}
                        rowSelection={rowSelection}
                        columns={columns2}
                        pagination={this.state.pagination}
                        dataSource={this.state.dataSource2}/>,
                </Card>
            </div>
        );
    }
}
