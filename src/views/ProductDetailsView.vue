<template lang="pug">
.container
  .header
    .header-text
      router-link(:to="{name:'products'}").link-back
        .btn-back
          CircleLeftMajor.back-icon
          span.btn-header-text back to previous page
      h1.text-content Lark Dress
    .btn-function
      button.btn Cancel
      button.btn.btn-danger Delete
      button.btn.btn-primary.m-s-1 Update
      button.btn.btn-primary Ready to Fulfill
  .body-product
    .info-details-product
      .product-info
        .edit-header
          span.edit-header-text Summary
          .edit-header-content
            span.edit-status Live
        .product-summary
          image(src="https://cdn.shopify.com/s/files/1/0751/8044/1914/products/5236317800_2_3_2.jpg?v=1681703190").summary-photo
          .summary-content
            h1.summary-name-product Lark Dress
            .summary-ship-date Apr 20 – May 4, 2023
            .summary-create-at Created on 19 Apr 2023
        .variant-info-cover
          table.variant-table
            thead
              tr
                th.units Variant
                th.units.units-buy Buy Size
                th.units.units-sold Sold
                th.units.units-cancel Canceled
                th.units.units-unsold Unsold
                th.units.units-exported Exported
            tbody
              tr.total-item
                td.units Totals
                td.units.units-buy 1266
                td.units.units-sold 0
                td.units.units-cancel 0
                td.units.units-unsold 1266
                td.units.units-exported 0
              tr.variant-item
                td.units.units-name
                  span.variant-name 36 / black
                  span.variant-sku 21561
                td.units.units-buy 1230
                td.units.units-sold 0
                td.units.units-cancel 0
                td.units.units-unsold 1230
                td.units.units-exported 0
              tr.variant-item
                td.units.units-name
                  span.variant-name 38 / black
                  span.variant-sku 21562
                td.units.units-buy 16
                td.units.units-sold 0
                td.units.units-cancel 0
                td.units.units-unsold 16
                td.units.units-exported 0
              tr.variant-item
                td.units.units-name
                  span.variant-name 40 / black
                  span.variant-sku 21563
                td.units.units-buy 10
                td.units.units-sold 0
                td.units.units-cancel 0
                td.units.units-unsold 10
                td.units.units-exported 0
              tr.variant-item
                td.units.units-name
                  span.variant-name 42 / black
                  span.variant-sku 21564
                td.units.units-buy 10
                td.units.units-sold 0
                td.units.units-cancel 0
                td.units.units-unsold 10
                td.units.units-exported 0
      .product-edit
        .product-stock
          h1.text-edit Edit stock levels
          table.list-edit-stock
            thead
              tr
                th.stock-column SKU
                th.stock-column Value
            tbody
              tr
                td.units.units-name
                  span.variant-name 42 / black
                  span.variant-sku 21564
                td
                  input(
  type="number"
  step="1"
  min="0"
  value="0").item-stock-input
        .product-ship-date
          h1.text-edit Edit stock levels
          .calendar-cover
            DatePicker(
    v-model="selectedDate"
    allow-range=" true"
    :month="pickerView.month"
    :year="pickerView.year"
    @change="handleChange"
    @month-change="handleMonthChange"
              )
</template>

<script setup lang="ts">
import CircleLeftMajor from '@icons/CircleLeftMajor.svg';
import { ref, reactive } from 'vue';

const selectedDate = ref({
  start: new Date('12/1/2023'),
  end: new Date('25/1/2023'),
});

const pickerView = reactive({
  month: 1,
  year: 2023,
});

const handleChange = (date: any) => {
  console.log(date);
};

const handleMonthChange = ({ month, year }) => {
  pickerView.month = month;
  pickerView.year = year;
};
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
        box-shadow: rgba(15, 212, 15,0.1) 1px 1px 1px 1px;
        background-color: rgba(15, 212, 15, 0.1);
        border-radius: 5px;
        padding: 4px 12px;
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
        border-radius: 20px;
        width: 60px;
        height: auto;
        object-fit: cover;
        margin: 0 20px;
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
