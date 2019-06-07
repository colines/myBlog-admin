<template>
  <div class="content">
    <div class="links">
      <div class="operator">
        <a-button type="primary" @click="showAddModal">
          <a-icon type="plus" />添加链接
        </a-button>
        <a-button type="primary" @click="showEditModal">
          <a-icon type="edit" />修改链接
        </a-button>
      </div>
      <div class="links-list">
        <a-table :columns="linkColumns" :dataSource="linkList" :pagination="false" :rowSelection="rowSelection">
          <span slot="imageUrl" slot-scope="imageUrl,record">
            <div class="iconImg">
              <img :src="imageUrl" alt="">
            </div>
          </span>
          <span slot="state" slot-scope="state,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="state == 1 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="modal">
        <a-modal :title="modalTitle" v-model="addOrEditModalVisible" @ok="addOrEditLink" cancelText="取消" okText="确认"
          :afterClose="afterModalClose" class="link-modal">
          <p>
            <label for="link-name">名称</label>
            <a-input style="width:200px;margin-left:20px;" id="link-name" v-model="linkName" spellcheck="false" />
          </p>
          <p>
            <label for="lin-url" class="link-url">地址</label>
            <a-input style="width:200px;margin-left:20px;" id="link-url" v-model="linkUrl" spellcheck="false" />
          </p>
          <p>
            <span class="img-left">图标</span>
            <div class="link-img" :class="iconSrc != '' ? bgClass :''">
              <img :src="iconSrc" alt="">
              <div class="img-bg">
                <span class="iconfont">&#xe671;</span>
                <input type="file" class="file-upload" @change="getFile" ref="fileUpload" title="">
              </div>
            </div>
            <div class="clear-fix"></div>
          </p>
          <p>
            <label for="status">状态：</label>
            <a-radio-group v-model="status" id="status">
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
          </p>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.getLinksList();
    },
    data() {
      return {
        addOrEditModalVisible: false,
        modalTitle: '添加链接',
        modalStatus: 1, //1 为添加链接 0 为修改链接
        linkName: '',
        linkUrl: '',
        iconSrc: '',
        status: 0,
        imageId: '',
        bgClass: 'bgClass',
        selectItem: null,
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [],
          onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys
            this.selectItem = selectedRows[0];
          }
        },
        linkColumns: [{
            title: '图标',
            dataIndex: 'imageUrl',
            scopedSlots: {
              customRender: 'imageUrl'
            },
            width: 150
          },
          {
            title: '名称',
            dataIndex: 'urlName',
            width: 150
          },
          {
            title: '链接地址',
            dataIndex: 'urlLink',
            width: 200
          },
          {
            title: '状态',
            dataIndex: 'state',
            scopedSlots: {
              customRender: 'state'
            },
            width: 100,
          }
        ],
        linkList: []
      }
    },
    methods: {
      getLinksList() {
        this.axios.get('/author/urlDto?sort=1').then(res => {
          if (res.data.code == 0) {
            this.rowSelection.selectedRowKeys = [];
            this.linkList = res.data.data;
            for (let i = 0; i < this.linkList.length; i++) {
              this.linkList[i].key = this.linkList[i].urlId;
            }
          }
        })
      },
      showAddModal() {
        this.modalTitle = "添加链接";
        this.modalStatus = 1;
        this.addOrEditModalVisible = true;
      },
      showEditModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          this.linkName = this.selectItem.urlName;
          this.linkUrl = this.selectItem.urlLink;
          this.iconSrc = this.selectItem.imageUrl;
          this.status = this.selectItem.state;
          this.imageId = this.selectItem.imageId;
          this.modalTitle = "修改链接";
          this.modalStatus = 0;
          this.addOrEditModalVisible = true;
        }
      },
      afterModalClose() {
        this.clearInput();
      },
      clearInput() {
        this.linkName = '';
        this.linkUrl = '';
        this.iconSrc = '';
        this.status = 1;
      },
      addOrEditLink() {
        if (this.modalStatus == 1)
          this.addLink();
        else
          this.editLink();

      },
      addLink() {
        let linkItem = {
          urlName: this.linkName,
          urlLink: this.linkUrl,
          imageId: this.imageId,
          state: this.status,
        }
        this.axios.post('/author/urlDto', linkItem).then(res => {
          if (res.data.code == 0) {
            this.addOrEditModalVisible = false;
            this.$message.success("添加成功");
            this.getLinksList();
          }
        })
      },
      editLink() {
        let link = {
          urlId: this.selectItem.urlId,
          imageId: this.imageId,
          urlLink: this.linkUrl,
          urlName: this.linkName,
          state: this.status
        };
        let linkArr = [];
        linkArr.push(link);
        this.axios.put('/author/urlDto', linkArr).then(res => {
          if (res.data.code == 0) {
            this.addOrEditModalVisible = false;
            this.$message.success('修改成功!');
            this.getLinksList();
          }
        })

      },
      statusChange(index, id) {
        let state = 0;
        if (this.linkList[index].state)
          state = 0;
        else
          state = 1;
        let link = {
          urlId: id,
          state: state
        };
        let linkArr = [];
        linkArr.push(link);
        this.axios.put('/author/urlDto', linkArr).then(res => {
          if (res.data.code == 0) {
            this.linkList[index].state = state;
            this.$message.success('修改成功!');
          }
        })
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
        this.axios.post('/author/urlDto/image?dirId=1136201317346197504', param, config).then(res => {
          let data = res.data;
          if (data.code == 0) {
            this.imageId = data.data.imageId;
            this.iconSrc = data.data.imageUrl;
          }
        })

      },
    },

  }

</script>
<style scoped>
  .links {
    width: 95%;
    background: #fff;
    margin: 80px 30px 0 30px;
    position: relative;
  }

  .operator {
    padding: 30px 0 0 60px;
  }

  .operator button {
    margin: -3px 10px 0 0;
  }

  .links-list {
    padding: 30px;
  }

  .iconImg {
    display: block;
    width: 30px;
    height: 30px;
  }

  .iconImg img {
    width: 100%;
  }

  .link-modal p {
    padding: 0 100px;
    margin: 20px 0;
  }

  .link-img {
    position: relative;
    float: left;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: rgb(236, 231, 231);
    overflow: hidden;
    margin-left: 50px;
    cursor: pointer;
  }

  .link-img img {
    width: 100%;
  }

  .img-bg {
    position: absolute;
    top: 0;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    background: rgba(24, 23, 23, 0.5);
    transition: all 0.8s ease;
    display: none;
  }

  .img-bg .iconfont {
    font-size: 30px;
  }

  .bgClass {
    background: #fff;
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

  .link-img:hover .img-bg {
    display: block;
  }

  .img-left {
    float: left;
  }

</style>
