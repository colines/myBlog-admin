// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import moment from 'moment'
import qs from 'qs'
import Utils from './utils/utils'
import {Menu,Icon,Badge,message,Button,Table,Input,
        Radio,Modal,Tree,Transfer,Select,
        Upload,Switch,Pagination,Popover,Drawer,Card,List,Avatar,
        Spin,Collapse,Comment,Carousel,Tooltip,Popconfirm,Tag} from 'ant-design-vue'
import "./assets/styles/css/reset.css"
import "./assets/styles/css/iconfont.css"
import './assets/styles/css/content.css'
moment.locale('zh-cn');
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Badge);
Vue.use(message);
Vue.use(Button);
Vue.use(Table);
Vue.use(Input);
Vue.use(Radio);
Vue.use(Modal);
Vue.use(Tree);
Vue.use(Transfer);
Vue.use(Select);
Vue.use(Upload);
Vue.use(Switch);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Drawer);
Vue.use(Card);
Vue.use(List);
Vue.use(Avatar);
Vue.use(Spin);
Vue.use(Collapse);
Vue.use(Comment);
Vue.use(Carousel);
Vue.use(Tooltip);
Vue.use(Popconfirm);
Vue.use(Tag);
Vue.prototype.$message = message
Vue.prototype.Utils = Utils
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false
// axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
Vue.prototype.qs = qs                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.prototype.axios = axios
Vue.prototype.moment = moment

axios.defaults.baseURL = 'http://10.79.3.57:8080/myblog'
Vue.prototype.home = 'http://localhost:8081/#/'
// axios.defaults.baseURL = 'http://172.21.105.48:8080/myblog'

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
