/* eslint-disable no-unused-vars */
import Vue from 'vue'

Vue.directive('lazy-src', {
  bind(el, binding) {
    const Img = new Image()
    Img.src = binding.value
    Img.onload = function() {
      el.src = Img.src
    }
    Img.onerror = () => {
      console.warn('图片url异常', binding.value)
    }
    // fixImage(el, binding.value)
  }
})

function fixUrl(url) {
  if (location.protocol === 'https:') {
    url = url.replace(/^http:/, 'https:')
  }
  return url
}

function fixImage(el, url) {
  if (myBrowser() === 'Safari') {
    return
  }
  const Img = new Image()
  Img.src = fixUrl(url)
  Img.onload = function() {
    window.EXIF.getData(this, function() {
      const Orientation = window.EXIF.getTag(this, 'Orientation')
      if (Orientation === 6) {
        el.style.transform = 'rotate(90deg)'
      } else if (Orientation === 8) {
        el.style.transform = 'rotate(-90deg)'
      } else if (Orientation === 3) {
        el.style.transform = 'rotate(180deg)'
      }
    })
  }
  Img.onerror = () => {
    console.log('旋转失败,可能没有https资源')
  }
}

function myBrowser() {
  var userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  var isOpera = userAgent.indexOf('Opera') > -1
  if (isOpera) {
    return 'Opera'
  } // 判断是否Opera浏览器
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF'
  } // 判断是否Firefox浏览器
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome'
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari'
  } // 判断是否Safari浏览器
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE'
  } // 判断是否IE浏览器
}
