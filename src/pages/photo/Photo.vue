<template>
  <div class="content">
    <div class="photo">
      <div class="operator">
        <a-radio-group buttonStyle="solid" v-model="photoType" @change="getPhotoByDirId">
          <a-radio-button :value="item.dirId" v-for="item in dirList" :key="item.dirId" v-if="item.dirId !=1">
            {{item.dirName}}</a-radio-button>
        </a-radio-group>
      </div>
      <div class="photo-list">
        <a-button type="primary" @click="showAddPhotoModal" :disabled="photoType == 1133930737993527296">
          <span class="iconfont" style="padding: 0 5px 0 0">&#xe671;</span>上传图片
        </a-button>
        <ul>
          <li v-for="(item,index) in photoList" :key="item.key">
            <a-card hoverable style="width: 139px;" class="card">
              <img alt="example" :src="item.imageUrl" slot="cover" @click="showBigPhoto(item.imageUrl)"
                style="height: 139px;" />
              <a-card-meta title="" style="height: 20px;">
                <template slot="description">
                  <a-icon type="zoom-in" class="icon-margin" :class="photoType == 1133930737993527296 ? iconStyle :''"
                    @click="showBigPhoto(item.imageUrl)" />
                  <a-icon type="delete" class="icon-margin" v-show="photoType != 1133930737993527296"
                    @click="delPhoto(item.imageId,index)" />
                </template>
              </a-card-meta>
            </a-card>
          </li>
        </ul>
        <div class="clear-fix"></div>
        <a-modal title="" v-model="photoVisible" :footer='null' class="photo-modal">
          <div class="photo-preview">
            <img :src="modalSrc" alt="">
          </div>
        </a-modal>
        <a-modal title="上传图片" v-model="addPhotoModalVisible" class="photo-upload" @ok="uploadOk"
          :afterClose="uploadCancel" cancelText="取消" okText="确认">
          <div class="photo-add">
            <a-upload listType="picture-card" :fileList="fileList" @preview="handlePreview" :remove="handleRemove"
              :beforeUpload="beforeUpload" :multiple="true">
              <div v-if="fileList.length < 5">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
            <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
            <div class="clear-fix"></div>
          </div>
        </a-modal>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.getDir();
    },
    data() {
      return {
        addPhotoModalVisible: false,
        photoVisible: false,
        previewVisible: false,
        previewImage: '',
        photoType: 0,
        iconStyle: 'iconStyle',
        modalSrc: '',
        dirList: [],
        photoList: [],
        fileList: [],
        upLoadDelFlag: -1, //上传图片删除的标志
      }
    },
    methods: {
      getDir() {
        this.axios.get('/author/imageDto/dir').then(res => {
          if (res.data.code == 0) {
            this.dirList = res.data.data;
            this.photoType = this.dirList[1].dirId;
            this.getPhotoByDirId();
          }
        })
      },
      getPhotoByDirId() {
        
        this.axios.put('/author/imageDto/dir',{dirId:1,state:1}).then(res=>{
          console.log(res)
        })
        this.axios.get('/author/imageDto/image/' + this.photoType).then(res => {
          let list = [];
          if (res.data.code == 0) {
            let data = res.data.data;
            for (let i = 0, len = data.length; i < len; i++) {
              if (data[i].state) {
                let item = data[i]
                list.push(item);
              }
            }
            this.photoList = list;
          }

        })
      },
      delPhoto(imageId, index) {
        this.axios.delete('/author/imageDto/image/' + imageId).then(res => {
          if (res.data.code == 0) {
            if (index != -1)
              this.photoList.splice(index, 1);
          }else
            this.$message.error('删除失败');
        })
      },
      showAddPhotoModal() {
        this.addPhotoModalVisible = true;

      },
      showBigPhoto(photoSrc) {
        this.modalSrc = photoSrc;
        this.photoVisible = true;
      },
      handlePreview(file) {
        this.previewImage = file.url;
        this.previewVisible = true
      },
      handleCancel() {
        this.previewVisible = false
      },
      handleRemove(item) {
        this.delPhoto(item.uid,this.upLoadDelFlag);
        for (let i = 0; i < this.fileList.length; i++) {
          if (this.fileList[i].uid == item.uid) {
            this.fileList.splice(i, 1);
          }
        }
      },
      uploadOk() {
        this.addPhotoModalVisible = false;
        this.fileList = [];
        this.getPhotoByDirId();
      },
      uploadCancel() {
        for (let i = 0; i < this.fileList.length; i++) {
          this.delPhoto(this.fileList[i].uid,this.upLoadDelFlag);
        }
        this.fileList = [];
      },
      beforeUpload(file) {
        let param = new FormData();
        param.append("file", file);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.axios.post('/author/imageDto/image/' + this.photoType, param, config).then(res => {
          let data = res.data;
          if (data.code == 0) {
            let item = {
              uid: data.data.imageId,
              status: 'done',
              url: data.data.imageUrl
            }
            this.fileList.push(item);
          }
        })
        return false;
      },
      debounce(fn, delay) {
        let timeout = null
        return function () {
          if (timeout != null) {
            clearTimeout(timeout)
          }
          timeout = setTimeout(fn, delay)
        }
      }
    }
  }

</script>
<style scoped>
  .photo {
    width: 95%;
    background: #fff;
    min-height: 550px;
    margin: 80px 30px 0 30px;
    position: relative;
  }

  .operator {
    padding: 30px 0 0 60px;
  }

  .photo-list {
    padding: 20px 60px;
  }

  .photo-list ul li {
    float: left;
    margin: 20px 20px 0 0;
  }

  .photo-list ul li:hover {
    transform: scale(1.08);
    box-shadow: 0 0 10px #eee;
  }

  .photoImg {
    width: 50px;
    height: 50px;
  }

  .photoImg img {
    width: 100%;
  }

  .photo-preview {
    width: 420px;
    height: 420px;
    background: #eee;
  }

  .photo-preview img {
    width: 100%;
    height: 100%;
  }

  .icon-margin {
    margin-left: 30px;
  }

  .iconStyle {
    margin-left: 50px;
  }

</style>
