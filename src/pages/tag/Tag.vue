<template>
  <div class="content">
    <div class="tag-manage">
      <div class="operator">
        <a-button type="primary" @click="showAddModal">
          <a-icon type="plus" />添加标签
        </a-button>
        <a-button type="primary" @click="showModifyModal">
          <a-icon type="edit" />修改标签
        </a-button>
      </div>
      <div class="tag-list">
        <a-table :columns="tagColumns" :dataSource="tagList" :pagination="false" :rowSelection="rowSelection">
          <span slot="status" slot-scope="status,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="status == 1 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="modal">
        <a-modal title="添加标签" v-model="addModalVisible" @ok="addTag" cancelText="取消" okText="确认">
          <p style="margin-left: 100px">
            <a-input placeholder="名称" style="width: 200px;margin-bottom: 20px" />
          </p>
          <p style="margin-left: 100px">
            <label for="status">状态：</label>
            <a-radio-group v-model="tagstatus" id="status">
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
          </p>
        </a-modal>
        <a-modal title="修改标签" v-model="modifyModalVisible" @ok="editTag" cancelText="取消" okText="确认">
          <a-input placeholder="名称" v-model="tagName"/>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        total: 100,
        addModalVisible:false,
        modifyModalVisible: false,
        tagstatus: 1,
        tagName:'',
        selectItem: null,
        locale: {
          itemUnit: '标签',
          itemsUnit: '标签'
        },
        tagTargetKeys: ['1', '2'],
        tagList: [{
            key: '1',
            title: 'javascript'
          },
          {
            key: '2',
            title: 'html'
          },
          {
            key: '3',
            title: 'css'
          }
        ],
        rowSelection: {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectItem = selectedRows[0];
          }
        },
        tagStatus: [false, true],
        tagColumns: [
          {
            title: '标签',
            dataIndex: 'tag',
            width: 150,
          },
          {
            title: '创建时间',
            dataIndex: 'time',
            width: 200,
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
        tagList: [{
            key: 0,
            tag: 'html',
            time: '2019-05-23',
            status: 0
          },
          {
            key: 1,
            tag: 'javascript',
            time: '2019-05-23',
            status: 1
          },
          {
            key: 2,
            tag: 'css',
            time: '2019-05-23',
            status: 1
          },
        ]
      }
    },
    methods: {
      addTag() {
        this.addModalVisible = false;
      },
      editTag() {
        this.modifyModalVisible = false;
      },
      statusChange(index,id) {
        if (this.tagList[index].status)
          this.tagList[index].status = 0;
        else
          this.tagList[index].status = 1;
      },
      showAddModal() {
        this.addModalVisible = true;
      },
      showModifyModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else{
          this.tagName = this.selectItem.tag;
          this.modifyModalVisible = true;
        }
      },
    },

  }

</script>

<style scoped>
  .tag-manage {
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

  .tag-list {
    padding: 30px;
  }

  .ant-transfer {
    margin-left: 26px;
  }

</style>
