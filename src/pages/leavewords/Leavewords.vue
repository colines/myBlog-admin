<template>
  <div class="content">
    <div class="leavewords">
      <div class="leavewords-list">
        <h1 class="list-header">留言列表 <span class="iconfont">&#xe61e;</span></h1>
        <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
          <div v-if="showLoadingMore" slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">加载更多</a-button>
          </div>
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" @click="replyMail">回复</a>
            <a slot="actions">
              <a-popconfirm title="是否确定删除?" @confirm="confirmDelLeaveWords" okText="是"
                cancelText="否">
                <span>删除</span>
              </a-popconfirm>
            </a>
            <a-list-item-meta
              description="Ant Design, a design language for background applications, is refined by Ant UED Team">
              <span slot="title">{{item.name.last}}</span>
              <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            </a-list-item-meta>
            <div>
              <a href="http://baidu.com" target="_blank" style="margin-right: 20px"><span
                  class=iconfont>&#xe63e;</span></a>
              <span>1548132154@qq.com</span>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.getData((res) => {
        this.loading = false;
        this.data = res.data.results;
      })
    },
    data() {
      return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
      }
    },
    methods: {
      reqwest(callback) {
        this.axios.get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo').then(res => {
          console.log(res);
          callback(res);
        })
      },
      getData(callback) {
        this.reqwest(callback)
      },
      onLoadMore() {
        this.loadingMore = true
        this.getData((res) => {
          this.data = this.data.concat(res.data.results)
          this.loadingMore = false
          this.$nextTick(() => {
            window.dispatchEvent(new Event('resize'))
          })
        })
      },
      replyMail() {
        let who = prompt("请输入接收人的邮箱: ", "1548132154@qq.com");
        let what = prompt("请输入主题: ", "Have a good day");
        if (confirm("是否确认发送给 " + who) == true) {
          window.location.href = 'mailto:' + who + '?subject=' + what;
        }
      },
      confirmDelLeaveWords(){
        this.$message.success('删除成功')
      }
    },

  }

</script>
<style scoped>
  .leavewords {
    width: 95%;
    background: #fff;
    min-height: 550px;
    margin: 80px 30px 0 30px;
    position: relative;
  }

  .leavewords-list {
    padding: 20px 60px;
  }

  .list-header {
    height: 30px;
    line-height: 30px;
    color: #666;
    font-weight: 600;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }

  .list-header .iconfont {
    font-size: 18px;
    color: #3477B6;
  }

</style>
