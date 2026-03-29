/**
 * Node test runtime has no requestAnimationFrame; Simulator uses RAF for its loop.
 */
if (typeof globalThis.requestAnimationFrame === "undefined") {
  globalThis.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    return setTimeout(() => {
      callback(performance.now());
    }, 0) as unknown as number;
  };
  globalThis.cancelAnimationFrame = (handle: number): void => {
    clearTimeout(handle as unknown as ReturnType<typeof setTimeout>);
  };
}
