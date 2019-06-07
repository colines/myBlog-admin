<template>
  <div class="mavon-editor">
    <input type="text" spellcheck="false" maxlength="80" class="title-input" placeholder="请输入文章标题..."
      v-model="articleTitle">

    <a-button type="primary" ghost @click="saveArticle" :disabled="articleStatus == 3 ">
      保存至草稿箱
    </a-button>
    <a-button type="primary" ghost @click="showDrawer" style="margin-left: 10px;" :disabled="articleStatus == 3">
      草稿箱
    </a-button>
    <a-drawer title="草稿箱" placement="right" :closable="false" @close="drawerClose" :visible="drawerVisible"
      class="my-drawer">
      <ul>
        <li v-for="item in draftList" :key="item.articleId" @click="showDraft(item.articleId)">
          <span>{{item.articleTitle}}</span></li>
      </ul>
    </a-drawer>
    <a-popover title="发布文章" trigger="click" v-model="popoverVisible">
      <template slot="content">
        <div class="article-popover">
          <h1>种类</h1>
          <a-select v-model="categoryId" style="width: 150px" @change="categoryChange">
            <a-select-option :value="item.categoryId" v-for="item in categoryList" :key="item.categoryId"
              v-if="item.state">{{item.categoryName}}</a-select-option>
          </a-select>
          <h1>标签</h1>
          <a-select v-model="tagId" style="width: 150px">
            <a-select-option :value="item.tagId" v-for="item in tagList" :key="item.tagId">{{item.tagName}}
            </a-select-option>
          </a-select>
          <p style="margin-top: 15px">
            <a-button type="primary" @click="submitArticle">确认</a-button>
          </p>
        </div>
      </template>
      <a-button type="primary" ghost style="margin-left: 10px;" v-if="articleStatus != 2"
        :disabled="articleStatus == 3">发布</a-button>
      <a-button type="primary" ghost style="margin-left: 10px;" v-if="articleStatus != 1 && articleStatus != 3">修改
      </a-button>
    </a-popover>
    <mavon-editor v-model="articleContent" :ishljs="true" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel"
      @change="getRenderVal">
    </mavon-editor>
  </div>

