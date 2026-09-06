/* Gatinos Selection — Teaser
   Blur Reveals (IntersectionObserver), Wort-Reveal.
   Kein Tracking, keine externen Aufrufe. */
(() => {
  document.documentElement.classList.add("js");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* scroll reveals */
  const revealables = [...document.querySelectorAll(".reveal")];
  if (reduced || !("IntersectionObserver" in window)) {
    revealables.forEach((el) => el.classList.add("in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    revealables.forEach((el) => io.observe(el));
  }

  /* music teaser: jedes Wort erwacht, wenn es in den Viewport kommt */
  const words = [...document.querySelectorAll(".music .w")];
  if (words.length) {
    if (reduced || !("IntersectionObserver" in window)) {
      words.forEach((w) => w.classList.add("on"));
    } else {
      const wordIo = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("on");
              wordIo.unobserve(entry.target);
            }
          }
        },
        { threshold: 1, rootMargin: "0px 0px -12% 0px" }
      );
      words.forEach((w) => wordIo.observe(w));
    }
  }
})();
