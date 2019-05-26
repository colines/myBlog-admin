<template>
  <div id="app">
   <routerView></routerView>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  .ant-menu-dark .ant-menu-inline.ant-menu-sub{background:#2C343F }
  .ant-badge-multiple-words{
    padding: 0;
  }
  .leave .ant-upload-list-item {
    margin-left: 70px;
  }
  .ant-menu-submenu-title .iconfont{
    margin-right: 10px;
  }
  .ant-menu-item .iconfont{
    margin-right: 10px;
  }
  .ant-popover,.ant-drawer{
    z-index: 10000;
  }
  .ant-select-dropdown{
    z-index: 10001;
  }
  .ant-card-body{
    padding: 10px!important;
  }
  .photo-modal{
    width: 470px !important;
  }
  .photo-modal .ant-modal-content{
    height: 470px;
  }
  .photo-modal .ant-modal-close-x{
    width: 36px;
    height: 36px;
    line-height: 36px;
  }
  .photo-upload .ant-modal-content{
    width: 610px;
  }
  .ant-avatar{
    width: 45px;
    height: 45px;
  }
  .ant-comment-inner{
    padding: 10px 0;
  }

</style>
