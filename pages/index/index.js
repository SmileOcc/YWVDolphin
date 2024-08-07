//index.js
//获取应用实例
import showDetail from "../../modules/showDetail";
import showcDetail from "../../modules/showcDetail";
const app = getApp()

Page({
  data: {
    index_slides:[],
    indicator_dots:true,
    autoplay:true,
    interval:2000,
    duration:1000,
    nav_data:[],
    index_activity:[],
    index_block:[],
    isTap:false,
    isLoading:false,
    menu_list:[
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类1",path:""},
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类2",path:""},
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类3",path:""},
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类4",path:""},
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类5",path:""},
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类6",path:""},
      {id:"x",img:"../../assets/nav_img/phone.png",title:"分类7",path:""},
      // {id:"x",img:"../../assets/nav_img/phone.png",title:"分类8",path:""}
    ],
  },
  onLoad(){
    const index_slides=app.globalData.index_slides,
          nav_data=app.globalData.nav_data,
          index_activity=app.globalData.index_activity,
          index_block=app.globalData.index_block,
          sectionList=index_block.map((section)=>{
      return section.section;
    })
    console.log(sectionList);
    this.setData({
      index_slides,
      nav_data,
      index_activity,
      index_block,
    });
    
  },
  onShow(e){
    this.setData({
      isTap:false
    });
  },
  //事件处理函数
  toSearch(e){
    this.setData({
      isTap:true
    });
    wx.navigateTo({
      url: "../search/search"
    })
  },

  actionActivity(e){
    let {id} = e.currentTarget.dataset
    console.log(id)
    wx.navigateTo({
      url: `../activityDetail/activityDetail?id=${id}`,
    })
  },

  actionThemeActivity(e) {
    let {id} = e.target.dataset
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
      icon:null
    })
  }
})
