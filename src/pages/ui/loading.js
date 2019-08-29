import React , { Component } from 'react';
import {Button,Card,Spin,Icon,Alert} from 'antd';
import './ui.less';

export default class Loading extends Component {
    state = {
        loadingStatus:true
    };
    handleHideSpin = () => {
        setTimeout(()=>{
            this.setState({
                loadingStatus:!this.state.loadingStatus
            })
        },2000)
    };
    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
        return (
            <div>
                <Card title="Spin加载" className="card-wrap">
                    <Spin size="small" />
                    <Spin />
                    <Spin size="large" />
                    <Spin indicator={antIcon}
                          spinning={ this.state.loadingStatus }
                    />
                    <Button type="primary" onClick={ this.handleHideSpin }>2秒后消失/显示</Button>
                </Card>
                <Card title="容器加载" className="card-wrap">
                    <Spin>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            style={{marginBottom:24}}
                        />
                    </Spin>
                    <Spin tip="Loading...">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="success"
                        />
                    </Spin>,
                </Card>
            </div>
        );
    }
}
