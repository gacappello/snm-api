<template>
  <v-data-iterator :itemsPerPage="itemsPerPage" :items="itemsToDisplay">
    <template v-slot:default="{ page, pageCount, prevPage, nextPage, items }">
      <v-row class="justify-space-between">
        <v-col
          cols="1"
          v-ripple
          @click="prevPage"
          :disabled="page === 1"
          class="rounded-lg d-flex align-center justify-center"
        >
          <v-icon :disabled="page === 1">fa-solid fa-arrow-left</v-icon>
        </v-col>
        <v-col cols="10">
          <v-row class="flex-nowrap">
            <transition-group name="slide">
              <v-col v-for="item in items" :key="item.raw._id">
                <slot name="default" :item="item"></slot>
              </v-col>
              <v-col
                v-for="n in itemsPerPage - items.length"
                v-if="$slots.loading"
                :key="n"
              >
                <slot name="loading" v-if="$slots.loading"></slot>
              </v-col>
            </transition-group>
          </v-row>
        </v-col>
        <v-col
          cols="1"
          v-ripple
          @click="nextPage"
          class="rounded-lg d-flex align-center justify-center"
        >
          <v-icon :disabled="page === pageCount">
            fa-solid fa-arrow-right
          </v-icon>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
import { useDisplay } from "vuetify";

export default {
  props: {
    itemsToDisplay: {
      type: Array,
      required: true,
    },
    xs: {
      type: Number,
      default: 1,
    },
    sm: {
      type: Number,
      default: 2,
    },
    md: {
      type: Number,
      default: 3,
    },
    lg: {
      type: Number,
      default: 4,
    },
    xl: {
      type: Number,
      default: 6,
    },
  },
  setup() {
    const display = useDisplay();
    return { display };
  },
  computed: {
    itemsPerPage() {
      if (this.display.xlAndUp.value) return this.xl;
      if (this.display.lgAndUp.value) return this.lg;
      if (this.display.mdAndUp.value) return this.md;
      if (this.display.smAndUp.value) return this.sm;
      return this.xs;
    },
  },
};
</script>

<style>
.slide-enter-active {
  position: relative;
  top: 0;
  left: 0;
  transition: all 0.3s ease;
}

.slide-leave-active {
  position: absolute;
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(20%);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(20%);
}
</style>
