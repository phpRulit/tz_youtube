<template>
  <div>
    <div class="col-md-12 pr-0" v-if="!video">
      <div class="col-md-12 mt-3 mb-3 pr-0 row">
        <div class="col-lg-2 col-md-4 col-sm-5 col-xs-12 mb-2">
          <select class="form-control" v-model="details.category" @change="getList(false, true)" id="">
            <option :value="null">Выберите категорию...</option>
            <option v-if="categories.length > 0" :value="cat.id" v-for="cat in categories">{{cat.snippet.title}}</option>
          </select>
        </div>
        <div class="col-lg-9 col-md-6 col-sm-5 col-xs-12 mb-2">
          <input type="text" v-model="details.search" placeholder="Введите запрос..." v-on:keyup.enter="getList(false, true)" class="form-control">
        </div>
        <div class="col-lg-1 col-md-2 col-sm-2 col-xs-12">
          <button class="btn btn-secondary w-100" :disabled="!details.category && details.search === ''" @click="clear">X</button>
        </div>
      </div>
      <ul class="list-unstyled video-list-thumbs row text-center pr-3" v-if="!loading">
        <li v-for="video in videos" class="col-lg-3 col-sm-4 col-xs-6 mt-2">
        <span>
          <img class="play spanHover" @click="getVideo(video)" :src="require('@/assets/play2.png')" alt="play" />
          <img :src="video.snippet.thumbnails.medium.url" :alt="video.snippet.title" />
        </span>
        </li>
      </ul>
      <div class="col-md-12 text-center p-3" v-if="!loading">
        <span class="text-gray spanHover" v-if="this.videos.length > 0 && this.videos.length%this.details.max === 0" @click="getList(true)">Подгрузить ещё</span>
        <span class="text-gray" v-else-if="this.videos.length === 0">Ничего не нашлось</span>
      </div>
    </div>
    <div  v-else>
      <span class="spanHover overVideoClose" @click="getVideo(null)">Закрыть</span>
      <p class="overVideoTitle">
        <span>{{video.snippet.title}}</span><br>
        <span class="w-100 small">{{video.snippet.description.length > 700 ? video.snippet.description.slice(0, 697) + '...' : video.snippet.description}}</span>
      </p>
      <iframe allowfullscreen="true" class="video" :src="'https://www.youtube.com/embed/' + video.id" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data () {
    return {
      videos: [],
      categories: [],
      details: {
        max: 16, //сколько на странице
        category: null,
        search: '',
        page: null,
      },
      loading: false,
      video: null
    }
  },
  methods: {
    ...mapActions(["getVideos"]),
    getList(next, nullVideo) {
      this.loading = !next;
      if (nullVideo) {
        this.videos = [];
        this.details.page = null;
      }
      this.getVideos(this.details)
          .then(() => {
            let nextVideos = this.$store.getters["videos"];
            this.videos = this.videos.concat(nextVideos.items);
            this.details.page = nextVideos.nextPageToken;
            this.loading = false;
          })
    },
    ...mapActions(["getCategories"]),
    getCats() {
      this.getCategories()
          .then(() => {
            this.categories = this.$store.getters["categories"];
          })
    },
    clear() {
      this.details.category = null;
      this.details.search = '';
      this.videos = [];
      this.details.page = null;
      this.getList();
    },
    getVideo(video) {
      this.video = video;
    },
  },
  created() {
    this.getList();
    this.getCats();
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
.play {
  position: absolute;
  top: 55px;
  left:150px;
  z-index: 9999
}
.overVideoClose {
  position:fixed;
  padding: 10px;
  background-color: black;
  color: white;
  top: 30px;
  right: 47.5%;
  z-index:9999
}
.overVideoTitle {
  position:fixed;
  padding: 10px;
  background-color: black;
  color: white;
  bottom: 50px;
  left: 20px;
  right: 20px;
  z-index:9999
}
.video {
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  width:100%;
  height:100%;
  border:none;
  margin:0;
  padding:0;
  overflow:hidden;
  z-index:9990;
}
.spanHover:hover {
  opacity: 0.7;
  cursor: pointer;
}
@media (max-width: 720px) {
  .overVideoClose {
    right: 44%;
  }
}
@media (max-width: 576px) {
  .play {
    left:205px;
  }
}
</style>