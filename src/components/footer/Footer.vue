<template>
  <div id="footer" class="footer">
    <div class="container">
      <div class="row text-uppercase">
        <div class="col-sm-2">
          <div class="footer-col">
            <ul>
              <li class="footer-title hidden-xs">{{ $t('customerCare') }}</li>
              <li><a href="#">{{ $t('contactUs') }}</a></li>
              <li><a href="#">{{ $t('help') }}</a></li>
              <li><a href="#">{{ $t('shipping') }}</a></li>
              <li><a href="#">{{ $t('returns') }}</a></li>
              <li><a href="#">{{ $t('sizeGuide') }}</a></li>
            </ul>
          </div>
        </div>
        <div class="col-sm-2 hidden-xs">
          <div class="footer-col">
            <ul>
              <li class="footer-title hidden-xs">{{ $t('aboutUs') }}</li>
              <li><a href="#">{{ $t('ourStory') }}</a></li>
              <li><a href="#">{{ $t('careers') }}</a></li>
            </ul>
          </div>
        </div>
        <div class="col-sm-2 hidden-xs">
          <div class="footer-col">
            <ul>
              <li class="footer-title hidden-xs">{{ $t('shortcuts') }}</li>
              <li><a href="#">{{ $t('myAccount') }}</a></li>
              <li><a href="#">{{ $t('storeLocator') }}</a></li>
              <li><a href="#">{{ $t('giftCards') }}</a></li>
              <li><a href="#">{{ $t('payment') }}</a></li>
            </ul>
          </div>
        </div>
        <div class="col-sm-6 text-center newsletter-box">
          <div class="row">
            <div class="col-sm-5 text-left footer-title-yellow">
              <p>{{ $t('joinNewsletter') }}</p>
            </div>
            <div class="col-sm-7">
              <form id="form-newsletter" class="email-submit">
                <input name="email" id="newsletter-input" class="email-box" type="email" :placeholder="$t('yourEmail')" required>
                <button id="newsletter-button" type="submit" class="search-button">
                  <span class="icon-font icon-next"></span>
                  <span class="sr-only">{{ $t('subscribe') }}</span>
                </button>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-8 text-left card-info footer-title">
              <p>{{ $t('paySecure') }}</p>
              <img src="~@/assets/img/cards.png" alt="payment types" class="img-responsive payment-cards">
            </div>
            <div class="col-sm-4 text-left card-info footer-title">
              <p>{{ $t('followUs') }}</p>
              <ul class="social-icons">
                <a href=""><li><img class="social-icon" src="~@/assets/img/Facebook.png" alt="Facebook"></li></a>
                <a href=""><li><img class="social-icon" src="~@/assets/img/Pinterest.png" alt="Pinterest"></li></a>
                <a href=""><li><img class="social-icon" src="~@/assets/img/Google.png" alt="Google+"></li></a>
              </ul>
            </div>
          </div>
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
  customerCare: customer care
  contactUs: contact us
  help: help
  shipping: shipping
  returns: returns
  sizeGuide: size guide
  aboutUs: about us
  ourStory: our story
  careers: careers
  shortcuts: shortcuts
  myAccount: my account
  storeLocator: store locator
  giftCards: gift cards
  payment: payment
  joinNewsletter: join our newsletter
  subscribe: subscribe
  followUs: follow us
  paySecure: pay securely with these payment methods
  yourEmail: your email...
de:
  customerCare: KUNDENSERVICE
  contactUs: KONTAKTIEREN SIE UNS
  help: HILFE
  shipping: VERSAND
  returns: RETOURE
  sizeGuide: GRÖSSENTABELLE
  aboutUs: ÜBER UNS
  ourStory: UNSERE GESCHICHTE
  careers: KARRIERE
  shortcuts: shortcuts
  myAccount: MEIN KONTO
  storeLocator: FILIALE SUCHEN
  giftCards: GESCHENKKARTEN
  payment: ZAHLUNG
  joinNewsletter: NEWSLETTER ABONNIEREN
  subscribe: subscribe
  followUs: follow us
  paySecure: SICHER ZAHLEN
  yourEmail: Ihre E-Mail Adresse...
</i18n>
