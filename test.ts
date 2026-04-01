
import { logger } from "@flight-sim/logging";
import { Simulator } from "@flight-sim/simulator";
import { Feet, Seconds } from "@flight-sim/units";
import { Meters } from "@flight-sim/units";
import { Vector3 } from "@flight-sim/math";
import { RadiansPerSecond } from "@flight-sim/units"

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
let f2 = f1.add(new Feet(1));
console.log(f2, "F2");

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

