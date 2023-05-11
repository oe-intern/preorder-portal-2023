<!-- eslint-disable max-len -->
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
        button.btn(@click="resetField") Discard
        button.btn.btn-primary.m-s-1(@click="submit") Save
    .info-variant
      .part
        .part-header
          h2.part-text 1. Which <b>product</b> do you want to take pre-orders for?
        .part-body
          p.par-body-text This is pulled from your existing product catalog in Shopify.
          input(
  v-model="productSearchName"
  type="text"
  placeholder="Search for a product"
  @focus="showRecommended"
  @blur="hiddenRecommended"
  ).part-body-int
          .list-suggested-product(v-if="isShowRecommended")
            .product-choice(
              v-for="productRecommend in productListRecommend"
              :key="productRecommend.id"
              @click="choseProduct(productRecommend)"
            )
              img(:src="productRecommend.image_src").product-photo
              .product-body
                h3.product-text {{ productRecommend.title }}
          .product-choice(v-if="productChoice.image_src" style="margin-top: 12px;")
            img(:src="productChoice.image_src").product-photo
            .product-body
              h3.product-text {{ productChoice.title }}
      .part
        .part-header
          h2.part-text 2. What are your <b>estimated ship dates</b> for this product?
        .part-body
          p.par-body-text The estimated ship dates will display on your PDP as a range so your customers know when you expect to ship this product. We use a date range so that you have some flexibility, and you can update your estimated ship dates at any time.
          .calendar-cover
            DatePicker(
  v-model="selectedDate"
  allow-range=" true"
  :month="pickerView.month"
  :year="pickerView.year"
  @month-change="handleMonthChange"
            )
      .part
        .part-header
          h2.part-text 3. <b>How many</b> do you want to make available for pre-order?
        .part-body
          p.par-body-text Limited quantity to order before the product is out of stock
          ul.list-type-product
            li.item-type-product(v-for="variant in variants" :key="variant.id")
              .item-variant
                span.variant-name 34 / CornflowerBlue
              input(
v-model="variantStocks"
type="number"
step="1"
min="0"
).variant-input
</template>

<script setup>

import CircleLeftMajor from '@icons/CircleLeftMajor.svg';
import { DatePicker } from '@ownego/polaris-vue';
import {
  ref, reactive, onMounted, inject, watch,
} from 'vue';

const axios = inject('axios');
const errors =ref({});

//product recommend
const isShowRecommended = ref(false);
const productSearchName = ref('');
const productListRecommend = ref([]);
const productChoice = ref({});
//Date
const today= new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth();
const yearNow = today.getFullYear();

const selectedDate = ref({
  start: today,
  end: new Date('2023/5/14'),
});

const pickerView = reactive({
  month: monthNow,
  year: yearNow,
});

const handleMonthChange = ({ month, year }) => {
  pickerView.month = month;
  pickerView.year = year;
};

///end Date

//variant stock
const variants =ref([]);
const variantStocks = ref();

const fetchVariants = () => {
  axios.get(`/products/${productChoice.value.id}`)
    .then(response => {
      console.log(response);
      variants.value = response;
    })
    .catch(error => {
      console.log(error);
    });
};

//Products Recommended
watch(productSearchName, (newValue, oldValue) => {
  if (newValue === '') {
    console.log(newValue);
    productListRecommend.value = {};
  } else {
    console.log(newValue);
    axios.get(`/products/search/${newValue}`)
      .then(response => {
        productListRecommend.value = response;
      })
      .catch(error => {
        console.log(error);
      });
  }
});

const showRecommended = () => {
  isShowRecommended.value = true;
};

const hiddenRecommended = () => {
  setTimeout(() => {
    isShowRecommended.value = false;
  }, 100);
};

const choseProduct = product => {
  productChoice.value = product;
  isShowRecommended.value =false;
  fetchVariants();
};

//submit

const submit = () => {
  const fields = {};

  fields.id = productChoice.value.id;
  console.log(selectedDate.value);
  fields.date_start = selectedDate.value.start;
  fields.date_end = selectedDate.value.end;
  fields.variants_stock = variantStocks.value;//mot mang cac object voi key la id cua variant va value la inventory cua no
  axios.post('/products/active', fields)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      errors.value = error.response.data.errors;
    });
};

</script>

<style scope lang="scss">
@import "@/scss/variables.scss";

.add-page{
  width: 100%;
}
.list-suggested-product{
  border-right: 1px solid $border-color;
  border-left: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  position: absolute;
  background-color: white;
  z-index: 10;
  width: calc( 100% - 48px );
  left: 50%;
  transform: translateX(-50%);
  .product-choice:hover{
    cursor: pointer;
    background-color: rgba($primary-color,0.2);
  }
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
      position: relative;
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
        padding: 8px 24px;
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
