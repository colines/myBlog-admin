<template>
  <div class="content">
    <div class="info-manage">
      <div class="info">
        <p>
          <label for="nick-name">昵称</label>
          <a-input style="width:320px;margin-left:20px;" id="nick-name" v-model="nickName" />
        </p>
        <p>
          <label for="sign" class="sign">签名</label>
          <a-textarea :rows="4" style="width:320px;margin-left:20px;" id="sign" v-model="sign" />
        </p>
        <p>
          <span class="img-left">头像</span>
          <div class="author-img">
            <img :src="imageUrl" alt="">
            <div class="img-bg">
              <span>更换头像</span>
              <input type="file" class="file-upload" @change="getFile" ref="fileUpload" title="">
            </div>
          </div>
          <div class="clear-fix"></div>
        </p>
        <p>
          <a-button type="primary" @click="infoModify">修改</a-button>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.getAdminInfo();
    },
    data() {
      return {
        nickName: '',
        sign: '',
        imageId: '',
        imageUrl: '',
      }
    },
    methods: {
      getAdminInfo() {
        let admin = sessionStorage.getItem('admin') || [];
        if (!admin.userName) {
          this.axios.get('/author/userDto/1').then(res => {
            if (res.data.code == 0) {
              let data = res.data.data;
              this.nickName = data.userName;
              this.imageId = data.imageId;
              this.imageUrl = data.imageUrl;
              this.sign = data.userSignature;
            }
          })
        } else {
          this.nickName = admin.userName;
          this.imageId = admin.imageId;
          this.imageUrl = admin.imageUrl;
          this.sign = admin.userSignature;
        }
      },
      infoModify() {
        if (this.checkInfoIsEmpty()) {
          let admin = {
            userId: 1,
            userName: this.nickName,
            imageId: this.imageId,
            userSignature: this.sign
          }
          this.axios.put('/author/userDto', admin).then(res => {
            if (res.data.code == 0) {
              this.$EventBus.$emit('getAdminInfo',this.imageUrl);
              this.$message.success('修改成功');
            }
          })
        }
      },
      checkInfoIsEmpty() {
        let flag = true;
        if (this.nickName == '') {
          this.$message.error("昵称不能为空");
          flag = false;
        }
        if (this.sign == '') {
          this.$message.error("签名不能为空");
          flag = false;
        }
        return flag;
      },
      getFile() {
        let file = this.$refs.fileUpload.files[0];
        let param = new FormData();
        param.append("file", file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.axios.post('/author/imageDto/image/1133930631181381632', param, config).then(res => {
          console.log(res);
          let data = res.data;
          if (data.code == 0) {
            this.imageId = data.data.imageId;
            this.imageUrl = data.data.imageUrl;
          }
        })

      },

    },

  }

</script>
<style scoped>
  .info-manage {
    width: 95%;
    margin: 80px 30px 0 30px;
    position: relative;
  }

  .info {
    position: absolute;
    top: 50px;
    right: 50%;
    margin-right: -250px;
    width: 500px;
    color: #999;
    font-weight: bold;
  }

  .info p {
    padding: 0 40px;
    margin: 30px 0;
  }

  .sign {
    display: inline-block;
    margin-bottom: 80px;
  }

  .author-img {
    position: relative;
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-left: 50px;
    cursor: pointer;
  }

  .author-img img {
    width: 100%;
  }

  .img-bg {
    position: absolute;
    top: 0;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    background: rgba(24, 23, 23, 0.5);
    transition: all 0.8s ease;
    display: none;
  }

  .file-upload {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    cursor: pointer;
  }

  .author-img:hover .img-bg {
    display: block;
  }

  .img-left {
    float: left;
  }

</style>
