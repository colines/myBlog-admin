<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-box">
        <div class="div-box">
          <p class="box-title">后台登录</p>
          <div class="username" :class="focusFlag == 1 ? focusClass : ''">
            <span class="iconfont">&#xe63c;</span>
            <input type="text" class="text" v-model="username" @focus="focusStyle1" @blur="blurStyle"
              placeholder="username">
          </div>
          <p class="info">
            <span v-show="userFlag" v-text='userInfo'></span>
          </p>
          <div class="password" :class="focusFlag == 2 ? focusClass : ''">
            <span class="iconfont psw-icon">&#xe7b8;</span>
            <input type="password" class="text" v-model="password" @keyup.enter="userLogin" @focus="focusStyle2"
              @blur="blurStyle" placeholder="password">
          </div>
          <p class="info">
            <span v-show="pswFlag" v-text="pswInfo"></span>
          </p>
          <button class="login-btn" @click="userLogin">登录</button>
          <div class="box-footer">
            <span class="forget-psw">忘记密码？</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {

    },
    data() {
      return {
        focusClass: 'focusClass',
        focusFlag: 0,
        userFlag: false,
        pswFlag: false,
        username: '',
        password: '',
        userInfo: '账户不为空',
        pswInfo: '密码不为空',
      }
    },
    methods: {
      focusStyle1() {
        this.focusFlag = 1;

      },
      focusStyle2() {
        this.focusFlag = 2;

      },
      blurStyle() {
        this.focusFlag = 0;
      },
      checkInfo() {
        if (this.username.trim() == '') {
          this.$message.error('账号不能为空')
          return false;

        }
        if (this.password.trim() == '') {
          this.$message.error('密码不能为空')
          return false;
        }
        return true;

      },
      userLogin() {
        let myUser = {
          username:this.username,
          password:this.password
        }
        if (this.checkInfo())
          this.axios.get('/author/userDto?userName=' + this.username + '&userPassword=' + this.password).then(res => {
            if (res.data.code == 0) {
              this.$router.push('/home/homePage');
              sessionStorage.setItem('myUser',JSON.stringify(myUser));
            } else
              this.$message.error('账号或密码错误');
          })
      }
    },

  }

</script>

<style scoped>
  .login-content {
    position: relative;
    height: 100vh;
    background: #393D49;
  }

  .login-box {
    position: absolute;
    right: 50%;
    top: 50%;
    width: 360px;
    height: 320px;
    margin-right: -180px;
    margin-top: -160px;
    border: 1px solid #8A8C93;
    z-index: 99;
    background: #8A8C93;
    border-radius: 10px;
  }

  .div-box {
    position: relative;
    left: 30px;
    top: 30px;
    width: 300px;
    height: 300px;
  }

  .box-title {
    line-height: 25px;
    line-height: 25px;
    font-size: 18px;
    color: #fff;
    ;
    margin-bottom: 20px;
  }

  .username,
  .password {
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    background: #fff;
    border: 1px solid #fff;
  }

  .username span,
  .password span {
    float: left;
    font-size: 18px;
    color: #DCDCDC;
    font-weight: bold;
    padding: 0px 10px;

  }

  .iconfont {
    color: rgb(194, 188, 188) !important;
  }

  input::placeholder {
    color: rgb(194, 188, 188);
  }

  .text {
    float: left;
    color: #333;
    width: 240px;
    padding: 10px;
  }

  .login-btn {
    width: 300px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    border-radius: 5px;
    background: rgb(142, 227, 241);
    cursor: pointer;
  }

  .login-btn:hover {
    background: rgb(135, 220, 233);
  }

  .box-footer {
    width: 300px;
    height: 36px;
    line-height: 36px;
    margin-top: 10px;
  }

  .forget-psw {
    float: right;
    color: #fff;
    cursor: pointer;
  }

  .forget-psw:hover {
    text-decoration: underline;
  }

  .info {
    height: 25px;
    line-height: 25px;
  }


  .focusClass {
    border: 1px solid rgb(109, 111, 122);
  }

</style>
