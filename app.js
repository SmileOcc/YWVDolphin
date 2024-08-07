import mock from "./utils/mock";

App({
  onLaunch: function () {
    Object.assign(this.globalData,mock)
    // console.log(this.globalData);
  },
  globalData: {
    userInfo: null
  }
})