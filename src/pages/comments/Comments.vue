<template>
  <div class="content">
    <div class="comments">
      <div class="comments-list">
        <h1 class="list-header">评论列表 <span class="iconfont">&#xe6a7;</span></h1>
        <a-collapse v-model="activeKey" @change="activeKeyChange">
          <a-collapse-panel header="This is article title" :key="(index+'')" class="coll-list"
            v-for="(item,index) in list">
            <a href=""><span class='iconfont' @click="hh">&#xe63e;</span></a>
            <a-comment>
              <span slot="author">
                <span>张三</span>
              </span>
              <span slot="datetime">1天前</span>
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                alt="Han Solo" />
              <p slot="content">have a good day</p>
              <span slot="actions">回复</span>
              <span slot="actions">
                <a-popconfirm title="是否确定删除?" @confirm="confirmDelComments" okText="是" cancelText="否">
                  <span>删除</span>
                </a-popconfirm>
              </span>
              <a-comment>
                <span slot="author">
                  <span>李四</span>
                </span>
                <span slot="datetime">1天前</span>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo" />
                <p slot="content" class="comment-content">
                  <span>回复&nbsp;</span>
                  <span>张三</span>
                  <span classs="reply-content">：thank you! </span>
                </p>
                <span slot="actions">回复</span>
                <span slot="actions">
                  <a-popconfirm title="是否确定删除?" @confirm="confirmDelComments" okText="是" cancelText="否">
                    <span>删除</span>
                  </a-popconfirm>
                </span>
              </a-comment>
              <a-comment>
                <span slot="author">
                  <span>作者</span>
                </span>
                <span slot="datetime">1天前</span>
                <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="Han Solo" />
                <p slot="content" class="comment-content">
                  <span>回复&nbsp;</span>
                  <span>李四</span>
                  <span classs="reply-content">：I will </span>
                </p>
                <span slot="actions">回复</span>
                <span slot="actions">
                  <a-popconfirm title="是否确定删除?" @confirm="confirmDelComments" okText="是" cancelText="否">
                    <span>删除</span>
                  </a-popconfirm>
                </span>
              </a-comment>
            </a-comment>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        list: [{
            key: '0'
          },
          {
            key: '1'
          },
          {
            key: '2'
          },
          {
            key: '3'
          },
          {
            key: '4'
          },
          {
            key: '5'
          },
        ],
        activeKey: [],
      }
    },
    methods: {
      activeKeyChange(key) {
        this.activeKey = key;
      },
      hh() {

      },
      confirmDelComments() {
        this.$message.success('删除成功')
      }
    },
    watch: {
      activeKey(key) {
        console.log(key)
      }
    },

  }

</script>
<style scoped>
  .comments {
    width: 95%;
    background: #fff;
    min-height: 550px;
    margin: 80px 30px 0 30px;
    position: relative;
  }

  .comments-list {
    padding: 20px 60px;
  }

  .list-header {
    height: 30px;
    line-height: 30px;
    color: #666;
    font-weight: 600;
    font-size: 16px;
    /* border-bottom: 1px solid #ccc; */
    margin-bottom: 10px;
  }

  .list-header .iconfont {
    font-size: 18px;
    color: #3477B6;
  }

  .comment-content {
    color: #666;
    font-size: 12px;
  }

  .comment-content span {
    float: left;
  }

  .comment-content .reply-content {
    word-wrap: break-word;
    word-break: break-all;
    width: 700px;
  }

  .coll-list {
    position: relative;
  }

  .coll-list .iconfont {
    position: absolute;
    top: 8px;
    right: 10px;
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }

  .coll-list .iconfont:hover {
    color: #f00;
  }

</style>
