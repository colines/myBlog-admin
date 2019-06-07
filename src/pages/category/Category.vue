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
          <span slot="tags" slot-scope="tags,index">
            <span v-if="!tags.length">无标签</span>
            <span v-else v-for="item in tags" :key="item.tagId">
              <a-tag color="#87d068" v-if="item.state"> {{item.tagName}}</a-tag>
              <a-tag color="#ccc" v-else> {{item.tagName}}</a-tag>
            </span>
          </span>
          <span slot="createTime" slot-scope="createTime">
            {{moment(createTime).fromNow()}}
          </span>
          <span slot="state" slot-scope="state,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="state == 1 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="modal">
        <a-modal title="添加类别" v-model="addModalVisible" @ok="addCategory" cancelText="取消" okText="确认">
          <p style="margin-left: 100px">
            <a-input placeholder="名称" style="width: 200px;margin-bottom: 20px" v-model="categoryName" />
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
            <a-input placeholder="名称" style="width: 200px;margin-bottom: 20px" v-model="tagName" />
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
          <a-input placeholder="名称" v-model="categoryName" />
        </a-modal>
        <a-modal :title="categoryName" v-model="editModalVisible" @ok="editCategory" cancelText="取消" okText="确认">
          <a-transfer :dataSource="tagList" :targetKeys="tagTargetKeys" :locale="locale" :titles="['启用','未启用']"
            @change="handleTagChange" :render="item=>item.tagName">
          </a-transfer>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.getCategoryAndTag();
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        total: 100,
        addModalVisible: false,
        modifyModalVisible: false,
        addTagModalVisible: false,
        editModalVisible: false,
        category: '',
        tagName: '',
        categorystatus: 1,
        tagstatus: 1,
        categoryName: '',
        selectItem: null,
        locale: {
          itemUnit: '标签',
          itemsUnit: '标签'
        },
        tagTargetKeys: [],
        tagList: [],
        rowSelection: {
          type: 'radio',
          selectedRowKeys: [],
          onChange: (selectedRowKeys, selectedRows) => {
            this.rowSelection.selectedRowKeys = selectedRowKeys;
            this.selectItem = selectedRows[0];
          }
        },
        categoryStatus: [false, true],
        categoryColumns: [{
            title: '类别',
            dataIndex: 'categoryName',
            width: 150,
          },
          {
            title: '标签',
            dataIndex: 'tags',
            width: 150,
            scopedSlots: {
              customRender: 'tags'
            },
          },
          {
            title: '创建时间',
            dataIndex: 'createTime',
            width: 200,
            scopedSlots: {
              customRender: 'createTime'
            },
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
        categoryList: [],
      }
    },
    methods: {
      getCategoryAndTag() {
        this.axios.get('/author/categoryDto').then(res => {
          if (res.data.code == 0) {
            let list = res.data.data;
            let tagItem = null;
            for (let i = 0, len = list.length; i < len; i++) {
              list[i].key = list[i].categoryId;
            }
            this.categoryList = list;
            this.rowSelection.selectedRowKeys = [];
          }
        })
      },
      addCategory() {
        if (this.categoryName.trim() == '') {
          this.$message.error('类别名称不为空')
        } else {
          let category = {
            categoryName: this.categoryName,
            state: this.categorystatus
          }
          let categoryArr = [];
          categoryArr.push(category);
          this.axios.post('/author/categoryDto/categories', categoryArr).then(res => {
            if (res.data.code == 0) {
              this.addModalVisible = false;
              this.$message.success('添加成功!');
              this.getCategoryAndTag();
            }
          })
        }
      },
      addCategoryTag() {
        if (this.tagName.trim() == '')
          this.$message.error('标签名称不为空')
        else {
          let tag = {
            categoryId: this.selectItem.categoryId,
            state: this.tagstatus,
            tagName: this.tagName
          }
          let tagArr = [];
          tagArr.push(tag);
          this.axios.post('/author/categoryDto/tags', tagArr).then(res => {
            if (res.data.code == 0) {
              this.addTagModalVisible = false;
              this.$message.success('添加成功!');
              this.tagName = '';
              this.getCategoryAndTag();
            }
          })
        }
      },
      modifyCategory() {
        let category = {
          categoryId: this.selectItem.categoryId,
          categoryName: this.categoryName
        }
        let categoryArr = [];
        categoryArr.push(category);
        this.axios.put('/author/categoryDto', categoryArr).then(res => {
          if (res.data.code == 0) {
            this.modifyModalVisible = false;
            this.$message.success('修改成功!');
            this.getCategoryAndTag();
          }
        })
      },
      editCategory() {
        let tags = [];
        let tagList = this.tagList;
        let tagTargetKeys = this.tagTargetKeys;
        for (let i = 0; i < tagList.length; i++) {
          for (let j = 0; j < tagTargetKeys.length; j++) {
            if (tagList[i].key == tagTargetKeys[j]) {
              tagList[i].state = 0;
              break;
            } else
              tagList[i].state = 1;
          }
        }
        for (let i = 0; i < this.tagList.length; i++) {
          let item = {
            tagId: this.tagList[i].key,
            state: this.tagList[i].state
          }
          tags.push(item);
        }
        let categoryArr = [{
          tags: tags
        }];

        this.axios.put('/author/categoryDto', categoryArr).then(res => {
          if (res.data.code == 0) {
            this.editModalVisible = false;
          }
        })
      },
      statusChange(index, id) {
        let state = 0;
        if (this.categoryList[index].state)
          state = 0;
        else
          state = 1;
        let category = {
          categoryId: id,
          state: state
        };
        let categoryArr = [];
        categoryArr.push(category);
        this.axios.put('/author/categoryDto', categoryArr).then(res => {
          if (res.data.code == 0) {
            this.categoryList[index].state = state;
            this.$message.success('修改成功!');
          }
        })
      },
      showAddModal() {
        this.categoryName = '';
        this.addModalVisible = true;
      },
      showModifyModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          this.categoryName = this.selectItem.categoryName;
          this.modifyModalVisible = true;
        }
      },
      showAddTagModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          this.addTagModalVisible = true;
        }

      },
      showEditModal() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          this.categoryName = this.selectItem.categoryName;
          this.tagList = this.selectItem.tags;
          for (let i = 0; i < this.tagList.length; i++) {
            let id = this.tagList[i].tagId;
            this.tagList[i].key = id;
            if (!this.tagList[i].state)
              this.tagTargetKeys.push(id);
          }
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
