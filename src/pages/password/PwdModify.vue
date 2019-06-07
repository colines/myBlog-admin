<template>
  <div class="content">
    <div class="pwd-modify">
        <div class="pwd">
          <p>
            <label for="new-pwd">新密码</label>
            <a-input type="password" placeholder="密码长度为6到32位" id="new-pwd" class="pwd-input" v-model="newPwd" />
          </p>
          <p>
            <label for="comfirm-pwd">确认密码</label>
            <a-input type="password" placeholder="确认密码与新密码一致" id="comfirm-pwd" class="pwd-input" v-model="comfirmPwd" @keyup.enter="modifyPwd"/>
          </p>
         <a-button type="primary" style="margin-left: 140px;" @click="modifyPwd">修改</a-button>
        </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        oldPwd:'',
        newPwd:'',
        comfirmPwd:'',
      }
    },
    methods: {
      modifyPwd(){
        if(this.pwdInputIsEquitable()){
          let admin = {
            userId: 1,
            userPassword:this.newPwd
          }
          this.axios.put('/author/userDto', admin).then(res => {
            if (res.data.code == 0) {
              this.$message.success('修改成功');
              this.newPwd = this.comfirmPwd = '';
            }
          })
        }
      },
      pwdInputIsEquitable(){
        let flag = true;
        let len = this.newPwd.trim().length;
        if(len < 6 || len > 32){
          this.$message.error('密码长度为6到32位');
          flag = false;
        }
        if(this.newPwd != this.comfirmPwd){
          this.$message.error('确认密码与新密码不一致');
          flag = false;
        }
        return flag;
      }
    },

  }

</script>
<style scoped>
  .pwd-modify {
    width: 95%;
    margin: 80px 30px 0 30px;
    position: relative;
  }
  .pwd{
    position: absolute;
    top: 50px;
    right: 50%;
    margin-right: -250px;
    width: 500px;
    color: #999;
    font-weight: bold;
  }
  .pwd p{
    padding: 0 40px;
    margin: 30px 0;
  }
  .pwd p {
    text-align: right;
  }
  .pwd-input{
    width:320px;
    margin-left: 20px; 
  }

</style>
