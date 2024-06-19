<template>
  <v-container fluid>
    <div class="d-flex justify-center mt-12">
      <v-sheet class="border" color="ternary" rounded>
        <v-card
          class="border pt-12 px-lg-12 pb-8"
          :width="$vuetify.display.mdAndUp ? '33vw' : '66vw'"
        >
          <div>
            <v-card-title> Login </v-card-title>
            <v-card-subtitle> Login to SNM</v-card-subtitle>
            <v-card-item>
              <v-form class="mt-6" @submit.prevent>
                <v-text-field
                  v-model="cred"
                  :prepend-icon="showIcons ? 'fa-solid fa-user' : ''"
                  :rules="[rules.cred.required]"
                  label="Login Credential"
                  variant="outlined"
                  counter
                >
                </v-text-field>
                <v-text-field
                  v-model="password"
                  :prepend-icon="showIcons ? 'fa-solid fa-key' : ''"
                  :append-inner-icon="
                    !showPassword ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'
                  "
                  hint="At least 8 characters"
                  label="Password"
                  variant="outlined"
                  :rules="[rules.password.required, rules.password.min]"
                  :type="showPassword ? 'text' : 'password'"
                  counter
                  @click:append-inner="showPassword = !showPassword"
                >
                </v-text-field>
                <div class="d-flex justify-center mb-8 mt-8">
                  <v-btn
                    color="ternary"
                    size="large"
                    variant="tonal"
                    type="submit"
                    :loading="loading"
                    @click="submitPressed()"
                  >
                    Log In
                  </v-btn>
                </div>
              </v-form>
              <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="/register">
                  Sign up now
                  <v-icon size="small">fa-solid fa-arrow-right</v-icon>
                </a>
              </v-card-text>
            </v-card-item>
            <v-snackbar v-model="showErrorSnackbar"
              >{{ snackbarErrorMessage }}
              <template v-slot:actions>
                <v-btn
                  color="pink"
                  variant="text"
                  @click="showErrorSnackbar = false"
                >
                  Close
                </v-btn>
              </template>
            </v-snackbar>
          </div>
        </v-card>
      </v-sheet>
    </div>
  </v-container>
</template>
<script>
import api from "../api";

export default {
  data() {
    return {
      cred: "",
      password: "",
      showErrorSnackbar: false,
      snackbarErrorMessage: "",
      showPassword: false,
      loading: false,
      rules: {
        cred: {
          required: (value) => !!value || "Required",
        },
        password: {
          required: (value) => !!value || "Required",
          min: (value) => value.length >= 8 || "At least 8 characters",
        },
      },
    };
  },
  computed: {
    showIcons() {
      return !this.$vuetify.display.mdAndDown;
    },
  },
  methods: {
    async submitPressed() {
      this.loading = true;
      const response = await this.sendLoginRequest();
      this.loading = false;

      if (response.data.error) {
        this.showErrorSnackbar = true;
        this.snackbarErrorMessage = response.data.message;
      } else {
        this.$router.push("/home").then(() => {
          this.$router.go(0);
        });
      }
    },

    async sendLoginRequest() {
      const data = {
        cred: this.cred,
        password: this.password,
      };

      return await api.login(data);
    },
  },
};
</script>
