// pages/mine/setting/setting.js

import WxReq from "../../../utils/wxRequest";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "你好呀！",
    flag: true,
    array:["1","2","3","4","5","6","7","8"],
    //导航传过来的参数对象
    query:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // 通过声明式导航传参或编程式导航传参所携带的参数，可以直接在 onLoad 事件中直接获取到，示例代码如下
  onLoad(options) {
    console.log(options)
    this.setData({
      query:options
    })
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

      wx.showModal({
        title: '提示',
          content: JSON.stringify(res),
        success (res) {
          if (res.confirm) {
            //这里是点击确认执行事件
          } else if (res.cancel) {
                //这里是点击取消执行事件
          }
         }
      })
      
    })
    .catch((err) => {
      console.log(err)
    })
  },

  tabHandler(event){
    //如：A 上放了个小视图B，A绑定了事件，
    // 点击在B视图上时：target=B,currentTarget=A
    // 点击A视图上时：target=currentTarget=A
    console.log("event.target =====>",event.target);//点击的视图是谁就是谁
    console.log("event.currentTarget =====>",event.currentTarget); //谁绑定的事件，就是谁
  },
  btnTabHandler(event){
    //如：A 上放了个小视图B，A绑定了事件，B也绑定了事件，触发B时，先响应B事件，在响应A事件
    console.log("button event.target =====>",event.target);
    console.log("button event.currentTarget =====>",event.currentTarget);
  },

  btnInput(event){
    // event.detail.value 是变化后的值，文本框里最新的值
    console.dir("event.detail.value = " + event.detail.value);
    // 通过event.detail.value获取文本框最新的值,再给msg赋值
    this.setData({
      msg: event.detail.value,
    });
  },
})