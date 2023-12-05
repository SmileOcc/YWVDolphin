const showDetail=(e)=>{
    const id=e.currentTarget.dataset.pid;
    console.log(id);
    wx.navigateTo({
        // url: `/pages/goods/show?id=${id}`
        url:`/pages/goodsDetail/goodsDetail?id=${id}`
    })
};
export default showDetail;