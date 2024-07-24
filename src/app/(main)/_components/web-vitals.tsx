"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  // useReportWebVitals((metric) => {
  //   console.log("WebVitals-metric=", metric);
  // });
  useReportWebVitals((metric) => {
    switch (metric.name) {
      case "FCP":
        console.log("FCP", metric);
        break;
      case "LCP":
        console.log("LCP", metric);
        break;
      case "CLS":
        console.log("CLS", metric);
        break;
      case "FID":
        console.log("FID", metric);
        break;
      case "TTFB":
        console.log("TTFB", metric);
        break;
      default:
        break;
    }
    // 上报性能
    // const body = JSON.stringify(metric);
    // const url = "https://example.com/analytics";

    // // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    // if (navigator.sendBeacon) {
    //   navigator.sendBeacon(url, body);
    // } else {
    //   fetch(url, { body, method: "POST", keepalive: true });
    // }
  });
  // useReportWebVitals((metric) => {
  //   // Use `window.gtag` if you initialized Google Analytics as this example:
  //   // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_app.js
  //   window.gtag('event', metric.name, {
  //     value: Math.round(
  //       metric.name === 'CLS' ? metric.value * 1000 : metric.value
  //     ), // values must be integers
  //     event_label: metric.id, // id unique to current page load
  //     non_interaction: true, // avoids affecting bounce rate.
  //   })
  // })

  return null;
}

