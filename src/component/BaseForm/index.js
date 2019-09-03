import React from 'react'
import { Input, Select, Form, Button, Checkbox, DatePicker} from 'antd'
import Utils from '../../untils/untils'

const { RangePicker } = DatePicker;
const FormItem = Form.Item;

class FilterForm extends React.Component{

    //提交
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        console.log(fieldsValue);
        this.props.filterSubmit(fieldsValue);
    };

    // 重置
    reset = () => {
        this.props.form.resetFields();
    };

    /*创建表单*/
    initFormList = () => {
        const {getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if(formList && formList.length>0){
            formList.forEach((item,index)=>{
                let key = index;
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;

                switch (item.type) {
                    case '时间查询':
                        const begin_time = <FormItem label="订单时间" key='begin'>
                            {
                                getFieldDecorator('time')(
                                    <RangePicker />
                                )
                            }
                        </FormItem>;
                        formItemList.push(begin_time);
                        break;

                    case 'INPUT':
                        const INPUT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field])(
                                    <Input type="text" style={{width: width}} placeholder={placeholder}/>
                                )
                            }
                        </FormItem>;
                        formItemList.push(INPUT);
                        break;

                    case 'SELECT':
                        const SELECT = <FormItem label={label} key={ key }>
                            {
                                getFieldDecorator([field],{
                                    initialValue: initialValue
                                })(
                                    <Select
                                        style={{width: width}}
                                        placeholder={[placeholder]}
                                    >
                                        {Utils.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>;
                        formItemList.push(SELECT);
                        break;

                    case 'CHECKBOX':
                        const CHECKBOX = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field],{
                                    valuePropName: 'checked',
                                    initialValue: initialValue //true | false
                                })(
                                    <Checkbox>
                                        {label}
                                    </Checkbox>
                                )
                            }
                        </FormItem>;
                        formItemList.push(CHECKBOX);
                        break;


                    case 'DATE':
                        const DATEPICKER = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field])(
                                    <DatePicker showTime={true} placeholder={placeholder} format="YYYY-MM-DD HH:mm:ss"/>
                                )
                            }
                        </FormItem>;
                        formItemList.push(DATEPICKER);
                        break;

                    default:
                        break;
                }
            })
        }
        return formItemList;
    };

    render(){
        return (
            <Form layout="inline">
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" style={{margin:'0 10px'}} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}
export default Form.create({})(FilterForm)
