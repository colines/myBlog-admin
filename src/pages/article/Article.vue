<template>
  <div class="content">
    <div class="article-manage">
      <div class="operator">
        <a-button type="primary" @click="addArticle">
          <a-icon type="plus" />写文章
        </a-button>
        <a-button type="primary" @click="editArticle">
          <a-icon type="edit" />修改文章
        </a-button>
        <a-button type="primary" @click="readArticle">
          <a-icon type="zoom-in" />查看文章
        </a-button>
        <a-select defaultValue="全部" @change="handleCategoryChange" class="select">
          <a-select-option value="全部">全部</a-select-option>
          <a-select-option value="前端">前端</a-select-option>
          <a-select-option value="后端">后端</a-select-option>
        </a-select>
        <a-select defaultValue="全部" @change="handleTagChange" class="select item">
          <a-select-option value="全部">全部</a-select-option>
          <a-select-option value="javascript">javascript</a-select-option>
          <a-select-option value="html">html</a-select-option>
        </a-select>
        <span class="title-input">
          <input type="text" placeholder="标题关键词" @keyup.enter="searchArticle">
          <span class="iconfont" @click="searchArticle">&#xe616;</span>
        </span>
        <a-button type="primary" @click="searchArticle">
          <a-icon type="search" />搜索
        </a-button>
      </div>
      <div class="sort-article">
          <a-radio-group v-model="articletype" @change="typeChange">
              <a-radio :value="1">最新文章</a-radio>
              <a-radio :value="2">热门文章</a-radio>
              <a-radio :value="3">评论最多</a-radio>
            </a-radio-group>
            <!-- <a-button type="primary" style="margin-left: 65px;">获取文章</a-button> -->
      </div>
      <div class="article-list">
        <a-table :columns="articleColumns" :dataSource="articleList" :pagination="false" :rowSelection="rowSelection">
          <span slot="status" slot-scope="status,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="status == 1 ? true : false" checkedChildren=启用
              unCheckedChildren="禁用" />
          </span>
        </a-table>
      </div>
      <div class="page">
        <a-pagination showQuickJumper @change="currentChange" :current="currentPage" :total="total"
          :defaultPageSize="pageSize" />
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
        selectItem: null,
        articletype:1,
        rowSelection: {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectItem = selectedRows[0];
          }
        },
        articleStatus: [false, true],
        articleColumns: [{
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
            title: '标题',
            dataIndex: 'title',
            width: 400,
          },
          {
            title: '点赞数',
            dataIndex: 'agreeNum',
            width: 120,
          },
          {
            title: '评论数',
            dataIndex: 'commentsNum',
            width: 120,
          },
          {
            title: '阅读量',
            dataIndex: 'readNum',
            width: 120,
          },
          {
            title: '创作时间',
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
        articleList: [{
            key: 0,
            category: '前端',
            tag: 'html',
            title: 'JavaScript的进阶之路',
            agreeNum: 1024,
            commentsNum: 1024,
            readNum: 1024,
            time: '2019-05-23',
            status: 1
          },
          {
            key: 1,
            category: '前端',
            tag: 'html',
            title: 'JavaScript的进阶之路',
            agreeNum: 1024,
            commentsNum: 1024,
            readNum: 1024,
            time: '2019-05-23',
            status: 0
          },
          {
            key: 2,
            category: '前端',
            tag: 'html',
            title: 'JavaScript的进阶之路',
            agreeNum: 1024,
            commentsNum: 1024,
            readNum: 1024,
            time: '2019-05-23',
            status: 1
          },
          {
            key: 3,
            category: '前端',
            tag: 'html',
            title: 'JavaScript的进阶之路',
            agreeNum: 1024,
            commentsNum: 1024,
            readNum: 1024,
            time: '2019-05-23',
            status: 1
          },
          {
            key: 4,
            category: '前端',
            tag: 'html',
            title: 'JavaScript的进阶之路',
            agreeNum: 1024,
            commentsNum: 1024,
            readNum: 1024,
            time: '2019-05-23',
            status: 1
          },
          {
            key: 5,
            category: '前端',
            tag: 'html',
            title: 'JavaScript的进阶之路',
            agreeNum: 1024,
            commentsNum: 1024,
            readNum: 1024,
            time: '2019-05-23',
            status: 0
          }
        ]
      }
    },
    methods: {
      addArticle() {
        let routeUrl = this.$router.resolve({
          path: "/mavonEditor",
        });
        window.open(routeUrl.href, '_blank');
      },
      editArticle() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {

        }
      },
      readArticle() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");

      },
      searchArticle() {

      },
      handleCategoryChange() {

      },
      handleTagChange() {

      },
      titleSearch() {

      },
      statusChange(index, id) {
        if (this.articleList[index].status)
          this.articleList[index].status = 0;
        else
          this.articleList[index].status = 1;
      },
      currentChange(current) {
        this.currentPage = current;
      },
      typeChange(e){
        this.articletype = e.target.value;
      }
    },

  }

</script>

<style scoped>
  .article-manage {
    width: 95%;
    background: #fff;
    height: 600px;
    margin: 80px 30px 0 30px;
    position: relative;
  }

  .operator {
    padding: 30px 0 0 60px;
  }
  .sort-article{
    padding: 20px 0 0 60px;
  }

  .operator button {
    margin: -3px 10px 0 0;
  }

  .select {
    width: 120px;
  }

  .item {
    margin-left: 10px;
  }

  .title-input {
    display: inline-block;
    width: 200px;
    height: 32px;
    line-height: 32px;
    border: 1px solid #ccc;
    margin: -3px 10px 0 10px;
    border-radius: 3px;
  }

  input[type="text"] {
    padding: 2px 10px;
    margin-bottom: 5px;
  }

  .iconfont {
    font-size: 13px;
    cursor: pointer;
  }

  .article-list {
    padding: 20px 30px;
  }

  .page {
    position: absolute;
    bottom: 30px;
    right: 50px;
  }

</style>
