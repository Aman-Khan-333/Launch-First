// Fixed progressive blur along the bottom of the viewport.
// Each layer blurs twice as hard as the previous one and is masked to a band that sits
// lower down, so the blur ramps up smoothly toward the bottom edge.
const layers = [0.5, 1, 2, 4, 8, 16];

export function ProgressiveBlur() {
  return (
    <div className="progressive-blur" aria-hidden="true">
      {layers.map((blur, i) => {
        // Band i fades in over [i, i+1] eighths and stays solid until the band end (i+3 eighths).
        const start = (i / 8) * 100;
        const solid = ((i + 1) / 8) * 100;
        const end = Math.min(100, ((i + 3) / 8) * 100);
        const mask = `linear-gradient(to bottom, transparent ${start}%, #000 ${solid}%, #000 ${end}%, ${
          end < 100 ? `transparent ${Math.min(100, end + 12.5)}%` : "#000 100%"
        })`;
        return (
          <div
            key={blur}
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: mask,
              WebkitMaskImage: mask,
            }}
          />
        );
      })}
    </div>
  );
}
