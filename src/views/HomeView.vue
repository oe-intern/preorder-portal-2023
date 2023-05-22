<!-- eslint-disable max-len -->
<template lang="pug">
.container.col.home-page
  .home-header
    span Home
  .home-content
    .home-overview.flex.row
      .overview-item.col-12.col-lg-5
        .sale-title
          span.title-text Sale in last 7 days
          h1.title-amount &eth;0
        .sale-chart
          .chart-item(v-for="(data,index) in dataChart" :key="index")
            .chart-node(:style="{bottom: `${data/maxChart * 100}%`}")
            .chart-item-text
              span {{ dataDayChart[index] }}
              span.item-text Sales: {{ data }}$
              //- overview-2
      .overview-item.col-12.col-lg-3
        .sale-title
          span.title-text Open Pre-order Products
          h1.title-amount.text-product {{ numberProduct }}
    .home-analytics
      canvas( ref="chart", style="width: 100%;height: 400px;" ).chart-home-analytics
    .home-summary.col.row
      .save-th-cover.col-12.col-xl-6
        .sale-th(v-if="bestSellerProducts[0]")
          .sale-th-title
            span Top Pre-order product Seller
          ul.sale-list
            li.sale-item-product(
              v-for="bestSellerProduct in bestSellerProducts"
              :key="bestSellerProduct.id"
              @click.prevent="showProduct(bestSellerProduct.id)")
              .sale-cover-photo
                img(
                  :src="bestSellerProduct.image_src !== 'no_image' ? bestSellerProduct.image_src : 'https://static.vecteezy.com/system/resources/thumbnails/008/015/799/small/illustration-of-no-image-available-icon-template-for-no-image-or-picture-coming-soon-free-vector.jpg'"
                  :alt="bestSellerProduct.title").image-sale
              .content-sale
                .content-sale-text
                  span.name-product-sale {{ bestSellerProduct.title }}
                  .sale-precess-text
                    span.number-sale {{ bestSellerProduct.stock ? bestSellerProduct.preorder / bestSellerProduct.stock *100 : 0 }}%
                    span.units-sale ({{ bestSellerProduct.preorder }} / {{ bestSellerProduct.stock }} units)
                .sale-precess-bar
                  progress( max="100" value="50").progress-bar
      .sale-th-cover.col-12.col-xl-6
        .sale-th(v-if="worstSellerProducts[0]")
          .sale-th-title
            span Low Pre-order product Seller
          ul.sale-list
            li.sale-item-product(
              v-for="worstSellerProduct in worstSellerProducts"
              :key="worstSellerProduct.id"
              @click.prevent="showProduct(worstSellerProduct.id)" )
              .sale-cover-photo
                img(
                  :src="worstSellerProduct.image_src !== 'no_image' ? worstSellerProduct.image_src : 'https://static.vecteezy.com/system/resources/thumbnails/008/015/799/small/illustration-of-no-image-available-icon-template-for-no-image-or-picture-coming-soon-free-vector.jpg'",
                  :alt="worstSellerProduct.title").image-sale
              .content-sale
                .content-sale-text
                  span.name-product-sale {{ worstSellerProduct.title }}
                  .sale-precess-text
                    span.number-sale {{ worstSellerProduct.stock ? worstSellerProduct.preorder / worstSellerProduct.stock : 0 }}%
                    span.units-sale ({{ worstSellerProduct.preorder }} / {{ worstSellerProduct.stock }} units)
                .sale-precess-bar
                  progress( max="100" value="50").progress-bar
</template>

<script setup>
import Chart, { elements } from 'chart.js/auto';
import { useRouter } from 'vue-router';
import {
  ref, onMounted, inject,
} from 'vue';

const axios = inject('axios');
const chart = ref(null);
const router = useRouter();
//get now date

const today = new Date();
const sevenDayAgo = new Date();

