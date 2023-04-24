<template lang="pug">
.pre-order-page.col.container
  .header-pre-order
    .title-header
      span Pre-orders
    .content-header(:class="{'no-blur' : isChecked}")
      button.btn-fulfill  Ready to FulFill
  .pre-order-task-bar
    .pre-order-search
      label(for="searchProduct").search-icon
        SearchMajor.icon-search
      .search-input-cover
        input(
id="searchProduct",
type="text",
name="searchProduct",
placeholder="Filter Pre-orders").search-input
    .pre-order-sort
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
          option(value="onPreOrder").sort-by-item On Pre-Order
          option(value="readyToFullfil").sort-by-item Ready to Fullfil
  .pre-order-list
    table.preo-order-table
      thead
        tr.table-bar
          th(colspan="1").pre-check.pre-header-item
            label( for="all").pre-check-cover
              input(
type="checkbox",
name="checkList",
value="checkAllList",
@change="handleToggleCheckAll").pre-check-box#pre-check-all
          th(colspan="1").pre-reference.pre-header-item Reference#
          th(colspan="1").pre-shopify-id.pre-header-item Shopify#
          th(colspan="1").pre-customer.pre-header-item Customer
          th(colspan="1").pre-date.pre-header-item Date
          th(colspan="1").pre-status.pre-header-item
            div
              span Status
              span i
          th(colspan="1").pre-quantity.pre-header-item Quantity
          th(colspan="1").pre-total.pre-header-item Total
      tbody
        tr.table-list
          td(colspan="1").pre-check.pre-item
            label( for="all").pre-check-box
              input(
type="checkbox",
name="checkList",
value="1",
@change="handleToggleCheck").pre-check-box
          td.product-refer.pre-item
            ul.refer-list
              li.refer-image-cover
                .div-image
              li.refer-name
                span.product-name Sony WF-1000XM4
                span.refer-type Pro
                span.refer-price &eth;349
          td.product-shopify-id.pre-item
            router-link(:to="{name:'pre-order',params:{}}") 123123
          td.product-customer.pre-item
            router-link(to="#")
              ul
                li.customer-name Nguyen Tien Dat
                li.customer-email dat2552002@gmail.com
                li.customer-location Thi tran Phuc Tho, Phuc Tho, Ha Noi, Viet Nam
          td.product-date.pre-item 19 Apr 2023
          td.product-status.pre-item open
          td.product-quantity.pre-item 2
          td.product-total.pre-item &eth;798
        tr.table-list
          td(colspan="1").pre-check.pre-item
            label( for="all").pre-check-box
              input(
type="checkbox",
name="checkList",
value="1",
@change="handleToggleCheck").pre-check-box
          td.product-refer.pre-item
            ul.refer-list
              li.refer-image-cover
                .div-image
              li.refer-name
                span.product-name Sony WF-1000XM4
                span.refer-type Pro
                span.refer-price &eth;349
          td.product-shopify-id.pre-item
            router-link(:to="{name:'pre-order',params:{}}") 123123
          td.product-customer.pre-item
            router-link(to="#")
              ul
                li.customer-name Nguyen Tien Dat
                li.customer-email dat2552002@gmail.com
                li.customer-location Thi tran Phuc Tho, Phuc Tho, Ha Noi, Viet Nam
          td.product-date.pre-item 19 Apr 2023
          td.product-status.pre-item open
          td.product-quantity.pre-item 2
          td.product-total.pre-item &eth;798
        tr.table-list
          td(colspan="1").pre-check.pre-item
            label( for="all").pre-check-box
              input(
type="checkbox",
name="checkList",
value="1",
@change="handleToggleCheck").pre-check-box
          td.product-refer.pre-item
            ul.refer-list
              li.refer-image-cover
                .div-image
              li.refer-name
                span.product-name Sony WF-1000XM4
                span.refer-type Pro
                span.refer-price &eth;349
          td.product-shopify-id.pre-item
            router-link(:to="{name:'pre-order',params:{}}") 123123
          td.product-customer.pre-item
            router-link(to="#")
              ul
                li.customer-name Nguyen Tien Dat
                li.customer-email dat2552002@gmail.com
                li.customer-location Thi tran Phuc Tho, Phuc Tho, Ha Noi, Viet Nam
          td.product-date.pre-item 19 Apr 2023
          td.product-status.pre-item open
          td.product-quantity.pre-item 2
          td.product-total.pre-item &eth;798
</template>

<script setup>
import SearchMajor from '@icons/SearchMajor.svg';
import { ref } from 'vue';

const isChecked = ref(false);
const handleToggleCheckAll = e => {
  console.log(123);
};
</script>

<style scope lang='scss'>
@import '@/scss/variables.scss';
.pre-order-page {
  padding-top: 40px;
  .pre-check{
    text-align: center!important;;
  }
  .header-pre-order{
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
  .pre-order-task-bar{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .pre-order-search{
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
    .pre-order-sort{
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
  .pre-order-list{
    width: 100%;
    margin-top: 40px;
    display: block;
    overflow-x: auto;
    .preo-order-table{
      width: 100%;
      border: 1px solid $border-color;
      border-radius: 5px;
      font-size: 1rem;
      min-height: 100px;
      .table-bar{
        width: 100%;
        height: 40px;
        .pre-header-item{
          color: rgba($primary-color, 1.5);
          font-style: italic;
          text-align: center;
        }
      }
      .table-list{
        .product-date{
          min-width: 50px;
        }
        .pre-item{
          padding: 0 12px;
          text-align: left;
          line-height: 1.5;
          font-size: 0.875rem;
          color: #333;
          border-top: 1px solid $border-color;
          .refer-list{
            padding: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            min-width: 200px;
            .refer-image-cover{
                display: block;
                width: 60px;
                height: 60px;
                .div-image{
                background: url("https://sony.scene7.com/is/image/sonyglobalsolutions/Product%20primary%20image-1?$primaryshotPreset$&fmt=png-alpha&wid=440");
                background-size: contain;
                width: 100%;
                height: 100%;
                border: 1px solid $border-color;
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
      }
    }
  }
}
</style>
