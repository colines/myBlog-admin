<template>
  <div class="content">
    <div class="sign-box">
      <div class="sign">
        <p>因为悦己，所以轻欢！</p>
      </div>
    </div>
    <div class="meta-box">
      <div class="meta">
        <div class="meta-item" v-for="(item,index) in metaInfoList" :key="item.configId">
          <div class="item">
            <p class="time"><span class="iconfont">&#xe609;</span>{{dateName[index]}}</p>
            <p class="num">
              <span class="iconfont">&#xe610;</span><span>{{item.articleSum}}</span>
              <span class="iconfont">&#xe60c;</span><span>{{item.thumbupSum}}</span>
              <span class="iconfont">&#xe684;</span><span>{{item.commentSum}}</span>
              <span class="iconfont">&#xe605;</span><span>{{item.visitSum}}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-box">
      <div id="visit-chart" ref="visitChart" class="visit-chart"></div>
      <div class="leave-words">
        <div class="words-header">
          <h1>留言墙</h1>
        </div>
        <div class="words-play">
          <a-carousel autoplay>
            <div>
              <a-comment v-for="(item,index) in wordsList1" :key="index">
                <a slot="author">{{Utils.html_decode(item.userName)}}</a>
                <a-avatar :src="item.imageUrl" alt="Han Solo"
                  slot="avatar" />
                <a-tooltip slot="content" :title="Utils.html_decode(item.guestbookContent)">
                  <span class="user-words">
                    {{Utils.html_decode(item.guestbookContent)}}
                  </span>
                </a-tooltip>
                <a-tooltip slot="datetime" :title="moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{moment(item.updateTime).fromNow()}}</span>
                </a-tooltip>
              </a-comment>
            </div>
            <div>
              <a-comment v-for="(item,index) in wordsList2" :key="index">
                <a slot="author">{{Utils.html_decode(item.userName)}}</a>
                <a-avatar :src="item.imageUrl" alt="Han Solo"
                  slot="avatar" />
                <a-tooltip slot="content" :title="Utils.html_decode(item.guestbookContent)">
                  <span class="user-words">
                    {{Utils.html_decode(item.guestbookContent)}}
                  </span>
                </a-tooltip>
                <a-tooltip slot="datetime" :title="moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{moment(item.updateTime).fromNow()}}</span>
                </a-tooltip>
              </a-comment>
            </div>
          </a-carousel>
        </div>
      </div>
      <div id="tag-chart" class="tag-chart" ref="tagChart"></div>
      <div class="leave-words" style="margin-top: 30px">
        <div class="words-header">
          <h1>最新评论</h1>
        </div>
        <div class="words-play">
          <a-carousel arrows>
            <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;z-index: 1">
              <a-icon type="left-circle" />
            </div>
            <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
              <a-icon type="right-circle" />
            </div>
            <div>
              <a-comment v-for="(item,index) in commentList" :key="index" v-if="index < 6">
                <a slot="author">{{Utils.html_decode(item.userName)}}</a>
                <a-avatar
                  :src="item.imageUrl"
                  alt="Han Solo" slot="avatar" />
                <a-tooltip slot="content" :title="Utils.html_decode(item.reviewContent)">
                  <span class="user-words">
                    {{Utils.html_decode(item.reviewContent)}}
                  </span>
                </a-tooltip>
                <a-tooltip slot="datetime" :title="moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{moment(item.updateTime).fromNow()}}</span>
                </a-tooltip>
              </a-comment>
            </div>
            <div>
              <a-comment v-for="(item,index) in commentList" :key="index" v-if="index >= 6">
                <a slot="author">{{Utils.html_decode(item.userName)}}</a>
                <a-avatar
                  :src="item.imageUrl"
                  alt="Han Solo" slot="avatar" />
                <a-tooltip slot="content" :title="Utils.html_decode(item.reviewContent)">
                  <span class="user-words">
                    {{Utils.html_decode(item.reviewContent)}}
                  </span>
                </a-tooltip>
                <a-tooltip slot="datetime" :title="moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{moment(item.updateTime).fromNow()}}</span>
                </a-tooltip>
              </a-comment>
            </div>
          </a-carousel>
        </div>
      </div>
    </div>
    <div class="clear-fix"></div>
    <div class="user-search">
      <a-list bordered :dataSource="searchData">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <span>{{item.keyWords}}</span>
          <span style="margin-left: 50px;">
            <a-icon type="check" v-if="item.status" style="color: green;" />
            <a-icon type="close" v-if="!item.status" style="color: red;" />
          </span>
        </a-list-item>
        <div slot="header">
          <span>搜索关键词列表</span>
          <span style="margin-left: 280px;">
            <span><a-icon type="check"  style="color: green;margin-right: 5px;"/>有效搜索</span>
            <span style="margin-left: 10px;"><a-icon type="close"  style="color: red;margin-right: 5px;"  />无效搜索</span>
          </span>
          <span style="margin-left: 400px;">
           <span style="margin-right: 10px;">换一批</span>
            <a-icon type="sync" v-show="!updateFlag" @click="updateSearchList" style="cursor: pointer;" />
            <a-icon type="sync" spin v-show="updateFlag" style="cursor: pointer;" />
          </span>
        </div>
      </a-list>
    </div>
    <div style="height: 100px;clear: both;"></div>
  </div>
