/**
 * Prefer `requestAnimationFrame` when present (browser); otherwise use
 * `setTimeout(…, 0)` + `performance.now()` so the same code runs in Node
 * without patching globals.
 */
export function scheduleFrame(callback: (time: number) => void): number {
  const raf = globalThis.requestAnimationFrame;
  if (typeof raf === "function") {
    return raf.call(globalThis, callback);
  }
  return setTimeout(() => {
    callback(performance.now());
  }, 0) as unknown as number;
}

/** Pair with {@link scheduleFrame}; cancels the scheduled callback. */
export function cancelScheduledFrame(handle: number): void {
  const caf = globalThis.cancelAnimationFrame;
  const raf = globalThis.requestAnimationFrame;
  if (typeof raf === "function" && typeof caf === "function") {
    caf.call(globalThis, handle);
  } else {
    clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
  }
}
