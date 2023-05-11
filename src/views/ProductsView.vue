<template lang="pug">
.pro-order-page.col.container
  .header-pro-order
    .title-header
      span Product pro-order List
    .content-header
      button.btn-fulfill(:class="{'no-blur' : isChecked}") Ready to FulFill
      button(@click="handelAddNewProduct").btn-fulfill.no-blur Add new product
  .pro-order-task-bar
    .pro-order-search
      label(for="searchProduct").search-icon
        SearchMajor.icon-search
      .search-input-cover
        input(
  id="searchProduct",
  type="text",
  name="searchProduct",
  placeholder="Filter pro-orders").search-input
    .pro-order-sort
      .sort-by
        label( for="sort-by-list" ).title-sort-by Sort by
        select(id="sort-by-list" name="typeSort" ).sort-by-list
          option(value="newest").sort-by-item Newest first
          option(value="oldest").sort-by-item Oldest first
          option(value="the most expensive").sort-by-item The most expensive first
          option(value="cheapest").sort-by-item Cheapest first
      .sort-by
        label( for="status" ).title-sort-by Status is
        select(id="status" name="statusSort" ).sort-by-list
          option(value="all").sort-by-item ALL
          option(value="onproOrder").sort-by-item On pro-Order
          option(value="readyToFullfil").sort-by-item Ready to Fullfil
  .pro-order-list
    table.pro-order-table.overflow-column.separate-border
      thead
        tr.table-bar
          th(colspan="1").pro-check.pro-header-item
            label( for="pro-check-all").pro-check-cover
              input(
  v-model="isCheckedAll",
  type="checkbox",
  @change="handleToggleCheckAll").pro-check-box#pro-check-all
          th(colspan="1").pro-reference.pro-header-item Product
          th(colspan="1").pro-status.pro-header-item
            div.status-cover
              span Status
              InfoMinor.status-icon
          th(colspan="1").pro-customer.pro-header-item Date Start
          th(colspan="1").pro-customer.pro-header-item Date End
          th(colspan="1").pro-vendor.pro-header-item Vendor
          th(colspan="1").pro-date.pro-header-item Shell Through
          th(colspan="1").pro-color.pro-header-item Ready to fulfill
      tbody
        tr(
v-for="(product ,index) in products"
:key="index"
).table-list
          td(colspan="1").pro-check.pro-item
            label( :for="product.id").pro-check-cover
              input(
  :id="product.id",
  :ref="checkItem",
  v-model="productCheck",
  type="checkbox",
  :value="product.id",
  @change="handleCheckbox",
  ).pro-check-box.pro-check-item
          td.product-refer.pro-item
            div(style="margin-left: 24px;")
              ul.refer-list(@click.prevent="showProduct(product.id)")
                li.refer-image-cover
                  .div-image(:style="{backgroundImage: 'url('+product.image_src+')'} ")
                li.refer-name
                  span.product-name {{product.title}}
          td.pro-item
            span(:class="product.status=== 1 ? 'active' : 'inactive' ") {{ product.status=== 1 ? 'active' : 'inactive' }}
          td.product-date.pro-item
            span.date-from {{ product.date_start ? product.date_start :'unset' }}
          td.product-date.pro-item
            span.date-to {{ product.date_end ? product.date_end : 'unset' }}
          td.product-vendor.pro-item {{ product.vendor }}
          td.product-shell.pro-item
            .shell-header
              span.shell-title 0.00%
              span.shell-text (0/1266  units)
            progress(max="100", value="20" ).shell-progress
          td.product-fulfill.pro-item 0.00%(0/0 units)
</template>

<script setup>
import { useRouter } from 'vue-router';
import InfoMinor from '@icons/InfoMinor.svg';
import SearchMajor from '@icons/SearchMajor.svg';
import {
  inject, ref, onMounted,
} from 'vue';

const productCheck = ref([]);
const router = useRouter();

const isCheckedAll = ref(false);

const axios = inject('axios');

const products = ref(null);

const arrayId = ref([]);

//function always run

//function run when call
const handelAddNewProduct = () => {
  router.push({
    name: 'addPreProduct',
    params: {},
  });
};

const handleToggleCheckAll = e => {
  if (isCheckedAll.value) {
    productCheck.value = arrayId.value;
  } else {
    productCheck.value = [];
  }
};

const handleCheckbox = e => {
  if (productCheck.value.length === arrayId.value.length) {
    isCheckedAll.value = true;
  } else {
    isCheckedAll.value = false;
  }
};

const showProduct = id => {
  router.push({
    name: 'detailsProduct',
    params: { id: id },
  });
};

