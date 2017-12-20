import React from 'react';
import ImgBox from './imgBox.js';
require ('./imgCard.css');
export default class ImgArea extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			uploadImgHideShow: false,
		}
	}
	render(){
		return (
			<div 
				className='uploadImgBox' 
				onMouseOver={
					()=>{
						this.setState({uploadImgHideShow: true})
					}
				}
				onMouseOut={
					()=>{
						this.setState({uploadImgHideShow: false})
					}
				}
				onClick={()=>{this.props.deleteFn(this.props.index)}}
			>
				<div 
					className='uploadImgHide' 
					style={{
						display: this.state.uploadImgHideShow ? 'block' : 'none'
					}}
				>删除
				</div>
				<ImgBox
					width={this.props.width}
					imgScale = {this.props.imgScale}
					imgUrl = {this.props.imgUrl}
				>
				</ImgBox>
			</div>
		);
	}

};