import React, { Component } from 'react'

class Home extends Component {
  render() {
    return (
      <div className="page">
        <div className="rights-detail-page">
          <ul className="rights-detail-tab j-list-rights-detail-tab">
            <li className="item" data-id="3">免费听小说</li>
            <li className="item" data-id="1">免费听讲书</li>
            <li className="item" data-id="2">免费听专栏</li>
            <li className="item" data-id="6">免声音广告</li>
            <li className="item" data-id="5">福利折扣</li>
            <li className="item" data-id="7">尊贵标识</li>
          </ul>
      <div className="rights-detail-page-container">
            <div className="rights-detail-page-wrapper">
              <div className="rights-detail-page-item" data-id="3">
                <img src="http://fdfs.xmcdn.com/group57/M0A/20/DE/wKgLgVxRU-HBKmV_AASyzHCDa50056.png" alt="" />
              </div>
              <div className="rights-detail-page-item" data-id="1">
                <img src="http://fdfs.xmcdn.com/group53/M06/A2/9D/wKgLfFw0ewfzMc0LAAD-RZFMJMU839.png" alt="" />
              </div>
              <div className="rights-detail-page-item" data-id="2">
                <img src="http://fdfs.xmcdn.com/group53/M0B/78/15/wKgLfFwbIk7gQGx-AAFoIPG86pg866.png" alt="" />
              </div>
              <div className="rights-detail-page-item" data-id="6">
                <img src="http://fdfs.xmcdn.com/group53/M0B/78/15/wKgLfFwbIk7hpFPAAABoxstSvxM911.png" alt="" />
              </div>
              <div className="rights-detail-page-item" data-id="5">
                <img src="http://fdfs.xmcdn.com/group53/M0B/78/60/wKgLcVwbIk7BMhJAAACSSgTagFo311.png" alt="" />
              </div>
              <div className="rights-detail-page-item" data-id="7">
                <img src="http://fdfs.xmcdn.com/group53/M0B/78/60/wKgLcVwbIk_xpZ5MAADPlVDo7_4931.png" alt="" />
              </div>
            </div>
          </div>

          <div className="btn-back-wrap"><a href='http://xiaoya.ximalaya.com/xiaoya-member/index.html' className="btn">开通会员享特权</a></div>
        </div>
      </div>
    )
  }
}

export default Home
