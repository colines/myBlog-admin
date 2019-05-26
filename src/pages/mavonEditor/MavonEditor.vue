<template>
  <div class="mavon-editor">
    <input type="text" spellcheck="false" maxlength="80" class="title-input" placeholder="请输入文章标题...">
    <a-button type="primary" ghost @click="saveArticle">
       保存至草稿箱
      </a-button>
    <a-button type="primary" ghost @click="showDrawer" style="margin-left: 10px;">
      草稿箱
    </a-button>
    <a-drawer title="草稿箱" placement="right" :closable="false" @close="drawerClose" :visible="drawerVisible" class="my-drawer">
     <ul>
       <li><span>标题1</span></li>
       <li><span>标题1</span></li>
       <li><span>标题1</span></li>
     </ul>
    </a-drawer>
    <a-popover title="发布文章" trigger="click" v-model="popoverVisible">
      <template slot="content">
        <div class="article-popover">
          <h1>种类</h1>
          <a-select defaultValue="前端" style="width: 150px" >
              <a-select-option value="前端">前端</a-select-option>
              <a-select-option value="后端">后端</a-select-option>
              <a-select-option value="项目总结">项目总结</a-select-option>
            </a-select>
          <h1>标签</h1>
          <a-select defaultValue="javascript" style="width: 150px" >
              <a-select-option value="javascript">javascript</a-select-option>
              <a-select-option value="html">html</a-select-option>
              <a-select-option value="css" disabled="true">css</a-select-option>
              <a-select-option value="vue">vue</a-select-option>
            </a-select>
            <p style="margin-top: 15px">
              <a-button type="primary">确认</a-button>
            </p>
        </div>
      </template>
      <a-button type="primary" ghost style="margin-left: 10px;">发布</a-button>
    </a-popover>
    <mavon-editor v-model="editorContent" :ishljs="true" ref=md @imgAdd="$imgAdd" @imgDel="$imgDel" @change="getinfo">
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
    data() {
      return {
        navText: '',
        editorContent: '',
        isTrue: true,
        renderVal: '',
        popoverVisible: false,
        drawerVisible:false,
      }
    },
    methods: {
      // 绑定@imgAdd event
      $imgAdd(pos, $file) {
        // console.log(pos + "---------------------------------");
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        //  console.log($file);
        //  axios({
        //      url: 'server url',
        //      method: 'post',
        //      data: formdata,
        //      headers: { 'Content-Type': 'multipart/form-data' },
        //  }).then((url) => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /*
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        //      $vm.$img2Url(pos, url);
        //  })
        this.$refs.md.$img2Url(pos, 'http://pic24.nipic.com/20120922/10898738_143746326185_2.jpg')
      },
      $imgDel([fileName, file]) {
        console.log(fileName);
        console.log(file);

      },
      getinfo(value, render) {
        this.renderVal = marked(value);
        // console.log(this.renderVal)
      },
      postMessage() {
        // console.log('--------------------------------------')
        // console.log(this.renderVal);
        // localStorage.setItem('article', JSON.stringify(this.renderVal));
      },
      saveArticle(){

      },
      showDrawer() {
        this.drawerVisible =true;
      },
      drawerClose(){
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
  .ant-drawer-body ul li{
    line-height: 2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    cursor: pointer;
  }
  .ant-drawer-body ul li:hover{
    color: rgb(70, 70, 247);
  }
  .article-popover{
    padding:0 0 10px 0;
  }
  .article-popover h1{
    font-size: 14px;
    color: #666;
    margin:10px 0;
  }
  .article-popover h1:first-child{
    margin-top: 0;
  }

</style>
