import React , { Component } from 'react';
import {Card,Carousel} from 'antd';
import './ui.less';

export default class Carousels extends Component {
    render() {
        return (
            <div>
                <Card title="文字轮播" className="card-wrap">
                    <Carousel>
                        <div>
                            <h3>1</h3>
                        </div>
                        <div>
                            <h3>2</h3>
                        </div>
                        <div>
                            <h3>3</h3>
                        </div>
                        <div>
                            <h3>4</h3>
                        </div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="card-wrap carousel-img">
                    <Carousel>
                        <div><img src="/gallery/01.jpg" alt=""/></div>
                        <div><img src="/gallery/02.jpg" alt=""/></div>
                        <div><img src="/gallery/03.jpg" alt=""/></div>
                        <div><img src="/gallery/04.jpg" alt=""/></div>
                    </Carousel>
                </Card>
            </div>
        );
    }
}
