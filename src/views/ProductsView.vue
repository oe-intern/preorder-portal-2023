<!-- eslint-disable max-len -->
<template lang="pug">
.pro-order-page.col.container
  //- success message
  .success-cover(v-if="isSuccess" :class="{'show-message': isSuccess}")
    h1.success-text You are Successfully
  .header-pro-order
    .title-header
      span Product Preorder List
    .content-header
      button.btn-fulfill(:class="{'no-blur' : isChecked}" @click="isChecked? fulFill() : isChecked=false" ) Ready to FulFill
      button(@click="handelAddNewProduct").btn-fulfill.no-blur Add new product
  .error-message(v-if="notificationMessage.error") {{ notificationMessage.error }}
  .pro-order-task-bar
    .pro-order-search
      label(for="searchProduct").search-icon
        SearchMajor.icon-search
      .search-input-cover
        input(
  id="searchProduct",
  v-model="searchProduct"
  type="text",
  placeholder="Filter Products By Name").search-input
    .pro-order-sort
      .sort-by
        label( for="sort-by-list" ).title-sort-by Sort by
        select.sort-by-list(
          id="sort-by-list"
          v-model="searchType"
          name="typeSort" )
          option.sort-by-item(
            value=""
            hidden) Choose the type
          option(value="newest").sort-by-item Newest
          option(value="oldest").sort-by-item Oldest
          option(value="abc").sort-by-item Alphabet
          option(value="cba").sort-by-item Reversed alphabet
          option(value="the most expensive").sort-by-item The most expensive
          option(value="cheapest").sort-by-item Cheapest
      .sort-by
        label( for="status" ).title-sort-by Status is
        select(id="status" v-model="searchStatus" ).sort-by-list
          option(value="all").sort-by-item ALL
          option(value="preorder").sort-by-item Active
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
          th(colspan="1").pro-vendor.pro-header-item Vendor
          th(colspan="1").pro-header-item.pro-price Price
          th(colspan="1").pro-customer.pro-header-item Date Start
          th(colspan="1").pro-customer.pro-header-item Date End
          th(colspan="1").pro-date.pro-header-item Preorder Number
          th(colspan="1").pro-color.pro-header-item Sell Number
      tbody
        tr(
v-for="(product ,index) in products"
:key="index"
).table-list
          td(colspan="1").pro-check.pro-item
            label( :for="product.id").pro-check-cover
              input(
  v-show="product.status===1",
  :id="product.id",
  :ref="checkItem",
  v-model="productCheck",
  type="checkbox",
  :value="product.id",
  @change="handleCheckbox"
  ).pro-check-box.pro-check-item
          td.product-refer.pro-item
            div(style="margin-left: 24px;")
              ul.refer-list(@click.prevent="showProduct(product.id)")
                li.refer-image-cover
                  img(:src="product.image_src!== 'no_image' ?product.image_src : 'https://static.vecteezy.com/system/resources/thumbnails/008/015/799/small/illustration-of-no-image-available-icon-template-for-no-image-or-picture-coming-soon-free-vector.jpg'").product-photo
                li.refer-name
                  div.product-name {{product.title}}
          td.pro-item
            span(:class="product.status=== 1 ? 'active' : 'inactive' ") {{ product.status=== 1 ? 'active' : 'inactive' }}
          td.product-vendor.pro-item {{ product.vendor }}
          td.pro-item.product-price {{ product.price }}$
          td.product-date.pro-item
            span.date-from {{ product.date_start ? product.date_start :'' }}
          td.product-date.pro-item
            span.date-to {{ product.date_end ? product.date_end : '' }}
          td.product-shell.pro-item
            .shell-header
              span.shell-title {{ product.stock!==0 ? Number((product.preorder /product.stock * 100).toFixed(2)) : 0 }} %
              span.shell-text ( {{ product.preorder }} / {{ product.stock }} units)
            progress(
              max="100"
              :value="product.stock!==0 ? product.preorder / product.stock * 100 : 0" ).shell-progress
          td.product-shell.pro-item
            .shell-header
              span.shell-title {{ product.stock!==0 ? Number((product.sold /product.stock * 100).toFixed(2)) : 0 }} %
              span.shell-text ( {{ product.sold }} / {{ product.stock }} units)
            progress(
              max="100"
              :value="product.stock!==0 ? product.sold / product.stock * 100 : 0" ).shell-progress
</template>

<script setup>

import { useRouter } from 'vue-router';
import InfoMinor from '@icons/InfoMinor.svg';
import SearchMajor from '@icons/SearchMajor.svg';
import {
  inject, ref, onMounted, watch,
} from 'vue';
import { elements } from 'chart.js';

const productCheck = ref([]);
const router = useRouter();

const notificationMessage= ref({});

const searchStatus = ref('all');
const searchType = ref('');

