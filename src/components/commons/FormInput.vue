<template>
  <div id="form-input" :class="columnWidthClass">
    <div class="input-block">
      <span class="text-uppercase">{{labelKey}}<abbr v-if="required" :title="$t('required')">*</abbr></span><br>
      <input :id="inputId" class="checkout-input-field" v-validate="{ required }" type="text" :name="name" @input="onValueChanged($event.target.value)" :value="value">
      <p class="text-danger" v-show="errors.has(name)">{{ errors.first(name) }}</p>
      <span v-if="additionalInfoKey" class="tel-email-text">{{ $t('additionalInfoKey') }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    columnWidth: String,
    name: {
      type: String,
      required: true,
    },
    labelKey: String,
    additionalInfoKey: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
    value: {
      required: true,
      default: '',
    },
  },
  data() {
    return {};
  },
  methods: {
    onValueChanged(newValue) {
      this.$emit('valueChanged', newValue);
    },
  },
  computed: {
    columnWidthClass() {
      if (this.columnWidth) {
        return `col-sm-${this.columnWidth}`;
      }
    },
    inputId() {
      return `input-${name}`;
    },
  },
  inject: {
    $validator: '$validator',
  },
};
</script>
<i18n>
en:
  required: Required
  additionalInfoKey: Additional info
de:
  required: Pflichtfeld
  additionalInfoKey: Zusätzliche Information
</i18n>
