import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
const Login        = resolve => require(['@/pages/login/Login'], resolve)
const HomePage     = resolve => require(['@/pages/homePage/HomePage'], resolve)
const Article      = resolve => require(['@/pages/article/Article'], resolve)
const MavonEditor  = resolve => require(['@/pages/mavonEditor/MavonEditor'], resolve)
const Category     = resolve => require(['@/pages/category/Category'], resolve)
const Tag          = resolve => require(['@/pages/tag/Tag'], resolve)
const Comments     = resolve => require(['@/pages/comments/Comments'], resolve)
const LeaveWords   = resolve => require(['@/pages/leaveWords/LeaveWords'], resolve)
const Photo        = resolve => require(['@/pages/photo/Photo'], resolve)
const Links        = resolve => require(['@/pages/links/Links'], resolve)
const AdminInfo    = resolve => require(['@/pages/adminInfo/AdminInfo'], resolve)
const PwdModify    = resolve => require(['@/pages/password/PwdModify'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta:{
        title:'后台登录'
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'homePage',
          name:'homePage',
          component:HomePage,
          meta:{
            title:'系统首页'
          }
        },
        {
          path:'article',
          name:'article',
          component:Article,
          meta:{
            title:'博文管理'
          }
        },
        {
          path:'category',
          name:'category',
          component:Category,
          meta:{
            title:'类别管理'
          }
        },
        {
          path:'tag',
          name:'tag',
          component:Tag,
          meta:{
            title:'标签管理'
          }
        },
        {
          path:'comments',
          name:'comments',
          component:Comments,
          meta:{
            title:'评论管理'
          }
        },
        {
          path:'leavewords',
          name:'leavewords',
          component:LeaveWords,
          meta:{
            title:'留言管理'
          }
        },
        {
          path:'photo',
          name:'photo',
          component:Photo,
          meta:{
            title:'图片管理'
          }
        },
        {
          path:'links',
          name:'links',
          component:Links,
          meta:{
            title:'链接管理'
          }
        },
        {
          path:'adminInfo',
          name:'adminInfo',
          component:AdminInfo,
          meta:{
            title:'个人信息'
          }
        },
        {
          path:'pwdModify',
          name:'pwdModify',
          component:PwdModify,
          meta:{
            title:'修改密码'
          }
        }
      ],
    },
    {
      path: '/mavonEditor',
      name: 'mavonEditor',
      component: MavonEditor,
      meta:{
        title:'博文编写'
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
 })

 export default router
