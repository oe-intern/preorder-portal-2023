<template lang="pug">
.container
  .add-page
    .header
      .header-text
        router-link(:to="{name:'products'}").link-back
          .btn-back
            CircleLeftMajor.back-icon
            span.btn-header-text back to previous page
        h1.text-content Add a new Product
      .btn-function
        button.btn Discard
        button.btn.btn-primary.m-s-1 Save
    .info-variant
      .part
        .part-header
          h2.part-text 1. Which <b>product</b> do you want to take pre-orders for?
        .part-body
          p.par-body-text This is pulled from your existing product catalog in Shopify.
          input(
  type="text"
  name="productName"
  placeholder="Search for a product" ).part-body-int
          .list-suggested-product
          .product-choice
            image(src="https://cdn.shopify.com/s/files/1/0751/8044/1914/products/9713303427_2_1_2.jpg?v=1681703237").product-photo
            .product-body
              h3.product-text Denim Light Ripped
      .part
        .part-header
          h2.part-text 2. What are your <b>estimated ship dates</b> for this product?
        .part-body
          p.par-body-text The estimated ship dates will display on your PDP as a range so your customers know when you expect to ship this product. We use a date range so that you have some flexibility, and you can update your estimated ship dates at any time.
          .calendar-cover
            DatePicker(
  v-model="selectedDate"
  allow-range= true
  :month="pickerView.month"
  :year="pickerView.year"
  @change="handleChange"
  @month-change="handleMonthChange"
            )
      .part
        .part-header
          h2.part-text 3. <b>How many</b> do you want to make available for pre-order?
        .part-body
          p.par-body-text Limited quantity to order before the product is out of stock
          ul.list-type-product
            li.item-type-product
              .item-variant
                span.variant-name 34 / CornflowerBlue
              input(
type="number"
step="1"
min="0"
value="0").variant-input
</template>

<script setup lang="ts">

import CircleLeftMajor from '@icons/CircleLeftMajor.svg';
import { DatePicker } from '@ownego/polaris-vue';
import { ref, reactive } from 'vue';

const today= new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth();
const yearNow = today.getFullYear();

const selectedDate = ref({
  start: new Date(`${yearNow}/${monthNow}/${dayNow}`),
  end: new Date(`${yearNow}/${monthNow}/${dayNow + 4}`),
});

const pickerView = reactive({
  month: monthNow,
  year: yearNow,
});

const handleChange = (date: any) => {
  console.log(date);
};

const handleMonthChange = ({ month , year}) => {
  pickerView.month = month;
  pickerView.year = year;
};
</script>

<style scope lang="scss">
@import "@/scss/variables.scss";

.add-page{
  width: 100%;
}

.header {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
  align-items: flex-start;
  flex-wrap: wrap;
  .btn-back{
    display: block;
    font-size: 1rem;
    color: $dark-color;
    position: relative;
    .back-icon{
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      top: 50%;
      transform: translateY(-50%);
      left: -24px;
    }
    .btn-header-text{
      text-decoration: underline;
      padding-left: 4px;
    }
  }
  .text-content{
    font-size: 1.5rem;
    color: #000;
    padding-top: 16px;
    font-weight: bold;
  }
}
.info-variant{
  min-width: 600px;
  max-width: 900px;
  margin:0 auto;
  .part{
    border: 1px solid rgb(216, 216, 216);
    border-radius: 5px;
    margin-bottom: 24px;
    .part-header{
      display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    padding: 24px 24px 0px;
      .part-text{
        margin-bottom: 0px;
    font-size: 18px;
      }
    }
    .part-body{
      padding: 24px;
      .par-body-text{
        margin-top: 0;
        margin-bottom: 1rem;
        font-size: 1rem;
        color: $dark-color;
      }
      .part-body-int{
        border: 1px solid rgb(216, 216, 216);
        font-size: 1rem;
        border-radius: 5px;
        width: 100%;
        padding: 8px;
        &:focus{
          outline-color: rgb(77, 144, 254);
        }
      }
      .product-choice{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        padding: 24px 0;
        .product-photo{
          height: 60px;
    border-radius: 5px;
    object-fit: cover;
        }
        .product-text{
          color: $dark-color;
          font-size: 1rem;
          padding-left:12px;
        }
      }
      .list-type-product{
        .item-type-product{
          display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
          .variant-name{
            font-size: 1rem;
    white-space: nowrap;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
          }
          .variant-input{
            width: auto;
            border: 1px solid rgb(216, 216, 216);
            padding: 16px;
            font-size: 16px;
            text-align: right;
            border-radius: 5px;
            &:focus{
              outline-color: rgb(77, 144, 254);
            }
          }
      }
    }
  }
}
}
</style>
