import { createRouter, createWebHistory } from 'vue-router';
import { AppLayout } from '@/components';
import {
  HomeView, SettingView, PreOrderView, ProductsView, ProductDetailsView, AddPreProductView,
} from '@/views';

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/pre-order',
        name: 'pre-order',
        component: PreOrderView,
      },
      {
        path: '/products',
        name: 'products',
        component: ProductsView,
      },
      {
        path: '/setting',
        name: 'setting',
        component: SettingView,
      },
      {
        path: '/product/:id',
        name: 'detailsProduct',
        component: ProductDetailsView,
        props: true,
      },
      {
        path: '/add-pre-product',
        name: 'addPreProduct',
        component: AddPreProductView,
      },
    ],
  },
];

const routerInitialConfig = {
  history: createWebHistory(),
  routes,
};
const router = createRouter(routerInitialConfig);

export default router;
