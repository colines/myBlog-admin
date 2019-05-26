import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/Login'
import Home from '@/pages/home/Home'
import HomePage from '@/pages/homePage/HomePage'
import Article from '@/pages/article/Article'
import MavonEditor from '@/pages/mavonEditor/MavonEditor'
import Category from '@/pages/category/Category'
import Tag from '@/pages/tag/Tag'
import Comments from '@/pages/comments/Comments'
import LeaveWords from '@/pages/leaveWords/LeaveWords'
import Photo from '@/pages/photo/Photo'
import Links from '@/pages/links/Links'
import AdminInfo from '@/pages/adminInfo/AdminInfo'
import PwdModify from '@/pages/password/PwdModify'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children:[
        {
          path:'homePage',
          name:'homePage',
          component:HomePage
        },
        {
          path:'article',
          name:'article',
          component:Article
        },
        {
          path:'category',
          name:'category',
          component:Category
        },
        {
          path:'tag',
          name:'tag',
          component:Tag
        },
        {
          path:'comments',
          name:'comments',
          component:Comments
        },
        {
          path:'leavewords',
          name:'leavewords',
          component:LeaveWords
        },
        {
          path:'photo',
          name:'photo',
          component:Photo
        },
        {
          path:'links',
          name:'links',
          component:Links
        },
        {
          path:'adminInfo',
          name:'adminInfo',
          component:AdminInfo
        },
        {
          path:'pwdModify',
          name:'pwdModify',
          component:PwdModify
        }
      ],
    },
    {
      path: '/mavonEditor',
      name: 'mavonEditor',
      component: MavonEditor
    },
  ]
})
