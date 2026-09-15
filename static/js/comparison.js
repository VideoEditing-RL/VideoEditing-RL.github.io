/* Builds the comparison sections from window.COMPARISON_DATA.
 *
 * Two kinds of block are produced. Frame grids show every method at the same
 * time slot, so scrubbing the slider steps all methods through the clip
 * together. Video grids play the raw results, each at its own frame rate.
 * Either way, media loads only once a block scrolls into view, and playback
 * runs only while it stays there.
 */
(function () {
  "use strict";

  var DATA = window.COMPARISON_DATA;
  var root = document.getElementById("cmp-clips");
  var videoRoot = document.getElementById("cmp-videos");
  if (!DATA || (!root && !videoRoot)) {
    return;
  }

  var FPS = 4;
  var LABELS = { org: "Input", our: "Ours", our_5b: "Ours (5B)" };
  var CATEGORIES = {
    global_style: "Global Style",
    local_add: "Local Add",
    local_change: "Local Change",
    local_remove: "Local Remove",
    background_change: "Background Change",
    creative_edit: "Creative Edit",
    subtitle_edit: "Subtitle Edit"
  };

  var reduceMotion = window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function pretty(name, table) {
    if (table[name]) {
      return table[name];
    }
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");
  }

  function roleOf(method) {
    if (method === "org") {
      return "input";
    }
    return method.indexOf("our") === 0 ? "ours" : "baseline";
  }

  function makeHead(clip) {
    var head = document.createElement("div");
    head.className = "cmp-clip-head";
    head.innerHTML = '<span class="cmp-badge"></span>'
      + '<span class="cmp-instruction"></span>'
      + '<span class="cmp-clip-id"></span>';
    var badge = head.querySelector(".cmp-badge");
    if (clip.category) {
      badge.textContent = pretty(clip.category, CATEGORIES);
    } else {
      badge.remove();
    }
    // Category folders name their clips after the instruction, cut to a fixed
    // width, so those captions get an ellipsis. Clips filed without a category
    // are named after the footage instead and read fine as they are.
    var caption = clip.instruction || clip.clip;
    head.querySelector(".cmp-instruction").textContent =
      clip.category ? caption + "\u2026" : caption;
    head.querySelector(".cmp-clip-id").textContent =
      clip.id ? "#" + clip.id : "";
    return head;
  }

  function makeGrid(aspect, methodCount) {
    var grid = document.createElement("div");
    grid.className = "cmp-grid";
    // Column width is tuned so a desktop-width container lands on 5 portrait
    // or 3 landscape tiles per row; narrower screens drop columns on their own.
    // A narrower minimum buys a fourth landscape column when 3 would strand a
    // single tile on the last row.
    var minWidth = 200;
    if (aspect >= 1) {
      minWidth = methodCount % 3 === 1 ? 270 : 300;
    }
    grid.style.gridTemplateColumns =
      "repeat(auto-fit, minmax(" + minWidth + "px, 1fr))";
    return grid;
  }

  function frameUrl(clip, method, slot) {
    var padded = "s" + ("00" + slot).slice(-3);
    return DATA.base + "/" + clip.category + "/" + clip.clip + "/" + method
      + "/" + padded + ".jpg";
  }

  function ClipView(clip) {
    this.clip = clip;
    this.slot = 0;
    this.timer = null;
    this.loaded = false;
    this.images = [];
    this.build();
  }

  ClipView.prototype.build = function () {
    var self = this;
    var clip = this.clip;

    var block = document.createElement("section");
    block.className = "cmp-clip";
    block.dataset.category = clip.category;

    block.appendChild(makeHead(clip));

    var controls = document.createElement("div");
    controls.className = "cmp-controls";

    this.playBtn = document.createElement("button");
    this.playBtn.type = "button";
    this.playBtn.className = "cmp-play";
    this.playBtn.setAttribute("aria-label", "Play frame sequence");
    this.playBtn.textContent = "\u25B6";
    this.playBtn.addEventListener("click", function () {
      if (self.timer) {
        self.stop();
      } else {
        self.start();
      }
    });
    controls.appendChild(this.playBtn);

    this.scrub = document.createElement("input");
    this.scrub.type = "range";
    this.scrub.className = "cmp-scrub";
    this.scrub.min = 0;
    this.scrub.max = clip.slots - 1;
    this.scrub.step = 1;
    this.scrub.value = 0;
    this.scrub.setAttribute("aria-label", "Frame");
    this.scrub.addEventListener("input", function () {
      self.stop();
      self.show(parseInt(self.scrub.value, 10));
    });
    controls.appendChild(this.scrub);

    this.counter = document.createElement("span");
    this.counter.className = "cmp-counter";
    controls.appendChild(this.counter);

    block.appendChild(controls);

    var grid = makeGrid(clip.aspect, clip.methods.length);

    clip.methods.forEach(function (method) {
      var tile = document.createElement("figure");
      tile.className = "cmp-tile";
      tile.dataset.role = roleOf(method);

      var box = document.createElement("div");
      box.className = "cmp-frame";
      box.style.setProperty("--cmp-ar", String(clip.aspect));

      var img = document.createElement("img");
      img.alt = pretty(method, LABELS) + " result";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = frameUrl(clip, method, 0);
      box.appendChild(img);

      var caption = document.createElement("figcaption");
      caption.textContent = pretty(method, LABELS);

      tile.appendChild(box);
      tile.appendChild(caption);
      grid.appendChild(tile);
      self.images.push({ method: method, img: img });
    });

    block.appendChild(grid);
    this.el = block;
    this.show(0);
  };

  ClipView.prototype.show = function (slot) {
    var clip = this.clip;
    this.slot = ((slot % clip.slots) + clip.slots) % clip.slots;
    var self = this;
    this.images.forEach(function (entry) {
      entry.img.src = frameUrl(clip, entry.method, self.slot);
    });
    this.scrub.value = this.slot;
    this.counter.textContent = "frame " + (this.slot + 1) + " / " + clip.slots;
  };

  /* Pull the whole sequence in one go so playback and scrubbing stay smooth. */
  ClipView.prototype.preload = function () {
    if (this.loaded) {
      return;
    }
    this.loaded = true;
    var clip = this.clip;
    clip.methods.forEach(function (method) {
      for (var slot = 0; slot < clip.slots; slot += 1) {
        var img = new Image();
        img.src = frameUrl(clip, method, slot);
      }
    });
  };

  ClipView.prototype.start = function () {
    if (this.timer) {
      return;
    }
    var self = this;
    this.preload();
    this.playBtn.textContent = "\u2016";
    this.playBtn.setAttribute("aria-label", "Pause frame sequence");
    this.timer = window.setInterval(function () {
      self.show(self.slot + 1);
    }, 1000 / FPS);
  };

  ClipView.prototype.stop = function () {
    if (!this.timer) {
      return;
    }
    window.clearInterval(this.timer);
    this.timer = null;
    this.playBtn.textContent = "\u25B6";
    this.playBtn.setAttribute("aria-label", "Play frame sequence");
  };

  /* Whole-video comparison. Results differ in length and frame rate, so each
   * tile loops at its own pace rather than pretending to be frame-synced. */
  function VideoView(clip) {
    this.clip = clip;
    this.videos = [];
    this.loaded = false;
    this.playing = false;
    this.build();
  }

  VideoView.prototype.build = function () {
    var self = this;
    var clip = this.clip;

    var block = document.createElement("section");
    block.className = "cmp-clip";
    block.dataset.category = clip.category || "uncategorized";
    block.appendChild(makeHead(clip));

    var controls = document.createElement("div");
    controls.className = "cmp-controls";
    this.playBtn = document.createElement("button");
    this.playBtn.type = "button";
    this.playBtn.className = "cmp-play";
    this.playBtn.textContent = "\u25B6";
    this.playBtn.setAttribute("aria-label", "Play all results");
    this.playBtn.addEventListener("click", function () {
      if (self.playing) {
        self.stop();
      } else {
        self.start();
      }
    });
    controls.appendChild(this.playBtn);

    var hint = document.createElement("span");
    hint.className = "cmp-hint";
    hint.textContent = "each result loops at its own frame rate";
    controls.appendChild(hint);
    block.appendChild(controls);

    var grid = makeGrid(1.778, clip.methods.length);
    clip.methods.forEach(function (method) {
      var tile = document.createElement("figure");
      tile.className = "cmp-tile";
      tile.dataset.role = roleOf(method);

      var box = document.createElement("div");
      box.className = "cmp-frame";

      var video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.preload = "none";
      video.dataset.src = DATA.videoBase + "/" + clip.dir + "/" + method + ".mp4";
      // Tile shape follows the input clip, once its dimensions are known.
      if (method === "org") {
        video.addEventListener("loadedmetadata", function () {
          if (video.videoWidth && video.videoHeight) {
            var ar = video.videoWidth / video.videoHeight;
            grid.querySelectorAll(".cmp-frame").forEach(function (el) {
              el.style.setProperty("--cmp-ar", String(ar));
            });
            grid.style.gridTemplateColumns =
              makeGrid(ar, clip.methods.length).style.gridTemplateColumns;
          }
        });
      }
      box.appendChild(video);

      var caption = document.createElement("figcaption");
      caption.textContent = pretty(method, LABELS);

      tile.appendChild(box);
      tile.appendChild(caption);
      grid.appendChild(tile);
      self.videos.push(video);
    });

    block.appendChild(grid);
    this.el = block;
  };

  VideoView.prototype.preload = function () {
    if (this.loaded) {
      return;
    }
    this.loaded = true;
    this.videos.forEach(function (video) {
      video.src = video.dataset.src;
      video.preload = "metadata";
      video.load();
    });
  };

  VideoView.prototype.start = function () {
    this.preload();
    this.playing = true;
    this.playBtn.textContent = "\u2016";
    this.playBtn.setAttribute("aria-label", "Pause all results");
    this.videos.forEach(function (video) {
      var attempt = video.play();
      if (attempt && attempt.catch) {
        attempt.catch(function () { /* autoplay refused; the button still works */ });
      }
    });
  };

  VideoView.prototype.stop = function () {
    this.playing = false;
    this.playBtn.textContent = "\u25B6";
    this.playBtn.setAttribute("aria-label", "Play all results");
    this.videos.forEach(function (video) {
      video.pause();
    });
  };

  var views = [];

  if (videoRoot) {
    (DATA.videos || []).forEach(function (clip) {
      var view = new VideoView(clip);
      videoRoot.appendChild(view.el);
      views.push(view);
    });
  }

  var frameViews = [];
  if (root) {
    (DATA.clips || []).forEach(function (clip) {
      var view = new ClipView(clip);
      root.appendChild(view.el);
      frameViews.push(view);
      views.push(view);
    });
  }

  /* Filter chips for the frame grids, one per category present in the data. */
  var filters = document.getElementById("cmp-filters");
  if (filters && frameViews.length) {
    var seen = [];
    frameViews.forEach(function (view) {
      if (seen.indexOf(view.clip.category) === -1) {
        seen.push(view.clip.category);
      }
    });

    var chips = [];
    function select(value) {
      chips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", String(chip.dataset.value === value));
      });
      frameViews.forEach(function (view) {
        var match = value === "all" || view.clip.category === value;
        view.el.hidden = !match;
        if (!match) {
          view.stop();
        }
      });
    }

    [{ value: "all", text: "All" }].concat(seen.map(function (c) {
      return { value: c, text: pretty(c, CATEGORIES) };
    })).forEach(function (spec) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "cmp-chip";
      chip.dataset.value = spec.value;
      chip.textContent = spec.text;
      chip.setAttribute("aria-pressed", String(spec.value === "all"));
      chip.addEventListener("click", function () {
        select(spec.value);
      });
      filters.appendChild(chip);
      chips.push(chip);
    });
  }

  /* Only the clips on screen fetch frames and animate. */
  if (window.IntersectionObserver) {
    var byElement = new Map();
    views.forEach(function (view) {
      byElement.set(view.el, view);
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var view = byElement.get(entry.target);
        if (!view) {
          return;
        }
        if (entry.isIntersecting) {
          view.preload();
          if (!reduceMotion) {
            view.start();
          }
        } else {
          view.stop();
        }
      });
    }, { rootMargin: "120px 0px", threshold: 0.25 });
    views.forEach(function (view) {
      observer.observe(view.el);
    });
  } else {
    views.forEach(function (view) {
      view.preload();
    });
  }
}());