</template>
<script>
  import echarts from '@/utils/echarts.js'
  
  export default {
    data() {
      return {
        searchData: [
          {
            keyWords: 'html的相对长度',
            status: 1
          },
          {
            keyWords: 'php的快速入门',
            status: 0
          },
          {
            keyWords: 'JavaScript的数组变异方法',
            status: 1
          },
          {
            keyWords: '噗哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈或哈哈哈',
            status: 0
          },
          {
            keyWords: 'vue的生命周期的详解',
            status: 1
          },
          {
            keyWords: 'webpack的打包原理',
            status: 1
          }
        ],
        updateFlag: false,
        metaInfoList:[],
        dateName:['THIS WEEK','THIS MONTH','THIS YEAR','ALL TIME'],
        list:[],
        wordsList1:[],
        wordsList2:[],
        j:'',
        guestList:[],
        commentList:[],

      }
    },
    created() {
      this.getMetaInfo();
      this.guestBookList();
      this.getCommentList();
    },
    mounted() {
      // 调用绘制图表的方法
      this.drawVisitChart();
      this.drawTagChart();
    },
    methods: {
      getMetaInfo(){
        this.axios.get('/author/userDto/authorInfo/1').then(res=>{
          console.log(res);
          if(res.data.code == 0){
            this.metaInfoList = res.data.data;
          }
        })
      },
      drawVisitChart() {
        // 实例化echarts对象
        let visitChart = echarts.init(this.$refs.visitChart)
        // 绘制折线图
        let option = {
          title: {
            text: '访问量',
            textAlign: 'auto',
            padding: [20, 20],
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [48, 60, 70, 60, 70, 80, 90],
            type: 'line'
          }]
        };
        visitChart.setOption(option);
      },
      drawTagChart() {
        // 实例化echarts对象
        let tagChart = echarts.init(this.$refs.tagChart)
        // 绘制柱状图
        let option = {
          title: {
            text: '点击量',
            textAlign: 'auto',
            padding: [20, 20],
          },
          tooltip: {},
          xAxis: {
            type: 'category',
            data: ['html', 'javascript', 'css', 'vue', 'webpack', 'react', 'java']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [200, 300, 220, 390, 150, 170, 330],
            type: 'bar'
          }],
          color: '#61a0a8',
        };
        tagChart.setOption(option);
      },
      updateSearchList() {
        this.updateFlag = true;
      },
      guestBookList(){
        this.axios.get('/author/guestbookDto?pageNum=1&state=1&sort=1').then(res => {
          // console.log(res);
          if(res.data.code == 0){
            this.list = res.data.data.list;
          }
          this.j = Math.ceil(this.list.length/6);
          let k = 0;
          for(let i=0;i<this.list.length;i++){
            if(i < 6 ){
              this.wordsList1.push(this.list[i]);
            }else{
              this.wordsList2.push(this.list[i]);
            }
          }
        })
      },
      getCommentList(){
        this.axios.get('/author/review').then(res => {
          if (res.data.code == 0) {
            console.log('---')
            console.log(res);
            let data = res.data;
           this.commentList = res.data.data;
            
          }
        })
      }
    }
  }

</script>

<style scoped>
  .sign-box {
    width: 100%;
    height: 150px;
    background-image: url('../../assets/styles/img/bg.jpg');
    background-color: #f9f9f9;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 30px 30px 0px;
  }

  .sign {
    margin-top: 70px;
    margin-left: 5px;
  }

  .sign p {
    font-size: 16px;
    color: #fff;
    line-height: 2;
  }

  .meta-box {
    width: 100%;
    height: 120px;
    background: #fff;
    padding: 30px 20px 0 20px;
  }

  .meta {
    height: 90px;
  }

  .meta-item {
    float: left;
    width: 25%;
    height: 100%;
  }

  .item {
    width: 90%;
    margin: 0 auto;
    /* margin-left: 50px; */
    padding-bottom: 30px;
  }

  .item p {
    height: 22px;
    line-height: 22px;
  }

  .item .iconfont {
    margin-right: 3px;
  }

  .time {
    font-size: 16px;
    color: #777;
  }

  .num {
    font-size: 14px;
    color: #5c90d2;
    margin-top: 10px;
  }

  .num .iconfont {
    color: rgb(168, 166, 166);
    font-size: 14px;
    margin-left: 2px;
  }

  .info-box {
    width: 100%;
    margin: 0 auto;
    padding: 30px 30px 1px;
  }

  .visit-chart {
    float: left;
    width: 700px;
    height: 430px;
    background: #fff;
  }

  .leave-words {
    float: left;
    width: 340px;
    height: 430px;
    padding: 0 5px;
    background: #fff;
    margin-left: 30px;
  }

  .words-header {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid rgba(178, 186, 194, .15);
  }

  .words-header h1 {
    font-size: 16px;
    color: #666;
    margin-left: 24px;
  }

  .words-play .user-words {
    display: block;
    width: 90%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .tag-chart {
    float: left;
    width: 700px;
    height: 430px;
    background: #fff;
    margin-top: 30px;
  }

  .ant-carousel>>>.custom-slick-arrow {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    font-size: 25px;
    color: #61a0a8;
    background-color: rgba(31, 45, 61, .11);
    opacity: 0.2;
  }

  .ant-carousel>>>.custom-slick-arrow:before {
    display: none;
  }

  .ant-carousel>>>.custom-slick-arrow:hover {
    opacity: 0.5;
  }

  .user-search {
    width: 1070px;
    margin-left: 30px;
    margin-top: 30px;
    background: #fff;
  }

</style>
