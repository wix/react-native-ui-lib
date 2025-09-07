import { useMemo } from 'react';
const EPSILON = 1e-12;
function getStartEndFromAngle(angle = 0) {
  // Normalize angle to [0, 360)
  let a = angle % 360;
  if (a < 0) {
    a += 360;
  }
  const rad = a * Math.PI / 180;

  // Direction vector where 0deg points up, 90deg right, etc.
  const vx = Math.sin(rad);
  const vy = -Math.cos(rad);

  // Distance from center (0.5,0.5) to box edge along v
  const denomX = Math.abs(vx) > EPSILON ? 0.5 / Math.abs(vx) : Number.POSITIVE_INFINITY;
  const denomY = Math.abs(vy) > EPSILON ? 0.5 / Math.abs(vy) : Number.POSITIVE_INFINITY;
  const t = Math.min(denomX, denomY);
  const cx = 0.5;
  const cy = 0.5;
  const end = {
    x: cx + vx * t,
    y: cy + vy * t
  };
  const start = {
    x: cx - vx * t,
    y: cy - vy * t
  };

  // Quantize to avoid tiny floating errors for canonical angles (0, 45, 90, ...).
  const quantize = v => {
    if (Math.abs(v - 0) < EPSILON) {
      return 0;
    }
    if (Math.abs(v - 0.5) < EPSILON) {
      return 0.5;
    }
    if (Math.abs(v - 1) < EPSILON) {
      return 1;
    }
    // Clamp just in case of tiny over/underflows
    if (v < 0) {
      return 0;
    }
    if (v > 1) {
      return 1;
    }
    return v;
  };
  return {
    start: {
      x: quantize(start.x),
      y: quantize(start.y)
    },
    end: {
      x: quantize(end.x),
      y: quantize(end.y)
    }
  };
}
export const _forTesting = {
  getStartEndFromAngle
}; // exporting private functions for testing only

const useAngleTransform = props => {
  const {
    angle
  } = props;
  const startEnd = useMemo(() => getStartEndFromAngle(angle), [angle]);
  return startEnd;
};
export default useAngleTransform;