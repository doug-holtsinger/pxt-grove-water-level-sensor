// Microbit extension for 20‑section water level sensor (ATTINY I2C)

namespace WaterLevelSensor {

    const ATTINY1_HIGH_ADDR = 0x78
    const ATTINY2_LOW_ADDR = 0x77
    const THRESHOLD = 100

    let lowData: number[] = []
    let highData: number[] = []

    //% block="update water sensor readings"
    //% group="Sensor"
    export function update(): void {
        readLowSections()
        readHighSections()
    }

    //% block="read low 8 sections"
    //% group="Raw Data"
    export function readLowSections(): number[] {
        lowData = []
        const buf = pins.i2cReadBuffer(ATTINY2_LOW_ADDR, 8)
        for (let i = 0; i < 8; i++) {
            lowData.push(buf[i])
        }
        return lowData
    }

    //% block="read high 12 sections"
    //% group="Raw Data"
    export function readHighSections(): number[] {
        highData = []
        const buf = pins.i2cReadBuffer(ATTINY1_HIGH_ADDR, 12)
        for (let i = 0; i < 12; i++) {
            highData.push(buf[i])
        }
        return highData
    }

    //% block="touch mask"
    //% group="Processed Data"
    export function getTouchMask(): number {
        let mask = 0

        for (let i = 0; i < 8; i++) {
            if (lowData[i] > THRESHOLD) {
                mask |= (1 << i)
            }
        }

        for (let i = 0; i < 12; i++) {
            if (highData[i] > THRESHOLD) {
                mask |= (1 << (8 + i))
            }
        }

        return mask
    }

    //% block="water level percent"
    //% group="Processed Data"
    export function getWaterLevelPercent(): number {
        let mask = getTouchMask()
        let count = 0

        while ((mask & 0x01) == 1) {
            count++
            mask >>= 1
        }

        return count * 5
    }

    //% block="print debug info"
    //% group="Debug"
    export function debugPrint(): void {
        serial.writeLine("Low 8 sections:")
        serial.writeLine(lowData.join(","))

        serial.writeLine("High 12 sections:")
        serial.writeLine(highData.join(","))

        serial.writeLine("Water level: " + getWaterLevelPercent() + "%")
        serial.writeLine("------------------------------")
    }
}