sevenDayAgo.setDate(today.getDate() - 6);
sevenDayAgo.setHours(0);
sevenDayAgo.setMinutes(0);
sevenDayAgo.setSeconds(0);
const numberProduct =ref(0);
const dataDayChart = [];
const dataChart = [0, 0, 0, 0, 0, 0, 0];
const maxChart = ref(0);

for (let i = 6; i >= 0; i-=1) {
  const date = new Date();

  date.setDate(date.getDate() - i);

  const formattedDate = date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  dataDayChart.push(formattedDate);
}

const bestSellerProducts = ref([]);
const worstSellerProducts = ref([]);
const preorders = ref([]);

const showProduct = id => {
  router.push({
    name: 'detailsProduct',
    params: { id: id },
  });
};

onMounted(async () => {
  const ctx = chart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dataDayChart,
      datasets: [
        {
          label: 'Number of products sold',
          data: dataChart,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    options: { maintainAspectRatio: false },
  });

  await axios.post('/products')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  axios.get('/products')
    .then(response => {
      numberProduct.value = response.filter(element => element.status === 1).length;
    })
    .catch(error => {
      console.log(error);
    });

  axios.get('/preorders')
    .then(response => {
      preorders.value = response;

      return response;
    })
    .then(response => {
      response.forEach(element => {
        if (element.create_at >= sevenDayAgo) {
          const disDay = element.create_at.getDate() - sevenDayAgo.getDate();

          switch (disDay) {
            case 0:
              dataChart[6]+=1;
              maxChart.value = Math.max(dataChart[6], maxChart);
              break;
            case 1:
              dataChart[5]+=1;
              maxChart.value = Math.max(dataChart[5], maxChart);
              break;
            case 2:
              dataChart[4]+=1;
              maxChart.value = Math.max(dataChart[4], maxChart);
              break;
            case 3:
              dataChart[3]+=1;
              maxChart.value = Math.max(dataChart[3], maxChart);
              break;
            case 4:
              dataChart[2]+=1;
              maxChart.value = Math.max(dataChart[2], maxChart);
              break;
            case 5:
              dataChart[1]+=1;
              maxChart.value = Math.max(dataChart[1], maxChart);
              break;
            case 6:
              dataChart[0]+=1;
              maxChart.value = Math.max(dataChart[0], maxChart);
              break;
            default:
              break;
          }
        }
      });
    })
    .catch(error => {
      console.log(error);
    });

  await axios.get('/products/bestseller')
    .then(response => {
      bestSellerProducts.value = response;
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });

  await axios.get('/products/worstseller')
    .then(response => {
      worstSellerProducts.value = response;
    })
    .catch(error => {
      console.log(error);
    });
  // solve stock, preorder and sold
  await Promise.all(
    bestSellerProducts.value.map(async (element, index) => {
      try {
        const response = await axios.get(`/products/variants/${element.id}`);

        bestSellerProducts.value[index].stock = 0;
        bestSellerProducts.value[index].preorder = 0;
        response.variants.forEach(element => {
          bestSellerProducts.value[index].stock += element.stock;
          bestSellerProducts.value[index].preorder += element.preorder;
        });
      } catch (error) {
        console.log(error);
      }
    }),
  );

  await Promise.all(
    worstSellerProducts.value.map(async (element, index) => {
      try {
        const response = await axios.get(`/products/variants/${element.id}`);

        worstSellerProducts.value[index].stock = 0;
        worstSellerProducts.value[index].preorder = 0;
        response.variants.forEach(element => {
          worstSellerProducts.value[index].stock += element.stock;
          worstSellerProducts.value[index].preorder += element.preorder;
        });

      } catch (error) {
        console.log(error);
      }
    }),
  );
});
</script>

