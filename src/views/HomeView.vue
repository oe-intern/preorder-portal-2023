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
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
          .chart-item
            .chart-item-text
              span 19 Apr
              span.item-text Sales: &eth;0
              //- overview-2
      .overview-item.col-12.col-lg-3
        .sale-title
          span.title-text Open Pre-order Products
          h1.title-amount.text-product 0
    .home-analytics
      canvas( ref="chart", style="width: 100%;height: 400px;" ).chart-home-analytics
    .home-summary.col.row
      .save-th-cover.col-12.col-xl-6
        .sale-th
          .sale-th-title
            span Top Pre-order product Seller
          ul.sale-list
            li.sale-item-product
              .sale-cover-photo
                image(
  src="https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043",
                  alt="Product").image-sale
              .content-sale
                .content-sale-text
                  span.name-product-sale Camera
                  .sale-precess-text
                    span.number-sale 0.00%
                    span.units-sale (0/2710 units)
                .sale-precess-bar
                  progress( max="100" value="50").progress-bar
            li.sale-item-product
              .sale-cover-photo
                image(
  src="https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043",
                  alt="Product").image-sale
              .content-sale
                .content-sale-text
                  span.name-product-sale Camera
                  .sale-precess-text
                    span.number-sale 0.00%
                    span.units-sale (0/2710 units)
                .sale-precess-bar
                  progress( max="100" value="50").progress-bar
      .sale-th-cover.col-12.col-xl-6
        .sale-th
          .sale-th-title
            span Low Pre-order product Seller
          ul.sale-list
            li.sale-item-product
              .sale-cover-photo
                image(
  src="https://cdn.shopify.com/s/files/1/0070/7032/files/image5_4578a9e6-2eff-4a5a-8d8c-9292252ec848.jpg?v=1620247043",
                  alt="Product").image-sale
              .content-sale
                .content-sale-text
                  span.name-product-sale Camera
                  .sale-precess-text
                    span.number-sale 0.00%
                    span.units-sale (0/2710 units)
                .sale-precess-bar
                  progress( max="100" value="50").progress-bar

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const chart = ref(null);

onMounted(() => {
  const ctx = chart.value.getContext('2d');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Web', 'Thurs', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Number of products sold',
          data: [65, 59, 80, 81, 56, 55, 40, 0],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
      ],
    },
    options: { maintainAspectRatio: false },
  });
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
            &::after{
              content:'';
              position: absolute;
              display: none;
              left: 50%;
              transform: translateX(-50%);
              width: 6px;
              height: 6px;
              background-color: brown;
              border-radius: 50%;
              bottom:-2px;
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

            &:hover::after{
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
          .sale-cover-photo{
            width: 50px;
            height: 50px;
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

              }
              .sale-precess-text{
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
