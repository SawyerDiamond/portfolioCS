import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import "./GithubGraph.scss";

const CONTRIBUTIONS_ENDPOINT =
  "https://github-contributions-api.jogruber.de/v4";

const VARIANTS = {
  github: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  graphite: ["#eeeeee", "#cccccc", "#969696", "#5f5f5f", "#171717"],
  ocean: ["#0d1626", "#123a63", "#1d6bb0", "#2b93e0", "#5ec3ff"],
  violet: ["#171233", "#3a2470", "#6b3fc4", "#9a6bef", "#c9a6ff"],
};

function dateFromISO(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function addDays(date, days) {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function fallbackLevel(count, maxCount) {
  if (!Number.isFinite(count) || count <= 0 || maxCount <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / maxCount) * 4)));
}

export function normalizeGithubAccount(account) {
  const normalized = account.trim().replace(/^@+/, "");
  return /^(?!-)[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(normalized)
    ? normalized
    : null;
}

/** Sunday-first calendar columns, missing dates filled at level zero. */
export function buildContributionWeeks(contributions) {
  const valid = contributions
    .map((item) => ({ ...item, parsedDate: dateFromISO(item.date) }))
    .filter((item) => item.parsedDate !== null && Number.isFinite(item.count))
    .sort((a, b) => a.date.localeCompare(b.date));

  if (valid.length === 0) return [];

  const maxCount = Math.max(0, ...valid.map((item) => item.count));
  const byDate = new Map(valid.map((item) => [item.date, item]));
  const firstDate = valid[0].parsedDate;
  const lastDate = valid[valid.length - 1].parsedDate;
  const startDate = addDays(firstDate, -firstDate.getUTCDay());
  const endDate = addDays(lastDate, 6 - lastDate.getUTCDay());
  const cells = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const key = isoDate(date);
    const contribution = byDate.get(key);
    const count = Math.max(0, contribution?.count ?? 0);
    const explicit = contribution?.level;
    const level =
      Number.isInteger(explicit) && explicit >= 0 && explicit <= 4
        ? count === 0
          ? 0
          : explicit
        : fallbackLevel(count, maxCount);
    cells.push({ date: key, count, level });
  }

  return Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7)
  );
}

function selectRecent(contributions, months) {
  const parsed = contributions
    .map((contribution) => ({
      contribution,
      date: dateFromISO(contribution.date),
    }))
    .filter((item) => item.date !== null);
  const latest = parsed.reduce(
    (current, item) => (!current || item.date > current ? item.date : current),
    null
  );
  if (!latest) return [];

  const start = new Date(latest);
  start.setUTCMonth(
    start.getUTCMonth() - Math.max(1, Math.min(12, Math.round(months)))
  );
  return parsed
    .filter((item) => item.date >= start)
    .map((item) => item.contribution);
}

function formatLabel(contribution) {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
  }).format(dateFromISO(contribution.date) ?? new Date());
  const noun = contribution.count === 1 ? "contribution" : "contributions";
  return `${contribution.count} ${noun} · ${date}`;
}

function getCellDelay(animation, weekIndex, dayIndex, speed) {
  if (animation === "none") return 0;
  const step =
    animation === "wave"
      ? weekIndex * 0.026 + dayIndex * 0.016
      : animation === "scan"
        ? weekIndex * 0.03
        : (weekIndex + dayIndex * 2) * 0.018;
  return step / Math.max(speed, 0.1);
}

function getAmbientMotion(
  effect,
  intensity,
  weekIndex,
  dayIndex,
  entranceDelay,
  reduced
) {
  if (reduced || effect === "none") {
    return {
      animate: { opacity: 1, scale: 1 },
      transition: {
        opacity: { duration: 0.14, delay: entranceDelay },
        scale: { type: "spring", stiffness: 900, damping: 32 },
      },
    };
  }

  const strength = Math.min(1, Math.max(0, intensity));
  const seed = ((weekIndex * 17 + dayIndex * 31) % 11) / 10;
  const isTide = effect === "tide";
  const isDrift = effect === "drift";
  const duration = isTide ? 3.2 : isDrift ? 3.8 + seed : 2 + seed * 1.4;
  const delay =
    entranceDelay +
    (isTide ? (weekIndex + dayIndex * 1.8) * 0.055 : seed * 0.85);
  const lowOpacity = 1 - (isTide ? 0.24 : isDrift ? 0.16 : 0.34) * strength;
  const smallScale = 1 - (isTide ? 0.07 : isDrift ? 0.04 : 0.08) * strength;

  return {
    animate: {
      opacity: isDrift
        ? [1, lowOpacity, 1 - 0.06 * strength, 1]
        : [1, lowOpacity, 1],
      scale: isDrift
        ? [1, smallScale, 1 + 0.025 * strength, 1]
        : [1, smallScale, 1],
    },
    transition: {
      opacity: { duration, delay, ease: "easeInOut", repeat: Infinity },
      scale: { duration, delay, ease: "easeInOut", repeat: Infinity },
    },
  };
}

