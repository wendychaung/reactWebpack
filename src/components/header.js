import React from 'react';
import {Link} from 'react-router-dom';
const Headertop=()=>( <div>
        <header>
            <nav>
                <ul>
                    <li><Link to="/">首页</Link></li>
                    <li><Link to="/list">列表页</Link></li>
                    <li><Link to="/forms">表单页</Link></li>
                    <li><Link to="/uploads">上传页</Link></li>
                </ul>
            </nav>
        </header>
    </div>
);
export default Headertop;