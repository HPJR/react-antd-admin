import React,{ Component } from 'react';
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal,Table,message} from 'antd'
import axios from '../../axios/index'
import menuConfig from '../../config/menuConfig'
import Utils from '../../untils/untils'
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

export default class Permission extends Component {
    constructor(){
        super();
        this.state = {
            createModal:false,
            setModal:false,
            authorizedModal:false
        };
        this.params = {
            page:1
        };
    }
    componentWillMount(){
        this.getList();
    }

    //获取用户信息
    getList = ()=> {
        let _this = this;
        axios.ajax({
            url:"/role/list",
            data:{
                param:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    selectedRowKeys: [],//重置
                    list:res.list.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.getList();
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

    //创建角色
    handleCreate = () => {
        this.setState({
            createModal:true
        })
    };

    //创建角色成功
    handleCreateOk = () => {
        let data = this.CreateForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/user/add',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    createModal:false
                });
                this.getList();
            }
        })
    };

    //设置权限弹窗
    handleSet = () => {
        let item = this.state.selectedItem;
        if(!item){
            message.error('请选择一个员工');
            return;
        }
        let menuList = item.menus;
        this.setState({
            menuInfo:menuList
        });
        this.setState({
            setModal:true,
            detailInfo:item
        })
    };

    //提交设置权限
    handleSetOk = () => {
        let data = this.SetForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url:'/user/add',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    setModal:false
                });
                this.getList();
            }
        })
    };

    //用户授权弹窗
    handleAuthorized = () => {
        let item = this.state.selectedItem;
        if(!item){
            message.error('请选择一个员工');
            return;
        }else {
            this.getAuthorized();
            this.setState({
                authorizedModal:true,
                detailInfo:item
            })
        }
    };

    //获取角色分配值
    getAuthorized = () => {
        const mockData = [];   //完整数据
        const targetKeys = []; //目标用户
        axios.ajax({
            url:"/role/user_list"
        }).then((res)=>{
            if(res.code === 0){
                let list = res.list;
                list.forEach((item)=>{
                    item.key = item.user_id;
                    if(item.status === 1){
                        targetKeys.push(item.key)
                    }
                    mockData.push(item);
                });
                this.setState({
                    mockData,
                    targetKeys
                });
            }
        })
    };

    //设置目标用户
    patchUserInfo = (targetKeys) => {
        this.setState({
            targetKeys: targetKeys
        });
    };


    //提交
    authorizedOk = () => {
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/user/add',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    authorizedModal:false
                });
                this.getAuthorized();
            }
        })
    };


    render(){

        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            },{
                title: '创建时间',
                dataIndex: 'create_time',
                render: Utils.formatDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status){
                    if (status === 1) {
                        return "启用"
                    } else {
                        return "停用"
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: Utils.formatDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        };

        return(
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={ this.handleCreate }>创建角色</Button>
                    <Button type="primary" onClick={ this.handleSet }>设置权限</Button>
                    <Button type="primary" onClick={ this.handleAuthorized }>用户授权</Button>
                </Card>
                <Card className="card-wrap">
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={this.state.list}
                        rowSelection={rowSelection}
                        pagination={this.state.pagination}
                        onRow={(record,index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record,index);
                                }
                            };
                        }}
                    />
                </Card>

                {/*创建角色弹窗*/}
                <Modal
                    title="创建角色"
                    visible={this.state.createModal}
                    onCancel={() => {
                        this.setState({
                            createModal: false
                        })
                    }}
                    onOk={this.handleCreateOk}
                    width={600}>
                    <CreateForm  wrappedComponentRef={(form)=>{this.CreateForm = form}}/>
                </Modal>


                {/*设置权限弹窗*/}
                <Modal
                    title="设置权限"
                    visible={this.state.setModal}
                    onCancel={() => {
                        this.setState({
                            setModal: false
                        })
                    }}
                    onOk={this.handleSetOk}
                    width={600}>
                    <SetForm detailInfo={this.state.detailInfo}
                             menuInfo={this.state.menuInfo||[]}
                             patchMenuInfo={(checkedKeys)=>{
                                 this.setState({
                                     menuInfo: checkedKeys
                                 });
                             }}
                             wrappedComponentRef={(form)=>{this.SetForm = form}}/>
                </Modal>

                {/*用户授权弹窗*/}
                <Modal
                    title="用户授权"
                    visible={this.state.authorizedModal}
                    onCancel={() => {
                        this.setState({
                            authorizedModal: false
                        })
                    }}
                    onOk={this.authorizedOk}
                    width={800}>
                    <AuthorizedForm
                        detailInfo={this.state.detailInfo}
                        targetKeys = {this.state.targetKeys}
                        mockData={this.state.mockData}
                        patchUserInfo={this.patchUserInfo}
                        wrappedComponentRef={(inst) => this.AuthorizedForm = inst }/>
                    />
                </Modal>

            </div>
        )
    }
}

//创建角色表单
class CreateForm extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };

        return(
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name',{
                            initialValue:'',
                            rules:[
                                {
                                    required: true,
                                    message:'用户名不能为空'
                                }
                            ]
                        })(
                        <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state',{
                            initialValue:1
                        })(
                            <Select>
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )}
                </FormItem>
            </Form>
        )
    }
}
CreateForm = Form.create({})(CreateForm);

//设置权限表单
class SetForm extends Component {
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys);
    };

    renderTreeNodes = data =>
        data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} {...item} />;
        });

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        };

        const detailInfo = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;


        return(
            <div>
                <Form layout="horizontal">
                    <FormItem label="角色名称" {...formItemLayout}>
                        <span>{ detailInfo.role_name }</span>
                    </FormItem>
                    <FormItem label="状态" {...formItemLayout}>
                        {
                            getFieldDecorator('state',{
                                initialValue:detailInfo.status
                            })(
                                <Select>
                                    <Option value={1}>开启</Option>
                                    <Option value={0}>关闭</Option>
                                </Select>
                            )}
                    </FormItem>
                    <FormItem>
                        <Tree
                            checkable
                            defaultExpandAll
                            onCheck={(checkedKeys) => this.onCheck(checkedKeys)}
                            checkedKeys={menuInfo ||[]}
                        >
                            <TreeNode title="平台权限" key="platform_all">
                                {this.renderTreeNodes(menuConfig)}
                            </TreeNode>
                        </Tree>
                    </FormItem>

                </Form>
            </div>
        )
    }
}
SetForm = Form.create({})(SetForm);

//穿梭框表单
class AuthorizedForm extends Component {

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };

    filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;


    render(){

        const mockData = this.props.mockData;
        const targetKeys = this.props.targetKeys;

        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 18}
        };
        const detail_info = this.props.detailInfo || {};

        return(
            <div>
                <Form layout="horizontal">
                    <FormItem label="角色名称：" {...formItemLayout}>
                        <Input disabled maxLength={8} placeholder={detail_info.role_name}/>
                    </FormItem>
                    <FormItem label="选择用户：" {...formItemLayout}>
                        <Transfer
                            dataSource={mockData}
                            showSearch
                            filterOption={this.filterOption}
                            titles={['待选用户', '已选用户']}
                            listStyle={{
                                width: 200,
                                height: 300,
                            }}
                            targetKeys={targetKeys}
                            onChange={this.handleChange}
                            render={item => `${item.user_name}`}
                        />
                    </FormItem>
                </Form>
            </div>
        )
    }
}
