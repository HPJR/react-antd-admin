import React , { Component } from 'react';
import { Card, Form, Icon, Input, Button,message,Checkbox} from 'antd';

const FormItem = Form.Item;

class FromLogin extends Component {

    handleSubmit = e => {
        //获取表单值
        let userInfo = this.props.form.getFieldsValue();
        e.preventDefault();
        //表单验证
        this.props.form.validateFields((err, values) => {
            if(!err){
                //values === userInfo
                console.log(values);
                message.success(`${userInfo.username1} 恭喜你，您通过本次表单组件学习，当前密码为：${userInfo.password1}`)
            }
        })
    };

    render() {
        const { getFieldDecorator} = this.props.form;

        return (
            <div>
                <Card title="内联登录" className="card-wrap">
                    <Form layout="inline" onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('username1', {
                                rules: [{ required: true, message: '用户名1不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password1', {
                                rules: [{ required: true, message: '密码1不为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Card>

                <Card title="登录框" className="card-wrap">
                    <Form layout="horizontal" style={{width:300}}>
                        <FormItem>
                            {getFieldDecorator('username2', {
                                rules: [{ required: true, message: '用户名2不能为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('password2', {
                                rules: [{ required: true, message: '密码2不为空' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />,
                            )}
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create({ name: 'horizontal_login' })(FromLogin);
