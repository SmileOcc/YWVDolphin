//index.js
//获取应用实例
import showDetail from "../../modules/showDetail";
import showcDetail from "../../modules/showcDetail";
import {
  asyncSetStorage,
  getStorage
} from "../../utils/storage";
const app = getApp()

Page({
  data: {
    // 生成随机数
    randomNum: Math.random() * 100,
    page: 1,
    pageSize:20,
    total:40,
    isLoading: false,

    shopList:[],
    query:{id:"1"},
    index_slides: [],
    indicator_dots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    nav_data: [],
    index_activity: [],
    index_block: [],
    isTap: false,
    isLoading: false,
    //九宫格数据
    gridList: [],
    menu_list: [{
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类1",
        path: ""
      },
      {
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类2",
        path: ""
      },
      {
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类3",
        path: ""
      },
      {
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类4",
        path: ""
      },
      {
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类5",
        path: ""
      },
      {
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类6",
        path: ""
      },
      {
        id: "x",
        img: "../../assets/nav_img/phone.png",
        title: "分类7",
        path: ""
      },
      // {id:"x",img:"../../assets/nav_img/phone.png",title:"分类8",path:""}
    ],
  },
  onLoad() {
    const index_slides = app.globalData.index_slides,
      nav_data = app.globalData.nav_data,
      index_activity = app.globalData.index_activity,
      index_block = app.globalData.index_block,
      sectionList = index_block.map((section) => {
        return section.section;
      })
    console.log(sectionList);
    this.setData({
      index_slides,
      nav_data,
      index_activity,
      index_block,
    });

    //存储数据
    asyncSetStorage("hasLoad", true).then((res) => {

      let kkk = getStorage("hasLoad")
      console.log("hasLoad: " + kkk)

    }).catch((error) => {
      console.log("save: " + JSON.stringify(error))

    });

    this.getGridList();
  },
  onShow(e) {
    this.setData({
      isTap: false
    });

    //封装toast
    // wx.toast({ title: '数据加载成功....', mask: true });

    // wx.modal({
    //   title: '提示',
    //   content: '您确定执行该操作吗?',
    //   confirmColor: '#f3514f',
    // })
  },

  //获取九宫格数据
  getGridList() {
    wx.request({
      url: "https://applet-base-api-t.itheima.net/categories",
      method: 'GET',
      success: (res) => {
        console.log(res)
        this.setData({
          gridList: res.data
        })
      }
    })
  },
  //事件处理函数
  toSearch(e) {
    this.setData({
      isTap: true
    });
    wx.navigateTo({
      url: "../search/search",
    })


  },

  actionActivity(e) {
    let {
      id
    } = e.currentTarget.dataset
    console.log(id)
    // wx.navigateTo({
    //   url: `../activityDetail/activityDetail?id=${id}`,
    // })

    // wx.switchTab 方法用于跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面，通常用于跳转到小程序的主页。
    wx.switchTab({
      url: '/pages/categories/categories',
    })
  },

  actionThemeActivity(e) {
    let {
      id
    } = e.target.dataset
    console.log(id)
    wx.navigateTo({
      url: `../activityDetail/activityDetail?id=${id}`,
    })
  },


  // showDetail(e){
  //   const id=e.currentTarget.dataset.pid;
  //   console.log(id);
  // }
  showDetail,
  showcDetail,

  categoryTap(e) {
    let info = e.currentTarget.dataset.info
    console.log(info)

    // wx.showLoading({
    //   title: 'title',
    // })

    wx.showToast({
      title: info.title,
      icon: null
    })
  },

  //下拉刷新
  onPullDownRefresh() {
    //需要重置关键的数据
    this.setData({
      page:1,
      shopList:[],
      total:0
    })
    //重新发送数据请求
    this.getShopList(()=>{
      wx.stopPullDownRefresh()
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    console.log("load more: " + this.data.page)
    if (this.data.isLoading) return

    //判断是否还有下一页的数据
    if(this.data.page * this.data.pageSize >= this.data.total) {
      //到底了
      return wx.showToast({
        title:'数据加载完毕',
        icon:'none'
      })
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getShopList()
  },

  getShopList(opBlock) {
    //展示loading效果
    this.setData({
      isLoading: true
    })
    wx.showLoading({
      title: '数据加载中'
    })
    wx.request({
      url: `https://applet-base-api-t.itheima.net/categories/${this.data.query.id}/shops`,
      method: 'GET',
      data: {
        _page: this.data.page,
        _limit: this.data.pageSize
      },
      success: (res) => {
        console.log(res)
        this.setData({
          shopList: [...this.data.shopList, ...res.data],
          // 将字符串转化为数字
          total: res.header['X-Total-Count'] - 0
        })
      },
      complete: () => {
        //隐藏loading效果
        wx.hideLoading()
        this.setData({
          isLoading: false
        })

        //当数据请求完成之后关闭下拉刷新的窗口
        //wx.stopPullDownRefresh()
        opBlock && opBlock()
      }
    })
  }
})