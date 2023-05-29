export const environment = {
  production: false,
  hmr: true,
  /*
  gateway:            'https://monitor-dot-stunning-base-164402.uc.r.appspot.com/_ah/api',            // Backend 2.0gateway30:          'https://prod-10-02-dot-monitor30-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/monitor', // Backend 3.0
  gateway30:          'https://prod-report-dot-monitor30-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/monitor',
  gateway30Dashboard: 'https://ord-tracking-dot-monitor30-dashboard-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/monitor',    // DASHBOARD
  gateway30Reports:   'https://prod-report-dot-monitor30-reports-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/monitor',
  gateway30Antifraud: 'https://antifraud-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/antifraud',
  gatewayFirebase:    'https://sturdy-spanner-212219.firebaseio.com/appMensajerosQA',            // PROD PROVISIONAL
  */
  gateway:            'https://monitor-dot-stunning-base-164402.uc.r.appspot.com/_ah/api/',            // Backend 2.0
  gateway30:          'https://monitor30-dot-stunning-base-164402.appspot.com/backend/flexible/v2/monitor',                  // Backend 3.0
  gateway30Antifraud: 'https://antifraud-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/antifraud',
  gateway30Dashboard: 'https://monitor30-dashboard-dot-stunning-base-164402.appspot.com/backend/flexible/v2/monitor',    // DASHBOARD
  gateway30Reports:   'https://monitor30-reports-dot-stunning-base-164402.appspot.com/backend/flexible/v2/monitor',          // REPORTS
  gatewayFirebase:    'https://sturdy-spanner-212219.firebaseio.com/appMensajerosQA',            // PROD PROVISIONAL

  gateway30SAS:       'https://sas-v30-dot-stunning-base-164402.appspot.com',
  gatewaySB:          'https://stunning-base-164402.appspot.com/_ah/api', 
  payments:           'https://payments-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v1/payments',
  zendesk:            'https://prod-dot-zendesk-dot-stunning-base-164402.uc.r.appspot.com/backend/flexible/v2/zendesk',
  firebaseConfig: {
    apiKey: "AIzaSyCUq3JkyEgJ2WJuTj-KQyaQXgY59d8z4MQ",
    authDomain: "stunning-base-164402.firebaseapp.com",
    databaseURL: 'https://stunning-base-scan-and-go.firebaseio.com',
    projectId: "stunning-base-164402",
    storageBucket: "stunning-base-164402.appspot.com",
    messagingSenderId: "211585366551",
    appId: "1:211585366551:web:ad4406f1ab31d3df413a52",    measurementId: "G-2G8D42WFD"
  },
  // no modificar
  countryName: 'Colombia',
  indicator: 'COL',
  isColombia: true,
  isVenezuela: false,
  currency: 'COP',
  cctld: 'co',
  coordinates: [4.60971, -74.08175]
}
