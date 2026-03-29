import { NEWTONS_PER_POUND_FORCE } from "../force/constants.js";

const METERS_PER_FOOT = 0.3048;

/** 1 ft·lbf to N·m */
export const NEWTON_METERS_PER_FOOT_POUND_FORCE = NEWTONS_PER_POUND_FORCE * METERS_PER_FOOT;
