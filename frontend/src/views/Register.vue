<template>
  <v-container fluid>
    <v-row class="justify-center">
      <v-col cols="12" sm="10" md="6" lg="5" xl="4">
        <v-sheet class="border" color="ternary" rounded>
          <v-stepper
            alt-labels
            hide-actions
            editable
            :items="['Register', 'Customize']"
            v-model="currentStep"
          >
            <template v-slot:item.1>
              <v-card>
                <v-card-title> Register </v-card-title>
                <v-card-subtitle> Register to SNM</v-card-subtitle>
                <v-card-item>
                  <v-form class="mt-6" v-model="form" @submit.prevent>
                    <v-text-field
                      v-model="username"
                      :prepend-icon="showIcons ? 'fa-solid fa-user' : ''"
                      :rules="[
                        rules.username.required,
                        rules.username.min,
                        rules.username.max,
                      ]"
                      label="Username"
                      variant="outlined"
                      counter
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="email"
                      :prepend-icon="showIcons ? 'fa-solid fa-envelope' : ''"
                      :rules="[rules.email.required]"
                      label="Email"
                      variant="outlined"
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="firstName"
                      :prepend-icon="showIcons ? 'fa-solid fa-question' : ''"
                      :rules="[
                        rules.firstName.required,
                        rules.firstName.min,
                        rules.firstName.max,
                      ]"
                      label="First Name"
                      variant="outlined"
                      counter
                    >
                    </v-text-field>
                    <v-text-field
                      v-model="lastName"
                      :prepend-icon="showIcons ? 'fa-solid fa-question' : ''"
                      :rules="[
                        rules.lastName.required,
                        rules.lastName.min,
                        rules.lastName.max,
                      ]"
                      label="Last Name"
                      variant="outlined"
                      counter
                    >
                    </v-text-field>
                    <v-date-input
                      v-model="birth"
                      :prepend-icon="showIcons ? '$calendar' : ''"
                      :rules="[rules.birth.required]"
                      label="Birth date"
                      variant="outlined"
                    >
                    </v-date-input>
                    <v-text-field
                      v-model="password"
                      :prepend-icon="showIcons ? 'fa-solid fa-key' : ''"
                      :append-inner-icon="
                        !showPassword
                          ? 'fa-solid fa-eye'
                          : 'fa-solid fa-eye-slash'
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
                        @click="continuePressed()"
                      >
                        CONTINUE
                      </v-btn>
                    </div>
                  </v-form>
                  <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="/login">
                      Login now
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
              </v-card>
            </template>
            <template v-slot:item.2>
              <v-card-title>Customize your experience</v-card-title>
              <v-card-subtitle
                >Select the genres that you prefer</v-card-subtitle
              >
              <v-card-item>
                <v-row dense class="my-8">
                  <v-col
                    v-for="(item, index) in availableGenres"
                    :key="index"
                    cols="3"
                    class="d-flex justify-center"
                  >
                    <v-btn
                      @click="selectGenre(item)"
                      class="flex-grow-1 rounded overflow-hidden"
                      :color="selectedGenres.includes(item) ? 'ternary' : ''"
                      :variant="
                        selectedGenres.includes(item) ? 'tonal' : 'plain'
                      "
                    >
                      {{ item }}
                    </v-btn>
                  </v-col>
                </v-row>
                <div class="d-flex justify-center mb-8 mt-8">
                  <v-btn
                    color="ternary"
                    size="large"
                    variant="tonal"
                    type="submit"
                    :loading="loading"
                    @click="completePressed()"
                  >
                    COMPLETE REGISTRATION
                  </v-btn>
                </div>
              </v-card-item>
              <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="/login">
                  Login now
                  <v-icon size="small">fa-solid fa-arrow-right</v-icon>
                </a>
              </v-card-text>
            </template>
          </v-stepper>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      username: null,
      email: null,
      firstName: null,
      lastName: null,
      birth: null,
      password: null,
      showErrorSnackbar: false,
      snackbarErrorMessage: "",
      showPassword: false,
      loading: false,
      form: null,
      currentStep: 1,
      rules: {
        username: {
          required: (value) => !!value || "Required",
          min: (value) => value.length >= 5 || "At least 5 characters",
          max: (value) => value.length <= 30 || "At maximum 30 characters",
        },
        email: {
          required: (value) => !!value || "Required",
        },
        firstName: {
          required: (value) => !!value || "Required",
          min: (value) => value.length >= 5 || "At least 5 characters",
          max: (value) => value.length <= 30 || "At maximum 30 characters",
        },
        lastName: {
          required: (value) => !!value || "Required",
          min: (value) => value.length >= 5 || "At least 5 characters",
          max: (value) => value.length <= 30 || "At maximum 30 characters",
        },
        birth: {
          required: (value) => !!value || "Required",
        },
        password: {
          required: (value) => !!value || "Required",
          min: (value) => value.length >= 8 || "At least 8 characters",
        },
      },
      availableGenres: [
        "acoustic",
        "alternative",
        "blues",
        "chill",
        "classical",
        "country",
        "dance",
        "disco",
        "disney",
        "folk",
        "funk",
        "guitar",
        "heavy-metal",
        "hip-hop",
        "kids",
        "metal",
        "party",
        "punk",
        "reggaeton",
        "rock",
      ],
      selectedGenres: [],
    };
  },
  computed: {
    showIcons() {
      return !this.$vuetify.display.mdAndDown;
    },
  },
  methods: {
    async completePressed() {
      this.loading = true;
      const response = await this.sendRegisterRequest();
      this.loading = false;
      if (response.data.error) {
        this.showErrorSnackbar = true;
        this.snackbarErrorMessage = response.data.message;
        this.currentStep = 1;
      } else {
        this.$router.push("/login").then(() => {
          this.$router.go(0);
        });
      }
    },

    async continuePressed() {
      if (this.form) this.currentStep = 2;
    },

    async sendRegisterRequest() {
      const data = {
        username: this.username,
        email: this.email,
        firstName: this.firstName,
        lastName: this.lastName,
        birth: this.birth,
        password: this.password,
        genres: this.selectedGenres,
      };

      return await api.register(data);
    },

    selectGenre(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter((i) => i !== genre);
      } else {
        this.selectedGenres.push(genre);
      }
    },
  },
};
</script>
