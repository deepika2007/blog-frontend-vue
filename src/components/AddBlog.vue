<template>
  <!-- some code condensed for display reasons -->
  <v-container>
    <form>
      <v-text-field
        v-model="title"
        :error-messages="nameErrors"
        label="Title"
        required
        @input="$v.title.$touch()"
        @blur="$v.title.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="description"
        :error-messages="emailErrors"
        label="Description"
        required
        @input="$v.description.$touch()"
        @blur="$v.description.$touch()"
      ></v-text-field>
      <v-text-field
        v-model="author"
        :error-messages="authorErrors"
        label="Author"
        required
        @input="$v.author.$touch()"
        @blur="$v.author.$touch()"
      ></v-text-field>
      <v-file-input
          v-model="thumbnail"
          label="File input"
          outlined
          dense
        ></v-file-input>
      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> Cancel </v-btn>
    </form>
  </v-container>
</template>
<script>
import { required, maxLength, email } from "vuelidate/lib/validators";
import axios from "axios";
export default {
  name: "AddBlog",
  validations: {
    title: { required },
    description: { required },
    author: { required },
  },

  data: () => ({
    title: "",
    description: "",
    author: "",
    thumbnail:null,
    editId: null,
  }),
  mounted() {
     if(!localStorage.getItem('token')) this.$router.push("/signin")
    if (this.$route.query.id) {
      this.editId = this.$route.query.id;
      fetch(`http://localhost:8000/api/blog/${this.$route.query.id}`).then((data) => {
        data.json().then((result) => {
          console.log(result)
          if (result.success) {
            this.title = result.data.title;
            this.description = result.data.description;
            this.author = result.data.author;
          }
        });
      });
    }
  },
  computed: {
    nameErrors() {
      const errors = [];
      if (!this.$v.title.$dirty) return errors;
      !this.$v.title.required && errors.push("Title is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) return errors;
      !this.$v.description.required && errors.push("Description is required");
      return errors;
    },
    authorErrors() {
      const errors = [];
      if (!this.$v.author.$dirty) return errors;
      !this.$v.author.required && errors.push("Author is required");
      return errors;
    },
  },

  methods: {
    async submit() {console.log(this.thumbnail)
      var formData = new FormData();
      formData.append("title",this.title)
      formData.append("description",this.description)
      formData.append("author",this.author)
      formData.append("thumbnail",this.thumbnail)
      this.$v.$touch();
      if (this.editId) {
        fetch(`http://localhost:8000/api/blog/${this.editId}`, {
          method: "PUT",
          body:formData,
        }).then((data) => {
          data.json().then((result) => {
            if (result.success) {
              this.$router.push("/");
            }
          });
        });
      } else {
        fetch("http://localhost:8000/api/blog", {
          method: "POST",
          body:formData,
        }).then((data) => {
          data.json().then((result) => {
            console.log(result)
            if (result.success) {
              this.$router.push("/");
            }
          });
        });
      }
    },
    clear() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
label {
  left: 0 !important;
  right: auto !important;
}
.v-messages {
  color: red !important;
}
</style>
