import React , { Component } from 'react';
import { Card, Form, Table, Modal , Button,message,Select} from 'antd';
import axios from '../../axios';
import Utils from "../../untils/untils"

const { Option } = Select;
const FormItem = Form.Item;

export default class City extends Component {
    constructor(){
        super();
        this.state = {
            cityData:[],
            modalIsShow:false
        };

    }

    params = {
        page:1
    };

    componentWillMount(){
        this.getCityList();
    };

    //获取城市列表
    getCityList = () =>{
        let _this = this;
        axios.ajax({
            url:"/open_city",
            data:{
                "isShowLoading":true,
                params:{
                    page:this.params.page
                }
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    //增加key值
                    cityData:res.list.item_list.map((item,index)=>{
                        item.key = index;
                        return item;
                    }),
                    pagination:Utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.getCityList();
                    })
                })
            }
        })
    };

    //新增城市
    handleAddCity = () => {
        this.setState({
            modalIsShow:true
        })
    };

    //确认开通城市
    handleCityOk = () =>{
        let cityInfo = this.cityForm.props.form.getFieldsValue();
        axios.ajax({
            url:'/city_open',
            data:{
                params:cityInfo
            }
        }).then((res)=>{
            if(res.code === 0){
                message.success('开通成功');
                this.setState({
                    modalIsShow:false
                });
                this.getCityList();
            }
        })
    };

    render(){
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode === 1 ?'停车点':'禁停区';
                }
            },
            {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟';
                }
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                //只能是字符串格式
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join('，');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ];
        return(
          <div>
              {/*查询表单*/}
              <Card>
                  <FilterForm />
              </Card>

              {/*城市列表渲染*/}
              <div className="city-table-wrap">
                  <Button type="primary"
                          style={{marginBottom:20}}
                          onClick={ this.handleAddCity }>
                      新增城市</Button>

                  <Table
                         bordered={true}
                         columns={columns}
                         dataSource={this.state.cityData}
                         pagination={this.state.pagination}
                  />
              </div>

              {/*开通城市弹窗*/}
              <Modal
                  title="开通城市"
                  visible={ this.state.modalIsShow }
                  onOk={ this.handleCityOk }
                  okText="确认"
                  cancelText="取消"
                  onCancel={()=>{
                      this.setState({
                          modalIsShow:false
                      })
                  }}>
                  <AddForm wrappedComponentRef={(form)=>{this.cityForm = form}}/>
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
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 120 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">指定停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 100 }}
                                placeholder="全部"
                            >
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
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

//开通城市表单
class AddForm extends Component{
    render(){
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

        const { getFieldDecorator } = this.props.form;
        return(
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id',{
                            initialValue:'1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{ width: 150 }}>
                                <Option value="1">指定停车点</Option>
                                <Option value="2">禁停区</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}
AddForm = Form.create({})(AddForm);

