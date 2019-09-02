import React,{ Component } from 'react';
import { Row, Col } from 'antd';
import Header from './component/Header';

import './style/common.less'

export default class Common extends Component{
    render(){
        return(
            <Row className='container'>
                <Col span={24} className='main'>
                    <Header menuType="detail"/>
                    <Row className='content-wrap'>
                        <div className="content">
                            { this.props.children }
                        </div>
                    </Row>
                </Col>
            </Row>
        )
    }
}
