<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit="onSubmit">
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                 v-model="password"
                required></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
   data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    onSubmit(e) {
      e.preventDefault();

      const payload = {
        email: this.email,
        password: this.password,
      };
        axios
        .post("http://localhost:8000/auth/login", payload)
        .then((data) => {
          if (data.data.success) {
            localStorage.setItem("token", data.data.token);
            this.$router.push("/");
          } else {}
        })
        .catch((err) => {
          const message = err.response.data.message;
          console.log('message',message)
          if(message && message.includes("duplicate")) alert('Email already exist.')
          else alert(message)
        });
    }
  },
};
</script>
