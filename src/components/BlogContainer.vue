<template>
  <v-container>
    <template>
    <h2>Hy {{this.userEmail}}</h2>
      <div class="parent-container" v-for="(blog, index) in blogData" :key="blog._id">
        <div class="author_image">
         <img :src='blog.thumbnail' />
          <!-- <img src="https://i.picsum.photos/id/1023/3955/2094.jpg?hmac=AW_7mARdoPWuI7sr6SG8t-2fScyyewuNscwMWtQRawU" /> -->
        </div>
        <div class="content">
          <h1>{{ blog.title }}</h1>
          <h4>{{ blog.author }}</h4>
          <div class="description">
            <span> {{ blog.description }}</span>
          </div>
          <div class='button_group'>
            <button class="primary" @click="EditBlog(blog._id)">Edit</button>
            <button class="primary" @click="DeleteBlog(blog._id)">Delete</button>
          </div>
        </div>
      </div>
    </template>
  </v-container>
</template>

<script>
import axios from "axios";
import http from "../service/httpService";
export default {
  name: "BlogContainer",
  data() {
    return {
      blogData: [],
      userEmail:''
    };
  },
  mounted() {
    http.get("/api/blog").then((result) => {
      this.blogData = result.data.data;
    });
    http.get('/auth/profile').then(user=>{ this.userEmail = user.data.data.email }).catch((err)=>alert(err))
    if(!localStorage.getItem('token')) this.$router.push("/signin")
  },
  computed: {
    
  },
  methods: {
    EditBlog(id) {
      this.$router.push({
        path: "/create",
        query: { id },
      });
    },
    async DeleteBlog(id) {
      if (confirm("Do you want to delete this blog ?")) {
        try {
          const DeleteResult = await http.delete(`/api/blog/${id}`);
          if (DeleteResult && DeleteResult.data.success) {
            const result = await http.get("/api/blog");
            this.blogData = result.data.data;
          }
        } catch (err) {
          console.log("err====>", err);
        }
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.primary {
  width: 30%;
  padding:5px;
  border-radius:5px;
  float: right;
  color: white !important;
  background: #4040d7 !important;
}
h2{
  text-align:left
}
td > span {
  cursor: pointer;
}
.parent-container {
  width: 850px;
  height: 300px;
  box-shadow: 1px 1px 10px 1px;
  display: flex;
  border-radius: 10px;
  padding: 30px 30px 30px 0px;
  margin: 30px 0px;
  /* animation-name: example1; */
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
.author_image {
  width: 300px;
  /* position: relative;
  left: -140px; */
  /* transform: translate(-95px, 20px); */
}
.author_image img {
  width: 100%;
  height: 100%;
  /* border-radius: 50%; */
  
}
.parent-container:hover{
  /* animation-name: example1; */
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes example {
  0%   {width: 70% }
  25%  {width: 80% }
  50%  {width: 90% }
  100% {width: 100%}
}
@keyframes example1 {
  0%   {width: 400px;opacity:0}
  25%  {width: 550px;opacity:0.1}
  50%  {width: 700px;opacity:0.5}
  100% {width: 850px;opacity:1}
}
.content {
  width: 60%;
  height: 100%;
}
.content>h1{
  text-transform: uppercase;
  color:#4040d7 ;
}
.description {
  margin: 30px 30px;
  height: 40%;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
.description span {
  display: inline-block;
  font-size:13px;
}
.button_group {
  display: flex;
  justify-content: space-around;
}
</style>
