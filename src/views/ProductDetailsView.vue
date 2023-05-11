<template lang="pug">
.container
  .header
    .header-text
      router-link(:to="{name:'products'}").link-back
        .btn-back
          CircleLeftMajor.back-icon
          span.btn-header-text back to previous page
      h1.text-content {{ productDetails.title }}
    .btn-function
      button.btn.btn-danger(@click="deleteProduct") Delete
      button.btn.btn-primary.m-s-1(@click="updateProduct") Update
      button.btn.btn-primary(@click="fullfilProduct") Ready to Fulfill
  .body-product
    .info-details-product
      .product-info
        .edit-header
          span.edit-header-text Summary
          .edit-header-content
            span(:class="productDetails.status ===1 ? 'active' : 'inactive' ").edit-status {{productDetails.status ===1 ? 'active' : 'inactive'}}
        .product-summary
          .summary-photo(:style="{backgroundImage: 'url('+productDetails.image_src+')'} ")
          .summary-content
            h1.summary-name-product {{ productDetails.title }}
            .summary-ship-date Apr 20 – May 4, 2023
            .summary-create-at Created on {{ DateCreated }}
        .variant-info-cover
          table.variant-table.separate-border
            thead
              tr
                th.units Variant
                th.units.units-buy Buy Size
                th.units.units-cancel PreOrder
                th.units.units-sold Sold
            tbody
              tr.total-item
                td.units Totals
                td.units.units-buy 1266
                td.units.units-sold 0
                td.units.units-cancel 0
              tr(v-for="variant in variants" :key="variant.id").variant-item
                td.units.units-name
                  span.variant-name {{ variant.title }}
                  span.variant-sku {{ variant.sku }}
                td.units.units-buy {{ variant.inventory }}
                td.units.units-sold {{ variant.preOrder }}
                td.units.units-cancel {{ variant.sold }}
      .product-edit
        .product-stock
          h1.text-edit Edit stock levels
          table.list-edit-stock.separate-border
            thead
              tr
                th.stock-column Variant
                th.stock-column Value
            tbody
              tr(v-for="(variant) in variants" :key="variant.id")
                td.units.units-name
                  span.variant-name {{ variant.title_var }}
                  span.variant-sku {{ variant.sku }}
                td
                  input(
  type="number"
  step="1"
  min="0").item-stock-input
        .product-ship-date
          h1.text-edit Edit Shipping Date
          .calendar-cover
            DatePicker(
    v-model="selectedDate"
    allow-range="true"
    :month="pickerView.month"
    :year="pickerView.year"
    @change="handleChange"
    @month-change="handleMonthChange"
              )
</template>

<script setup>
import CircleLeftMajor from '@icons/CircleLeftMajor.svg';
import {
  ref, reactive, inject, onMounted, defineProps,
} from 'vue';

//
const axios = inject('axios');

const props = defineProps(['id']);

const productDetails = ref({});

const variantsStock = ref([]);

const fields = ref({});

const variants = ref({});

const DateCreated = ref('');
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

const handleChange = date => {
  console.log(date);
  console.log(selectedDate.value);
};

const handleMonthChange = ({ month, year }) => {
  pickerView.month = month;
  pickerView.year = year;
};

onMounted(() => {
  console.log(props.id);
  axios.get(`/products/${props.id}`)
    .then(response => {
      console.log(response);
      variants.value = response;
    })
    // .then(() => {
    //   variants.value.forEach((element, index) => {
    //     variantsStock[index].id = element.id;
    //   });
    // })
    .catch(error => {
      console.log(error);
    });

  axios.get('/products')
    .then(response => {
      productDetails.value = response.find(element => element.id.toString() === props.id);
      console.log(productDetails.value);
      const dateObject = new Date(productDetails.value.created_at);
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      DateCreated.value = dateObject.toLocaleDateString('en-US', options);
    })
    .catch(
      error => {
        console.log(error);
      },
    );
});

</script>

<style scope lang="scss">
@import '@/scss/variables.scss';
.btn-function{
  display: inline-block;
  padding-top:24px;
}
.info-details-product{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  .product-info{
    border: 1px solid $primary-color;
    border-radius: 10px;
    padding: 24px;
    margin-right: 24px;
    margin-bottom: 24px;
    .edit-header{
      display:  flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 20px;
      .edit-header-text{
        font-size: 1.5rem;
        font-weight: 700;
        margin-right: 16px;
      }
      .edit-header-content{
        .edit-status{
          color: $dark-color;
          font-weight: 600;
          font-size: 1rem;
        }
      }
    }
    .product-summary{
      display: flex;
      flex-direction: row;
      align-items: center;
      .summary-photo{
        display: block;
        width: 80px;
        height: 80px;
        background-size: cover;
        margin-left: 24px;
        margin-right:24px;
        border-radius: 5px;
      }
    }
    .variant-info-cover{
      width: 100%;
      margin-top: 24px;
      .variant-table{
        display: block;
        border-collapse: collapse;
      .total-item{
        font-weight: 600;
      }
      .units-name{
        display: flex;
        flex-direction: column;
        .variant-name{
          font-size: 1rem;
          color: #000;
        }
        .variant-sku{
          color: $dark-color;
          font-size: 0.75rem;
        }
      }
      .units{
        padding: 8px 12px;
        text-align: center;
      }
    }
  }
  }
  .product-edit{
    flex: 1;
    min-width: 350px;
    .list-edit-stock{
      width: 100%;
    }

    .item-stock-input{
      border-radius: 5px;
    border: 1px solid rgb(216, 216, 216);
    padding: 8px;
    &:focus{
            outline-color: rgb(77, 144, 254) ;
          }
    }
    .text-edit{
      font-size: 1.5rem;
      font-weight: 600;
      color: rgba(19, 2, 40, 0.8);
      margin: 0px 0px 24px;
      padding-top: 0px;
      padding-bottom: 24px;
      border-bottom: 1px solid rgb(230, 230, 230);
    }

    .units-name{
        text-align: left;
        display: flex;
        flex-direction: column;
        .variant-name{
          font-size: 1rem;
          color: #000;
        }
        .variant-sku{
          color: $dark-color;
          font-size: 0.75rem;
        }
      }

    .product-stock,.product-ship-date{
      margin-bottom: 24px;
      display: block;
      width: 100%;
      padding:16px 0;
      border: 1px solid $primary-color;
      border-radius: 10px;
      padding: 24px;
      .item-stock{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        .item-stock-name{
          font-size: 1rem;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
