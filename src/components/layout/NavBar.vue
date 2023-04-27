<template lang="pug">
.nav.flex-column
  h1.name-store
    a(href="#") My Store
  //- .progress-train
  //-   .title-progress
  //-     span Getting Started
  //-     span 4/5
  //-   .progress-bar
  .nav-list
    router-link(exact-active-class= "nav-item-active" ,:to="{name:'home',params:{}}",@click="props.toggleNavMenu").nav-item
      home-mar.nav-icon
      span.nav-text Home
    router-link(active-class="nav-item-active" ,:to="{name:'pre-order',params:{}}",@click="props.toggleNavMenu").nav-item
      OrdersMajor.nav-icon
      span.nav-text Pre-orders
    router-link(active-class= "nav-item-active" ,:to="{name:'products',params:{}}",@click="props.toggleNavMenu").nav-item
      ProductsMajor.nav-icon
      span.nav-text Pre-order Product List
    //- router-link(active-class= "nav-item-active" ,:to="{name:'setting',params:{}}",@click="props.toggleNavMenu").nav-item
    //-   SettingsMajor.nav-icon
    //-   span.nav-text Setting
</template>

<script setup>
import { defineProps } from 'vue';
import HomeMajor from '@icons/HomeMajor.svg';
import OrdersMajor from '@icons/OrdersMajor.svg';
import ProductsMajor from '@icons/ProductsMajor.svg';
import SettingsMajor from '@icons/SettingsMajor.svg';

const props = defineProps(['toggleNavMenu']);
</script>

<style scope lang="scss">
@import '@/scss/variables.scss';

.nav {
  justify-content: center;
  align-items: center;
  padding: 24px 12px;

  .nav-list {
    margin-top: 40px;
    width: 100%;

    .nav-item-active {
      background-color: rgba($primary-color, 0.3);
    }

    .nav-item {
      border: 1px solid transparent;
      border-radius: 10px;
      width: 100%;
      text-align: left;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 8px 12px;
      margin-bottom: 12px;
      color: $dark-color;

      &:hover {
        background-color: rgba($primary-color, 0.3);
      }

      .nav-icon {
        margin-right: 8px;
        height: 20px;
        width: auto;
        opacity: 0.5;
      }
    }
  }

  .progress-train {}

  .name-store {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .progress-train {
    border: 1px solid transparent;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      border-color: $border-color;
    }
  }

  .title-progress {
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    margin-bottom: 12px;
  }

  .progress-bar {
    width: 100%;
    height: 12px;
    background-color: aqua;
    border-radius: 5px;
  }
}</style>
