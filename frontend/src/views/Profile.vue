<template>
  <v-container fluid class="pa-4 pa-sm-8 pa-lg-10 pa-xl-12">
    <v-row class="fill-height">
      <v-col cols="12" sm="12" lg="4" xl="3">
        <v-hover v-slot="{ isHovering, props }">
          <v-sheet
            class="rounded border-md fill-height"
            :elevation="isHovering ? 24 : 0"
            :border="isHovering ? 'lg' : 'md'"
            v-bind="props"
          >
            <v-card
              v-ripple
              min-height="500px"
              class="d-flex align-center flex-column justify-space-evenly text-grey fill-height"
              :color="isHovering ? 'ternary' : 'undefined'"
              :loading="user.loading"
            >
              <div>
                <v-img
                  aspect-ratio="1"
                  src="/user.jpg"
                  color="ternary"
                  class="border-lg rounded-xl flex-grow-0"
                  width="250px"
                  height="250px"
                >
                </v-img>
              </div>
              <div class="text-h5 text-sm-h4 font-weight-light">
                <div class="text-caption text-sm-caption font-weight-light">
                  Profile of
                </div>
                {{
                  requestedUsernameData.username.toUpperCase()
                    ? requestedUsernameData.username.toUpperCase()
                    : "placeholder".toUpperCase()
                }}
                <div
                  class="text-caption text-sm-caption font-weight-light text-right"
                >
                  SNM user
                </div>
              </div>
              <div v-if="!user.loading" class="font-italic font-weight-light">
                "{{ requestedUsernameData.data.bio }}"
              </div>
              <div>
                <v-btn
                  v-if="user.loading"
                  icon
                  :loading="user.loading"
                  variant="tonal"
                ></v-btn>
                <v-btn
                  v-else-if="!(requestedUsernameData.username === me.username)"
                  prepend-icon="fa-solid fa-check"
                  :text="
                    requestedUsernameData.following ? 'unfollow' : 'follow'
                  "
                  :loading="userActionButton.loading"
                  variant="tonal"
                  @click="
                    requestedUsernameData.following
                      ? unfollowButtonPressed()
                      : followButtonPressed()
                  "
                ></v-btn>
                <v-btn
                  prepend-icon="fa-solid fa-gear"
                  v-else
                  text="modify profile"
                  variant="tonal"
                  :loading="userActionButton.loading"
                  @click="user.dialog = true"
                ></v-btn>
              </div>
            </v-card>
          </v-sheet>
        </v-hover>
      </v-col>
      <v-col cols="12" sm="12" lg="8" xl="9" class="d-flex flex-column">
        <v-row>
          <v-col cols="6" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="rounded border-md cursor-pointer"
                :elevation="isHovering ? 24 : 0"
                v-bind="props"
                @click="followers.dialog = true"
              >
                <v-card
                  v-ripple
                  min-height="200px"
                  class="d-flex align-center flex-column justify-space-evenly text-grey"
                  :color="isHovering ? 'ternary' : 'undefined'"
                  :loading="followers.loading"
                >
                  <div class="text-h5 text-sm-h4 font-weight-thin">
                    FOLLOWERS
                  </div>
                  <div class="text-h5">
                    <v-icon>fa-solid fa-user</v-icon>
                  </div>
                  <v-btn
                    v-if="followers.loading"
                    icon
                    :loading="followers.loading"
                    variant="tonal"
                  ></v-btn>
                  <div v-else class="text-h4 font-weight-light">
                    {{ requestedUsernameData.data.followers.length }}
                  </div>
                </v-card>
              </v-sheet>
            </v-hover>
          </v-col>
          <v-col cols="6" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="rounded border-md cursor-pointer"
                :elevation="isHovering ? 24 : 0"
                v-bind="props"
                @click="follows.dialog = true"
                :loading="follows.loading"
              >
                <v-card
                  v-ripple
                  min-height="200px"
                  class="d-flex align-center flex-column justify-space-evenly text-grey"
                  :color="isHovering ? 'ternary' : 'undefined'"
                >
                  <div class="text-h5 text-sm-h4 font-weight-thin">FOLLOWS</div>
                  <div class="text-h5">
                    <v-icon>fa-solid fa-user</v-icon>
                  </div>
                  <v-btn
                    v-if="follows.loading"
                    icon
                    :loading="follows.loading"
                    variant="tonal"
                  ></v-btn>
                  <div v-else class="text-h4 font-weight-light">
                    {{ requestedUsernameData.data.follows.length }}
                  </div>
                </v-card>
              </v-sheet>
            </v-hover>
          </v-col>
          <v-col cols="12" md="4">
            <v-hover v-slot="{ isHovering, props }">
              <v-sheet
                class="rounded border-md cursor-pointer"
                :elevation="isHovering ? 24 : 0"
                v-bind="props"
              >
                <v-card
                  v-ripple
                  min-height="200px"
                  class="d-flex align-center flex-column justify-space-evenly text-grey"
                  :color="isHovering ? 'ternary' : 'undefined'"
                  :loading="playlists.loading"
                  href="#playlists"
                >
                  <div class="text-h5 text-sm-h4 font-weight-thin">
                    PLAYLISTS
                  </div>
                  <div class="text-h5">
                    <v-icon>fa-solid fa-music</v-icon>
                  </div>
                  <v-btn
                    v-if="playlists.loading"
                    icon
                    :loading="playlists.loading"
                    variant="tonal"
                  ></v-btn>
                  <div v-else class="text-h4 font-weight-light">
                    {{ requestedUsernameData.playlists.length }}
                  </div>
                </v-card>
              </v-sheet>
            </v-hover>
          </v-col>
        </v-row>
        <v-row
          v-if="
            requestedUsernameData.playlists.filter((p) => p.access === 'public')
              .length > 0
          "
        >
          <v-col cols="12">
            <h1 class="text-h4 font-weight-light">
              {{ requestedUsernameData.username.toUpperCase() + "'S" }} PUBLIC
              PLAYLISTS
            </h1>
          </v-col>
          <v-col cols="12">
            <ItemIteratorComponent
              v-if="!playlists.loading"
              :itemsToDisplay="
                requestedUsernameData.playlists.filter(
                  (p) => p.access === 'public'
                )
              "
              :itemKeyName="'_id'"
              :xl="5"
            >
              <template v-slot:default="{ item }">
                <v-row>
                  <v-col>
                    <PlaylistSheetComponent
                      :_id="item.raw._id"
                      :name="item.raw.name"
                      :access="item.raw.access"
                      :createdAt="item.raw.createdAt"
                      :src="item.raw.src"
                      :songs="item.raw.songs"
                    />
                  </v-col>
                </v-row>
              </template>
              <template v-slot:loading>
                <PlaylistSheetComponent :loading="true" />
              </template>
            </ItemIteratorComponent>
          </v-col>
        </v-row>
        <v-row v-else dense>
          <v-col cols="12" class="pt-12 text-center text-h5">
            <h2>
              There are <span class="text-ternary">0</span> (public) playlists
              in <span class="text-ternary">this</span> profile!
            </h2>
          </v-col>
          <v-col cols="12" class="text-center text-h6">
            <h3>Get <span class="text-ternary">back</span> later!</h3>
          </v-col>
          <v-col cols="12" class="text-center text-button">
            <a class="text-ternary text-decoration-none" href="/home">
              Try here
              <v-icon size="small">fa-solid fa-arrow-right</v-icon>
            </a>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row
      v-if="
        requestedUsernameData.playlists.filter((p) => p.access === 'public')
          .length > 0
      "
    >
      <v-col cols="12">
        <h1 class="text-h4 font-weight-light">
          {{ requestedUsernameData.username.toUpperCase() + "'S" }} PUBLIC
          PLAYLISTS
        </h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent
          v-if="!playlists.loading"
          :itemsToDisplay="
            requestedUsernameData.playlists.filter((p) => p.access === 'public')
          "
          :itemKeyName="'_id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <PlaylistSheetComponent
                  :_id="item.raw._id"
                  :name="item.raw.name"
                  :access="item.raw.access"
                  :createdAt="item.raw.createdAt"
                  :src="item.raw.src"
                  :songs="item.raw.songs"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:loading>
            <PlaylistSheetComponent :loading="true" />
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
  </v-container>
  <v-container id="playlists">
    <v-row v-if="requestedUsernameData.playlists.length > 0">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-light">
          {{ requestedUsernameData.username.toUpperCase() + "'S" }} VISIBLE
          PLAYLISTS
        </h1>
      </v-col>
      <v-col cols="12">
        <ItemIteratorComponent
          v-if="!playlists.loading"
          :itemsToDisplay="lodash.shuffle(requestedUsernameData.playlists)"
          :itemKeyName="'_id'"
        >
          <template v-slot:default="{ item }">
            <v-row>
              <v-col>
                <PlaylistSheetComponent
                  :_id="item.raw._id"
                  :name="item.raw.name"
                  :access="item.raw.access"
                  :createdAt="item.raw.createdAt"
                  :src="item.raw.src"
                  :songs="item.raw.songs"
                />
              </v-col>
            </v-row>
          </template>
          <template v-slot:loading>
            <PlaylistSheetComponent :loading="true" />
          </template>
        </ItemIteratorComponent>
      </v-col>
    </v-row>
  </v-container>
  <div class="pa-4 text-center">
    <v-dialog v-model="followers.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>Followers</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            v-model="followers.search"
            label="Search for a user"
            append-inner-icon="fa-solid fa-search"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
          <v-card-text class="px-4" style="height: 500px">
            <v-list density="comfortable">
              <v-list-item
                v-for="(item, i) in filteredFollowers"
                :key="i"
                :value="item"
                class="rounded-lg"
              >
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-user" size="xsmall"></v-icon>
                </template>
                <a
                  :href="'/profile/' + item"
                  style="text-decoration: none"
                  class="text-grey-lighten-2"
                >
                  <v-list-item-title
                    class="font-weight-regular"
                    v-text="item"
                  ></v-list-item-title>
                </a>
                <template v-slot:append>
                  <v-btn
                    v-if="!(item === me.username)"
                    prepend-icon="fa-solid fa-check"
                    :text="me.follows.includes(item) ? 'unfollow' : 'follow'"
                    density="compact"
                    :color="me.follows.includes(item) ? '' : 'ternary'"
                    variant="tonal"
                    @click="
                      me.follows.includes(item)
                        ? unfollowUserInDialogPressed(item)
                        : followUserInDialogPressed(item)
                    "
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="close" @click="followers.dialog = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="pa-4 text-center">
    <v-dialog v-model="follows.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>Follows</v-toolbar-title>
          </v-toolbar>
          <v-text-field
            v-model="follows.search"
            label="Search for a user"
            append-inner-icon="fa-solid fa-search"
            density="compact"
            hide-details
            single-line
          ></v-text-field>
          <v-card-text class="px-4" style="height: 500px">
            <v-list density="comfortable">
              <v-list-item
                v-for="(item, i) in filteredFollows"
                :key="i"
                :value="item"
                class="rounded-lg"
              >
                <template v-slot:prepend>
                  <v-icon icon="fa-solid fa-user" size="xsmall"></v-icon>
                </template>
                <a
                  :href="'/profile/' + item"
                  style="text-decoration: none"
                  class="text-grey-lighten-2"
                >
                  <v-list-item-title
                    class="font-weight-regular"
                    v-text="item"
                  ></v-list-item-title>
                </a>
                <template v-slot:append>
                  <v-btn
                    v-if="!(item === me.username)"
                    prepend-icon="fa-solid fa-check"
                    :text="me.follows.includes(item) ? 'unfollow' : 'follow'"
                    density="compact"
                    :color="me.follows.includes(item) ? '' : 'ternary'"
                    variant="tonal"
                    @click="
                      me.follows.includes(item)
                        ? unfollowUserInDialogPressed(item)
                        : followUserInDialogPressed(item)
                    "
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="Close" @click="follows.dialog = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <div class="pa-4 text-center">
    <v-dialog v-model="user.dialog" scrollable width="550px">
      <template v-slot:default>
        <v-card class="rounded-lg">
          <v-toolbar floating>
            <v-toolbar-title>{{ me.username.toUpperCase() }}</v-toolbar-title>
          </v-toolbar>
          <v-stepper
            alt-labels
            hide-actions
            elevation="0"
            editable
            :items="['Personal Information', 'Genres']"
            v-model="currentStep"
          >
            <template v-slot:item.1>
              <v-card style="height: 550px">
                <v-card-text>
                  <v-form ref="form" v-model="user.userForm" lazy-validation>
                    <v-row dense>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="user.firstName"
                          label="First name"
                          variant="outlined"
                          :rules="[
                            user.rules.firstName.max,
                            user.rules.firstName.min,
                          ]"
                          counter
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="user.lastName"
                          label="Last name"
                          variant="outlined"
                          :rules="[
                            user.rules.lastName.max,
                            user.rules.lastName.min,
                          ]"
                          counter
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="user.bio"
                          label="Bio"
                          variant="outlined"
                          :rules="[user.rules.bio.max]"
                          counter
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="user.email"
                          label="Email"
                          :rules="[user.rules.email.validate]"
                          variant="outlined"
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="user.password"
                          label="Password"
                          type="password"
                          variant="outlined"
                          :rules="[user.rules.password.min]"
                          counter
                        ></v-text-field>
                      </v-col>

                      <v-col cols="12">
                        <v-text-field
                          v-model="user.username"
                          label="Username"
                          variant="outlined"
                          :rules="[
                            user.rules.username.max,
                            user.rules.username.min,
                          ]"
                          counter
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
              </v-card>
            </template>
            <template v-slot:item.2>
              <v-card style="height: 350px">
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
                </v-card-item>
              </v-card>
            </template>
          </v-stepper>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn text="close" @click="user.dialog = false"></v-btn>
            <v-btn
              text="save"
              variant="tonal"
              @click="saveUserDialogPressed()"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
  <v-snackbar v-model="errorSnackbar.show"
    >{{ errorSnackbar.message }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="errorSnackbar.show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import api from "../api";
import auth from "../auth";
import validator from "validator";
import { useDisplay } from "vuetify";
import PlaylistSheetComponent from "../components/PlaylistSheetComponent.vue";
import ItemIteratorComponent from "../components/ItemIteratorComponent.vue";
import lodash from "lodash";

export default {
  components: {
    PlaylistSheetComponent,
    ItemIteratorComponent,
  },

  setup() {
    const display = useDisplay();
    return { display };
  },

  data() {
    return {
      me: null,
      lodash: lodash,
      currentStep: 1,
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
      followers: {
        search: "",
        loading: true,
        dialog: false,
      },
      follows: {
        search: "",
        loading: true,
        dialog: false,
      },
      user: {
        loading: true,
        userForm: false,
        dialog: false,
        firstName: "",
        lastName: "",
        bio: "",
        email: "",
        password: "",
        username: "",
        rules: {
          username: {
            min: (value) => value.length >= 5 || "At least 5 characters",
            max: (value) => value.length <= 30 || "At maximum 30 characters",
          },
          email: {
            validate: (value) =>
              validator.isEmail(value) || "Insert a valid email",
          },
          bio: {
            max: (value) => value.length <= 30 || "At maximum 40 characters",
          },
          firstName: {
            min: (value) => value.length >= 5 || "At least 5 characters",
            max: (value) => value.length <= 30 || "At maximum 30 characters",
          },
          lastName: {
            min: (value) => value.length >= 5 || "At least 5 characters",
            max: (value) => value.length <= 30 || "At maximum 30 characters",
          },
          password: {
            min: (value) =>
              value.length === 0 ||
              value.length >= 8 ||
              "At least 8 characters",
          },
        },
      },
      playlists: {
        loading: true,
      },
      errorSnackbar: {
        show: false,
        message: "",
      },
      userActionButton: {
        loading: false,
      },
      requestedUsernameData: {
        username: this.$route.params.username,
        data: null,
        playlists: [],
        following: false,
      },
    };
  },

  computed: {
    itemsPerPage() {
      const { smAndUp, mdAndUp, xlAndUp } = this.display;
      if (xlAndUp.value) return 5;
      if (mdAndUp.value) return 3;
      if (smAndUp.value) return 2;
      return 1;
    },
    filteredFollowers() {
      const term = this.followers.search.toLowerCase();
      return this.requestedUsernameData.data.followers.filter((user) =>
        user.toLowerCase().includes(term)
      );
    },
    filteredFollows() {
      const term = this.follows.search.toLowerCase();
      return this.requestedUsernameData.data.follows.filter((user) =>
        user.toLowerCase().includes(term)
      );
    },
  },

  methods: {
    async updateRequestedUser() {
      const meResponse = await api.getMe();
      if (!meResponse.data.error) {
        this.me = meResponse.data.user;
      }

      if (this.me.username === this.requestedUsernameData.username) {
        this.requestedUsernameData.data = this.me;
      } else {
        const usernameResponse = await api.getUserProfile(
          this.$route.params.username
        );
        if (usernameResponse.data.error || !usernameResponse.data.user) {
          this.$router.push("/home");
        }
        this.requestedUsernameData.data = usernameResponse.data.user;
      }

      this.requestedUsernameData.followersLength =
        this.requestedUsernameData.data.followers.length;

      this.requestedUsernameData.following = this.me.follows.includes(
        this.requestedUsernameData.username
      );

      this.user.username = this.me.username;
      this.user.firstName = this.me.firstName;
      this.user.lastName = this.me.lastName;
      this.user.email = this.me.email;
      this.user.bio = this.me.bio;
      this.selectedGenres.push(...this.me.genres);
    },

    selectGenre(genre) {
      if (this.selectedGenres.includes(genre)) {
        this.selectedGenres = this.selectedGenres.filter((i) => i !== genre);
      } else {
        this.selectedGenres.push(genre);
      }
    },

    async followUserInDialogPressed(user) {
      const response = await api.followUser(user);
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
      }
      await this.updateRequestedUser();
    },

    async unfollowUserInDialogPressed(user) {
      const response = await api.unfollowUser(user);
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
      }
      await this.updateRequestedUser();
    },

    async saveUserDialogPressed() {
      this.$refs.form.validate();
      if (this.user.userForm) {
        const options = {
          bio: this.user.bio,
          firstName: this.user.firstName,
          lastName: this.user.firstName,
          genres: this.selectedGenres,
          email: this.user.email,
          username: this.user.username,
        };

        let logout = false;
        if (
          this.user.email !== this.me.email ||
          this.user.username !== this.me.username ||
          this.user.password.length > 0
        ) {
          logout = true;
        }

        if (this.user.password.length) {
          options.password = this.user.password;
        }

        const response = await api.updateUser(options);
        if (response.data.error) {
          this.errorSnackbar.show = true;
          this.errorSnackbar.message = response.data.message;
          return;
        }

        this.user.dialog = false;
        if (logout) {
          auth.makeLogout();
          this.$router.push("/login").then(() => {
            this.$router.go(0);
          });
        }

        await this.updateRequestedUser();
      }
    },

    async followButtonPressed() {
      this.userActionButton.loading = true;
      const response = await api.followUser(
        this.requestedUsernameData.username
      );
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
      }
      this.userActionButton.loading = false;
      this.requestedUsernameData.following = true;
      await this.updateRequestedUser();
    },

    async unfollowButtonPressed() {
      this.userActionButton.loading = true;
      const response = await api.unfollowUser(
        this.requestedUsernameData.username
      );
      if (response.data.error) {
        this.errorSnackbar.show = true;
        this.errorSnackbar.message = response.data.message;
      }
      this.userActionButton.loading = false;
      this.requestedUsernameData.following = false;
      await this.updateRequestedUser();
    },
  },

  async beforeMount() {
    await this.updateRequestedUser();

    this.user.loading = false;
    this.followers.loading = false;
    this.follows.loading = false;

    const playlistsResponse = await api.getPlaylistsOfUser(
      this.$route.params.username
    );
    if (playlistsResponse.data.error) {
      this.errorSnackbar.show = true;
      this.errorSnackbar.message = playlistsResponse.data.message;
      return;
    }

    this.playlists.loading = false;
    this.requestedUsernameData.playlists = playlistsResponse.data.playlists;
  },
};
</script>