const isSuccess = ref(false);

const isCheckedAll = ref(false);

const axios = inject('axios');

const products = ref(null);

const arrayId = ref([]);

const variants = ref([]);

const variantsArray = ref([]);

const searchProduct = ref('');
const isChecked = ref(false);

const fetchDataSearch = async newValue => {
  await axios.get(`/products/search/name/${newValue}`)
    .then(response => {
      products.value = response;
      console.log(response);
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      arrayId.value = response.map((element, index) => {
        if (element.date_start && element.date_end) {
          const startDateObject = new Date(element.date_start);
          const endDateObject = new Date(element.date_end);

          products.value[index].date_start = startDateObject.toLocaleDateString('en-US', options);
          products.value[index].date_end = endDateObject.toLocaleDateString('en-US', options);
        }

        products.value[index].stock = 0;
        products.value[index].preorder = 0;
        products.value[index].sold = 0;

        return element.id;
      });
    })
    .catch(error => {
      console.log(error);
    });
  //get all variants
  await axios.get('/variants')
    .then(response => {
      variants.value = response;
    })
    .catch(error => {
      console.log(error);
    });
  //sold,pre,sold for product
  products.value.forEach(product => {
    const array = variants.value.filter(variant => variant.product_id === product.id);

    product.variants = array;
    array.forEach(variant => {
      product.stock += variant.stock + variant.preorder + variant.sold;
      product.preorder += variant.preorder;
      product.sold += variant.sold;
    });
    product.price = array[0].price;
  });
};

const fetchAllInfoProduct = async () => {
  ///get all products
  await axios.get('/products')
    .then(response => {
      products.value = response;
      console.log(response);
      const options = {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      };

      products.value.sort((a, b) => {
        const titleA= a.date_start;
        const titleB= b.date_start;

        if (!titleA) {
          return 1;
        }

        if (!titleB) {
          return -1;
        }

        return 0;
      });

      arrayId.value = products.value.map((element, index) => {
        if (element.date_start && element.date_end) {
          const startDateObject = new Date(element.date_start);
          const endDateObject = new Date(element.date_end);

          products.value[index].date_start = startDateObject.toLocaleDateString('en-US', options);
          products.value[index].date_end = endDateObject.toLocaleDateString('en-US', options);
        }

        products.value[index].stock = 0;
        products.value[index].preorder = 0;
        products.value[index].sold = 0;

        return element.id;
      });
    })
    .catch(
      error => {
        console.log(error);
      },
    );
  //get all variants
  await axios.get('/variants')
    .then(response => {
      variants.value = response;
    })
    .catch(error => {
      console.log(error);
    });
  //sold,pre,sold for product
  products.value.forEach(product => {
    const array = variants.value.filter(variant => variant.product_id === product.id);

    product.variants = array;
    array.forEach(variant => {
      product.stock += variant.stock + variant.preorder + variant.sold;
      product.preorder += variant.preorder;
      product.sold += variant.sold;
    });
    product.price = array[0].price;
  });
};

const sortByType = newValue => {
  switch (newValue) {
    case 'newest':
      products.value.sort((a, b) => {
        const titleA= a.date_start;
        const titleB= b.date_start;

        if (!titleA) {
          return 1;
        }

        if (!titleB) {
          return -1;
        }

        if (titleA === titleB) {
          const dateEndA = a.date_end;
          const dateEndB = b.date_end;

          if (dateEndA > dateEndB) {
            return 1;
          }

          if (dateEndA < dateEndB) {
            return -1;
          }

          return 0;
        }

        if (titleA > titleB) {
          return 1;
        }

        return -1;

      });
      arrayId.value = products.value.map(item => item.id);
      break;
    case 'oldest':
      products.value.sort((a, b) => {
        const titleA= a.date_start;
        const titleB= b.date_start;

        if (!titleA) {
          return 1;
        }

        if (!titleB) {
          return -1;
        }

        if (titleA === titleB) {
          const dateEndA = a.date_end;
          const dateEndB = b.date_end;

          if (dateEndA > dateEndB) {
            return -1;
          }

          if (dateEndA < dateEndB) {
            return 1;
          }

          return 0;
        }

        if (titleA > titleB) {
          return -1;
        }

        return 1;
      });
      arrayId.value = products.value.map(item => item.id);
      break;
    case 'the most expensive':
      products.value.sort((a, b) => {
        const titleA= parseFloat(a.price);
        const titleB= parseFloat(b.price);

        if (titleA > titleB) {
          return -1;
        }

        if (titleA < titleB) {
          return 1;
        }

        return 0;
      });
      arrayId.value = products.value.map(item => item.id);
      break;
    case 'cheapest':
      products.value.sort((a, b) => {
        const titleA= parseFloat(a.price);
        const titleB= parseFloat(b.price);

        if (titleA > titleB) {
          return 1;
        }

        if (titleA < titleB) {
          return -1;
        }

        return 0;
      });
      arrayId.value = products.value.map(item => item.id);
      break;
    case 'cba':
      products.value.sort((a, b) => {
        const titleA= a.title.toUpperCase();
        const titleB= b.title.toUpperCase();

        if (titleA > titleB) {
          return -1;
        }

        if (titleA < titleB) {
          return 1;
        }

        return 0;
      });
      arrayId.value = products.value.map(item => item.id);
      break;
    case 'abc':
      products.value.sort((a, b) => {
        const titleA= a.title.toUpperCase();
        const titleB= b.title.toUpperCase();

        if (titleA > titleB) {
          return 1;
        }

        if (titleA < titleB) {
          return -1;
        }

        return 0;
      });
      arrayId.value = products.value.map(item => item.id);
      break;
    default:
      break;
  }
};
//function run when call
const handelAddNewProduct = () => {
  router.push({
    name: 'addPreProduct',
    params: {},
  });
};

