/* Name It Right: page interactions. No dependencies. */
(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var isPreview = doc.getAttribute("data-preview") === "true";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ---------- scroll progress + header state ---------- */
  var progress = $("#progress");
  var header = $("#header");
  var steps = $("#steps");
  var stepItems = steps ? $$(".step", steps) : [];
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = doc.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (header) header.classList.toggle("is-scrolled", y > 12);

    // steps timeline fill + active dots
    if (steps) {
      var r = steps.getBoundingClientRect();
      var mid = window.innerHeight * 0.55;
      var fill = Math.min(1, Math.max(0, (mid - r.top) / r.height));
      steps.style.setProperty("--fill", fill.toFixed(3));
      stepItems.forEach(function (li) {
        var dot = li.querySelector(".step-dot").getBoundingClientRect();
        li.classList.toggle("is-active", dot.top + dot.height / 2 < mid);
      });
    }
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  /* ---------- header CTA appears once the hero form is out of view ---------- */
  var signup = $("#signup");
  var finalSection = $("#final");
  if ("IntersectionObserver" in window && signup && header) {
    var formVisible = true, finalVisible = false;
    var update = function () { header.classList.toggle("show-cta", !formVisible && !finalVisible); };
    new IntersectionObserver(function (e) { formVisible = e[0].isIntersecting; update(); }, { threshold: 0 }).observe(signup);
    if (finalSection) new IntersectionObserver(function (e) { finalVisible = e[0].isIntersecting; update(); }, { threshold: 0.2 }).observe(finalSection);
  }

  /* ---------- reveal on scroll (only for content below the fold at load) ---------- */
  var revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          entry.target.classList.remove("pre-reveal");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealEls.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.classList.add("pre-reveal");
        io.observe(el);
      }
    });
  }

  /* ---------- count-up stats ---------- */
  var counters = $$("[data-count]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target, end = parseInt(el.getAttribute("data-count"), 10), start = null, dur = 1100 + end * 8;
        cio.unobserve(el);
        if (end <= 1) return;
        var stepFn = function (t) {
          if (!start) start = t;
          var p = Math.min(1, (t - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased);
          if (p < 1) requestAnimationFrame(stepFn);
        };
        el.textContent = "0";
        requestAnimationFrame(stepFn);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) cio.observe(el);
    });
  }

  /* ---------- final CTA swoosh paints in ---------- */
  if (finalSection && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e, obs) {
      if (e[0].isIntersecting) { finalSection.classList.add("in-view"); obs.disconnect(); }
    }, { threshold: 0.35 }).observe(finalSection);
  }

  /* ---------- hero glow follows the pointer ---------- */
  var hero = $("#hero");
  if (hero && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty("--gx", ((e.clientX - r.left) / r.width * 100).toFixed(1) + "%");
      hero.style.setProperty("--gy", ((e.clientY - r.top) / r.height * 60).toFixed(1) + "%");
    });
    hero.addEventListener("pointerleave", function () {
      hero.style.removeProperty("--gx"); hero.style.removeProperty("--gy");
    });
  }

  /* ---------- 3D booklet tilt ---------- */
  var booklet = $("#booklet");
  if (booklet && hero && finePointer && !reduceMotion) {
    hero.addEventListener("pointermove", function (e) {
      var r = booklet.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      var dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      booklet.style.setProperty("--ry", (-16 + dx * 22).toFixed(2) + "deg");
      booklet.style.setProperty("--rx", (6 - dy * 14).toFixed(2) + "deg");
      var cover = booklet.querySelector(".booklet-cover");
      if (cover) cover.style.setProperty("--shine", (dx * 120).toFixed(0) + "%");
    });
    hero.addEventListener("pointerleave", function () {
      booklet.style.removeProperty("--ry"); booklet.style.removeProperty("--rx");
    });
  }

  /* ---------- magnetic primary buttons ---------- */
  if (finePointer && !reduceMotion) {
    $$(".btn-primary").forEach(function (btn) {
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        btn.style.setProperty("--mx", ((e.clientX - r.left - r.width / 2) * 0.12).toFixed(1) + "px");
        btn.style.setProperty("--my", ((e.clientY - r.top - r.height / 2) * 0.22).toFixed(1) + "px");
      });
      btn.addEventListener("pointerleave", function () {
        btn.style.setProperty("--mx", "0px"); btn.style.setProperty("--my", "0px");
      });
    });
  }

  /* ---------- CTAs scroll to the form and focus the first empty field ---------- */
  var form = $("#signup-form");
  $$("[data-focus-form]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      if (!signup) return;
      e.preventDefault();
      signup.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
      var target = form && !$("#signup").classList.contains("is-done")
        ? ($("#first_name").value ? $("#email") : $("#first_name"))
        : $("#signup-success");
      if (target) setTimeout(function () { target.focus({ preventScroll: true }); }, reduceMotion ? 0 : 550);
    });
  });

  /* ---------- FAQ accordion ---------- */
  $$(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var open = !item.classList.contains("is-open");
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  /* ---------- sign-up form ---------- */
  if (!form) return;
  var fields = {
    first_name: { el: $("#first_name"), err: $("#first_name-err"), msg: "Add your first name so I know who I'm writing to." },
    email: { el: $("#email"), err: $("#email-err"), msg: "That email doesn't look right. Check for a typo." }
  };
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var status = $("#form-status");
  var btn = $("#submit-btn");

  function validate(name, show) {
    var f = fields[name], v = f.el.value.trim();
    var ok = name === "email" ? emailRe.test(v) : v.length > 0;
    var wrap = f.el.closest(".field");
    wrap.classList.toggle("is-valid", ok);
    if (show) {
      wrap.classList.toggle("has-error", !ok);
      f.err.textContent = ok ? "" : f.msg;
      f.el.setAttribute("aria-invalid", String(!ok));
    } else if (ok) {
      wrap.classList.remove("has-error"); f.err.textContent = ""; f.el.removeAttribute("aria-invalid");
    }
    return ok;
  }
  Object.keys(fields).forEach(function (name) {
    var el = fields[name].el;
    el.addEventListener("input", function () { validate(name, false); });
    el.addEventListener("blur", function () { if (el.value.trim()) validate(name, true); });
  });

  function showSuccess(email) {
    $("#success-email").textContent = email;
    signup.classList.add("is-done");
    setTimeout(function () { $("#signup-success").focus({ preventScroll: true }); }, 50);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    status.textContent = "";
    var okName = validate("first_name", true), okEmail = validate("email", true);
    if (!okName || !okEmail) {
      (okName ? fields.email.el : fields.first_name.el).focus();
      form.animate && !reduceMotion && form.animate(
        [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
        { duration: 320, easing: "ease-out" });
      return;
    }
    var payload = {
      first_name: fields.first_name.el.value.trim(),
      email: fields.email.el.value.trim(),
      website: $("#website").value
    };
    btn.classList.add("is-loading");

    if (isPreview) {
      setTimeout(function () { btn.classList.remove("is-loading"); showSuccess(payload.email); }, 900);
      return;
    }

    fetch(form.getAttribute("data-endpoint") || "/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error(data.error || "Something went wrong on my end.");
        return data;
      });
    }).then(function () {
      showSuccess(payload.email);
    }).catch(function (err) {
      status.textContent = (err && err.message ? err.message : "Something went wrong on my end.") + " Please try again in a moment.";
    }).then(function () {
      btn.classList.remove("is-loading");
    });
  });
})();
