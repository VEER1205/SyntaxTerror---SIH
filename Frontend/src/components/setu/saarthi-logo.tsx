export function SaarthiLogoMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stylized Ribbon 'S' Outer Stroke */}
      <path
        d="M 68 28 C 65 18, 48 14, 38 18 C 24 24, 22 40, 36 46 L 62 56 C 78 62, 76 78, 62 84 C 48 90, 30 84, 26 74"
        stroke="#087F5B"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Horizon Arched Swoop */}
      <path
        d="M 12 70 Q 50 48 88 70"
        stroke="#087F5B"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* 4-Point Compass Star on Top Right */}
      <path
        d="M 72 16 L 75 8 L 78 16 L 86 19 L 78 22 L 75 30 L 72 22 L 64 19 Z"
        fill="#087F5B"
      />

      {/* Connected Constellation Nodes inside the 'S' loop */}
      <g stroke="#087F5B" strokeWidth="2.5" fill="#087F5B">
        <line x1="44" y1="36" x2="56" y2="30" />
        <line x1="56" y1="30" x2="62" y2="40" />
        <line x1="62" y1="40" x2="50" y2="48" />
        <line x1="50" y1="48" x2="44" y2="36" />
        <line x1="44" y1="36" x2="62" y2="40" />

        <circle cx="44" cy="36" r="3.5" />
        <circle cx="56" cy="30" r="3.5" />
        <circle cx="62" cy="40" r="3.5" />
        <circle cx="50" cy="48" r="3.5" />
      </g>
    </svg>
  );
}

export function SaarthiBrandHeader({
  showSubtitle = true,
  iconSize = "size-9",
}: {
  showSubtitle?: boolean;
  iconSize?: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <SaarthiLogoMark className={iconSize} />
      <div className="leading-none">
        <span className="block text-base font-extrabold tracking-tight text-foreground">
          SAARTHI
        </span>
        {showSubtitle && (
          <span className="block text-[9px] font-semibold text-muted-foreground tracking-wider uppercase">
            AICTE TECHNICAL EDUCATION APPROVAL PORTAL
          </span>
        )}
      </div>
    </div>
  );
}
