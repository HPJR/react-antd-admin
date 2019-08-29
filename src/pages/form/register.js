import React , { Component } from 'react';
import {Card,Form,Input,Button,Checkbox,Radio,InputNumber,Select,Switch,DatePicker,TimePicker,Upload,Icon,message} from 'antd'
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { Option } = Select;
const { TextArea } = Input;



class Register extends Component {

    //上传开始
    state = {
        loading: false,
    };

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };



    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    //上传结束

    //重置表单
    handleResetInfo = () => {
        this.props.form.resetFields()
    };

    //表单提交
    handleSubmit = e => {
        //获取表单值
        let userInfo = this.props.form.getFieldsValue();
        e.preventDefault();
        //表单验证
        this.props.form.validateFields((err, values) => {
            if(!err){
                //values === userInfo
                console.log(values);
                message.success(`${userInfo.email} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password}`)
            }
        })
    };

    render() {
        const { getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };

        const offsetLayout = {
            wrapperCol: {
                xs: 24,
                sm: {
                    span:12,
                    offset:4
                }
            }
        };

        //上传
        const { imageUrl } = this.state;
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form>
                        <FormItem label="邮箱" {...formItemLayout}>
                            {getFieldDecorator('email', {
                                rules: [
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ],
                            })(<Input />)}
                        </FormItem>
                        <FormItem label="密码" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        validator: this.validateToNextPassword,
                                    },
                                ],
                            })(<Input.Password />)}
                        </FormItem>
                        <FormItem label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator('sex', {
                                    initialValue:'1'
                                })(
                                    <RadioGroup>
                                        <Radio value="1">女</Radio>
                                        <Radio value="2">男</Radio>
                                    </RadioGroup>
                                )
                            }
                        </FormItem>
                        <FormItem label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator('age', {
                                    initialValue:'18'
                                })(
                                    <InputNumber />
                                )
                            }
                        </FormItem>
                        <FormItem label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator('sleState', {
                                    initialValue:'lucy'
                                })(
                                    <Select>
                                        <Option value="jack">状态一</Option>
                                        <Option value="lucy">状态二</Option>
                                        <Option value="disabled" disabled>
                                            禁用状态
                                        </Option>
                                        <Option value="Yiminghe">状态三</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator('mulState', {
                                    initialValue:['1','2']
                                })(
                                    <Select mode="multiple">
                                        <Option value="1">爱好一</Option>
                                        <Option value="2">爱好二</Option>
                                        <Option value="3">爱好三</Option>
                                        <Option value="4">爱好四</Option>
                                        <Option value="5">爱好五</Option>
                                    </Select>
                                )
                            }
                        </FormItem>
                        <FormItem label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator('isMarried', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </FormItem>
                        <FormItem label="生日" {...formItemLayout}>
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2019-1-1 11:14:59')
                                })(
                                    <DatePicker showTime
                                                format="YYYY/MM/DD HH:mm:ss"
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator('address', {
                                    initialValue: '江苏省xxx市xxx县'
                                })(
                                    <TextArea
                                        autosize={{ minRows: 3, maxRows: 5 }}
                                    />
                                )
                            }
                        </FormItem>
                        <FormItem label="时间安排" {...formItemLayout}>
                            {
                                getFieldDecorator('time')(
                                    <TimePicker />
                                )
                            }
                        </FormItem>
                        <FormItem label="头像上传" {...formItemLayout}>
                            {
                                getFieldDecorator('userImg')(
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        onChange={this.handleChange}
                                        beforeUpload={this.beforeUpload}
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    >
                                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                    </Upload>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            {
                                getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>我已阅读过<a href="#">xx协议</a></Checkbox>
                                )
                            }
                        </FormItem>
                        <FormItem {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                            <Button style={{marginLeft:10}} onClick={this.handleResetInfo}>重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create({ name: 'horizontal_login' })(Register);
