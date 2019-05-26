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
          <span slot="iconSrc" slot-scope="iconSrc,record">
            <div class="iconImg">
              <img :src="iconSrc" alt="">
            </div>
          </span>
          <span slot="status" slot-scope="status,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="status == 1 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="modal">
        <a-modal :title="modalTitle" v-model="addOrEditModalVisible" @ok="addOrEditLink" cancelText="取消" okText="确认"
          :afterClose ="afterModalClose" class="link-modal">
          <p>
            <label for="link-name">名称</label>
            <a-input style="width:200px;margin-left:20px;" id="link-name" v-model="linkName" />
          </p>
          <p>
            <label for="lin-url" class="link-url">地址</label>
            <a-input style="width:200px;margin-left:20px;" id="link-url" v-model="linkUrl" :spellCheck="false" />
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
    data() {
      return {
        addOrEditModalVisible: false,
        modalTitle: '添加链接',
        modalStatus: 1, //1 为添加链接 0 为修改链接
        linkName: '',
        linkUrl: '',
        iconSrc: '',
        status: 1,
        bgClass:'bgClass',
        selectItem: null,
        rowSelection: {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectItem = selectedRows[0];
          }
        },
        linkColumns: [{
            title: '图标',
            dataIndex: 'iconSrc',
            scopedSlots: {
              customRender: 'iconSrc'
            },
            width: 150
          },
          {
            title: '名称',
            dataIndex: 'linkName',
            width: 150
          },
          {
            title: '链接地址',
            dataIndex: 'linkUrl',
            width: 200
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: {
              customRender: 'status'
            },
            width: 100,
          }
        ],
        linkList: [{
            key: 0,
            linkName: 'github',
            iconSrc: '../../../static/github.svg',
            linkUrl: 'http://baidu.com',
            status: 1,
          },
          {
            key: 1,
            linkName: '掘金',
            iconSrc: '../../../static/juejin.jpg',
            linkUrl: 'http://baidu.com',
            status: 1,
          },
          {
            key: 2,
            linkName: 'stackOverFlow',
            iconSrc: '../../../static/stackOverflow.jpg',
            linkUrl: 'http://baidu.com',
            status: 0,
          },
          {
            key: 3,
            linkName: '思否',
            iconSrc: '../../../static/sf.jpg',
            linkUrl: 'http://baidu.com',
            status: 1,
          },
          {
            key: 4,
            linkName: 'w3cschool',
            iconSrc: '../../../static/w3cschool.jpg',
            linkUrl: 'http://baidu.com',
            status: 0,
          },
          {
            key: 5,
            linkName: 'csdn',
            iconSrc: '../../../static/csdn.jpg',
            linkUrl: 'http://baidu.com',
            status: 1,
          },
          {
            key: 6,
            linkName: '阿里巴巴矢量图标库',
            iconSrc: '../../../static/ali.jpg',
            linkUrl: 'http://baidu.com',
            status: 1,
          }
        ]
      }
    },
    methods: {
      showAddModal() {
        this.modalTitle = "添加链接";
        this.modalStatus = 1;
        this.addOrEditModalVisible = true;
      },
      showEditModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          this.linkName = this.selectItem.linkName;
          this.linkUrl = this.selectItem.linkUrl;
          this.iconSrc = this.selectItem.iconSrc;
          this.status = this.selectItem.status;
          this.modalTitle = "修改链接";
          this.modalStatus = 0;
          this.addOrEditModalVisible = true;
        }
      },
      afterModalClose(){
        this.clearInput();
      },
      clearInput(){
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
          linkName: this.linkName,
          linkUrl: this.linkUrl,
          iconSrc: this.iconSrc,
          status: this.status,
          key: this.linkUrl
        }
        this.addOrEditModalVisible = false;
        this.linkList.push(linkItem);
        this.$message.success("添加成功");

      },
      editLink() {
        let len = this.linkList.length;
        for (let i = 0; i < len; i++) {
          if (this.linkList[i].key == this.selectItem.key) {
            let linkItem = {
              linkName: this.linkName,
              linkUrl: this.linkUrl,
              iconSrc: this.iconSrc,
              status: this.status,
              key: this.linkUrl
            }
            this.linkList[i].linkName = this.linkName;
            this.linkList[i].linkUrl = this.linkUrl;
            this.linkList[i].iconSrc = this.iconSrc;
            this.linkList[i].status = this.status;
            this.addOrEditModalVisible = false;
            this.$message.success("修改成功");
          }
        }

      },
      statusChange(index, id) {
        if (this.linkList[index].status)
          this.linkList[index].status = 0;
        else
          this.linkList[index].status = 1;
      },
      getFile() {
        let file = this.$refs.fileUpload.files[0];
        console.log(file)
        this.iconSrc =
          'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558777341275&di=9bf4d042076970627ee863e88000249a&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F16%2F07%2F19%2F14578dc77cb58a2.jpg'
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
  .img-bg .iconfont{
    font-size: 30px;
  }
  .bgClass{
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
