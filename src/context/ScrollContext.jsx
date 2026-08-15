import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useDeviceDetect from "../hooks/useDeviceDetect";
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion";

// Sections that appear in the nav / participate in active tracking. These are
// the ids the Wrap HOC puts on each panel.
export const NAV_SECTIONS = ["Home", "Experience", "Projects", "Contact"];

const expoOut = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const ScrollContext = createContext({
  lenisRef: { current: null },
  scrollToSection: () => {},
  activeSection: "Home",
  isHorizontal: false,
  addScrollListener: () => () => {},
});

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider = ({ children }) => {
  const { isDesktop } = useDeviceDetect();
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef(null);
  const listenersRef = useRef(new Set());
  const activeRef = useRef("Home");
  const [activeSection, setActiveSection] = useState("Home");

  // Viewport-centerline hit test — one code path for both scroll axes.
  const updateActive = useCallback(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    for (const id of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      const hit = isDesktop
        ? r.left <= cx && r.right >= cx
        : r.top <= cy && r.bottom >= cy;
      if (hit) {
        if (id !== activeRef.current) {
          activeRef.current = id;
          setActiveSection(id);
        }
        break;
      }
    }
  }, [isDesktop]);

  // Scroll fan-out: native scroll events fire in every mode (Lenis animates
  // real scrollLeft/scrollTop), so one listener serves Lenis and fallback.
  useEffect(() => {
    const onScroll = () => {
      updateActive();
      listenersRef.current.forEach((fn) => fn());
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActive]);

  // Lenis lifecycle: lazy-loaded off the critical path, never under reduced
  // motion, recreated when the axis flips.
  useEffect(() => {
    if (reducedMotion) return undefined;
    let lenis;
    let rafId;
    let cancelled = false;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis(
        isDesktop
          ? {
              orientation: "horizontal",
              gestureOrientation: "both",
              smoothWheel: true,
              wheelMultiplier: 0.8,
              duration: 1.2,
              easing: expoOut,
              syncTouch: true,
            }
          : { lerp: 0.18, duration: 0.8 }
      );
      const loop = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
      lenisRef.current = lenis;
    };

    const hasIdle = "requestIdleCallback" in window;
    const idleId = hasIdle
      ? window.requestIdleCallback(start, { timeout: 500 })
      : window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
      if (rafId) cancelAnimationFrame(rafId);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, [isDesktop, reducedMotion]);

  // Resolve the absolute scroll offset ourselves rather than handing Lenis an
  // element: images finishing after layout would otherwise leave the target
  // stale, landing the section a few hundred pixels off.
  const scrollToSection = useCallback(
    (id, opts = {}) => {
      const el = document.getElementById(id);
      if (!el) return;
      const lenis = lenisRef.current;
      lenis?.resize();

      const rect = el.getBoundingClientRect();
      const horizontal = isDesktop;
      const raw = horizontal
        ? rect.left + window.scrollX
        : rect.top + window.scrollY;
      const max = horizontal
        ? document.documentElement.scrollWidth - window.innerWidth
        : document.documentElement.scrollHeight - window.innerHeight;
      const target = Math.round(Math.min(Math.max(raw, 0), Math.max(max, 0)));

      if (lenis) {
        lenis.scrollTo(target, {
          duration: 1.1,
          easing: expoOut,
          lock: true,
          ...opts,
        });
      } else if (horizontal) {
        window.scrollTo({
          left: target,
          behavior: reducedMotion || opts.immediate ? "auto" : "smooth",
        });
      } else {
        window.scrollTo({
          top: target,
          behavior: reducedMotion || opts.immediate ? "auto" : "smooth",
        });
      }
    },
    [isDesktop, reducedMotion]
  );

  // Re-anchor after an axis flip so the user isn't stranded mid-document.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    scrollToSection(activeRef.current, { immediate: true });
  }, [isDesktop, scrollToSection]);

  // Keyboard section navigation — covers horizontal mode (native vertical
  // keys do nothing against a horizontal document) and reduced-motion users.
  useEffect(() => {
    if (!isDesktop) return undefined;
    const onKey = (e) => {
      if (e.defaultPrevented) return;
      if (e.target.closest?.("input, textarea, select, [contenteditable]"))
        return;
      if (lenisRef.current?.isStopped) return; // modal open
      const idx = NAV_SECTIONS.indexOf(activeRef.current);
      const next = ["ArrowRight", "ArrowDown", "PageDown"].includes(e.key)
        ? Math.min(idx + 1, NAV_SECTIONS.length - 1)
        : ["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)
          ? Math.max(idx - 1, 0)
          : e.key === " "
            ? e.shiftKey
              ? Math.max(idx - 1, 0)
              : Math.min(idx + 1, NAV_SECTIONS.length - 1)
            : null;
      if (next === null || next === idx) return;
      e.preventDefault();
      scrollToSection(NAV_SECTIONS[next]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isDesktop, scrollToSection]);

  const addScrollListener = useCallback((fn) => {
    listenersRef.current.add(fn);
    return () => listenersRef.current.delete(fn);
  }, []);

  return (
    <ScrollContext.Provider
      value={{
        lenisRef,
        scrollToSection,
        activeSection,
        isHorizontal: isDesktop,
        addScrollListener,
      }}>
      {children}
    </ScrollContext.Provider>
  );
};

export default ScrollProvider;