<style lang="scss" scoped>
@import "@/scss/variables.scss";
.home-page {
  padding: 40px;
  .home-header {
    font-size: 2rem;
    font-weight: 600;
    color: $primary-color;
  }
  .home-content {
    .home-overview {
      margin-top: 24px;
      .overview-item {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border: 1px solid $border-color;
        border-radius: 7px;
        margin: 12px 20px 0;
        height: 120px;
        .sale-title {
          line-height: 1.5;
          .title-text {
            font-size: 0.875rem;
            font-weight: 500;
          }
          .title-amount {
            display: block;
            font-size: 2rem;
            text-decoration: underline;
            letter-spacing: 4px;
          }
          .title-amount.text-product{
            text-decoration: none;
          }
        }
        .sale-chart{
          padding: 0 4px;
          margin-left: 16px;
          flex: 1;
          height: calc(100% - 48px);
          display: flex;
          justify-content: space-between;
          position: relative;
          border-bottom: 1px solid aqua;
          .chart-item{
            position: relative;
            width:2px;
            height: 100%;
            background-color: transparent;
            &::before{
              content: "";
              position: absolute;
              left:-50%;
              transform: translateX(-50%);
              top:0;
              height: 100%;
              width: 20px;
            }
            .chart-node{
              position: absolute;
              display: none;
              left: 50%;
              transform: translateX(-50%);
              width: 6px;
              height: 6px;
              background-color: brown;
              border-radius: 50%;
              bottom:0;
            }
            &:nth-of-type(-n+4){
              .chart-item-text{
                left: 10px;
              }
            }
            &:nth-of-type(n+4){
              .chart-item-text{
                right:10px;
              }
            }
            &:hover{
              background-color: $border-color;
            }

            &:hover .chart-node{
              display: block;
            }
            &:hover .chart-item-text{
              display: flex;
            }
            .chart-item-text{
              background: white;
              display: none;
              flex-direction: column;
              height: 100%;
              min-width: 75px;
              justify-content: center;
              text-align: center ;
              position: absolute;
              border: 1px solid $border-color;
              &:hover{
                display: none;
              }
              .item-text{
                color: $primary-color;
                font-weight: 600;
              }
              span{
                display: inline-block;
                margin-top: 4px;
              }
            }
          }
        }
      }
    }
  }
  .home-analytics{
    margin: 40px 0;
  }
  .home-summary{
    .sale-th{
      margin-top: 12px;
      padding: 24px 16px 12px;
      border: 1px solid $border-color;
      border-radius: 15px;
      .sale-th-title{
        color: $dark-color;
        font-weight: bold;
        font-size: 1.2rem;
      }

      .sale-list{
        padding: 0;
        .sale-item-product{
          display: flex;
          border-top: 1px solid $border-color;
          padding-top:16px;
          padding-bottom: 8px;
          margin-top: 12px;
          &:hover{
            cursor: pointer;
            background-color: rgba($primary-color, 0.2);
          }
          .sale-cover-photo{
            width: 50px;
            height: 50px;
            margin: 0 8px;
            .image-sale{
              width:100%;
              height:100%;
              object-fit: cover;
            }
          }
          .content-sale{
            padding: 8px 12px;
            display: flex;
            flex-direction: column;
            flex: 1;
            .content-sale-text{
              display: flex;
              justify-content: space-between;
              text-decoration: underline;
              color: $primary-color;
              padding-bottom: 4px;
              font-size: 1.175rem;
              .name-product-sale{
                margin-right: 20px;
              }
              .sale-precess-text{
                min-width: 160px;
                text-align: center;
                .number-sale{

                }
                .units-sale{
                margin-left: 6px;
                }
              }
            }
            .sale-precess-bar{
              width: 100%;
              height: 16px;
              .progress-bar{
                width: 100%;
                height: 100%;
                border: 1px solid #ccc;
                background-color: #fff;
                border-radius: 15px;
                overflow: hidden;
              }
              .progress-bar::-webkit-progress-bar{
                background-color: #fff;
              }
              .progress-bar::-webkit-progress-value {
                background-color: $primary-color;
              }
              .progress-bar::-moz-progress-bar {
                background-color: $primary-color;
              }
            }
          }
        }
      }
    }
}
}
</style>
