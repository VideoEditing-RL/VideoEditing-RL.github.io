/* Builds the comparison sections from window.COMPARISON_DATA.
 *
 * Frame grids show every method at the same time slot, so scrubbing the slider
 * steps all methods through the clip together. They are split by model size:
 * one section per size group, each showing the input plus the methods in that
 * group. Video grids play the raw results instead, each at its own frame rate.
 * Either way media loads only once a block scrolls into view, and playback runs
 * only while it stays there.
 */
(function () {
  "use strict";

  var DATA = window.COMPARISON_DATA;
  var groupRoot = document.getElementById("cmp-groups");
  var videoRoot = document.getElementById("cmp-videos");
  if (!DATA || (!groupRoot && !videoRoot)) {
    return;
  }

  var FPS = 4;
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

  function prettyCategory(name) {
    if (CATEGORIES[name]) {
      return CATEGORIES[name];
    }
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");
  }

  /* Methods to show for a clip in a given size group: the input plus that
   * group's entries. Clips that only cover one group simply come back short. */
  function methodsFor(clip, groupId) {
    return clip.methods.filter(function (m) {
      return m.group === "input" || m.group === groupId;
    });
  }

  function hasGroup(clip, groupId) {
    return clip.methods.some(function (m) {
      return m.group === groupId;
    });
  }

  function makeHead(clip) {
    var head = document.createElement("div");
    head.className = "cmp-clip-head";

    var badge = document.createElement("span");
    badge.className = "cmp-badge";
    badge.textContent = clip.category
      ? prettyCategory(clip.category)
      : clip.benchmarkLabel || "";
    if (badge.textContent) {
      head.appendChild(badge);
    }

    var caption = document.createElement("span");
    caption.className = "cmp-instruction";
    // Category folders name their clips after the instruction, cut to a fixed
    // width, so those captions get an ellipsis. Clips filed without a category
    // are named after the footage instead and read fine as they are.
    var text = clip.instruction || clip.clip;
    caption.textContent = clip.category ? text + "\u2026" : text;
    head.appendChild(caption);

    var id = document.createElement("span");
    id.className = "cmp-clip-id";
    id.textContent = clip.id ? "#" + clip.id : "";
    head.appendChild(id);

    return head;
  }

  var WRAP_WIDTH = 1150;  /* .cmp-wrap at desktop width, minus its padding */
  var GRID_GAP = 11;      /* .cmp-grid gap, 0.7rem */

  /* Tile columns are set through a minimum width rather than a fixed count, so
   * narrow viewports drop columns on their own. The count below is what that
   * minimum yields at desktop width: portrait tiles fit five per row, landscape
   * three, bumped by one when the preferred count would strand a single tile on
   * the last row. */
  function makeGrid(aspect, methodCount) {
    var cols = aspect < 1 ? 5 : 3;
    if (methodCount > cols && methodCount % cols === 1) {
      cols += 1;
    }
    cols = Math.min(cols, methodCount);
    var minWidth = Math.floor((WRAP_WIDTH - GRID_GAP * (cols - 1)) / cols);

    var grid = document.createElement("div");
    grid.className = "cmp-grid";
    grid.style.gridTemplateColumns =
      "repeat(auto-fit, minmax(" + minWidth + "px, 1fr))";
    return grid;
  }

  function frameUrl(clip, method, slot) {
    var padded = "s" + ("00" + slot).slice(-3);
    return DATA.base + "/" + clip.dir + "/" + method + "/" + padded + ".jpg";
  }

  function ClipView(clip, methods) {
    this.clip = clip;
    this.methods = methods;
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
    block.dataset.benchmark = clip.benchmark;
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

    var grid = makeGrid(clip.aspect, this.methods.length);
    this.methods.forEach(function (method) {
      var tile = document.createElement("figure");
      tile.className = "cmp-tile";
      tile.dataset.role = method.role;

      var box = document.createElement("div");
      box.className = "cmp-frame";
      box.style.setProperty("--cmp-ar", String(clip.aspect));

      var img = document.createElement("img");
      img.alt = method.label + " result";
      img.loading = "lazy";
      img.decoding = "async";
      img.src = frameUrl(clip, method.name, 0);
      box.appendChild(img);

      var caption = document.createElement("figcaption");
      caption.textContent = method.label;

      tile.appendChild(box);
      tile.appendChild(caption);
      grid.appendChild(tile);
      self.images.push({ name: method.name, img: img });
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
      entry.img.src = frameUrl(clip, entry.name, self.slot);
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
    this.methods.forEach(function (method) {
      for (var slot = 0; slot < clip.slots; slot += 1) {
        var img = new Image();
        img.src = frameUrl(clip, method.name, slot);
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
    this.methods = clip.methods;
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
    block.dataset.benchmark = clip.benchmark;
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

    var grid = makeGrid(1.778, this.methods.length);
    this.methods.forEach(function (method) {
      var tile = document.createElement("figure");
      tile.className = "cmp-tile";
      tile.dataset.role = method.role;

      var box = document.createElement("div");
      box.className = "cmp-frame";

      var video = document.createElement("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.setAttribute("playsinline", "");
      video.preload = "none";
      video.dataset.src =
        DATA.videoBase + "/" + clip.dir + "/" + method.name + ".mp4";
      // Tile shape follows the input clip, once its dimensions are known.
      if (method.role === "input") {
        video.addEventListener("loadedmetadata", function () {
          if (video.videoWidth && video.videoHeight) {
            var ar = video.videoWidth / video.videoHeight;
            grid.querySelectorAll(".cmp-frame").forEach(function (el) {
              el.style.setProperty("--cmp-ar", String(ar));
            });
            grid.style.gridTemplateColumns =
              makeGrid(ar, self.methods.length).style.gridTemplateColumns;
          }
        });
      }
      box.appendChild(video);

      var caption = document.createElement("figcaption");
      caption.textContent = method.label;

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

  /* Benchmark filter chips scoped to one set of blocks. */
  function addFilters(host, views) {
    var seen = [];
    views.forEach(function (view) {
      var key = view.clip.benchmark;
      if (seen.indexOf(key) === -1) {
        seen.push(key);
      }
    });
    if (seen.length < 2) {
      return;
    }

    var chips = [];
    function select(value) {
      chips.forEach(function (chip) {
        chip.setAttribute("aria-pressed", String(chip.dataset.value === value));
      });
      views.forEach(function (view) {
        var match = value === "all" || view.clip.benchmark === value;
        view.el.hidden = !match;
        if (!match) {
          view.stop();
        }
      });
    }

    var specs = [{ value: "all", text: "All" }];
    seen.forEach(function (key) {
      var view = views.find(function (v) {
        return v.clip.benchmark === key;
      });
      specs.push({ value: key, text: view.clip.benchmarkLabel || key });
    });

    specs.forEach(function (spec) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "cmp-chip";
      chip.dataset.value = spec.value;
      chip.textContent = spec.text;
      chip.setAttribute("aria-pressed", String(spec.value === "all"));
      chip.addEventListener("click", function () {
        select(spec.value);
      });
      host.appendChild(chip);
      chips.push(chip);
    });
  }

  var views = [];

  /* One section per size group. */
  if (groupRoot) {
    (DATA.groups || []).forEach(function (group) {
      var clips = (DATA.clips || []).filter(function (clip) {
        return hasGroup(clip, group.id);
      });
      if (!clips.length) {
        return;
      }

      var section = document.createElement("section");
      section.className = "cmp-section";
      section.id = "comparison-" + group.id;

      var wrap = document.createElement("div");
      wrap.className = "cmp-wrap";

      var heading = document.createElement("h2");
      heading.className = "cmp-heading";
      heading.textContent = group.title;
      wrap.appendChild(heading);

      if (group.note) {
        var note = document.createElement("p");
        note.className = "cmp-intro";
        note.textContent = group.note
          + " Drag the slider to step all methods through the clip together,"
          + " or press play to run the sequence.";
        wrap.appendChild(note);
      }

      var filters = document.createElement("div");
      filters.className = "cmp-filters";
      wrap.appendChild(filters);

      var host = document.createElement("div");
      wrap.appendChild(host);

      var sectionViews = clips.map(function (clip) {
        var view = new ClipView(clip, methodsFor(clip, group.id));
        host.appendChild(view.el);
        views.push(view);
        return view;
      });

      addFilters(filters, sectionViews);

      section.appendChild(wrap);
      groupRoot.appendChild(section);
    });
  }

  if (videoRoot) {
    var videoViews = (DATA.videos || []).map(function (clip) {
      var view = new VideoView(clip);
      videoRoot.appendChild(view.el);
      views.push(view);
      return view;
    });
    var videoFilters = document.getElementById("cmp-video-filters");
    if (videoFilters) {
      addFilters(videoFilters, videoViews);
    }
  }

  /* Only the blocks on screen fetch media and animate. */
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
