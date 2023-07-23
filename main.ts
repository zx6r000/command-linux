serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = serial.readLine()
    datalogger.log(
    datalogger.createCV("type", "respons"),
    datalogger.createCV("message", data)
    )
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        `)
    if (data == "closed") {
        basic.showIcon(IconNames.Skull)
    } else {
        if (data.includes("$$$")) {
            data_tot = "" + data_tot + data
        } else {
            bluetooth.uartWriteString("" + data_tot + data)
            data_tot = ""
        }
        basic.clearScreen()
    }
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.StickFigure)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    if (command == "RAZ") {
        basic.showNumber(3)
        basic.pause(500)
        basic.showNumber(2)
        basic.pause(500)
        basic.showNumber(1)
        basic.pause(500)
        control.reset()
    } else {
        serial.writeLine(command)
        datalogger.log(
        datalogger.createCV("type", "command"),
        datalogger.createCV("message", command)
        )
        basic.showIcon(IconNames.Sword)
        if (command == "close") {
            basic.showIcon(IconNames.No)
        }
        basic.clearScreen()
    }
})
let command = ""
let data_tot = ""
let data = ""
basic.showIcon(IconNames.House)
data = ""
data_tot = ""
datalogger.setColumnTitles("type")
datalogger.setColumnTitles("message")
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
	
})
