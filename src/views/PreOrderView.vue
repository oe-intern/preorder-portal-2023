<!-- eslint-disable max-len -->
<template lang="pug">
.pre-order-page.col.container
  //success message
  .success-cover(v-if="isSuccess" :class="{'show-message': isSuccess}")
    h1.success-text You are Successfully
  .header-pre-order
    .title-header
      span Pre-orders
    .content-header
      button.btn-fulfill(:class="{'no-blur' : isChecked}" @click="isChecked? handelShipping() : isChecked=false")  Ready to Shipping
  .pre-order-task-bar
    .pre-order-search
      label(for="searchProduct").search-icon
        SearchMajor.icon-search
      .search-input-cover
        input(
id="searchProduct",
v-model="searchPreorder",
type="text",
placeholder="Search preorder by customerName").search-input
    .pre-order-sort
      .sort-by
        label( for="sort-by-list" ).title-sort-by Sort by
        select(id="sort-by-list" v-mode="sortType" ).sort-by-list
          option.sort-by-item(
            value=""
            hidden) Chose the type
          option(value="newest").sort-by-item Newest first
          option(value="oldest").sort-by-item Oldest first
          option(value="the most expensive").sort-by-item The most expensive first
          option(value="cheapest").sort-by-item Cheapest first
  .pre-order-list
    table.pre-order-table.overflow-column.separate-border
      thead
        tr.table-bar
          th(colspan="1").pre-check.pre-header-item
            label( for="all").pre-check-cover
              input(
  v-model="isCheckedAll",
  type="checkbox",
  @change="handleToggleCheckAll").pre-check-box#pre-check-all
          th(colspan="1").pre-reference.pre-header-item Reference#
          th(colspan="1").pre-customer.pre-header-item Customer
          th(colspan="1").pro-status.pro-header-item
            div.status-cover
              span Status
              InfoMinor.status-icon
          th(colspan="1").pre-date.pre-header-item Date
          th(colspan="1").pre-quantity.pre-header-item Quantity
          th(colspan="1").pre-total.pre-header-item Total
      tbody
        tr.table-list(v-for="preOrder in preOrders" :key="preOrder.id")
          td(colspan="1").pre-check.pre-item
            label( for="all").pre-check-box
              input(
  :id="preOrder.id",
  :ref="checkItem",
  v-model="preOrderCheck",
  :value="preOrder.id",
  type="checkbox",
  @change="handleCheckbox",).pre-check-box
          td.product-refer.pre-item
            ul.refer-list
              //- li.refer-image-cover
              //-   img(:src="preOrder.variant.image_src!== 'no_image'? preOrder.variant.image_src : 'https://static.vecteezy.com/system/resources/thumbnails/008/015/799/small/illustration-of-no-image-available-icon-template-for-no-image-or-picture-coming-soon-free-vector.jpg' ").div-image
              li.refer-name
                span.refer-type {{ preOrder.variant.title_var }}
                span.refer-price {{ preOrder.variant.price }}$
          td.product-customer.pre-item
            router-link(to="#")
              ul
                li.customer-name {{ preOrder.customer.name }}
                li.customer-email {{ preOrder.customer.email }} - {{ preOder.customer.phone }}
                li.customer-location {{ preOrder.customer.address }}
          td.pre-item
            span(:class="product.status=== 1 ? 'active' : 'inactive' ") {{ product.status=== 1 ? 'active' : 'inactive' }}
          td.product-date.pre-item {{ preOrder.created_at }}
          td.product-quantity.pre-item {{ preOrder.quantity }}
          td.product-total.pre-item {{ preOrder.total }}$
</template>

<script setup>
import InfoMinor from '@icons/InfoMinor.svg';
import SearchMajor from '@icons/SearchMajor.svg';
import { useRouter } from 'vue-router';
import {
  onMounted, ref, inject, watch,
} from 'vue';

const axios = inject('axios');
const router = useRouter();
const isSuccess = ref(false);
const errors = ref({});
const preOrderCheck = ref([]);
const arrayId = ref([]);
const isCheckedAll = ref(false);
const preOrders = ref([]);
const isChecked = ref(false);
const searchPreorder = ref('');
const sortType = ref('');

