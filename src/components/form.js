import React from 'react';

import "../scss/form.scss"

class Forms extends  React.Component{
    constructor(props){
        super(props);

        // this.state={
        //     inputname:"",
        //     mima:"",
        //     gender:"",
        //     aihao:[],
        //     xuanze:"",
        //     duoxuan:[],
        //     miaoshu:""
        // };
        this.state={
            inputname:"ceshi",
            mima:"777",
            gender:"1",
            aihao:["aihao2","aihao3"],
            xuanze:"xuanze2",
            duoxuan:["duoxuan1","duoxuan4"],
            miaoshu:"描述描述描述描述描述"
        };
        // if(types==="edit"){
        //     this.setState({inputname:"ceshi"});
        //     this.setState({mima:"555"});
        //     this.setState({gender:"1"});
        //     this.setState({aihao:["aihao2","aihao3"]});
        //     this.setState({xuanze:"xuanze2"});
        //     this.setState({duoxuan:["duoxuan1","duoxuan4"]});
        //     this.setState({miaoshu:"描述描述描述描述描述"});
        // }

    }
    handleSubmit(e){
        e.preventDefault();
        console.log(this.state)
    }
    handlechange(e){
        let type=e.target.type;
        let name=e.target.name;
        let value=e.target.value;
        switch(type){
            case "checkbox":

                if(e.target.checked){
                    this.setState(function (prevState) {
                        prevState[name].push(value);
                        return {[name]:prevState[name]};
                    });
                }
                else{
                    this.setState(function (prevState) {
                    let arrIndex=prevState[name].indexOf(value);
                    prevState[name].splice(arrIndex,1);
                        return {[name]:prevState[name]};
                    });
                }
                break;
            default:
                if(e.target.multiple){
                    this.setState(function (prevState) {
                        prevState[name].push(value);
                        return {[name]:prevState[name]};
                    });
                    break;
                }
                this.setState({[name]:value});
                break;
        }
    }
    render(){
        return<div className="formclass">
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <div>
                    姓名：<input type="text"  name="inputname" value={this.state.inputname} onChange={(e)=>this.handlechange(e)}/>
                </div>
                <div>
                    密码：<input type="password"  name="mima" value={this.state.mima} onChange={(e)=>this.handlechange(e)}/>
                </div>
                <div>
                    性别：
                    <input type="radio" value="1" id="male" name="gender" onChange={(e)=>this.handlechange(e)} checked={parseInt(this.state.gender,10)===1}/><label htmlFor="male">男</label>
                    <input type="radio" value="0" id="female" name="gender" onChange={(e)=>this.handlechange(e)} checked={parseInt(this.state.gender,10)===0}/><label htmlFor="female">女</label>
                </div>
                <div>
                    兴趣：
                    <input type="checkbox" value="aihao1" id="aihao1" name="aihao"  onChange={(e)=>this.handlechange(e)} checked={this.state.aihao.indexOf("aihao1")>-1?"checked":""}/><label htmlFor="aihao1">aihao1</label>
                    <input type="checkbox" value="aihao2" id="aihao2" name="aihao"  onChange={(e)=>this.handlechange(e)} checked={this.state.aihao.indexOf("aihao2")>-1?"checked":""}/><label htmlFor="aihao2">aihao2</label>
                    <input type="checkbox" value="aihao3" id="aihao3" name="aihao"   onChange={(e)=>this.handlechange(e)} checked={this.state.aihao.indexOf("aihao3")>-1?"checked":""}/><label htmlFor="aihao3">aihao3</label>
                    <input type="checkbox" value="aihao4" id="aihao4" name="aihao"  onChange={(e)=>this.handlechange(e)} checked={this.state.aihao.indexOf("aihao4")>-1?"checked":""}/><label htmlFor="aihao1">aihao4</label>
                    <input type="checkbox" value="aihao5" id="aihao5" name="aihao"  onChange={(e)=>this.handlechange(e)} checked={this.state.aihao.indexOf("aihao5")>-1?"checked":""}/><label htmlFor="aihao1">aihao5</label>
                </div>
                <div>
                    选择：
                    <select name="xuanze"  onChange={(e)=>this.handlechange(e)} value={this.state.xuanze}>
                        <option value="xuanze1" >xuanze1</option>
                        <option value="xuanze2">xuanze2</option>
                        <option value="xuanze3" >xuanze3</option>
                        <option value="xuanze4" >xuanze4</option>
                    </select>
                </div>
                {/*<div>*/}
                    {/*多择：*/}
                    {/*<select multiple={true} name="duoxuan" onChange={(e)=>this.handlechange(e)}>*/}
                        {/*<option value="duoxuan1" selected={this.state.duoxuan==="duoxuan1"}>duoxuan1</option>*/}
                        {/*<option value="duoxuan2" selected={this.state.duoxuan==="duoxuan2"}>duoxuan2</option>*/}
                        {/*<option value="duoxuan3" selected={this.state.duoxuan==="duoxuan3"}>duoxuan3</option>*/}
                        {/*<option value="duoxuan4" selected={this.state.duoxuan==="duoxuan4"}>duoxuan4</option>*/}
                    {/*</select>*/}
                {/*</div>*/}
                <div>
                    描述：<textarea name="miaoshu"  value={this.state.miaoshu} cols="30" rows="10"  onChange={(e)=>this.handlechange(e)}/>
                </div>
                <div>
                    <input type="submit" value="提交"/>
                </div>
            </form>
        </div>
    }
}

export default Forms;