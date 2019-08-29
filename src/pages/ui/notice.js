import React , { Component } from 'react';
import {Button,Card,notification} from 'antd';
import './ui.less';

export default class Notification extends Component {

    openNotificationWithIcon = (type,direction) => {
        if(direction){
            notification.config({
                placement:direction
            });
        }
        notification[type]({
            message: '标题',
            description:
                '内容...............',
        });
    };

    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-wrap">
                    <Button onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
                    <Button onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
                    <Button onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
                    <Button onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
                </Card>
                <Card title="通知提醒框 方向" className="card-wrap">
                    <Button onClick={() => this.openNotificationWithIcon('success','topLeft')}>topLeft</Button>
                    <Button onClick={() => this.openNotificationWithIcon('info','topRight')}>topRight</Button>
                    <Button onClick={() => this.openNotificationWithIcon('warning','bottomLeft')}>bottomLeft</Button>
                    <Button onClick={() => this.openNotificationWithIcon('error','bottomRight')}>bottomRight</Button>
                </Card>
            </div>
        );
    }
}
