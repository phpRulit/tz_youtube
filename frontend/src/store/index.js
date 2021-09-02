import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: null,
    categories: null
  },
  getters: {
    videos: state => state.videos,
    categories: state => state.categories,
  },
  mutations: {
    setVideos(state, data) {
      state.videos = data;
    },
    setCategories(state, data) {
      state.categories = data;
    },
  },
  actions: {
    getVideos({commit}, details) {
      return axios.get('/youtube/get-videos', {
        params: {
          max: details.max,
          category: details.category,
          search: details.search,
          page: details.page,
        }})
          .then(({data}) => {
            commit('setVideos',data)
          })
    },
    async getCategories({commit}) {
      return await axios.get('/youtube/get-categories')
          .then(({data}) => {
            commit('setCategories',data)
          })
    }
  },
  modules: {
  }
})

