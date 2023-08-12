<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
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
                required
                v-model="email"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                required
                v-model="password"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                required
                v-model="confirmPassword"
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit">Sign Up</v-btn>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <GoogleLogin
                :params="params"
                :renderParams="renderParams"
                :onSuccess="onSuccess"
                :onFailure="onFailure"
              >Google</GoogleLogin>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from "axios";
import GoogleLogin from "vue-google-login";
export default {
  components: {
    GoogleLogin,
  },
  data: () => ({
    email: "",
    password: "",
    confirmPassword: "",
    params: {
      client_id:
        "178772416181-f6h9m7ok5b25jp3jpouu1r83ua79t74e.apps.googleusercontent.com",
    },
    renderParams: {
      width: 250,
      height: 50,
      longtitle: true,
    },
  }),
  methods: {
    onSubmit(e) {
      e.preventDefault();
      const payload = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      console.log(payload);
      if (this.confirmPassword !== this.password) {
        alert("Password doesn't match.");
      } else {
        axios
          .post("http://localhost:8000/auth/register", payload)
          .then((data) => {
            if (data.data.success) {
              localStorage.setItem("token", data.data.token);
              this.$router.push("/");
            } else {
            }
          })
          .catch((err) => {
            const message = err.response.data.message;
            if (message && message.includes("duplicate")) {
              alert("Email already exist.");
            }
          });
      }
    },
    onSuccess(googleUser) {
      console.log(googleUser);

      // This only gets the user information: id, name, imageUrl and email
      console.log(googleUser.getBasicProfile());
    },
    onFailure(err){
      console.log(err)
    }
  },
};
</script>
