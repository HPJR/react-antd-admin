import React , { Component } from 'react';
import {Button,Card,Modal} from 'antd';
import './ui.less';

export default class Modals extends Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    };

    handleOpen = (type) => {
      this.setState({
          [type]:true
      })
    };

    handleConfirm = (type) => {
        Modal[type]({
            title: '确认？',
            content:'someThing？',
            maskClosable:true,
            onOk() {
                console.log('ok')
            },
            onCancel() {
                console.log('Cancel')
            }
        })
    };

    render() {
        return (
            <div>
                <Card title="基础模拟框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleOpen("showModal1")}>
                        Open
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen("showModal2")}>
                        自定义页脚
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen("showModal3")}>
                        顶部20px弹框
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen("showModal4")}>
                        水平垂直居中
                    </Button>
                    <Modal
                        title="Open"
                        visible={this.state.showModal1}
                        onCancel={()=>{
                            this.setState({
                                showModal1:false
                            })
                        }}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <Modal
                        title="自定义页脚"
                        visible={this.state.showModal2}
                        okText="好的"
                        cancelText="取消"
                        onCancel={()=>{
                            this.setState({
                                showModal2:false
                            })
                        }}
                    >
                        <p>自定义页脚</p>
                    </Modal>
                    <Modal
                        title="顶部20px弹框"
                        visible={this.state.showModal3}
                        style={{top:20}}
                        onCancel={()=>{
                            this.setState({
                                showModal3:false
                            })
                        }}
                    >
                        <p>顶部20px弹框</p>
                    </Modal>
                    <Modal
                        title="水平垂直居中"
                        visible={this.state.showModal4}
                        wrapClassName="vertical-center-modal"
                        onCancel={()=>{
                            this.setState({
                                showModal4:false
                            })
                        }}
                    >
                        <p>水平垂直居中</p>
                    </Modal>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
            </div>
        );
    }
}
