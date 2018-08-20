<template>
  <div class="product-detail-gallery">
    <div class="row text-center">
      <img v-img :src="selectedImage.url" class="product-detail-main-image">
    </div>
    <div class="row product-detail-image-thumbnails">
      <a href="" v-for="(image, index) in images" :key="image.url" @click.prevent="selectImage(index)">
        <img :src="image.url" :alt="image.name" class="img-thumbnail img-responsive product-detail-thumbnail-image">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: Array,
  },
  data() {
    return {
      selectedImageIndex: 0,
    };
  },
  methods: {
    selectImage(index) {
      this.selectedImageIndex = index;
    },
  },
  computed: {
    selectedImage() {
      return this.images[this.selectedImageIndex];
    },
  },
};
</script>
<style lang="scss" scoped>
.product-detail-main-image {
  max-height: 400px;
}

.product-detail-image-thumbnails {
  padding: 20px 15px;
}

.product-detail-thumbnail-image {
  max-height: 100px;
  border: 1px solid #e6d6d6;
}
</style>

