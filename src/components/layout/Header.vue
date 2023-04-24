<template lang="pug">
header.fixed-top.bg-white.header-app
  .icon-web.d-none.d-md-block
    span.icon-header.d-none.d-md-block Icon
  .header-face
    .header-menu.d-md-none.d-block
      .menu-item(@click="toggleModalMenu")
        MobileHamburgerMajor.icon-menu
    .header-photo
      .account
div(v-if="isShowModalMenu").d-flex.d-md-none.nav-cover
  .nav-modal
    NavBar( :toggle-nav-menu="toggleNavMenu" ).nav-show
  .modal-cover(@click="toggleModalMenu")
</template>
<script setup>
import { ref } from 'vue';
import MobileHamburgerMajor from '@icons/MobileHamburgerMajor.svg';
import HomeMajor from '@icons/HomeMajor.svg';
import OrdersMajor from '@icons/OrdersMajor.svg';
import ProductsMajor from '@icons/ProductsMajor.svg';
import SettingsMajor from '@icons/SettingsMajor.svg';
import NavBar from './NavBar.vue';

const isShowModalMenu = ref('false');

const toggleModalMenu = () => {
  isShowModalMenu.value = !isShowModalMenu.value;
};

const toggleNavMenu = () => {
  isShowModalMenu.value = false;
};

</script>

<style scope lang="scss">
@import "@/scss/variables.scss";
.nav-cover{
  margin-top:$header-height;
  z-index: 100;
  position:fixed;
  width: 100%;
  height: 100%;
  flex-direction: row;
  .nav-modal{
    width: 75%;
    z-index: 100;
    background-color: white;
    height: 100%;
  }
  .modal-cover{
    flex:1;
    height: 100%;
    background-color: rgba($dark-color, 0.9);
  }
}
.header-app {
  border-bottom: 1px $border-color solid;
  height: $header-height;
  width: 100%;
  display: flex;
  flex-direction: row;

  .icon-web {
    border-right: 1px $border-color solid;
    height: 100%;
    width: $nav-width;
    padding: 24px 12px 12px 12px;
    text-align: left;

    .icon-header {
      text-align: center;
      font-size: 2rem;
      height: 100%;
    }
  }

  .header-face {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;

    .header-menu {
      margin-left: 24px;
      width: 50px;
      height:100%;

      .menu-item {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        &:hover{
          cursor: pointer;
          background-color: rgba($primary-color,0.3);
        }
      .icon-menu{
        display: block;
        width: 30px;
        height:30px;
      }
      }

    }

    .header-photo{
      position: absolute;
      right: 0;
    }

    .account {
      display: flex;
      justify-items: end;
      align-items: center;
      position: relative;
      margin-right: 20px;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      border: 2px solid slateblue;
      background: url(https://haycafe.vn/wp-content/uploads/2021/11/hinh-anh-hoat-hinh-de-thuong-cute-dep-nhat.jpg);
      background-size: cover;
      &::after {
        content: "Account";
        z-index: 1000;
        padding: 4px 8px;
        font-size: 0.75rem;
        position: absolute;
        top: calc(100% + 8px);
        left: 50%;
        transform: translateX(-50%);
        background-color: rgb(70, 68, 68);
        color: white;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 0.7s ease;
      }
      &:hover::after {
        opacity: 1;
      }

      .account-image {
        z-index: 1000;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
