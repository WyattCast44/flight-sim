export const SIMULATOR_PACKAGE_VERSION = "0.1.0" as const;

export * from "./Simulator";
export { cancelScheduledFrame, scheduleFrame } from "./scheduleFrame.js";