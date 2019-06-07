<template>
  <div class="content">
    <div class="leavewords">
      <div class="leavewords-list">
        <h1 class="list-header">留言列表 <span class="iconfont">&#xe61e;</span></h1>
        <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
          <div v-if="showLoadingMore" slot="loadMore"
            :style="{ textAlign: 'center', marginTop: '12px', height: '32px', lineHeight: '32px' }">
            <div class="list-bottom">
              <div v-if="!isLastPage">
                <a-spin v-if="loadingMore" />
                <a-button v-else @click="onLoadMore" >加载更多</a-button>
              </div>
              <div v-else><p style="color: #666;margin-top: 4rem;">没有更多的数据了</p></div>
            </div>
          </div>
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a slot="actions" @click="replyMail">回复</a>
            <a slot="actions">
              <a-popconfirm title="是否确定删除?" @confirm="confirmDelLeaveWords(item.guestbookId,index)" okText="是"
                cancelText="否">
                <span>删除</span>
              </a-popconfirm>
            </a>
            <a-list-item-meta
              :description="Utils.html_encode(item.guestbookContent)">
              <span slot="title">{{Utils.html_encode(item.userName)}}</span>
              <a-avatar slot="avatar" :src="item.imageUrl" />
            </a-list-item-meta>
            <div>
              <a :href="item.guestbookUrl" target="_blank" style="margin-right: 20px"><span
                  class=iconfont>&#xe63e;</span></a>
              <span>{{item.email}}</span>
            </div>
          </a-list-item>
        </a-list>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    created() {
      this.getData((res) => {
        let data = res.data.data;
        this.loading = false;
        this.data = data.list;
        this.lastPage = data.lastPage;
        this.total = data.total;
      })
    },
    data() {
      return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        data: [],
        currentPage: 1,
        total:'',
        lastPage:'',
        isLastPage:false,
      }
    },
    methods: {
      reqwest(callback) {
        this.axios.get('/author/guestbookDto?pageNum='+this.currentPage+'&state=1&sort=1').then(res => {
          console.log(res);
          callback(res);
        })
      },
      getData(callback) {
        this.reqwest(callback)
      },
      onLoadMore() {
        if(this.data.length == this.total){
          this.isLastPage = true;
          return;
        }
        this.loadingMore = true
        if(this.currentPage == this.lastPage){
          this.isLastPage = true;
        }else{
          this.currentPage++;
          this.getData((res) => {
          this.data = this.data.concat(res.data.data.list)
          this.loadingMore = false
          this.$nextTick(() => {
            window.dispatchEvent(new Event('resize'))
          })
        })
        }
        
      },
      replyMail() {
        let who = prompt("请输入接收人的邮箱: ", "1548132154@qq.com");
        let what = prompt("请输入主题: ", "Have a nice day");
        if (confirm("是否确认发送给 " + who) == true) {
          window.location.href = 'mailto:' + who + '?subject=' + what;
        }
      },
      confirmDelLeaveWords(id,index){
        let guestBook = {
          state:0,
          guestbookId:id,
          userId:1
        }
        let guestBookArr = [];
        guestBookArr.push(guestBook);
        this.axios.put('/author/guestbookDto',guestBookArr).then(res=>{
          if(res.data.code == 0){
            console.log(res);
            this.$message.success('删除成功')
            this.data.splice(index,1);
          }
        })
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
