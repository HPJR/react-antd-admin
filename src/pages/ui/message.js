import React , { Component } from 'react';
import {Button,Card,message} from 'antd';
import './ui.less';

export default class Message extends Component {

    openMessage = type => {
        message[type]('提示文字')
    };

    render() {
        return (
            <div>
                <Card title="Message全局提示" className="card-wrap">
                    <Button onClick={() => this.openMessage('success')}>Success</Button>
                    <Button onClick={() => this.openMessage('info')}>Info</Button>
                    <Button onClick={() => this.openMessage('warning')}>Warning</Button>
                    <Button onClick={() => this.openMessage('error')}>Error</Button>
                    <Button onClick={() => this.openMessage('loading')}>loading</Button>
                </Card>
            </div>
        );
    }
}
