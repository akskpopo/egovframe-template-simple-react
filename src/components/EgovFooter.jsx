import React from 'react';
import { Link } from 'react-router-dom';

function EgovFooter() {
    return (
        <div className="footer">
            <div className="inner">
                <h1>
                    <Link to="">
                        {/* <img className="w" src="/assets/images/logo_footer_w.png" alt="" /> */}
                        <img className="w" src="/assets/images/samples/logo_b.png" alt="" />
                        <img className="m" src="/assets/images/logo_footer_m.png" alt="" />
                    </Link>
                </h1>
                <div className="info">
                    <p>
                        koreacit@koreacit.co.kr  <span className="m_hide">|</span><br className="m_show" />  TEL : 031 – 8023 – 5112 <br />
                    </p>
                    <p className="copy">COPYRIGHT (C) 2024 (주)한국융합아이티 ALL RIGHTS RESERVED.</p>
                </div>
                <div className="right_col">
                    <Link to="">
                        <img className="w" src="/assets/images/banner_w_01.png" alt="" />
                        <img className="m" src="/assets/images/banner_m_01.png" alt="" />
                    </Link>
                    <Link to="">
                        <img className="w" src="/assets/images/banner_w_02.png" alt="" />
                        <img className="m" src="/assets/images/banner_m_02.png" alt="" />
                    </Link>
                    <Link to="http://www.wiseinfotech.co.kr/">
                        <img className="w" src="/assets/images/samples/wise_logo_c.png" alt="" />
                        <img className="m" src="/assets/images/samples/wise_logo_c.png" alt="" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EgovFooter;