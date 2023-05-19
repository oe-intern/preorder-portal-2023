import { defineStore } from 'pinia';
import { AUTH_STATUS } from '@/configs';
import axios from '../bootstrap/api-interceptor';

interface IAuthState {
  status: string;
  token: string;
}

const defaultState: IAuthState = {
  status: AUTH_STATUS.initial,
  token: '',
};

export const useAuthStore = defineStore({
  id: 'auth',

  state: () =>

    defaultState,

  getters: {},

  actions: {
    loadedToken(token: any) {
      this.status = AUTH_STATUS.loading;
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      if (token) {
        this.status = AUTH_STATUS.success;
      }
    },
  },
});
