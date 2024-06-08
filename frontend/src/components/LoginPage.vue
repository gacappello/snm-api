<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="cred">Username:</label>
      <input type="text" id="cred" v-model="cred" required />
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" required />
      <button type="submit">Login</button>
    </form>
  </div>
  <div>
    <h2>Test</h2>
    <form @submit.prevent="test">
      <button type="submit">TEST IT</button>
    </form>
  </div>
  <div>
    <h2>Logout</h2>
    <form @submit.prevent="logout">
      <button type="submit">LOGOUT</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
});

export default {
  data() {
    return {
      cred: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await instance.post("http://localhost:3000/login", {
          cred: this.cred,
          password: this.password,
        });
        console.log(response); // Handle success
        // Redirect or do something else upon successful login
      } catch (error) {}
    },
    async test() {
      try {
        const response = await instance.get(
          "http://localhost:3000/playlists/get"
        );
        console.log(response); // Handle success
        // Redirect or do something else upon successful login
      } catch (error) {}
    },
    async logout() {
      try {
        const response = await instance.post("http://localhost:3000/logout");
        console.log(response); // Handle success
        // Redirect or do something else upon successful login
      } catch (error) {}
    },
  },
};
</script>

<style>
/* Add your CSS styles here */
</style>
