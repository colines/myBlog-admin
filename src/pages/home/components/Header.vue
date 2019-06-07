<template>
  <div class="header">
    <div class="left-info">
       <div class="search">
         <input type="text" placeholder="博文关键词">
         <span class="iconfont">&#xe616;</span>
       </div>
    </div>
    <div class="right-info">
      <div class="info-box" @mouseover="settingShow" @mouseout="settingHide">
        <div class="info-img">
          <img :src="imageUrl" alt="">
        </div>
      </div>
        <div class="setting" v-show="isShow" @mouseover="settingShow" @mouseout="settingHide">
          <router-link tag="span" to="adminInfo">设置</router-link>
          <span @click="logout">退出</span>
        </div>
      <ul>
        <li>
          <a-badge dot>
            <span class="iconfont" title="留言">&#xe61e;</span>
          </a-badge>
        </li>
        <li>
          <a-badge :count="2">
            <span class="iconfont " title="评论">&#xe6a7;</span>
          </a-badge>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      this.getAdminInfo();
      this.$EventBus.$on('getAdminInfo',(imageUrl)=>{
        this.imageUrl = imageUrl;
      })
    },
    data() {
      return {
        isShow: false,
        collapsed:false,
        imageId:'',
        imageUrl:'',
      }
    },
    methods: {
      getAdminInfo(){
        this.axios.get('/author/userDto/1').then(res=>{
          if(res.data.code == 0){
            let data = res.data.data;
            this.imageId = data.imageId;
            this.imageUrl = data.imageUrl;
            sessionStorage.setItem('admin',data);
          }
        })
      },
      settingShow() {
        this.isShow = true;
      },
      settingHide() {
        this.isShow = false;
      },
      logout(){
        this.$router.push('/');
      }
    },

  }

</script>

<style scoped>
  .header {
    width: 84%;
    height: 59px;
    background: #fff;
    position: fixed;
    right: 0;
    top: 0;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.06);
    z-index: 99;
  }
  .left-info{
    float: left;
    border-bottom:1px solid #eee;
    width: 300px;
    height: 30px;
    line-height: 30px;
    margin:15px 0 0 30px;;
  }
  input[type="text"]{
    width: 250px;
    padding: 1px 0 2px 10px;
    color: #666;
  }
  input::placeholder{
    color: #999;
  }
  .left-info .iconfont{
    color:#1890FF;
    font-size: 20px;
  }
 


  .right-info {
    position: relative;
  }

  .right-info ul li {
    float: right;
    width: 5%;
    height: 50px;
    line-height: 50px;
    margin-top: 8px;
  }

  .info-box{
    float: right;
    width: 40px;
    height: 60px;
    margin: 8px 120px 0 0;
    z-index: 99;
  }
  .info-img {
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    overflow: hidden;
    cursor: pointer;
  }

  .info-img img {
    width: 100%;
  }
  .setting {
    position: absolute;
    top: 50px;
    right: 100px;
    width: 80px;
    height: 95px;
    background: #fff;
    border-color: #ddd;
    border-radius: 2px;
    padding-top: 15px;
    z-index: 1;
  }

  .setting span {
    display: block;
    width: 80px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #333;
    cursor: pointer;
  }

  .setting span:hover {
    color: #f00;
  }


  .right-info .iconfont {
    font-size: 20px;
    color: #888;
    cursor: pointer;
  }

  .right-info .iconfont:hover {
    font-size: 25px;
  }

</style>
