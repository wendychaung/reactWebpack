import React from 'react';
import Page from "./page";
import $ from 'jquery';

import "../scss/list.scss";

import {Link,Switch,Route} from 'react-router-dom';

const ajaxUrl="/listmap";
const obj={};
const myJson=initData(obj,ajaxUrl);
const List=()=>(
    <Switch>
        <Route exact path="/list" component={Listall}/>
        <Route path="/list/:number" component={Liststyle}/>
    </Switch>
);
class Listall extends React.Component{
    constructor(props){
        super(props);
        this.state={
            indexList:[],
            mydata: myJson.rows,
            pageTotal:myJson.total,
            current:myJson.cur,
            page_size:myJson.page_size,
            goValue:"",
            page_count:myJson.page_count
        }
    }
   resetData(){
        let tjobj={
            cur:this.state.current
        };
       let myobj=initData(obj,ajaxUrl);
       this.setState({mydata:myobj.rows});
       this.setState({pageTotal:myobj.total});
       this.setState({page_size:myobj.page_size});
       this.setState({page_count:myobj.page_count});
    }
    pageClick(pageNum) {
        if (pageNum != this.state.current) {
            this.state.current = pageNum
        }
        this.state.indexList = [];
        this.resetData();
        for (let i = (pageNum - 1) * this.state.pageSize; i < this.state.pageSize * pageNum; i++) {
            if (this.state.mydata[i]) {
                this.state.indexList.push(this.state.mydata[i])
            }
        }
        this.setState({indexList: this.state.indexList});
    }
    goPrevClick(){
        let cur = this.state.current;
        if(cur > 1){
            this.pageClick( cur - 1);
            this.resetData();
        }
    }

        goNext(){
            let cur = parseInt(this.state.current);
            if(cur < this.state.page_count){
                this.pageClick(cur + 1);
                this.resetData();
            }
    }
        goSwitchChange(e){
            this.setState({goValue : e.target.value});
            let value = e.target.value;
            if(!/^[1-9]\d*$/.test(value)){
                alert('页码只能输入大于1的正整数');
            }else if(parseInt(value) > parseInt(this.state.page_count)){
                alert('没有这么多页');
            }else{
                this.pageClick(value);
                this.resetData();
            }}

    render(){
        return <div>
        <ul className="listall">
            {
                this.state.mydata.map(p =>(<li key={p.id}>< Link to={`/list/${p.id}`}>{p.paper}</Link> </li>))
            }
        </ul>
        {this.state.current}
        <Page
            total={this.state.pageTotal}
            current={this.state.current}
            totalPage={this.state.page_count}
            goValue={this.state.goValue}
            pageClick={(e)=>this.pageClick(e)}
            goPrev={(e)=>this.goPrevClick(e)}
            goNext={(e)=>this.goNext(e)}
            switchChange={(e)=>this.goSwitchChange(e)}
        />
    </div>;
    }
}
const Liststyle=(props)=>{
    let obj={
        id:props.match.params.id
    };
    let urls="/detail";
    let mydatas=initData(obj,urls).rows;
    if(!mydatas){
        return <div className="listclass">查找到的为空！</div>
    }
    return <div className="listclass">{mydatas.id} ++ {mydatas.paper}++{mydatas.buyTime}</div>
};
export default List;
function initData(jsons,ajaxUrl) {
    let mydata;
    $.ajax({
        url: ajaxUrl,
        data:jsons,
        type: "POST",
        dataType: 'json',
        async: false
    }).done(function (data) {
        if (data.result == true) {
            mydata = data;
        }
    });
    return mydata;
}