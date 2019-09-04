import React , { Component } from 'react';
import { Card, Form, Table, Modal , Button,message,Select} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html'


export default class RichText extends Component {
    constructor(){
        super();
        this.state = {
            editorContent: '',
            editorState: '',
            modalStatus:false
        }
    }

    //清空
    handleEmptyText = () =>{
        this.setState({
            editorState:"",
        });
    };

    //获取内容
    handleGetText = () => {
        this.setState({
            modalStatus: true
        })
    };

    //编辑器改变
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    //内容设置
    onContentStateChange = (contentState) => {
        this.setState({
            contentState,
        });
    };


    render(){
        const { editorState } = this.state;
        return(
            <div>
                <Card className="card-wrap">
                    <Button type="primary" onClick={ this.handleEmptyText }>清空内容</Button>
                    <Button type="primary" onClick={ this.handleGetText }>获取内容</Button>
                </Card>
                <Card title="富文本编辑器" className="card-wrap">
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onContentStateChange={this.onContentStateChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                </Card>
                <Modal
                    title="富文本内容"
                    visible={this.state.modalStatus}
                    onCancel={() =>{
                        this.setState({
                            modalStatus: false
                        })
                    }}
                    footer={null}>
                    { draftjs(this.state.contentState) }
                </Modal>
            </div>
        )
    }
}
