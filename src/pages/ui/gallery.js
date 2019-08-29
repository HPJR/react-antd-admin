import React , { Component } from 'react';
import {Card,Row,Col,Modal} from 'antd';
import './ui.less';

const { Meta } = Card;


export default class Gallery extends Component {

    state = {
        visible:false,
        imgUrl:''
    };

    getLargeImg = (list) =>{
        this.setState({
            visible:true,
            imgUrl:list
        })
    };

    render() {
        const imgs = [
            ['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg'],
            ['06.jpg','07.jpg','08.jpg','09.jpg','10.jpg'],
            ['11.jpg','12.jpg','13.jpg','14.jpg','15.jpg'],
            ['16.jpg','17.jpg','18.jpg','19.jpg','20.jpg'],
            ['21.jpg','22.jpg','23.jpg','24.jpg','25.jpg']
        ];
        const imgList = imgs.map((item)=>
            item.map((list,i)=>
                <Card
                    hoverable
                    cover={<img alt="example" src={"/gallery/"+ list} />}
                    key = { i }
                    onClick={()=>this.getLargeImg(list) }
                >
                    <Meta title="画廊" description="some description" />
                </Card>
            )
        );
        return (
            <div className='card-gallery'>
                <Row gutter={10}>
                    <Col span={5}>
                        { imgList[0] }
                    </Col>
                    <Col span={5}>
                        { imgList[1] }
                    </Col>
                    <Col span={5}>
                        { imgList[2] }
                    </Col>
                    <Col span={5}>
                        { imgList[3] }
                    </Col>
                    <Col span={4}>
                        { imgList[4] }
                    </Col>
                </Row>
                <Modal
                    title="画廊"
                    visible={this.state.visible}
                    onCancel={()=>{ this.setState({visible:false})}}
                    footer={null}
                >
                    {<img src={"/gallery/"+ this.state.imgUrl } alt="画廊" style={{maxWidth:'100%'}}/> }
                </Modal>
            </div>
        );
    }
}
