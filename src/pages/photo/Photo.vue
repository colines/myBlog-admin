<template>
  <div class="content">
    <div class="photo">
      <div class="operator">
        <a-radio-group defaultValue="0" buttonStyle="solid" v-model="photoType">
          <a-radio-button :value="0">用户头像</a-radio-button>
          <a-radio-button :value="1">文章图片</a-radio-button>
          <a-radio-button :value="2">系统图片</a-radio-button>
        </a-radio-group>
      </div>
      <div class="photo-list">
        <a-button type="primary" @click="showAddPhotoModal" :disabled="photoType == 1">
          <span class="iconfont" style="padding: 0 5px 0 0">&#xe671;</span>上传图片
        </a-button>
        <ul>
          <li v-for="item in photoList" :key="item.key">
            <a-card hoverable style="width: 139px;" class="card">
              <img alt="example" :src="item.photoSrc" slot="cover" @click="showBigPhoto(item.photoSrc)"
                style="height: 139px;" />
              <a-card-meta title="" style="height: 20px;">
                <template slot="description">
                  <a-icon type="zoom-in" class="icon-margin" :class="photoType == 1 ? iconStyle :''"
                    @click="showBigPhoto(item.photoSrc)" />
                  <a-icon type="delete" class="icon-margin" v-show="photoType != 1" @click="delPhoto" />
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
        <a-modal title="上传图片" v-model="addPhotoModalVisible" class="photo-upload">
          <div class="photo-add">
            <a-upload listType="picture-card" :fileList="fileList" @preview="handlePreview" @change="handleChange"
              :remove="handleRemove" :beforeUpload="beforeUpload">
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
    data() {
      return {
        addPhotoModalVisible: false,
        photoVisible: false,
        previewVisible: false,
        previewImage: '',
        photoType: 0,
        iconStyle: 'iconStyle',
        modalSrc: '',
        photoColumns: [{
            title: '图片',
            dataIndex: 'photoSrc',
            scopedSlots: {
              customRender: 'photoSrc'
            },
          },
          {
            title: '操作',
            dataIndex: 'delPhoto',
            scopedSlots: {
              customRender: 'delPhoto'
            },
          }
        ],
        photoList: [{
            key: 0,
            photoSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847245157&di=7759375a127a14e399f1d16f56091786&imgtype=0&src=http%3A%2F%2Fstatic.tm51.com%2Favatar%2Fdefault%2Fheader%2F10136.jpg',
          },
          {
            key: 1,
            photoSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847274811&di=998504ebcbddbb032f61f42873ba88ca&imgtype=0&src=http%3A%2F%2Fstatic.tm51.com%2Favatar%2Fdefault%2Fheader%2F10017.jpg',
          },
          {
            key: 2,
            photoSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847245156&di=15ed35bdb6df6e10819814616825a04b&imgtype=0&src=http%3A%2F%2Fstatic.tm51.com%2Favatar%2Fdefault%2Fheader%2F10128.jpg'
          },
          {
            key: 3,
            photoSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847245158&di=7d375f370cd1fa2eab45a3b59b0baa1c&imgtype=0&src=http%3A%2F%2Flkker-10041312.file.myqcloud.com%2FImages%2F201902%2FgVaG15512595824319.jpg'
          },
          {
            key: 4,
            photoSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558847274809&di=89dfd773cd6ec0828f2744a0cd150b26&imgtype=0&src=http%3A%2F%2Fstatic.tm51.com%2Favatar%2Fdefault%2Fheader%2F10076.jpg'
          },
          {
            key: 5,
            photoSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558854086454&di=d2fb48cf3172d71f675b17ea8a98e6f4&imgtype=0&src=http%3A%2F%2Fstatic.tm51.com%2Favatar%2Fdefault%2Fheader%2F10068.jpg'
          },

        ],
        fileList: [],
      }
    },
    methods: {
      addPhoto() {
        this.addPhotoModalVisible = true;
      },
      delPhoto() {

      },
      showAddPhotoModal() {
        this.addPhotoModalVisible = true;

      },
      showBigPhoto(photoSrc) {
        this.modalSrc = photoSrc;
        this.photoVisible = true;
      },
      handleChange({
        fileList
      }) {
        console.log(fileList)
        this.fileList = fileList
      },
      handlePreview(file) {
        console.log(file.url)
        console.log(file.thumbUrl)
        this.previewImage = file.url || file.thumbUrl
        this.previewVisible = true
      },
      handleCancel() {
        this.previewVisible = false
      },
      handleRemove() {

      },
      beforeUpload(file) {
        console.log(this.fileList);
        return false;
      },
    },

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
