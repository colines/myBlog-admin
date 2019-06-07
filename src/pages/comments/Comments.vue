<template>
  <div class="content">
    <div class="comments">
      <div class="comments-list">
        <h1 class="list-header">评论列表 <span class="iconfont">&#xe6a7;</span></h1>
        <a-collapse v-model="activeKey">
          <a-collapse-panel :header="item.articleTitle" :key="(index+'')" class="coll-list"
            v-for="(item,index) in list">
            <a :href="home+'article?aid='+item.articleId"><span class='iconfont'>&#xe63e;</span></a>
            <a-comment v-for="(reviews,i) in item.data" :key="reviews.reviewId">
              <span slot="author">
                <span>{{Utils.html_decode(reviews.userName)}}</span>
              </span>
              <span slot="datetime">{{moment(reviews.updateTime).fromNow()}}</span>
              <a-avatar slot="avatar" :src="reviews.imageUrl" alt="reviews.userName" />
              <p slot="content">{{Utils.html_decode(reviews.reviewContent)}}</p>
              <span slot="actions"
                @click="showReviewModal(item.articleId,reviews.reviewId,reviews.userName,index,i)">回复</span>
              <span slot="actions" @click="delReviewFirst(reviews.reviewId,index,i)">删除</span>
              <a-comment v-for="(review,j) in reviews.reviewDtos" :key="review.reviewId">
                <span slot="author">
                  <span>{{Utils.html_decode(review.userName)}}</span>
                </span>
                <span slot="datetime">{{moment(review.updateTime).fromNow()}}</span>
                <a-avatar slot="avatar" :src="review.imageUrl" alt="Han Solo" />
                <p slot="content" class="comment-content">
                  <span>回复&nbsp;</span>
                  <span style="color:#45A7D4;">{{Utils.html_decode(review.replierName)}}</span>
                  <span classs="reply-content">：{{Utils.html_decode(review.reviewContent)}} </span>
                </p>
                <span slot="actions"
                  @click="showReviewModal(item.articleId,review.reviewId,review.userName,index,i)">回复</span>
                <span slot="actions" @click="delReviewSecond(review.reviewId,index,i,j)">删除</span>
              </a-comment>
            </a-comment>
          </a-collapse-panel>
        </a-collapse>
        <!-- <div class="list-bottom">
          <div v-if="!isLastPage">
            <a-spin v-if="loadingMore" />
            <a-button v-else @click="onLoadMore">加载更多</a-button>
          </div>
          <div v-else>
            <p style="color: #666;margin-top: 4rem;">没有更多的数据了</p>
          </div>
        </div> -->
      </div>
      <a-modal title="评论回复" v-model="reviewModalVisiable" @ok="review" cancelText="取消" okText="确认" class="review">
        <a-textarea :placeholder="'回复'+userName" v-model="reviewContent" :rows="3" spellcheck="false" />
      </a-modal>
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
        list: [],
        listFlag: [], //折叠面板是否显示
        activeKey: [],
        reviewModalVisiable: false,
        userName: '',
        reviewContent: '',
        articleId: '',
        reviewId: '',
        articleIndex: '', //第几篇文章
        position: '', //第几个评论人的位置
        loadingMore: true,
        isLastPage: '',
      }
    },
    methods: {
      getArticleList() {
        this.axios.get('/author/articleDto?sort=2').then(res => {
          if (res.data.code == 0) {
            console.log(res)
            let data = res.data.data.list;
            let len = data.length;
            for (let i = 0; i < len; i++) {
              let articleId = data[i].articleId;
              let articleTitle = data[i].articleTitle;
              this.getCommentsList(articleId, articleTitle);
            }
          }
        })
      },
      getCommentsList(articleId, articleTitle) {
        this.axios.get('/author/review?articleId=' + articleId + '&state=1&sort=1').then(res => {
          if (res.data.code == 0) {
            let data = res.data;
            data.articleId = articleId;
            data.articleTitle = articleTitle;
            this.list.push(data);
            console.log('-----')
            console.log(this.list);
          }
        })
      },
      showReviewModal(articleId, reviewId, username, index, i) {
        this.userName = username;
        this.articleId = articleId;
        this.reviewId = reviewId;
        this.articleIndex = index;
        this.position = i;
        this.reviewModalVisiable = true;
      },
      review() {
        let reviewObj = {
          articleId: this.articleId,
          reviewParent: this.reviewId,
          reviewContent: this.reviewContent,
          state: 1,
          userId: 1
        }
        this.axios.post('author/review', reviewObj).then(res => {
          if (res.data.code == 0) {
            this.reviewModalVisiable = false;
            let data = res.data.data;
            data.replierName = this.userName;
            data.reviewContent = this.reviewContent;
            this.list[this.articleIndex].data[this.position].reviewDtos.push(data);
            this.reviewContent = '';
          }
        })
      },
      delReviewFirst(reviewId, index, i) { //删除评论第一层
        this.axios.put('/author/review/' + reviewId + '?state=0').then(res => {
          if (res.data.code == 0) {
            this.list[index].data.splice(i, 1);
          }
        })
      },
      delReviewSecond(reviewId, index, i, j) { //删除评论第二层.
        this.axios.put('/author/review/' + reviewId + '?state=0').then(res => {
          if (res.data.code == 0) {
            this.list[index].data[i].reviewDtos.splice(j, 1);
          }
        })
      },
      confirmDelComments() {
        this.$message.success('删除成功')
      },
      onLoadMore() {

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

  .list-bottom {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

</style>
