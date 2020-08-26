export default {
  install(Vue) {
    Vue.prototype.$message = function(text) {
      if (window.M.toast && text) {
        window.M.toast({ html: text })
      }
    }
  }
}