//TODO
// 1. Add bugsnag support across all occurrences (set useBugsnag to true as well)
// 2. Add i18n app names for all the required apps
// 3. Add i18n app names for rewards-catalog-ui once locize setup is done
// 4. Add GTM support across all occurrences (set useGTM to true as well)

module.exports = {
  appName: 'rewards-catalog',
  intouchBaseUrl: 'nightly.intouch.capillarytech.com',
  prefix: '/rewards-catalog/ui',
  isHostedOnPlatform: false,
  appType: 'native',
  bugsnag: {
    useBugsnag: false,
    apiKey: 'dummy_key',
    retainSourceMaps: true,
  },
  useSourceMaps: true,
  i18n: {
    useI18n: true,
    customI18n: false,
    localI18n: false,
    appNames: ['loyalty_plus', 'coupons_v2'],
    locales: [],
    defaultLocale: null,
  },
  gtm: {
    useGTM: false,
    trackingId: 'dummy_key',
    projectId: 'dummy_id',
  },
  useNavigationComponent: true,
  useTestSetup: true,
};
