<template>
  <div class="content">
    <div class="pwd-modify">
        <div class="pwd">
          <p>
            <label for="old-pwd">当前密码</label>
            <a-input type="password" placeholder="密码长度为6到32位" id="old-pwd"  class="pwd-input" v-model="oldPwd"/>
          </p>
          <p>
            <label for="new-pwd">新密码</label>
            <a-input type="password" placeholder="新密码与当前密码不能相同" id="new-pwd" class="pwd-input" v-model="newPwd" />
          </p>
          <p>
            <label for="comfirm-pwd">确认密码</label>
            <a-input type="password" placeholder="确认密码与新密码一致" id="comfirm-pwd" class="pwd-input" v-model="comfirmPwd" />
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
          this.$message.success("修改成功");
        }
      },
      pwdInputIsEquitable(){
        let flag = true;
        let oldPwdLen = this.oldPwd.trim().length;
        if(oldPwdLen < 6 || oldPwdLen > 32){
          this.$message.error('密码长度为6到32位');
          flag = false;
        }
        if(this.oldPwd == this.newPwd){
          this.$message.error('新密码和旧密码不能相同');
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
