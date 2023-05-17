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
      button.btn.btn-normal(@click="fullfilProduct") Ready to Fulfill
  .body-product
    .info-details-product
      .product-info
        .edit-header
          span.edit-header-text Summary
          .edit-header-content
            span(:class="productDetails.status ===1 ? 'active' : 'inactive' ").edit-status {{productDetails.status ===1 ? 'active' : 'inactive'}}
        .product-summary
          img(:src="productDetails.image_src" :alt="productDetails.title").summary-photo
          .summary-content
            h1.summary-name-product {{ productDetails.title }}
            .summary-ship-date {{ productDetails.date_start?DateStart:'unset' }} – {{ productDetails.date_end?DateEnd:'unset' }}
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
                td.units.units-buy {{ total.stock }}
                td.units.units-sold {{ total.preorder }}
                td.units.units-cancel {{ total.sold }}
              tr(v-for="variant in variants" :key="variant.id").variant-item
                td.units.units-name
                  span.variant-name {{ variant.title_var }}
                  span.variant-sku {{ variant.sku }}
                td.units.units-buy {{ variant.inventory }}
                td.units.units-sold {{ variant.preorder }}
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
              tr(v-for="(variant,index) in variants" :key="variant.id")
                td.units.units-name
                  span.variant-name {{ variant.title_var }}
                  span.variant-sku {{ variant.sku }}
                td
                  input(
  v-model="variantsStock[index].stock"
  type="number"
  step="1"
  min="0"
  ).item-stock-input
        .product-ship-date
          h1.text-edit Edit Shipping Date
          .calendar-cover
            DatePicker(
    v-model="selectedDate"
    allow-range="true"
    :month="pickerView.month"
    :year="pickerView.year"
    @month-change="handleMonthChange"
              )
</template>

<script setup>
import CircleLeftMajor from '@icons/CircleLeftMajor.svg';
import {
  ref, reactive, inject, onMounted, defineProps,
} from 'vue';

///
const axios = inject('axios');

const props = defineProps(['id']);

console.log(props);

const productDetails = ref({});

const variantsStock = ref([]);

const variants = ref({});

const errors =ref({});

const total = ref({
  inventory: 0,
  preorder: 0,
  sold: 0,
});
//Date

const DateStart = ref('');
const DateEnd = ref('');
const DateCreated = ref('');
const today= new Date();
const dayNow = today.getDate();
const monthNow = today.getMonth();
const yearNow = today.getFullYear();

const selectedDate = ref({
  start: productDetails.value.date_start || today,
  end: productDetails.value.date_end|| today,
});

const pickerView = reactive({
  month: monthNow,
  year: yearNow,
});

const handleMonthChange = ({ month, year }) => {
  pickerView.month = month;
  pickerView.year = year;
};

// functions call API products
const deleteProduct= () => {
  axios.put(`/products/deactivate/${props.id}`)
    .then(
      response => {
        console.log(response);
      })
    .catch(
      error => {
        console.log(error);
      },
    );
};

const updateProduct= () => {
  const fields = {};

  fields.date_start = selectedDate.value.start;
  fields.date_end = selectedDate.value.end;
  fields.variants_stock = variantsStock.value;
  console.log(fields);
  axios.put(`/products/edit/${props.id}`, fields)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

onMounted(() => {
  axios.get(`/products/variants/${props.id}`)
    .then(response => {
      variants.value = response.variants;
      variantsStock.value = response.variants.map(
        item => {
          total.value.inventory += item.inventory;
          total.value.preorder+= item.preorder;
          total.value.sold += item.sold;

          return {
            id: item.id,
            stock: item.inventory,
          };
        },
      );
    })
    .catch(error => {
      console.log(error);
    });
  axios.get(`/products/search/id/${props.id}`)
    .then(response => {
      productDetails.value = response;
      const dateObject = new Date(productDetails.value.created_at);
      const startDateObject = new Date(productDetails.value.date_start);
      const endDateObject = new Date(productDetails.value.date_end);
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      DateStart.value = startDateObject.toLocaleDateString('en-US', options);
      DateEnd.value = endDateObject.toLocaleDateString('en-US', options);
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
.summary-name-product{
  font-weight: 600;
  line-height: 1.5;
}
.summary-ship-date{
  font-size: 0.875rem;
  line-height: 2;
}

.summary-create-at{
  line-height: 1.5;
  font-size: 1rem;
}
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
        width: 80px;
        margin-left: 24px;
        margin-right:24px;
        border-radius: 5px;
        object-fit: cover;
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
          font-size: 0.875rem;
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
      padding: 16px;
      font-size: 16px;
      text-align: right;
      width: 100%;
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
          font-size: 0.875rem;
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