export function GithubGraph({
  account = "SawyerDiamond",
  months = 6,
  variant = "ocean",
  animation = "wave",
  animationSpeed = 1,
  cellSize = 14,
  cellGap = 4,
  cellRadius = 3,
  autoFit = false,
  showLegend = false,
  showAccount = false,
  ambientEffect = "twinkle",
  ambientIntensity = 0.65,
  data,
  className = "",
}) {
  const rootRef = useRef(null);
  const reduced = usePrefersReducedMotion();
  const normalizedAccount = useMemo(
    () => normalizeGithubAccount(account),
    [account]
  );
  const [resource, setResource] = useState({ status: "loading" });
  const [availableWidth, setAvailableWidth] = useState(0);
  const [hovered, setHovered] = useState(null);
  const colors = VARIANTS[variant] ?? VARIANTS.ocean;
  const resolvedRadius = Math.max(0, Math.min(cellRadius, cellSize / 2));
  const autoFitColumns = Math.max(
    1,
    Math.floor(
      (availableWidth + Math.max(0, cellGap)) / Math.max(1, cellSize + cellGap)
    )
  );

  useLayoutEffect(() => {
    if (!autoFit || !rootRef.current) return undefined;
    const root = rootRef.current;
    const update = () => setAvailableWidth(root.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, [autoFit]);

  useEffect(() => {
    if (data) {
      setResource({ status: "ready", contributions: data });
      return undefined;
    }
    if (!normalizedAccount) {
      setResource({ status: "error", message: "Invalid GitHub username." });
      return undefined;
    }

    const controller = new AbortController();
    setResource({ status: "loading" });

    fetch(`${CONTRIBUTIONS_ENDPOINT}/${normalizedAccount}?y=last`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub account not found.");
        const payload = await response.json();
        if (!Array.isArray(payload.contributions)) {
          throw new Error("No public contributions were returned.");
        }
        return payload.contributions;
      })
      .then((contributions) => {
        if (!controller.signal.aborted) {
          setResource({ status: "ready", contributions });
        }
      })
      .catch((error) => {
        if (controller.signal.aborted) return;
        setResource({
          status: "error",
          message: error?.message || "Could not load contributions.",
        });
      });

    return () => controller.abort();
  }, [data, normalizedAccount]);

  const weeks = useMemo(() => {
    if (resource.status !== "ready") return [];
    return buildContributionWeeks(selectRecent(resource.contributions, months));
  }, [months, resource]);

  const animationKey = `${normalizedAccount ?? account}-${months}-${variant}-${animation}-${cellSize}-${autoFit}`;

  const showTooltip = useCallback((element, contribution, week, day, event) => {
    const rect = element.getBoundingClientRect();
    const placement = rect.top > 56 ? "above" : "below";
    const left = Math.min(
      Math.max(rect.left + rect.width / 2, 96),
      window.innerWidth - 96
    );
    setHovered({
      contribution,
      left,
      top: placement === "above" ? rect.top - 9 : rect.bottom + 9,
      originLeft: event?.clientX ?? left,
      originTop: event?.clientY ?? rect.top + rect.height / 2,
      placement,
      weekIndex: week,
      dayIndex: day,
    });
  }, []);

  const renderCell = (contribution, columnIndex, rowIndex) => {
    const label = formatLabel(contribution);
    const entranceDelay = reduced
      ? 0
      : getCellDelay(animation, columnIndex, rowIndex, animationSpeed);
    const ambient = getAmbientMotion(
      ambientEffect,
      ambientIntensity,
      columnIndex,
      rowIndex,
      entranceDelay,
      reduced
    );
    const distance = hovered
      ? Math.hypot(columnIndex - hovered.weekIndex, rowIndex - hovered.dayIndex)
      : Infinity;
    const waveStrength = Math.max(0, 1 - distance / 3);
    const filter = `brightness(${1 + waveStrength * 0.5}) saturate(${1 + waveStrength * 0.25})`;

    return (
      <motion.button
        key={`${animationKey}-${contribution.date}`}
        type="button"
        role="gridcell"
        aria-label={label}
        className="ghgraph__cell"
        style={{
          width: cellSize,
          height: cellSize,
          borderRadius: resolvedRadius,
        }}
        initial={
          reduced || animation === "none"
            ? false
            : { opacity: 0, scale: 0.35, y: 4 }
        }
        animate={{ opacity: 1, scale: 1, y: 0, filter }}
        transition={{
          opacity: { duration: 0.14, delay: entranceDelay },
          y: {
            type: "spring",
            stiffness: 520,
            damping: 28,
            delay: entranceDelay,
          },
          scale: { type: "spring", stiffness: 900, damping: 32 },
          filter: { duration: 0.08, ease: "easeOut" },
        }}
        onMouseEnter={(event) =>
          showTooltip(
            event.currentTarget,
            contribution,
            columnIndex,
            rowIndex,
            event
          )
        }
        onFocus={(event) =>
          showTooltip(event.currentTarget, contribution, columnIndex, rowIndex)
        }
        onBlur={() => setHovered(null)}>
        <motion.span
          aria-hidden="true"
          className="ghgraph__swatch"
          style={{
            backgroundColor: colors[contribution.level],
            borderRadius: resolvedRadius,
          }}
          animate={ambient.animate}
          transition={ambient.transition}
        />
      </motion.button>
    );
  };

  return (
    <div
      ref={rootRef}
      className={`ghgraph ${autoFit ? "is-autofit" : ""} ${className}`.trim()}
      aria-busy={resource.status === "loading"}>
      {showAccount && (
        <p className="ghgraph__account">@{normalizedAccount ?? account}</p>
      )}

      {resource.status === "loading" && (
        <div className="ghgraph__scroll">
          <div
            className="ghgraph__weeks"
            style={{ gap: cellGap }}
            aria-label="Loading contributions">
            {Array.from(
              { length: Math.ceil((months * 31 + 6) / 7) },
              (_, week) => (
                <div
                  key={week}
                  className="ghgraph__week"
                  style={{ gap: cellGap }}>
                  {Array.from({ length: 7 }, (_, day) => (
                    <span
                      key={day}
                      className="ghgraph__skeleton"
                      style={{
                        width: cellSize,
                        height: cellSize,
                        borderRadius: resolvedRadius,
                        animationDelay: `${(week + day) * 12}ms`,
                      }}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {resource.status === "error" && (
        <p className="ghgraph__error">{resource.message}</p>
      )}

      {resource.status === "ready" && weeks.length > 0 && (
        <div className="ghgraph__scroll">
          <div
            className={`ghgraph__weeks ${autoFit ? "is-grid" : ""}`.trim()}
            style={
              autoFit
                ? {
                    gridTemplateColumns: `repeat(${autoFitColumns}, ${cellSize}px)`,
                    gap: cellGap,
                    justifyContent: "space-between",
                  }
                : { gap: cellGap }
            }
            role="grid"
            aria-label={`GitHub contributions for ${normalizedAccount ?? account}`}
            onMouseLeave={() => setHovered(null)}>
            {autoFit
              ? weeks
                  .flat()
                  .map((contribution, index) =>
                    renderCell(
                      contribution,
                      index % autoFitColumns,
                      Math.floor(index / autoFitColumns)
                    )
                  )
              : weeks.map((week, weekIndex) => (
                  <div
                    key={`${animationKey}-${weekIndex}`}
                    className="ghgraph__week"
                    style={{ gap: cellGap }}
                    role="row">
                    {week.map((contribution, dayIndex) =>
                      renderCell(contribution, weekIndex, dayIndex)
                    )}
                  </div>
                ))}
            <AnimatePresence>
              {hovered && (
                <motion.span
                  role="tooltip"
                  className="ghgraph__tooltip"
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    left: hovered.originLeft,
                    top: hovered.originTop,
                    x: "-50%",
                    y: hovered.placement === "above" ? "-100%" : "0%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    left: hovered.left,
                    top: hovered.top,
                    x: "-50%",
                    y: hovered.placement === "above" ? "-100%" : "0%",
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    opacity: { duration: 0.12 },
                    scale: { duration: 0.12 },
                    left: { type: "spring", stiffness: 620, damping: 42 },
                    top: { type: "spring", stiffness: 620, damping: 42 },
                    y: { duration: 0.12 },
                  }}>
                  {formatLabel(hovered.contribution)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {showLegend && resource.status === "ready" && (
        <div className="ghgraph__legend" aria-label="Contribution activity legend">
          {colors.map((color, level) => (
            <span
              key={color}
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: color,
                borderRadius: resolvedRadius,
              }}
              aria-label={`Level ${level}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default GithubGraph;
