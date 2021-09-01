import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    videos: null,
  },
  getters: {
    videos: state => state.videos,
  },
  mutations: {
    setVideos(state, data) {
      state.videos = data;
    }
  },
  actions: {
    getVideos({commit}, details) {
      return axios.get('/youtube/get-videos', {params: {search: details.search}})
          .then(({data}) => {
            commit('setVideos',data)
          })
    }
  },
  modules: {
  }
})
