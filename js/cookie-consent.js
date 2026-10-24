(() => {
  "use strict";

  const CONSENT_KEY = "tarsia_cookie_consent_v1";
  const GA_ID = "G-KJQBYGJQTY"; // Sostituire con l'ID GA4 reale.
  let banner = null;
  let gaLoaded = false;

  function readConsent() {
    try {
      const value = localStorage.getItem(CONSENT_KEY);
      return value ? JSON.parse(value) : null;
    } catch (_) {
      return null;
    }
  }

  function validGaId() {
    return GA_ID !== "G-XXXXXXXXXX" && /^G-[A-Z0-9]+$/.test(GA_ID);
  }

  function updateAnalyticsConsent(granted) {
    if (!validGaId()) return;

    // Blocca gli invii Analytics successivi alla revoca.
    window["ga-disable-" + GA_ID] = !granted;

    if (granted) {
      loadAnalytics();
      return;
    }

    // Elimina i cookie Analytics accessibili sul dominio corrente.
    document.cookie.split(";").forEach(cookie => {
      const name = cookie.split("=")[0].trim();
      if (name === "_ga" || name.startsWith("_ga_")) {
        document.cookie = name +
          "=; Max-Age=0; path=/; SameSite=Lax";
      }
    });
  }

  function loadAnalytics() {
    if (!validGaId() || gaLoaded) return;
    if (!readConsent()?.analytics) return;

    gaLoaded = true;
    window["ga-disable-" + GA_ID] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };

    window.gtag("consent", "default", {
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied"
    });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { anonymize_ip: true });

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    script.dataset.tarsiaGa = "true";
    document.head.appendChild(script);
  }

  function saveConsent(analytics) {
    const choice = {
      necessary: true,
      analytics: Boolean(analytics),
      updatedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    } catch (_) {}

    updateAnalyticsConsent(choice.analytics);
    closeBanner();
  }

  function closeBanner() {
    if (banner) banner.remove();
    banner = null;
  }

  function openBanner() {
    closeBanner();
    const saved = readConsent();

    banner = document.createElement("section");
    banner.className = "cookie-banner-tarsia";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-modal", "true");
    banner.setAttribute("aria-labelledby", "cookie-tarsia-title");

    banner.innerHTML = `
      <div class="cookie-banner-tarsia__inner">
        <h2 id="cookie-tarsia-title">La tua privacy</h2>
        <p>Questo sito utilizza strumenti tecnici necessari al suo funzionamento. Con il tuo consenso potremo utilizzare Google Analytics per analizzare le visite. Puoi accettare, rifiutare o personalizzare la scelta.</p>
        <p><a href="privacy.html">Leggi le note legali e l'informativa</a></p>
        <div class="cookie-preferences" hidden>
          <label><input type="checkbox" checked disabled> Strumenti tecnici necessari</label>
          <label><input type="checkbox" id="cookie-analytics-choice" ${saved && saved.analytics ? "checked" : ""}> Google Analytics (statistiche)</label>
          <button type="button" data-cookie-save>Salva le preferenze</button>
        </div>
        <div class="cookie-actions">
          <button type="button" data-cookie-accept>Accetta tutti</button>
          <button type="button" data-cookie-reject>Rifiuta</button>
          <button type="button" data-cookie-custom>Personalizza</button>
        </div>
      </div>`;

    document.body.appendChild(banner);

    banner.querySelector("[data-cookie-accept]").addEventListener("click", () => saveConsent(true));
    banner.querySelector("[data-cookie-reject]").addEventListener("click", () => saveConsent(false));
    banner.querySelector("[data-cookie-custom]").addEventListener("click", () => {
      banner.querySelector(".cookie-preferences").hidden = false;
    });
    banner.querySelector("[data-cookie-save]").addEventListener("click", () => {
      saveConsent(banner.querySelector("#cookie-analytics-choice").checked);
    });
  }

  document.addEventListener("click", event => {
    const link = event.target.closest("[data-cookie-settings]");
    if (!link) return;
    event.preventDefault();
    openBanner();
  });

  const saved = readConsent();
  if (saved && saved.analytics) {
    loadAnalytics();
  }
  if (!saved) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", openBanner, { once: true });
    } else {
      openBanner();
    }
  }
})();
