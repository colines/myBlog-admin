<template>
  <div class="content">
    <div class="category-manage">
      <div class="operator">
        <a-button type="primary" @click="showAddModal">
          <a-icon type="plus" />添加类别
        </a-button>
        <a-button type="primary" @click="showModifyModal">
          <a-icon type="edit" />修改类别
        </a-button>
        <a-button type="primary" @click="showAddTagModal">
          <a-icon type="plus" />添加类别标签
        </a-button>
        <a-button type="primary" @click="showEditModal">
          <a-icon type="edit" />编辑标签状态
        </a-button>
      </div>
      <div class="category-list">
        <a-table :columns="categoryColumns" :dataSource="categoryList" :pagination="false" :rowSelection="rowSelection">
          <span slot="status" slot-scope="status,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="status == 1 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="modal">
        <a-modal title="添加类别" v-model="addModalVisible" @ok="addCategory" cancelText="取消" okText="确认">
          <p style="margin-left: 100px">
            <a-input placeholder="名称" style="width: 200px;margin-bottom: 20px" v-model="category"/>
          </p>
          <p style="margin-left: 100px;">
            <label for="categorystatus">状态：</label>
            <a-radio-group v-model="categorystatus" id="categorystatus">
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
          </p>
        </a-modal>
        <a-modal title="添加类别标签" v-model="addTagModalVisible" @ok="addCategoryTag" cancelText="取消" okText="确认">
          <p style="margin-left: 100px">
            <a-input placeholder="名称" style="width: 200px;margin-bottom: 20px" v-model="tag"/>
          </p>
          <p style="margin-left: 100px">
            <label for="tagstatus">状态：</label>
            <a-radio-group v-model="tagstatus" id="tagstatus">
              <a-radio :value="1">启用</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
          </p>
        </a-modal>
        <a-modal title="修改类别" v-model="modifyModalVisible" @ok="modifyCategory" cancelText="取消" okText="确认">
          <a-input placeholder="名称" v-model="categoryName"/>
        </a-modal>
        <a-modal :title="categoryName" v-model="editModalVisible" @ok="editCategory" cancelText="取消" okText="确认">
          <a-transfer :dataSource="tagList" :targetKeys="tagTargetKeys" :locale="locale" :titles="['启用','未启用']"
            @change="handleTagChange" :render="item=>item.title">
          </a-transfer>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      for (let i = 0; i < this.categoryList.length; i++) {
        let temp = this.categoryList[i].tag.join(" , ");
        this.categoryList[i].tag = temp;
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        total: 100,
        addModalVisible: false,
        modifyModalVisible: false,
        addTagModalVisible:false,
        editModalVisible: false,
        category:'',
        tag:'',
        categorystatus: 1,
        tagstatus:1,
        categoryName:'',
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
        categoryStatus: [false, true],
        categoryColumns: [{
            title: '类别',
            dataIndex: 'category',
            width: 150,
          },
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
        categoryList: [{
            key: 0,
            category: '前端',
            tag: ['html', 'javascript', 'css'],
            time: '2019-05-23',
            status: 0
          },
          {
            key: 1,
            category: '后端',
            tag: ['java', 'PHP', 'node'],
            time: '2019-05-23',
            status: 1
          },
        ]
      }
    },
    methods: {
      addCategory() {
        this.addModalVisible = false;
      },
      addCategoryTag(){
        this.addTagModalVisible = false;
      },
      modifyCategory() {
        this.modifyModalVisible = false;
      },
      editCategory() {
        this.editModalVisible = false;
      },
      statusChange(index,id) {
        if (this.categoryList[index].status)
          this.categoryList[index].status = 0;
        else
          this.categoryList[index].status = 1;
      },
      showAddModal() {
        this.addModalVisible = true;
      },
      showModifyModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else{
          this.categoryName = this.selectItem.category;
            this.modifyModalVisible = true;
        }
      },
      showAddTagModal(){
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else{
          this.addTagModalVisible = true;
        }

      },
      showEditModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else{
          this.categoryName = this.selectItem.category
          this.editModalVisible = true;
        }
      },
      handleTagChange(targetKeys, direction, moveKeys) {
        this.tagTargetKeys = targetKeys;
      },
    },

  }

</script>

<style scoped>
  .category-manage {
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

  .category-list {
    padding: 30px;
  }

  .ant-transfer {
    margin-left: 26px;
  }

</style>
