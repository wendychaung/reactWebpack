import React from 'react';
import PropTypes from 'prop-types';

import Promise from 'promise';

import 'expose-loader?$!jquery';
import 'expose-loader?jQuery!jquery';

import webu from './webuploader.html5only';
import ImgArea from './imgCard.js';
// import jquery from 'jquery';
import './index.css'

class WebUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fileUrlList: [],
            fileList: []
        };
        this.isSingle = false;
        this.addNewFile = this.addNewFile.bind(this);
        this.removeFile = this.removeFile.bind(this);
        this.updateQueue = this.updateQueue.bind(this);
        this.uploaderModule = this.uploaderModule.bind(this);
        this.showImgFn = this.showImgFn.bind(this);
        this.errorCallback = this.errorCallback.bind(this);
        this.hasUpload = this.props.fileList && this.props.fileList.length ? true : false;
        this.initFileNum = null;
        this.uploadCount = this.props.fileList && this.props.fileList.length ? this.props.fileList.length : 0;
    }

    addNewFile() {
        document.querySelector(`${this.props.uploaderConfig.pick.id} input`).click();
    }

    removeFile(index) {
        let thisIndex = index;
        let thisFileUrlList = this.state.fileUrlList;
        this.hasUpload = false;
        if(index >= this.initFileNum){
            this.WU.removeFile(this.state.fileList[index - this.initFileNum]);
            this.updateQueue();
        }else{
            this.initFileNum = this.initFileNum - 1
        }

        this.uploadCount = this.uploadCount - 1;
        thisFileUrlList.splice(thisIndex,1);
        this.setState({
            fileUrlList: thisFileUrlList,
        })
        this.props.otherUploaderConfig.removeFileCallback ? this.props.otherUploaderConfig.removeFileCallback(thisIndex) : null;
    }

    updateQueue() {
        let newList = this.WU.getFiles.apply(this.WU, ['queued', 'progress', 'complete', 'error']);
        this.setState({fileList : newList});
    }

    componentWillMount() {
        let thisFileUrlList = [];

        if(this.props.fileUrlList && this.props.fileUrlList.length){

            thisFileUrlList = thisFileUrlList.concat(this.props.fileUrlList);

            for(var i = 0; i < thisFileUrlList.length; i++){
                if(['jpg','jpeg','png'].indexOf(thisFileUrlList[i].suffix) == -1){
                    thisFileUrlList[i].preview = 'data:image/png;base64,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'
                }
            }
        }


        this.setState({
            fileUrlList: thisFileUrlList,
        });
        this.initFileNum = this.props.fileList ? this.props.fileList.length : 0;
    }

    errorCallback(file,reason){
        console.log(reason)
    }

    componentDidMount() {
        this.WU = new webu.create(this.props.uploaderConfig);
        this.WU.on('filesQueued', files => {
            let initfiles = files.map(file => {
                this.setState({[file.id] : 0});
                return new Promise((resolve, reject) => {
                    this.WU.makeThumb(file, (error, ret) => {
                        if (error) {
                            file.preview = 'data:image/png;base64,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';
                        } else {
                            file.preview = ret;

                        }
                        resolve();
                    }, this.props.styleConfig.width || 400, (this.props.styleConfig.width / (this.props.styleConfig.whSale || (4/3))) || 300);
                });
            });

            Promise.all(initfiles).then(()=>{
                let newList = this.state.fileList.concat(files);
                this.setState({fileList: newList});
            });
        });
        this.WU.on('beforeFileQueued', (file, percentage) => {
            let status = true;
            if(this.props.imgFormatReg && !this.props.uploaderConfig.pick.multiple && !this.props.imgFormatReg.test(file.name)){
                status = '格式错误';
                return false;
            }
            if(this.props.maxCount && this.uploadCount >= this.props.maxCount){
                return false;
            }else{
                this.uploadCount = this.uploadCount + 1;
            }
            this.hasUpload = true;
            this.props.otherUploaderConfig.otherUploaderConfig ? this.props.otherUploaderConfig.beforeFileQueuedCallback(file,status) : null;
        });
        this.WU.on('uploadProgress', (file, percentage) => {
            this.setState({[file.id]: percentage});
        });
        this.WU.on('uploadComplete', file => {
            this.updateQueue();
        });
        this.WU.on('uploadSuccess', this.props.otherUploaderConfig.successCallback);
        this.WU.on('uploadError', this.errorCallback);
    }

    showImgFn(){
        let imgDom = [];
        for(let i = 0;i < this.state.fileList.length; i++){
            if(this.state.fileList[i].preview){
                    imgDom.push(
                            <ImgArea
                                key = {i}
                                width = {this.props.styleConfig.width}
                                imgScale = {this.props.styleConfig.whSale}          //图片宽高比，宽/高
                                imgUrl = {this.state.fileList[i].preview}		//图片地址
                                index={i}
                                deleteFn={
                                    (i)=>{
                                        this.removeFile(i)
                                    }
                                }
                            >
                            </ImgArea>);
            }
        }
        return imgDom;
    }

    uploaderModule(){
        let displayStatus = this.hasUpload && this.props.otherUploaderConfig.isSingleUpload ? 'none' :'inline-block' ;
        return (
            <div className={`${this.props.clsPrefix}card-list`}>
                {this.showImgFn() }
                <div
                    onClick={() => this.addNewFile()} 
                    style={{
                        display: displayStatus,
                        verticalAlign: 'middle'
                    }}>
                    {this.props.uploadButtonJSX}
                </div>
            </div>
        );
    }
    render() {
        return (
            <div>
                {this.uploaderModule(this.state.fileList)}
            </div>
        );
    }
}
WebUploader.defaultProps = {
    clsPrefix: 'wu-'
};
WebUploader.propTypes = {
    uploaderConfig : PropTypes.shape({server: PropTypes.string, pick: PropTypes.any.isRequired, auto: PropTypes.bool,name: PropTypes.string}),
    clsPrefix: PropTypes.string
};
export default WebUploader;