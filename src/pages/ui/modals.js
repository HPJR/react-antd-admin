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
                        title="Basic Modal"
                        visible={this.state.showModal1}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>

                </Card>
            </div>
        );
    }
}
