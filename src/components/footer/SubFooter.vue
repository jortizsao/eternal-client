<template>
  <div id="subfooter" class="sub-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <ul class="footer-title imprint-row text-center">
            <li class="hidden-xs">© 2018 Javier Ortiz Saorin <a href="https://www.orsaorin.com" target="_blank">(www.orsaorin.com / javier@orsaorin.com)</a></li>
            <li class="visible-xs">{{ $t('legalInfo') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>
<i18n>
en:
  legalInfo: © 2018 Javier Ortiz Saorin (http://www.orsaorin.com / javier@orsaorin.com)
de:
  legalInfo: © 2018 Javier Ortiz Saorin (http://www.orsaorin.com / javier@orsaorin.com)
</i18n>
