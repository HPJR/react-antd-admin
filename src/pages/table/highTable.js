import React , { Component } from 'react';
import {Card,Table,Button,Modal,message,Badge} from 'antd';
import axios from '../../axios';
import Utils from '../../untils/untils'


export default class highTable extends Component {
    componentWillMount(){
        this.setState({
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
                    dataSource:res.result,
                    pagination: Utils.pagination(res,(current) => {
                        _this.params.page = current;
                        this.getRes();
                    })
                });
            }
        })
    };

    //删除
    handleDelete = (record) => {
        console.log(record);
        let id = record.id;
        Modal.confirm({
            title: '确认',
            content: `您确认要删除此条数据吗？${id}`,
            onOk: () => {
                message.success('删除成功');
                this.getRes();
            }
        })
    };


    render() {
        //表头二
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                width: 100,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                width: 100,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 100,
                render(sex){
                    return sex === "1" ? "男":"女"
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 100,
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
                width: 100,
                defaultSortOrder: '',
                sorter: (a, b) => a.age - b.age,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 150,
            },
            {
                title: '注册时间',
                dataIndex: 'time',
                width: 150,            },
            {
                title: '地址',
                dataIndex: 'address',
            },
        ];

        //左侧固定的columns2
        const columns2 = [...columns];
        for(let i =0;i<6;i++){
            columns2.push(
                {
                    title: 'age'+i,
                    dataIndex: 'age'+i,
                    width: 100,
                }
            )
        }
        columns2.push(
            {
                title: '固定',
                dataIndex: 'age7',
                width: 100,
                fixed: 'right',
            }
        );
        //左侧固定的columns2结束



        const columns4 = [
            {
                title: 'id',   //表头标题
                key: 'id',
                dataIndex: 'id' //数据源
            },
            {
                title: '用户名',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                render(sex){
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age'
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render(state){
                    let config = {
                        '1': <Badge status="success" text="成功" />,
                        '2': <Badge status="error" text="报错" />,
                        '3': <Badge status="default" text="正常" />,
                        '4': <Badge status="processing" text="进行中" />,
                        '5': <Badge status="warning" text="警告" />,
                    }
                    return config[state]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                key: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
                key: 'address',
            },
            {
                title: '操作',
                render: (text, record) => {
                    return <Button size="small" onClick={() => {this.handleDelete(record)}}>删除</Button>
                }
            }
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
                <Card title="头部固定" className="card-wrap">
                    <div className="table_nowrap">
                        <Table
                            rowKey={record => record.id}
                            columns={columns}
                            bordered={true}
                            rowSelection={rowSelection}
                            dataSource={this.state.dataSource}
                            scroll={{ y: 240 }}
                        />
                    </div>

                </Card>
                <Card title="左侧固定" className="card-wrap">
                    <Table
                        rowKey={record =>{return record.id}}
                        columns={columns2}
                        bordered={true}
                        rowSelection={rowSelection}
                        dataSource={this.state.dataSource}
                        scroll={{ x: 1800,y:340 }}
                    />
                </Card>
                <Card title="操作按钮" className="card-wrap">
                    <Table
                        bordered
                        rowKey={record =>{return record.id}}
                        columns={columns4}
                        dataSource={this.state.dataSource}
                    />
                </Card>
            </div>
        );
    }
}
