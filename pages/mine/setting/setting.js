// pages/mine/setting/setting.js

import WxReq from "../../../utils/wxRequest";

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  async requestTest() {
    const res = await WxReq.get("hotelList",null,null);
    console.log(res)
  },

  requestTestt() {

    // 通过 then 和 catch 接收返回的值
    WxReq.get("hotelList",null,null).then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }
})