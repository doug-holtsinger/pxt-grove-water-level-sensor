# pxt-grove-water-level-sensor
micro:bit extension for the Grove Water Level Sensor

# Water Level Sensor (20‑Section ATTINY I2C)

This MakeCode extension supports a 20‑section capacitive water‑level sensor
built from two ATTINY microcontrollers:

- **8‑section low board** at I²C address `0x77`
- **12‑section high board** at I²C address `0x78`

The extension reads all 20 sections, computes a touch mask, and converts it
into a water‑level percentage (each section = 5%).

---

## Blocks

### Update readings
Reads all 20 sensor values from I²C.

### Water level percent
Returns the calculated water level (0–100%).

### Touch mask
Returns a 20‑bit mask of active sections.

### Debug print
Prints raw and processed values to serial.

---

## Example

```ts
basic.forever(function () {
    WaterLevelSensor.update()
    let level = WaterLevelSensor.getWaterLevelPercent()
    serial.writeLine("Water level: " + level + "%")
    basic.pause(1000)
})
