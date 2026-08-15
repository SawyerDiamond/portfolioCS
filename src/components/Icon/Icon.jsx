import React from "react";

import solarIcons from "../../constants/solarIcons";

// Solar duotone glyph. The bodies are trusted, build-time-extracted markup —
// they render inline so `currentColor` and the duotone 50% layer inherit the
// caller's colour instead of needing a tinted <img>.
const Icon = ({ name, size = 20, className = "", ...rest }) => {
  const body = solarIcons[name];
  if (!body) return null;

  return (
    <svg
      className={`icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={{ __html: body }}
      {...rest}
    />
  );
};

export default Icon;
