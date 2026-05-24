interface LogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showWordmark?: boolean;
  className?: string;
}

const sizeMap = {
  xs: 26,
  sm: 34,
  md: 44,
  lg: 80,
  xl: 120,
};

const HEX_POINTS = "40,6 69,23 69,57 40,74 11,57 11,23";
const HEX_INNER  = "40,12 64,25 64,55 40,68 16,55 16,25";

// Hex vertices for node diamonds
const HEX_VERTS = [
  [40, 6], [69, 23], [69, 57], [40, 74], [11, 57], [11, 23],
] as const;

function DiamondNode({ x, y, r = 3, opacity = 0.65 }: { x: number; y: number; r?: number; opacity?: number }) {
  return (
    <polygon
      className="logo-node"
      points={`${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}`}
      fill="hsl(28,96%,54%)"
      opacity={opacity}
    />
  );
}

export function Logo({ size = "md", showWordmark = true, className = "" }: LogoProps) {
  const px = sizeMap[size];

  const textSize = {
    xs: { top: 12, sub: 7 },
    sm: { top: 14, sub: 8 },
    md: { top: 16, sub: 9 },
    lg: { top: 20, sub: 10 },
    xl: { top: 26, sub: 12 },
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* ── Badge SVG ── */}
      <svg
        viewBox="0 0 80 80"
        width={px}
        height={px}
        className="shrink-0"
        aria-label="RK logo"
      >
        <defs>
          {/* Soft glow for the RK letters */}
          <filter id="rk-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Strong glow for the dot */}
          <filter id="dot-glow" x="-120%" y="-120%" width="340%" height="340%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Radial gradient for inner hex fill */}
          <radialGradient id="hex-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,110,0,0.08)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
          </radialGradient>
        </defs>

        {/* ─── Layer 1: outer rotating arc ─── */}
        <circle
          cx="40" cy="40" r="38"
          fill="none"
          stroke="hsl(28,96%,54%)"
          strokeWidth="0.8"
          strokeDasharray="72 167"
          opacity="0.55"
          className="logo-arc"
        />

        {/* ─── Layer 2: second slower counter-arc ─── */}
        <circle
          cx="40" cy="40" r="35"
          fill="none"
          stroke="hsl(192,100%,50%)"
          strokeWidth="0.5"
          strokeDasharray="30 190"
          opacity="0.2"
          style={{ animation: "logo-arc-spin 34s linear infinite reverse", transformOrigin: "center" }}
        />

        {/* ─── Layer 3: static outer ring ─── */}
        <circle cx="40" cy="40" r="37" fill="none" stroke="hsl(28,96%,54%)" strokeWidth="0.4" opacity="0.12" />

        {/* ─── Layer 4: hexagon frame ─── */}
        <polygon points={HEX_POINTS} fill="none" stroke="hsl(28,96%,54%)" strokeWidth="1.1" opacity="0.35" />

        {/* ─── Layer 5: inner circuit lines ─── */}
        {/* Radial lines from center to each vertex for circuit feel */}
        {HEX_VERTS.map(([vx, vy], i) => (
          <line
            key={i}
            x1={40 + (vx - 40) * 0.52}
            y1={40 + (vy - 40) * 0.52}
            x2={40 + (vx - 40) * 0.72}
            y2={40 + (vy - 40) * 0.72}
            stroke="hsl(28,96%,54%)"
            strokeWidth="0.7"
            opacity="0.2"
          />
        ))}

        {/* Exterior tick lines beyond hex */}
        {HEX_VERTS.map(([vx, vy], i) => (
          <line
            key={`tick-${i}`}
            x1={40 + (vx - 40) * 1.05}
            y1={40 + (vy - 40) * 1.05}
            x2={40 + (vx - 40) * 1.22}
            y2={40 + (vy - 40) * 1.22}
            stroke="hsl(28,96%,54%)"
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))}

        {/* ─── Layer 6: inner hex background ─── */}
        <polygon points={HEX_INNER} fill="url(#hex-fill)" />

        {/* ─── Layer 7: vertex diamond nodes ─── */}
        {HEX_VERTS.map(([vx, vy], i) => (
          <DiamondNode key={i} x={vx} y={vy} r={2.8} opacity={0.65} />
        ))}

        {/* ─── Layer 8: center cross / target mark ─── */}
        <circle cx="40" cy="40" r="1.5" fill="hsl(28,96%,54%)" opacity="0.2" />

        {/* ─── Layer 9: "RK" custom letterforms (SVG paths) ─── */}
        {/* R — vertical stem + angular bowl + diagonal leg */}
        <g fill="none" stroke="white" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" opacity="0.92" filter="url(#rk-glow)">
          {/* R stem */}
          <line x1="17" y1="22" x2="17" y2="56" />
          {/* R top bar */}
          <polyline points="17,22 34,22 38,26 38,36 34,40 17,40" />
          {/* R leg */}
          <line x1="34" y1="40" x2="42" y2="56" />
        </g>

        {/* K — stem + upper arm + lower arm */}
        <g fill="none" stroke="white" strokeWidth="4" strokeLinecap="square" strokeLinejoin="miter" opacity="0.92" filter="url(#rk-glow)">
          {/* K stem */}
          <line x1="48" y1="22" x2="48" y2="56" />
          {/* K upper arm */}
          <line x1="48" y1="39" x2="61" y2="22" />
          {/* K lower arm */}
          <line x1="48" y1="39" x2="63" y2="56" />
        </g>

        {/* ─── Layer 10: arm-end nodes ─── */}
        <DiamondNode x={42} y={56} r={2.5} opacity={0.9} />
        <DiamondNode x={61} y={22} r={2.5} opacity={0.9} />
        <DiamondNode x={63} y={56} r={2.5} opacity={0.9} />

        {/* ─── Layer 11: orange accent dot ─── */}
        <circle cx="63" cy="22" r="4" fill="hsl(28,96%,54%)" opacity="0.0" />
        {/* Big glowing dot bottom-right of the badge (signature mark) */}
        <circle cx="58" cy="62" r="3.5" fill="hsl(28,96%,54%)" filter="url(#dot-glow)" />

        {/* ─── Layer 12: subtle horizontal divider line inside hex ─── */}
        <line x1="17" y1="40" x2="16" y2="40" stroke="hsl(28,96%,54%)" strokeWidth="0.5" opacity="0.3" />
      </svg>

      {/* ── Wordmark ── */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span
            className="font-display font-extrabold tracking-tight text-foreground"
            style={{ fontSize: textSize.top, letterSpacing: "-0.03em" }}
          >
            ROSAIRE
          </span>
          <span
            className="font-mono text-primary uppercase tracking-[0.22em]"
            style={{ fontSize: textSize.sub }}
          >
            KAKPO
          </span>
        </div>
      )}
    </div>
  );
}
