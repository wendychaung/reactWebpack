import React from 'react';
import '../webUploader/index.css'
import WebUploader from '../webUploader/WebUploader';

class Uploads extends React.Component{
    constructor(props) {
        super(props)
    }
    render(){
        return (
            <div className="app">
                <WebUploader
                    uploaderConfig={{
                        server: 'http://ohhitp3nx.bkt.clouddn.com',    //上传服务器地址
                        pick: {
                            id: '#pick',
                            multiple:false
                        },
                        fileNumLimit: 1,
                        auto: true,
                        accept: {
                            title: 'Images',
                            extensions: 'gif,jpg,jpeg,bmp,png',
                            mimeTypes: 'image/*'
                        }
                    }}
                    otherUploaderConfig={{                          //个人业务配置
                        isSingleUpload: true,                          //是否为单图上传（如设置FALSE，则在选择过后不会隐藏上传按钮）
                        beforeFileQueuedCallback: (file, status)=>{ //开始上传回调,file为要上传的问件，status为图片格式验证的状态
                            console.log(file);
                            console.log(percentage);
                        },
                        successCallback: (file,response)=>{				//上传成功回调，file为上传的文件信息，response为服务器返回内容
                            console.log(file);
                            console.log(response)
                        },
                        removeFileCallback: (index)=>{                  //删除成功回调，index为图片索引
                            console.log(index)
                        }
                    }}
                    styleConfig={{
                        width: 400,                                     //上传图片宽度，高度为宽度的3/4,如需要更多尺寸，联系DBY
                        whSale: 4/3                                     //上传图片宽高比
                    }}

                    fileUrlList={[{                                 //预览/编辑功能，数组每一项为图片，其中preview为图片的地址
                        preview: '../images/deleteIcon.png',
                        suffix: 'zip'
                    }]}
                    imgFormatReg={/\d/}  								   //图片格式验证正则，仅在单图模式有效（即multiple为false时有效）
                    uploadButtonJSX={                                   // 可选参数，用于自定义上传界面
                        <div>
                            <button className="upload-button" >上传</button>
                            <div id="pick"></div>
                        </div>
                    }
                />

            </div>
        )
    }
}

export default Uploads;