const handleToggleCheckAll = e => {
  const isActive = products.value.find(element => element.status === 1);

  if (isCheckedAll.value && isActive) {
    productCheck.value = arrayId.value;
    isChecked.value = true;
  } else {
    productCheck.value = [];
    isChecked.value = false;
  }
};

const handleCheckbox = e => {
  if (productCheck.value.length === arrayId.value.length) {
    isCheckedAll.value = true;
    isChecked.value = true;
  } else if (productCheck.value.length >0) {
    isChecked.value = true;
    isCheckedAll.value = false;
  } else {
    isCheckedAll.value = false;
    isChecked.value = false;
  }
};

const showProduct = id => {
  router.push({
    name: 'detailsProduct',
    params: { id: id },
  });
};

watch(searchStatus, async (newValue, oldValue) => {
  switch (newValue) {
    case 'all':
      if (!searchProduct.value.trim()) {
        await fetchAllInfoProduct();
        sortByType(searchType.value);
      } else {
        await fetchDataSearch(searchProduct.value);
        sortByType(searchType.value);
      }

      break;
    case 'preorder':
      products.value = products.value.filter(elements => elements.status===1);
      sortByType(searchType.value);
      break;
    default:
      break;
  }
});

watch(searchType, (newValue, oldValue) => {
  sortByType(newValue);
});

let handler = null;

watch(searchProduct, async (newValue, oldValue) => {
  if (!newValue.trim()) {
    clearTimeout(handler);
    await fetchAllInfoProduct();
    searchStatus.value='all';
    sortByType(searchType.value);
  } else {
    clearTimeout(handler);
    handler = setTimeout(async () => {
      await fetchDataSearch(newValue);
      searchStatus.value='all';
      sortByType(searchType.value);
    }, 500);
  }
});

//when component mount function is call
onMounted(async () => {
  await fetchAllInfoProduct();
});

const fulFill = () => {

  const arrayVariants = products.value.map(product => {
    if (productCheck.value.includes(product.id) && product.status === 1) {
      return product.id;
    }

    return null;
  });

  const arrayFilter = arrayVariants.filter(element => element!==null);

  // arrayFilter.forEach((variants, index) => {
  //   arrayFilter[index] = variants.map(variant => {
  //     return {
  //       id: variant.id,
  //       stock: variant.stock,
  //     };
  //   });
  // });

  if (arrayFilter.length >0) {
    notificationMessage.value.error=null;

    const arraySubmit = arrayFilter.flat();

    axios.post('/products/fulfill', arraySubmit)
      .then(async () => {
        isSuccess.value = true;
        await fetchAllInfoProduct();
        productCheck.value = [];
        isChecked.value = false;
        isCheckedAll.value = false;
        searchProduct.value = '';
        searchStatus.value = 'all';
        searchType.value = '';
        setTimeout(() => {
          isSuccess.value = false;
        }, 2500);
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    notificationMessage.value.error = 'Can\'t find selected product with status as active ';
  }
};

</script>

<style scope lang='scss'>
  @import '@/scss/variables.scss';
  .product-name{
    width: 150px;
    overflow-x: hidden;
  }
  .customer-location{
    max-width: 200px;
    word-wrap: break-word;
  }
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
          margin-right: 16px;
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
      .pro-order-table{
        display: block;
        overflow-x: auto;
        scroll-padding-bottom: 100vh; /* Chiều cao của màn hình */
        scroll-snap-type: x mandatory;
        scroll-snap-align: start;
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
                .product-photo{
                  height: 70px;
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
          .product-shell{
            width: 150px;
            .shell-header{
              text-align: left;
              padding-left: 8px;
            }
            .shell-progress{
                width: 140px;
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