const fetchPreorder = newValue => {
  if (newValue) {
    axios.get(`/preorders/${newValue}`)
      .then(response => {
        preOrders.value = response;
        preOrders.value.forEach((element, index) => {
          preOrders.value[index].total = element.variants.price * element.quantity;
        });
        arrayId.value = response.map(element => element.id);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    axios.get('/preorders')
      .then(response => {
        preOrders.value = response;
        preOrders.value.forEach((element, index) => {
          preOrders.value[index].total = element.variants.price * element.quantity;
        });
        arrayId.value = response.map(element => element.id);
      })
      .catch(error => {
        console.log(error);
      });
  }

};

const handleToggleCheckAll = e => {
  if (isCheckedAll.value) {
    preOrderCheck.value = arrayId.value;
    isChecked.value = true;
  } else {
    preOrderCheck.value = [];
    isChecked.value = false;
  }
};

const handleCheckbox = e => {
  if (preOrderCheck.value.length === arrayId.value.length) {
    isCheckedAll.value = true;
    isChecked.value = true;
  } else if (preOrderCheck.value.length >0) {
    isChecked.value = true;
    isCheckedAll.value = false;
  } else {
    isCheckedAll.value = false;
    isChecked.value = false;
  }
};

let handler = null;

watch(searchPreorder, (newValue, oldValue) => {
  if (newValue === '') {
    clearTimeout(handler);
    fetchPreorder();
  } else {
    clearTimeout(handler);

    handler = setTimeout(() => {
      fetchPreorder(newValue);
    }, 500);
  }
});

watch(sortType.value, (newValue, oldValue) => {
  switch (newValue) {
    case 'newest':
      preOrders.value.sort((a, b) => {
        const x = a.created_at;
        const y = b.created_at;

        if (x>y) {
          return 1;
        }

        if (x<y) {
          return -1;
        }

        return 0;
      });
      arrayId.value = preOrders.value.map(element => element.id);
      break;
    case 'oldest':
      preOrders.value.sort((a, b) => {
        const x = a.created_at;
        const y = b.created_at;

        if (x>y) {
          return -1;
        }

        if (x<y) {
          return 1;
        }

        return 0;
      });
      arrayId.value = preOrders.value.map(element => element.id);
      break;
    case 'the most expensive':
      preOrders.value.sort((a, b) => {
        const x = a.total;
        const y = b.total;

        if (x>y) {
          return -1;
        }

        if (x<y) {
          return 1;
        }

        return 0;
      });
      arrayId.value = preOrders.value.map(element => element.id);
      break;
    case 'cheapest':
      preOrders.value.sort((a, b) => {
        const x = a.total;
        const y = b.total;

        if (x>y) {
          return 1;
        }

        if (x<y) {
          return -1;
        }

        return 0;
      });
      arrayId.value = preOrders.value.map(element => element.id);
      break;
    default:
      break;
  }
});

onMounted(() => {
  axios.get('/preorders')
    .then(response => {
      preOrders.value = response;
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      preOrders.value.forEach((element, index) => {
        preOrders.value[index].total = parseFloat(element.variants.price) * element.quantity;
      });

      const createAt = new Date(response.created_at);

      preOrders.value.created_at = createAt.toLocaleDateString('en-US', options);
      console.log(preOrders.value);
      arrayId.value = response.map(element => element.id);
    })
    .catch(error => {
      console.log(error);
    });
});

const handelShipping= () => {
  console.log(preOrderCheck.value);
  axios.post('preorder/shipping', preOrderCheck.value)
    .then(response => {
      console.log(response);
      isSuccess.value = true;
      setTimeout(() => {
        isSuccess.value = false;
      }, 2500);
    })
    .catch(error => {
      console.log(error);
    });
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
    align-items: center;
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
        display: block;
        .icon-search{
          display: block;
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
    .pre-order-table{
      display: block;
      overflow-x: auto;
      width: 100%;
      font-size: 1rem;
      min-height: 100px;
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
          .refer-list{
            padding: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            min-width: 200px;
            .refer-image-cover{
                display: block;
                .div-image{
                  height: 60px;
                  border: 1px solid $border-color;
                  object-fit: cover;
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