//when component mount function is call
onMounted(() => {
  //save product list
  axios.post('/products/save')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
  axios.get('/products')
    .then(response => {
      console.log(response);
      products.value = response;
      arrayId.value = response.map(element => element.id);
    })
    .catch(
      error => {
        console.log(error);
      },
    );
});
</script>

<style scope lang='scss'>
  @import '@/scss/variables.scss';
  .pro-order-page {
    padding-top: 40px;
    .pro-check{
      text-align: center!important;
    }
    .header-pro-order{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 100px;
      .title-header{
        height: 100%;
        display: flex;
        flex-direction: column;
        font-weight: 600;
        color: $primary-color;
        justify-content: flex-start;
        font-size: 2rem;
      }
      .content-header{
        .btn-fulfill{
          background-color: rgba($primary-color, 0.7);
          color: white;
          font-size: 0.875rem;
          border-radius: 5px;
          border: 1px solid $border-color;
          padding: 8px 12px;
          opacity: 0.5;
        }

      }
      .no-blur{
        opacity: 1!important;
        cursor: pointer;
      }
    }
    .pro-order-task-bar{
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      align-items: center;
      .pro-order-search{
        border-bottom: 1px solid $border-color;
        display: flex;
        flex: 1;
        height: 40px;
        align-items: center;
        .search-icon{
          width: 20px;
          height: 20px;
          margin: 0 12px;
          .icon-search{
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
        .search-input-cover{
          flex: 1;
          height: 100%;
          min-width: 100px;
          .search-input{
            width: 100%;
            height: 100%;
            border: none;
            color: #333;
            font-weight: 600;
            font-size: 1rem;
            padding: 0 12px;
            outline-color: rgba($primary-color, 1.5);
            outline-width: 1px;
          }
        }
      }
      .pro-order-sort{
        display: flex;
        padding: 12px;
        align-items: center;
        .sort-by{
          padding: 8px;
          border: solid 1px $border-color;
          border-radius: 5px;
          margin-left: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          flex-wrap: nowrap;
          .title-sort-by{
            font-size: 1rem;
            color: rgba($color: #000000, $alpha: 0.4);
            margin-right: 8px;
          }
          .sort-by-list{
            flex: 1;
            border: none;
            background: transparent;
            outline-color: $primary-color;
            outline-width: 1px;
            font-size: 0.875rem;
            padding: 4px 4px;
            font-weight: 600;
          }
        }
      }
    }
    .pro-order-list{
      width: 100%;
      margin-top: 40px;
      display: block;
      overflow-x: auto;
      .pro-order-table{
        display: block;
        overflow-x: auto;
        width: 100%;
        border-radius: 5px;
        font-size: 1rem;
        border-collapse: collapse;
        .table-bar{
          width: 100%;
          height: 40px;
          .status-cover{
            display: flex;
            align-items: center;
            position: relative;
          }
          .status-icon{
            width: 20px;
            height: 20px;
            margin-left: 4px;
            position: absolute;
            top: calc(50% - 1px);
            transform: translateY(-50%);
            left: 45px;
          }
          .pro-header-item{
            color: rgba($primary-color, 1.5);
            font-style: italic;
            text-align: center;
          }
          .pro-check-cover{
      width: 40px;
      height: 40px;
    }
        }
        .table-list{
          height: 100px;
          .pro-item{
            padding: 0 12px;
            text-align: center;
            line-height: 1.5;
            font-size: 0.875rem;
            color: #333;
            .refer-list{
              cursor: pointer;
              padding: 0;
              justify-content: flex-start;
              display: flex;
              flex-direction: row;
              align-items: center;
              min-width: 200px;
              .refer-image-cover{
                display: block;
                width: 60px;
                height: 60px;
                .div-image{
                  background-size: cover;
                  height: 60px;
                  margin-right: 12px;
            }
            }
              .refer-name{
                padding-left: 12px;
                display: flex;
                flex-direction: column;
                align-items: center;
              }
            }
          }
          .refer-price, .product-total{
            color: red;
            font-weight: 600;
          }
          .product-shell{
            .shell-header{
              text-align: left;
              padding-left: 8px;
            }
            .shell-progress{
                width: 100%;
                height: 20px;
                border: 1px solid #ccc;
                background-color: #fff;
                border-radius: 5px;
                overflow: hidden;
              }
              .shell-progress::-webkit-progress-bar{
                background-color: #fff;
              }
              .shell-progress::-webkit-progress-value {
                background-color: $primary-color;
              }
              .shell-progress::-moz-progress-bar {
                background-color: $primary-color;
              }
          }
        }
      }
    }
  }
  </style>
