var G = Object.defineProperty;
var L = (h, n, e) => n in h ? G(h, n, { enumerable: !0, configurable: !0, writable: !0, value: e }) : h[n] = e;
var x = (h, n, e) => (L(h, typeof n != "symbol" ? n + "" : n, e), e);
class T {
  constructor(n) {
    x(this, "cvs");
    this.cvs = n;
  }
  process(n) {
    let e, t;
    n instanceof HTMLImageElement ? (e = n.naturalWidth, t = n.naturalHeight) : n instanceof HTMLCanvasElement ? (e = n.width, t = n.height) : (e = n.videoWidth, t = n.videoHeight);
    const s = this.cvs.getContext("2d");
    if (this.cvs.width = e, this.cvs.height = t, s) {
      s.drawImage(n, 0, 0);
      const a = s.getImageData(0, 0, this.cvs.width, this.cvs.height), l = a.data;
      for (var r = 0; r < l.length; r += 4) {
        const v = l[r], d = l[r + 1], p = l[r + 2], m = l[r + 3], y = this.convert(v, d, p, m);
        l[r] = y.r, l[r + 1] = y.g, l[r + 2] = y.b, l[r + 3] = y.a;
      }
      s.putImageData(a, 0, 0);
    }
  }
  convert(n, e, t, s) {
    return { r: n, g: e, b: t, a: s };
  }
}
function P(h) {
  return h && h.__esModule && Object.prototype.hasOwnProperty.call(h, "default") ? h.default : h;
}
var H = {};
(function(h) {
  Object.defineProperty(h, "__esModule", { value: !0 }), h.default = void 0;
  function n(u) {
    return s(u) || t(u) || e();
  }
  function e() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }
  function t(u) {
    if (Symbol.iterator in Object(u) || Object.prototype.toString.call(u) === "[object Arguments]")
      return Array.from(u);
  }
  function s(u) {
    if (Array.isArray(u)) {
      for (var c = 0, o = new Array(u.length); c < u.length; c++)
        o[c] = u[c];
      return o;
    }
  }
  var r = function(c, o) {
    return c.reduce(function(i, f) {
      return i[o.indexOf(f)] += 1, i;
    }, n(Array(o.length)).fill(0));
  }, a = function(c, o, i) {
    for (var f = 0, g = o; g < i; g += 1)
      f += c[g];
    return f;
  }, l = function(c) {
    return Array.from(new Set(c)).sort(function(o, i) {
      return o - i;
    });
  }, v = function(c, o, i, f) {
    for (var g = 0, b = o; b < i; b += 1)
      g += c[b];
    return g / f;
  }, d = function(c, o, i, f, g) {
    for (var b = 0, I = i; I < f; I += 1)
      b += c[I] * o[I];
    return b * g;
  }, p = function(c, o, i, f, g, b) {
    for (var I = 0, w = i; w < f; w += 1) {
      var F = o[w] - g;
      I += F * F * c[w];
    }
    return I * b;
  }, m = function(c, o, i, f) {
    return c * o + i * f;
  }, y = function(c) {
    var o = l(c), i = r(c, o), f = c.length, g = n(Array(o.length)).map(function(b, I) {
      var w = 0, F = I, B = I, E = i.length, S = 1 / a(i, w, F), W = 1 / a(i, B, E), C = v(i, w, F, f), k = p(i, o, w, F, d(i, o, w, F, S), S), j = v(i, B, E, f), O = p(i, o, B, E, d(i, o, B, E, W), W), _ = m(C, k, j, O);
      return isNaN(_) ? Number.POSITIVE_INFINITY : _;
    });
    return o[g.indexOf(Math.min.apply(Math, n(g)))];
  };
  h.default = y;
})(H);
const K = /* @__PURE__ */ P(H);
class A extends T {
  constructor(e, t, s, r, a, l) {
    super(e);
    x(this, "threshold", 127);
    x(this, "otsuEnabled", !1);
    x(this, "adaptive", !1);
    x(this, "blockSize", 31);
    x(this, "C", 10);
    this.threshold = t, this.otsuEnabled = s, this.adaptive = r, this.blockSize = a, this.C = l;
  }
  process(e) {
    let t, s;
    e instanceof HTMLImageElement ? (t = e.naturalWidth, s = e.naturalHeight) : e instanceof HTMLCanvasElement ? (t = e.width, s = e.height) : (t = e.videoWidth, s = e.videoHeight);
    const r = this.cvs.getContext("2d");
    this.cvs.width = t, this.cvs.height = s;
    let a = 0;
    if (r) {
      r.drawImage(e, 0, 0);
      let l = r.getImageData(0, 0, this.cvs.width, this.cvs.height);
      this.adaptive ? l = this.adaptiveThresholdWithIntegralImage(l) : a = this.globalThresholding(l), r.putImageData(l, 0, 0);
    }
    return a;
  }
  adaptiveThresholdWithIntegralImage(e) {
    const t = e.width, s = e.height, r = this.blockSize, a = this.C, l = e.data, v = new ImageData(t, s), d = v.data, p = this.computeIntegralImage(l, t, s), m = Math.floor(r / 2);
    for (let y = 0; y < s; y++)
      for (let u = 0; u < t; u++) {
        const c = Math.max(u - m, 0), o = Math.max(y - m, 0), i = Math.min(u + m, t - 1), f = Math.min(y + m, s - 1), g = (i - c + 1) * (f - o + 1), I = this.getAreaSum(p, t, c, o, i, f) / g - a, w = (y * t + u) * 4, F = l[w];
        d[w] = d[w + 1] = d[w + 2] = F > I ? 255 : 0, d[w + 3] = 255;
      }
    return v;
  }
  computeIntegralImage(e, t, s) {
    const r = new Uint32Array(t * s);
    for (let a = 0; a < s; a++) {
      let l = 0;
      for (let v = 0; v < t; v++) {
        const d = (a * t + v) * 4;
        l += e[d], r[a * t + v] = (a > 0 ? r[(a - 1) * t + v] : 0) + l;
      }
    }
    return r;
  }
  getAreaSum(e, t, s, r, a, l) {
    const v = s > 0 && r > 0 ? e[(r - 1) * t + (s - 1)] : 0, d = r > 0 ? e[(r - 1) * t + a] : 0, p = s > 0 ? e[l * t + (s - 1)] : 0;
    return e[l * t + a] - d - p + v;
  }
  globalThresholding(e) {
    const t = e.data, s = [];
    for (var r = 0; r < t.length; r += 4) {
      const v = t[r], d = t[r + 1], p = t[r + 2], m = this.grayscale(v, d, p);
      s.push(m);
    }
    let a;
    this.otsuEnabled ? a = K(s) : a = this.threshold;
    let l = 0;
    for (var r = 0; r < t.length; r += 4) {
      const d = s[l];
      l = l + 1;
      let p = 255;
      d < a && (p = 0), t[r] = p, t[r + 1] = p, t[r + 2] = p;
    }
    return a;
  }
  grayscale(e, t, s) {
    return e * 6966 + t * 23436 + s * 2366 >> 15;
  }
  setAdaptive(e, t, s) {
    this.adaptive = e, this.blockSize = t, this.C = s;
  }
  setThreshold(e) {
    this.adaptive = !1, this.threshold = e;
  }
  setOTSUEnabled(e) {
    this.adaptive = !1, this.otsuEnabled = e;
  }
}
class N extends T {
  convert(n, e, t, s) {
    const r = n * 6966 + e * 23436 + t * 2366 >> 15;
    return { r, g: r, b: r, a: s };
  }
}
class V extends T {
  convert(n, e, t, s) {
    const r = n * 0.393 + e * 0.769 + t * 0.189, a = n * 0.349 + e * 0.686 + t * 0.168, l = n * 0.272 + e * 0.534 + t * 0.131;
    return { r, g: a, b: l, a: s };
  }
}
class z extends T {
  constructor(e, t) {
    super(e);
    x(this, "radius", 127);
    this.radius = t;
  }
  process(e) {
    let t, s;
    e instanceof HTMLImageElement ? (t = e.naturalWidth, s = e.naturalHeight) : e instanceof HTMLCanvasElement ? (t = e.width, s = e.height) : (t = e.videoWidth, s = e.videoHeight);
    const r = this.cvs.getContext("2d");
    if (this.cvs.width = t, this.cvs.height = s, r) {
      r.drawImage(e, 0, 0);
      let a = r.getImageData(0, 0, this.cvs.width, this.cvs.height);
      a = this.applyGaussianBlur(a, this.radius), r.putImageData(a, 0, 0);
    }
  }
  applyGaussianBlur(e, t) {
    const s = e.data, r = e.width, a = e.height, l = this.createGaussianKernel(t);
    for (let v = 0; v < a; v++)
      for (let d = 0; d < r; d++)
        this.applyKernel(s, l, d, v, r, a, !0);
    for (let v = 0; v < a; v++)
      for (let d = 0; d < r; d++)
        this.applyKernel(s, l, d, v, r, a, !1);
    return e;
  }
  createGaussianKernel(e) {
    const t = e / 3, s = [];
    let r = 0;
    for (let a = -e; a <= e; a++) {
      const l = Math.exp(-(a * a) / (2 * t * t)) / (Math.sqrt(2 * Math.PI) * t);
      s.push(l), r += l;
    }
    for (let a = 0; a < s.length; a++)
      s[a] /= r;
    return s;
  }
  applyKernel(e, t, s, r, a, l, v) {
    let d = 0, p = 0, m = 0, y = 0;
    const u = (t.length - 1) / 2;
    for (let o = -u; o <= u; o++) {
      const i = v ? s + o : s, f = v ? r : r + o;
      if (i >= 0 && i < a && f >= 0 && f < l) {
        const g = (f * a + i) * 4, b = t[o + u];
        d += e[g] * b, p += e[g + 1] * b, m += e[g + 2] * b, y += e[g + 3] * b;
      }
    }
    const c = (r * a + s) * 4;
    e[c] = d, e[c + 1] = p, e[c + 2] = m, e[c + 3] = y;
  }
}
let D;
const M = document.createElement("canvas");
window.Dynamsoft && (D = window.Dynamsoft.DDV);
const U = async () => new Promise((h, n) => {
  M.toBlob((e) => {
    e ? h(e) : n();
  }, "image/jpeg", 100);
}), R = async (h) => new Promise((n, e) => {
  let t = document.createElement("img");
  t.onload = function() {
    n(t);
  };
  let s = URL.createObjectURL(h);
  t.src = s;
});
if (!D) {
  class h {
  }
  D = { ImageFilter: h };
}
class J extends D.ImageFilter {
  async applyFilter(n, e) {
    if (e === "original")
      return new Promise((t, s) => {
        t(n.data);
      });
    {
      let t = await R(n.data);
      e === "BW" ? new A(M, 127, !0, !1, 31, 10).process(t) : e === "BW (adaptive)" ? new A(M, 127, !0, !0, 31, 10).process(t) : e === "sepia" ? new V(M).process(t) : e === "grayscale" ? new N(M).process(t) : e === "invert" ? new q(M).process(t) : e === "blur" && new z(M, 3).process(t);
      let s = await U();
      return new Promise((r, a) => {
        r(s);
      });
    }
  }
  get defaultFilterType() {
    return "original";
  }
  querySupported() {
    return [
      {
        type: "original",
        label: "Original"
      },
      {
        type: "grayscale",
        label: "Gray"
      },
      {
        type: "BW",
        label: "B&W"
      },
      {
        type: "BW (adaptive)",
        label: "B&W (adaptive)"
      },
      {
        type: "invert",
        label: "Invert"
      },
      {
        type: "sepia",
        label: "Retro"
      },
      {
        type: "blur",
        label: "Blur"
      }
    ];
  }
  destroy() {
    super.destroy();
  }
}
class q extends T {
  convert(n, e, t, s) {
    return n = 255 - n, e = 255 - e, t = 255 - t, { r: n, g: e, b: t, a: s };
  }
}
export {
  A as BlackwhiteFilter,
  z as GaussianBlurFilter,
  T as GenericImageFilter,
  N as GrayscaleFilter,
  J as ImageFilterHandler,
  q as InvertFilter,
  V as SepiaFilter
};