</template>
<script>
  import {
    mavonEditor
  } from 'mavon-editor'
  import marked from 'marked'
  import highlightJs from 'highlight.js'
  import 'mavon-editor/dist/css/index.css'
  marked.setOptions({
    highlight: (code) => highlightJs.highlightAuto(code).value
  })

  export default {
    components: {
      mavonEditor
    },
    created() {
      this.articleStatus = this.$route.query.id;
      this.articleId = this.$route.query.articleId;
      if (this.articleStatus != 1) //博文管理点击查看和修改文章的时候触发的回调
        this.getArticle(this.articleId);
      else
        this.getCategoryAndTag();

    },
    beforeDestroy() {
      if (!this.isPost) { //关闭网页如果还没发布，则保存到草稿箱
        this.saveArticle();
      }
    },
    data() {
      return {
        articleObj: null,
        articleTitle: '',
        articleContent: '',
        isTrue: true,
        renderVal: '',
        popoverVisible: false,
        drawerVisible: false,
        status: 1,
        categoryId: '',
        tagId: '',
        articleId: '',
        imgList:[],
        categoryList: [],
        tagList: [],
        draftList: [],
        articleStatus: '', //1 文章编写 2 文章修改 3 文章查看
        isPost: false, //确认发布文章
        isDraft: false, //是否从草稿里面取出来的
      }
    },
    methods: {
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('file', $file);
        this.axios.post('/author/imageDto/image', formdata).then(res => {
          console.log(res);
          let data = res.data.data;
          if (res.data.code == 0){
            this.$refs.md.$img2Url(pos,data.imageUrl);
            this.imgList.push(data);   
          }
        })
      },
      $imgDel([url, file]) {
        for(let i = 0;i<this.imgList.length;i++){
          if(this.imgList[i].imageUrl == url){
            this.delArticleImg(this.imgList[i].imageId)
            break;
          }
        }

      },
      delArticleImg(id){
        this.axios.delete('/author/imageDto/image/'+id).then(res=>{
          if(res.data.code != 0){
            this.$message.error('图片删除失败');
          }
        })
      },
      getRenderVal(value, render) {
        this.articleContent = value;
        this.renderVal = marked(value);
      },
      getArticle(articleId) {
        this.axios.get('/author/articleDto/' + articleId).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            let data = res.data.data;
            this.articleTitle = data.articleTitle;
            this.articleContent = data.articleContent;
            this.categoryId = data.categoryId;
            this.tagId = data.tags[0].tagId;
            this.status = data.state;
            this.getCategoryAndTag();
          }

        })
      },
      getArticleObject() {
        let tag = {
          tagId: this.tagId,
          state: this.status
        }
        let tagForms = [];
        tagForms.push(tag);
        this.articleObj = {
          articleId: this.articleId,
          categoryId: this.categoryId,
          articleContent: this.articleContent,
          articleHtml: this.renderVal,
          articleTitle: this.articleTitle,
          state: this.status,
          tagForms: tagForms
        }
        console.log(this.articleObj)
      },
      submitArticle() {
        if (this.articleStatus == 1 && !this.isDraft) {
          this.isPost = true; //
          this.postArticle();
        } else
          this.updatedArticle();
      },
      postArticle() {
        this.status = 1;
        this.getArticleObject();
        if (this.articleTitle.trim() == '')
          this.$message.error('标题不能为空');
        else
          this.axios.post('/author/articleDto', this.articleObj).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$message.success('发布成功');
              this.post = false;
            } else {
              this.$message.error('标题重复或者草稿箱已经存在');
            }
          })

      },
      updatedArticle() {
        this.getArticleObject();
        if (this.articleTitle.trim() == '')
          this.$message.error('标题不能为空');
        else
          this.axios.put('/author/articleDto', this.articleObj).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              if (this.isDraft)
                this.$message.success('发布成功');
              else
                this.$message.success('修改成功')
              this.isDraft = false;
            } else {
              this.$message.error('修改失败');
            }
          })
      },
      saveArticle() {
        this.status = 2;
        this.getArticleObject();
        this.axios.post('/author/articleDto', this.articleObj).then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.$message.success('保存成功');
          } else {
            this.$message.warn('草稿箱已经存在！');
          }
        })

      },
      getCategoryAndTag() {
        this.axios.get('/author/categoryDto').then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.categoryList = res.data.data; //种类列表
            for (let i = 0; i < this.categoryList.length; i++)
              if (this.articleStatus == 1) { //编写文章时
                if (this.categoryList[i].state) { //默认选中第一个种类和种类对应的第一个标签
                  this.tagList = this.categoryList[i].tags;
                  this.categoryId = this.categoryList[i].categoryId;
                  if (this.tagList.length)
                    this.tagId = this.tagList[i].tagId;
                  break;
                }
              } else { //查看和修改文章时，选中文章标签
                if (this.categoryId == this.categoryList[i].categoryId) {
                  this.tagList = this.categoryList[i].tags;
                }
              }
          }
        })
      },
      categoryChange() {
        for (let i = 0; i < this.categoryList.length; i++) {
          if (this.categoryId == this.categoryList[i].categoryId) {
            this.tagList = this.categoryList[i].tags;
            if (this.tagList.length)
              this.tagId = this.tagList[0].tagId;
            else
              this.tagId = '';
          }
        }
      },
      showDrawer() {
        this.axios.get('author/articleDto?states=2').then(res => {
          if (res.data.code == 0) {
            this.draftList = res.data.data.list;
          }
        })
        this.drawerVisible = true;
      },
      showDraft(articleId) {
        this.isDraft = true;
        this.axios.get('/author/articleDto/' + articleId).then(res => {
          if (res.data.code == 0) {
            let data = res.data.data;
            this.articleId = data.articleId;
            this.articleTitle = data.articleTitle;
            this.articleContent = data.articleContent;
            this.categoryId = data.categoryId;
            this.tagId = data.tags[0].tagId;
            this.drawerVisible = false;
          }
        })
      },
      drawerClose() {
        this.drawerVisible = false;
      }
    }
  }

</script>
<style scoped>
  .markdown-body {
    color: #24292e;
    font-size: 14px;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace;
  }

  .mavon-editor {
    width: 100%;
    height: 95vh;
    background: #fff;
  }

  .markdown-body {
    height: 96%;
  }

  .title-input {
    flex: 1 1 auto;
    margin: 0;
    font-size: 24px;
    font-weight: 600;
    color: #666;
    border: none;
    outline: none;
    padding: 10px 20px;
    width: 72%;
  }

  input::placeholder {
    color: #999;
  }

  .ant-drawer-body ul li {
    line-height: 2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }

  .ant-drawer-body ul li:hover {
    color: rgb(70, 70, 247);
  }

  .article-popover {
    padding: 0 0 10px 0;
  }

  .article-popover h1 {
    font-size: 14px;
    color: #666;
    margin: 10px 0;
  }

  .article-popover h1:first-child {
    margin-top: 0;
  }

</style>
