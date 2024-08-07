// request.js

// 1.使用了微信自带的请求api wx.request
// 2.将wx.request封装到了一个名为request的函数中
// 3.将函数封装到了一个名为WxRequest的类中

// 创建一个WxRequest类
// 通过类的方式进行封装，会让代码更具有复用性
// 也可以方便添加新的属性和方法

class WxRequest {

  // 默认参数对
  defaults = {
    // 请求基地址
    baseURL: 'http://192.168.0.103:3000/',
    // 服务器接口地址
    url: '',
    // 请求方式
    method: 'GET',
    // 请求参数
    data: null,
    // 请求头：
    header: {
      'Content-type': 'application/json' // 设置数据的交互格式
    },
    // 默认超时时间为一分钟
    timeout: 60000
  }

  // 定义拦截对象，包括请求拦截器和响应拦截方法， 方便在请求或响应之前进行处理
  interceptors = {
    // 请求拦截器
    request: (config) => config,
    // 响应拦截器
    response: (response) => response
  }
  // 用于创建和初始化类的属性和方法
  // params为用户传入的请求配置项
  constructor(params = {}) {
    // 使用Object.assign方法合并默认参数以及传递的请求参数
    // 需要传入的参数，会覆盖默认的参数，因此传入的参数放在最后
    this.defaults = Object.assign({}, this.defaults, params)
  }

  // request实例方法接受一个对象类型的参数
  request(options) {
    // 拼接完整的请求路径
    options.url = this.defaults.baseURL + options.url
    // 合并请求参数
    options = {
      ...this.defaults,
      ...options
    }

    // 发送请求之前发送一个loading
    wx.showLoading({})

    // 在发送请求之前调用请求拦截器
    options = this.interceptors.request(options)

    console.log(options);

    return new Promise((resolve, reject) => {

      wx.request({

        // 使用拓展运算符将request函数传来的对象参数展开
        ...options,

        //只要成功接收到服务器返回，无论statusCode是多少，都会进入 success 回调

        //一般只有网络出现异常、请求超时等时候，才会走 fail 回调
        //当接口调用成功就会触发success回调函数
        success: (res) => {



          // 不管接口成功还是失败，都需要调用响应拦截器
          // 响应拦截器需要接受服务器响应的数据，然后对数据进行逻辑处理，处理好后进行返回

          // 再给响应拦截器传递参数时，需要将请求参数也一起上传
          // 方便进行代码的调试或者其他逻辑处理，所以需要合并参数
          // 然后将合并的参数给响应拦截器

          // 第一个参数：需要合并的目标对象
          // 第二个参数：服务器响应的数据
          // 第三个参数：请求配置以及自定义属性

          //不管是请求失败还是请求成功，都会将响应的数据传递给响应拦截器
          //这个时候合并参数时，就需要追加一个属性:isSuccess
          //如果属性值为true.说明执行了success同调函数
          const mergetRes = Object.assign({}, res, {
            config: options,
            isSuccess: true
          })

          // resolve(res)
          resolve(this.interceptors.response(mergetRes))
        },

        // 当接口调用失败的时候会触发fail回调函数
        fail: (err) => {
          //如果属性值为false,说明执行了fail回调函数
          const mergetErr = Object.assign({}, err, {
            config: options,
            isSuccess: true
          })
          // reject(err)
          reject(this.interceptors.response(mergetErr))
        },

        //不管promise请求是否成功，
        //都会执行complete里面的内容
        complete: () => {
          //接口调用完成后隐藏loading
          wx.hideLoading()
        },

        // 当接口调用失败时会触发fail回调函数
        fail: (err) => {
          //如果属性值为false,说明执行了fail回调函数
          const mergetErr = Object.assign({}, err, {
            config: options,
            isSuccess: false

          })
          // reject(err)
          reject(this.interceptors.response(mergetErr))
        }
      })
    })
  }
  //封装GET实例方法
  get(url, data = {}, config = {}) {
    return this.request(Object.assign({
      url,
      data,
      method: 'GET',
      config
    }))
  }

  // 封装POST实例方法
  post(url, data = {}, config = {}) {
    return this.request(Object.assign({
      url,
      data,
      method: 'POST',
      config
    }))
  }

  // 封装PUT实例方法
  put(url, data = {}, config = {}) {
    return this.request(Object.assign({
      url,
      data,
      method: 'PUT',
      config
    }))
  }

  // 封装DELETE实例方法
  delete(url, data = {}, config = {}) {
    return this.request(Object.assign({
      url,
      data,
      method: 'DELETE',
      config
    }))
  }

  // 用来处理并发请求
  all(...promise) {

    // 通过展开运算符接受传递的参数
    //展开运算符会将传入的参数转为数组

    console.log(promise);
    return Promise.all(promise)
  }
}
// export default WxRequest


// ----------------- 实例化 ----------------------

// 对 WxRequest 进行实例化
const WxReq = new WxRequest()

// 将 WxRequest 的实例通过模块化的方式暴露出去
export default WxReq