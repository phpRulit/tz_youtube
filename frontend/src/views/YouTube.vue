<template>
  <div class="border">
    <div class="col-md-12" v-if="!video">
      <div class="col-md-12 mt-3 mb-3 row">
        <div class="col-md-10">
          <input type="text" v-model="details.search" placeholder="Введите запрос..." v-on:keyup.enter="getList" class="form-control">
        </div>
        <div class="col-md-2">
          <button class="btn btn-secondary w-100" @click="clear">Очистить</button>
        </div>
      </div>
      <ul class="list-unstyled video-list-thumbs row" v-if="!loading">
        <li v-for="video in videos.items" class="col-lg-3 col-sm-4 col-xs-6 mt-2">
        <span class="spanHover" @click="getVideo(video)">
          <img :src="video.snippet.thumbnails.medium.url" :alt="video.snippet.title" />
        </span>
        </li>
      </ul>
    </div>
    <div  v-else>
      <span class="spanHover overVideoClose" @click="getVideo(null)">Закрыть</span>
      <p class="overVideoDescription">
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
      details: {
        search: '',
      },
      loading: false,
      video: null
    }
  },
  methods: {
    ...mapActions(["getVideos"]),
    getList() {
      this.loading = true;
      this.getVideos(this.details)
      .then(() => {
        this.videos = this.$store.getters["videos"];
        this.loading = false;
      })
    },
    clear() {
      this.details.search = '';
      this.getList();
    },
    getVideo(video) {
      this.video = video;
    },
  },
  created() {
    this.getList();
  }
}
</script>

<style>
body {
  margin: 0;
}
.overVideoClose, .overVideoDescription, .video {
  position:fixed;
}
.overVideoClose, .overVideoDescription {
  padding: 10px;
  background-color: black;
  color: white;
  z-index:9999
}
.overVideoClose {
  top: 30px;
  right: 50%;
}
.overVideoDescription {
  bottom: 50px;
  left: 20px;
  right: 20px;
}
.video {
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
</style>