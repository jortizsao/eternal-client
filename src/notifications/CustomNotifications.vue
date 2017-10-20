<template>
  <div id="custom-notifications">
    <notifications position="top center" classes="notification" animation-name="v-fade" :width="getWidth()">
      <template slot="body" slot-scope="props">
        <div :class="['notification', props.item.type]">
          <div class="row">
            <div class="col-sm-2 notification-icon">
              <icon scale="1.5" :name="getIconName(props.item.type)"></icon>
            </div>
            <div class="col-sm-10">
              <div v-if="props.item.title" class="notification-title"
                v-html="props.item.title"></div>
              <div class="notification-content"
                v-html="getText(props.item.type, props.item.text)"></div>
            </div>
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>
<script>
import 'vue-awesome/icons/frown-o';
import 'vue-awesome/icons/check-circle-o';
import 'vue-awesome/icons/info-circle';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
  data() {
    return {};
  },
  methods: {
    getIconName(type) {
      switch (type) {
        case 'success':
          return 'check-circle-o';
        case 'error':
          return 'frown-o';
        default:
          return 'info-circle';
      }
    },
    getText(type, text) {
      return type === 'error' && !text ? 'Well this is embarrassing...' : text;
    },
    getWidth() {
      return window.innerWidth >= 768 ? 400 : 300;
    },
  },
  components: {
    Icon,
  },
};
</script>
<style lang="scss" scoped>
.notification {
  margin: 10px;
  margin-bottom: 0;
  border-radius: 3px;
  font-size: 16px;
  padding: 10px 20px;
  background: #fff7e6;
  border: 2px solid;

  .notification-content {
    text-align: left;
  }

  .notification-icon {
    position: relative;
    top: 3px;
  }

  .row {
    display: flex;
    align-items: center;
  }

  &.info {
    border-color: #ffdf99;
  }

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: #ffcccc !important;
    border-color: #ffb3b3 !important;
  }

  &.success {
    background: #e8f9f0;
    border-color: #d0f2e1;
  }
}

.v-fade-enter-active,
.v-fade-leave-active,
.v-fade-move {
  transition: all .5s;
}
.v-fade-enter,
.v-fade-leave-to {
  opacity: 0;
  transform: translateY(-500px) scale(0.2);
}
</style>
