
import { logger } from "@flight-sim/logging";
import { Simulator } from "@flight-sim/simulator";
import { Feet, Inches, Newtons, Seconds } from "@flight-sim/units";
import { Meters } from "@flight-sim/units";
import { Vector3 } from "@flight-sim/math";
import { RadiansPerSecond } from "@flight-sim/units"
import { round } from "@flight-sim/math";

// let v = new Vector3(new Feet(1), new Feet(2), new Feet(3));

// console.log(v, v.toReadableObject(), v.toString());

// let v2 = v.convertToBaseUnits();

// console.log(v2, v2.toReadableObject(), v2.toString());

// let v3 = Vector3.createZero(RadiansPerSecond);

// console.log(v3, v3.toReadableObject(), v3.toString());

// let v4 = Vector3.createPositionInMeters(1, 2, 3);
// console.log(v4, v4.toReadableObject(), v4.toString());

// let v5 = Vector3.createPositionInMeters(new Meters(1), new Meters(2), new Meters(3));
// console.log(v5, v5.toReadableObject(), v5.toString());

let f1 = new Feet(1);
let i1 = new Inches(12);        // 12 inches = 1 foot

let f2 = f1.add(i1);            // returns Feet
console.assert(round(f2.value) === 2, `F2 should be 2. Actual: ${f2.value}`);

let f3 = f1.subtract(i1);
console.assert(round(f3.value) === 0, `F3 should be 0. Actual: ${f3.value}`);

let f4 = f1.multiplyByScalar(2);
console.assert(round(f4.value) === 2, `F4 should be 2. Actual: ${f4.value}`);

let f5 = f1.divideByScalar(2);
console.assert(round(f5.value) === 0.5, `F5 should be 0.5. Actual: ${f5.value}`);

let i2 = i1.add(new Inches(1));
let f6 = f1.min(i2);
console.assert(round(f6.value) === 1, `F6 should be 1. Actual: ${f6.value}`);

// const simulator = new Simulator({ tickRate: 60 });

// simulator.onStart(() => {
//   logger.info("simulation started");
// });

// simulator.onStop(() => {
//   logger.info("simulation stopped");
// });

// simulator.runFor(new Seconds(1).value);

// // simulator.onBeforeTick((dt) => {
// //   logger.info("before tick", { dt: dt.toFixed(2) });
// // });

// // simulator.onFrame((alpha) => {
// //   logger.info("frame", { alpha: alpha.toFixed(2) });
// // });

// // simulator.onAfterTick((dt) => {
// //   logger.info("after tick", { dt: dt.toFixed(2) });
// // });

// simulator.start();

