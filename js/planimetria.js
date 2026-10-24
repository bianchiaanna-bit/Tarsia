(() => {
  "use strict";

  const contenitore = document.getElementById("visualizzatore-planimetria");
  const meno = document.getElementById("zoom-meno");
  const piu = document.getElementById("zoom-piu");
  const reset = document.getElementById("zoom-reset");
  const fullscreen = document.getElementById("zoom-fullscreen");
  const livello = document.getElementById("zoom-livello");

  if (!contenitore || !meno || !piu || !reset || !livello || !fullscreen) return;

  const MIN = 1;
  const MAX = 8;
  const PDF_URL = "immagini/planimetria.pdf";

  let pagina = null;
  let scala = 1;
  let scalaBase = 1;
  let x = 0;
  let y = 0;
  let larghezza = 0;
  let altezza = 0;
  let rendering = false;
  let renderRichiesto = false;
  let renderTask = null;
  let frameRender = 0;
  let trascinamento = null;
  let puntatori = new Map();
  let pinch = null;

  const canvas = document.createElement("canvas");
  canvas.id = "planimetria-canvas";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "Planimetria del cimitero comunale di Tarsia");
  canvas.style.cssText =
    "position:absolute;left:0;top:0;display:block;pointer-events:none;" +
    "transform-origin:0 0;max-width:none;margin:0;padding:0;border:0;";

  const contesto = canvas.getContext("2d", { alpha: false });
  const immaginePrecedente = document.getElementById("planimetria");
  if (immaginePrecedente) immaginePrecedente.remove();
  contenitore.appendChild(canvas);

  function limiti() {
    return { w: contenitore.clientWidth, h: contenitore.clientHeight };
  }

  function limitaPosizione() {
    const { w, h } = limiti();
    x = Math.min(0, Math.max(w * (1 - scala), x));
    y = Math.min(0, Math.max(h * (1 - scala), y));
  }

  function programmaRender() {
    if (frameRender) cancelAnimationFrame(frameRender);
    frameRender = requestAnimationFrame(() => {
      frameRender = 0;
      renderizza();
    });
  }

  function aggiorna(ridisegna = false) {
    limitaPosizione();
    canvas.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scala})`;
    livello.textContent = `${Math.round(scala * 100)}%`;
    meno.disabled = scala <= MIN;
    piu.disabled = scala >= MAX;
    contenitore.classList.toggle("zoom-attivo", scala > MIN);
    if (ridisegna) programmaRender();
  }

  async function renderizza() {
    if (!pagina) return;

    if (rendering) {
      renderRichiesto = true;
      return;
    }

    rendering = true;
    renderRichiesto = false;

    try {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 3);
      const viewport = pagina.getViewport({
        scale: scalaBase * pixelRatio * scala
      });

      const nuovaLarghezza = Math.max(1, Math.round(viewport.width));
      const nuovaAltezza = Math.max(1, Math.round(viewport.height));

      canvas.width = nuovaLarghezza;
      canvas.height = nuovaAltezza;
      canvas.style.width = `${larghezza}px`;
      canvas.style.height = `${altezza}px`;

      const task = pagina.render({
        canvasContext: contesto,
        viewport
      });
      renderTask = task;

      await task.promise;
    } catch (e) {
      if (e?.name !== "RenderingCancelledException") {
        console.error("Errore nel rendering della planimetria:", e);
      }
    } finally {
      renderTask = null;
      rendering = false;

      if (renderRichiesto) {
        renderRichiesto = false;
        programmaRender();
      }
    }
  }

  function adattaAllaVista() {
    if (!pagina) return;

    const viewportOriginale = pagina.getViewport({ scale: 1 });
    contenitore.style.aspectRatio =
      `${viewportOriginale.width} / ${viewportOriginale.height}`;

    const { w, h } = limiti();
    scalaBase = Math.min(
      w / viewportOriginale.width,
      h / viewportOriginale.height
    );

    larghezza = viewportOriginale.width * scalaBase;
    altezza = viewportOriginale.height * scalaBase;

    canvas.style.left = `${(w - larghezza) / 2}px`;
    canvas.style.top = `${(h - altezza) / 2}px`;
    canvas.style.width = `${larghezza}px`;
    canvas.style.height = `${altezza}px`;

    scala = 1;
    x = 0;
    y = 0;
    trascinamento = null;
    aggiorna(true);
  }

  function zoomSu(nuovaScala, px, py) {
    nuovaScala = Math.max(MIN, Math.min(MAX, nuovaScala));

    const rett = contenitore.getBoundingClientRect();
    const puntoX = px - rett.left;
    const puntoY = py - rett.top;

    const immagineX = (puntoX - x) / scala;
    const immagineY = (puntoY - y) / scala;

    scala = nuovaScala;
    x = puntoX - immagineX * scala;
    y = puntoY - immagineY * scala;

    aggiorna(true);
  }

  function zoomCentro(fattore) {
    const rett = contenitore.getBoundingClientRect();
    zoomSu(
      scala * fattore,
      rett.left + rett.width / 2,
      rett.top + rett.height / 2
    );
  }

  contenitore.addEventListener("wheel", e => {
    if (e.target.closest(".controlli-planimetria")) return;
    e.preventDefault();
    zoomSu(scala * (e.deltaY < 0 ? 1.15 : 1 / 1.15), e.clientX, e.clientY);
  }, { passive: false });

  piu.addEventListener("click", () => zoomCentro(1.25));
  meno.addEventListener("click", () => zoomCentro(1 / 1.25));
  reset.addEventListener("click", adattaAllaVista);

  function aggiornaStatoFullscreen() {
    const attivo = document.fullscreenElement === contenitore ||
      contenitore.classList.contains("planimetria-fullscreen-attiva");

    fullscreen.textContent = attivo ? "×" : "⛶";
    fullscreen.title = attivo ? "Esci dallo schermo intero" : "Schermo intero";
    fullscreen.setAttribute(
      "aria-label",
      attivo ? "Esci dalla planimetria a schermo intero" : "Apri planimetria a schermo intero"
    );
    document.body.classList.toggle(
      "planimetria-blocco-scroll",
      contenitore.classList.contains("planimetria-fullscreen-attiva")
    );
  }

  async function attivaFullscreen() {
    if (contenitore.classList.contains("planimetria-fullscreen-attiva") ||
        document.fullscreenElement === contenitore) {
      await disattivaFullscreen();
      return;
    }

    if (contenitore.requestFullscreen) {
      try {
        await contenitore.requestFullscreen();
        return;
      } catch (e) {
        // Se il browser rifiuta la modalità nativa, usa il pannello sovrapposto.
      }
    }

    contenitore.classList.add("planimetria-fullscreen-attiva");
    aggiornaStatoFullscreen();
    requestAnimationFrame(() => adattaAllaVista());
  }

  async function disattivaFullscreen() {
    if (contenitore.classList.contains("planimetria-fullscreen-attiva")) {
      contenitore.classList.remove("planimetria-fullscreen-attiva");
      aggiornaStatoFullscreen();
      requestAnimationFrame(() => adattaAllaVista());
      return;
    }

    if (document.fullscreenElement === contenitore && document.exitFullscreen) {
      try {
        await document.exitFullscreen();
      } catch (e) {
        console.warn("Impossibile uscire dalla modalità a schermo intero:", e);
      }
    }
  }

  fullscreen.addEventListener("click", attivaFullscreen);
  document.addEventListener("fullscreenchange", () => {
    aggiornaStatoFullscreen();
    requestAnimationFrame(() => {
      if (pagina) adattaAllaVista();
    });
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" &&
        contenitore.classList.contains("planimetria-fullscreen-attiva")) {
      disattivaFullscreen();
    }
  });


  contenitore.addEventListener("dblclick", e => {
    if (e.target.closest(".controlli-planimetria")) return;
    e.preventDefault();
    zoomSu(scala > 1 ? 1 : 2, e.clientX, e.clientY);
  });

  contenitore.addEventListener("pointerdown", e => {
    if (e.target.closest(".controlli-planimetria")) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;

    contenitore.setPointerCapture(e.pointerId);
    puntatori.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (puntatori.size === 1) {
      trascinamento = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        baseX: x,
        baseY: y
      };
    } else if (puntatori.size === 2) {
      const p = [...puntatori.values()];
      pinch = {
        distanza: Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y),
        scala,
        centro: {
          x: (p[0].x + p[1].x) / 2,
          y: (p[0].y + p[1].y) / 2
        }
      };
      trascinamento = null;
    }
  });

  contenitore.addEventListener("pointermove", e => {
    if (!puntatori.has(e.pointerId)) return;
    puntatori.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (puntatori.size >= 2 && pinch) {
      const p = [...puntatori.values()];
      const distanza = Math.hypot(p[1].x - p[0].x, p[1].y - p[0].y);
      const centro = {
        x: (p[0].x + p[1].x) / 2,
        y: (p[0].y + p[1].y) / 2
      };

      const vecchiaScala = scala;
      zoomSu(
        pinch.scala * (distanza / Math.max(1, pinch.distanza)),
        pinch.centro.x,
        pinch.centro.y
      );

      x += centro.x - pinch.centro.x;
      y += centro.y - pinch.centro.y;
      aggiorna(scala !== vecchiaScala);
      return;
    }

    if (trascinamento && trascinamento.id === e.pointerId) {
      x = trascinamento.baseX + e.clientX - trascinamento.x;
      y = trascinamento.baseY + e.clientY - trascinamento.y;
      aggiorna();
    }
  });

  function finePuntatore(e) {
    puntatori.delete(e.pointerId);

    if (puntatori.size === 1) {
      const [id, p] = [...puntatori.entries()][0];
      trascinamento = {
        id,
        x: p.x,
        y: p.y,
        baseX: x,
        baseY: y
      };
    } else {
      trascinamento = null;
    }

    if (puntatori.size < 2) pinch = null;
  }

  contenitore.addEventListener("pointerup", finePuntatore);
  contenitore.addEventListener("pointercancel", finePuntatore);
  contenitore.addEventListener("lostpointercapture", finePuntatore);

  let larghezzaOsservata = 0;
  let altezzaOsservata = 0;
  let timerResize = 0;

  const osservatoreDimensioni = new ResizeObserver(entries => {
    const entry = entries[0];
    if (!entry || !pagina) return;

    const w = Math.round(entry.contentRect.width);
    const h = Math.round(entry.contentRect.height);

    if (!w || !h) return;
    if (w === larghezzaOsservata && h === altezzaOsservata) return;

    larghezzaOsservata = w;
    altezzaOsservata = h;

    clearTimeout(timerResize);
    timerResize = setTimeout(() => {
      if (pagina) adattaAllaVista();
    }, 120);
  });

  osservatoreDimensioni.observe(contenitore);

  window.addEventListener("resize", () => {
    if (pagina) adattaAllaVista();
  });

  async function avvia() {
    try {
      const pdfjsLib = await import("./vendor/pdfjs/pdf.mjs");
      pdfjsLib.GlobalWorkerOptions.workerSrc = "./js/vendor/pdfjs/pdf.worker.mjs";

      const documento = await pdfjsLib.getDocument(PDF_URL).promise;
      pagina = await documento.getPage(1);
      adattaAllaVista();
    } catch (e) {
      console.error("Impossibile caricare il PDF della planimetria:", e);
      livello.textContent = "Errore caricamento PDF";
    }
  }

  avvia();
})();
