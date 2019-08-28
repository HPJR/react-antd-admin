import React , { Component } from 'react';
import {Button,Card,Icon,Radio} from 'antd';
import './ui.less';

const ButtonGroup = Button.Group;

export default class Buttons extends Component {
    state = {
        loading: true,
        value:'default'
    };

    handleCloseLoading = () => {
        this.setState({ loading: !this.state.loading });
    };

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    };

    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button type="danger">Danger</Button>
                    <Button type="link">Link</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button shape="circle" icon="search" />
                    <Button type="primary" icon="search">搜索</Button>
                    <Button type="primary" icon="download">下载</Button>
                </Card>
                <Card title="按钮Loading" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading} />
                    <Button loading={this.state.loading}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loading} />
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <ButtonGroup>
                        <Button type="primary"><Icon type="left" />前进</Button>
                        <Button type="primary"><Icon type="right" />后退</Button>
                    </ButtonGroup>
                </Card>
                <Card title="按钮尺寸" className="card-wrap">
                    <Radio.Group onChange={this.handleChange} value={this.state.value}>
                        <Radio value='small'>small</Radio>
                        <Radio value='default'>default</Radio>
                        <Radio value='large'>large</Radio>
                    </Radio.Group>
                    <Button type="primary" size={ this.state.value }>Primary</Button>
                    <Button size={ this.state.value }>Default</Button>
                    <Button type="dashed" size={ this.state.value }>Dashed</Button>
                    <Button type="danger" size={ this.state.value }>Danger</Button>
                </Card>
            </div>
        );
    }
}
