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
        <!-- <a-select defaultValue="全部" @change="handleCategoryChange" class="select">
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
        </a-button> -->
      </div>
      <div class="sort-article">
        <a-radio-group v-model="articletype" @change="typeChange">
          <a-radio :value="2">最新文章</a-radio>
          <a-radio :value="1">热门文章</a-radio>
          <a-radio :value="3">评论最多</a-radio>
        </a-radio-group>
      </div>
      <div class="article-list">
        <a-table :columns="articleColumns" :dataSource="articleList" :pagination="false" :rowSelection="rowSelection">
          <span slot="tags" slot-scope="tags,index">
            <span v-if="!tags.length">无标签</span>
            <span v-else v-for="item in tags" :key="item.tagId">
              <a-tag color="#87d068" v-if="item.state"> {{item.tagName}}</a-tag>
              <a-tag color="#ccc" v-else> {{item.tagName}}</a-tag>
            </span>
          </span>
          <span slot="updateTime" slot-scope="updateTime">
              {{moment(updateTime).format('YYYY-MM-DD')}}
            </span>
          <span slot="state" slot-scope="state,record,index">
            <a-switch @change='statusChange(index,record.key)' :checked="state == 1 ? true : false" checkedChildren=启用
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
    created() {
      this.getArticleList();
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 6,
        total: '',
        selectItem: null,
        articletype: 2,
        rowSelection: {
          type: 'radio',
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectItem = selectedRows[0];
          }
        },
        articleStatus: [false, true],
        articleColumns: [
          {
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
            title: '标题',
            dataIndex: 'articleTitle',
            width: 400,
          },
          {
            title: '点赞数',
            dataIndex: 'thumbupCount',
            width: 120,
          },
          {
            title: '评论数',
            dataIndex: 'commentCount',
            width: 120,
          },
          {
            title: '阅读量',
            dataIndex: 'visitCount',
            width: 120,
          },
          {
            title: '创作时间',
            dataIndex: 'updateTime',
            width: 200,
            scopedSlots: {
              customRender: 'updateTime'
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
        articleList: []
      }
    },
    methods: {
      getArticleList() {
        let queryObj = {
          sort: this.articletype,
          pageNum: this.currentPage
        }
        this.axios.get('/author/articleDto?sort='+this.articletype+'&pageNum='+this.currentPage).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            let data = res.data.data;
            this.total = data.total;
            this.articleList = data.list;
            for (let i = 0; i < this.articleList.length; i++) {
              this.articleList[i].key = this.articleList[i].articleId;
            }
          }
        })
      },
      addArticle() {
        let routeUrl = this.$router.resolve({
          path: "/mavonEditor",
          query: {
            id: 1
          }
        });
        window.open(routeUrl.href, '_blank');
      },
      editArticle() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          let routeUrl = this.$router.resolve({
            path: "/mavonEditor",
            query: {
              id: 2,
              articleId:this.selectItem.articleId
            }

          });
          window.open(routeUrl.href, '_blank');
        }
      },
      readArticle() {
        if (this.selectItem == null)
          this.$message.warn("请选择某一项");
        else {
          let routeUrl = this.$router.resolve({
            path: "/mavonEditor",
            query: {
              id: 3,
              articleId:this.selectItem.articleId
            }

          });
          window.open(routeUrl.href, '_blank');
        }

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
        let state = 0;
        if (this.articleList[index].state)
          state = 0;
        else
          state = 1;
        let article = {
          articleId: id,
          state: state
        };
        this.axios.put('/author/articleDto', article).then(res => {
          if (res.data.code == 0) {
            this.articleList[index].state = state;
            this.$message.success('修改成功!');
          }
        })
      },
      currentChange(current) {
        this.currentPage = current;
        this.getArticleList();
      },
      typeChange(e) {
        this.getArticleList();
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

  .sort-article {
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
    bottom: 20px;
    right: 50px;
  }

</style>
