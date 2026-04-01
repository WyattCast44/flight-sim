
import { logger } from "@flight-sim/logging";
import { Simulator } from "@flight-sim/simulator";
import { Feet, Inches, Newtons, Seconds } from "@flight-sim/units";
import { Meters } from "@flight-sim/units";
import { Vector3, PositionVector3 } from "@flight-sim/math";
import { RadiansPerSecond } from "@flight-sim/units"

let v = new Vector3(new Feet(1), new Feet(2), new Feet(3));

console.log(v, v.toReadableObject(), v.toString());

let v2 = v.convertToBaseUnits();

console.log(v2, v2.toReadableObject(), v2.toString());

let v3 = Vector3.createZero(RadiansPerSecond);

console.log(v3, v3.toReadableObject(), v3.toString());

let v4 = PositionVector3.createFromMeters(1, 2, 3);
console.log(v4, v4.toReadableObject(), v4.toString());

let v5 = PositionVector3.createFromMeters(new Meters(1), new Meters(2), new Meters(3));
console.log(v5, v5.toReadableObject(), v5.toString());

let v6 = v.addVector(new Vector3(new Feet(1), new Feet(2), new Feet(3)));
console.log(v6, v6.toReadableObject(), v6.toString());

// now lets add a vector with different units
let v7 = v.addVector(new Vector3(new Meters(1), new Meters(2), new Meters(3)));
console.log(v7, v7.toReadableObject(), v7.toString());

// now lets do the inverse operation, so start with meters and add feet
let v8 = new Vector3(new Meters(1), new Meters(2), new Meters(3));
let v9 = v8.addVector(new Vector3(new Feet(1), new Feet(2), new Feet(3)));
console.log(v9, v9.toReadableObject(), v9.toString());

// now lets do the inverse operation, so start with feet and subtract feet
let v10 = new Vector3(new Feet(1), new Feet(2), new Feet(3));
let v11 = v10.subtractVector(new Vector3(new Feet(2), new Feet(3), new Feet(4)));
console.log(v11, v11.toReadableObject(), v11.toString());

let v12 = v10.scaleByScalar(2);
console.log(v12, v12.toReadableObject(), v12.toString());

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

