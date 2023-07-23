serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    data = serial.readLine()
    transfert = 0
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
    if (data.includes("$$$")) {
        data_tot = "" + data_tot + data
    } else {
        bluetooth.uartWriteString("" + data_tot + data)
        data_tot = ""
    }
    basic.clearScreen()
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.StickFigure)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    command = bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine))
    serial.writeLine(command)
    transfert = 1
    datalogger.log(
    datalogger.createCV("type", "command"),
    datalogger.createCV("message", command)
    )
    basic.showIcon(IconNames.Sword)
    if (command == "close") {
        basic.showIcon(IconNames.No)
    }
    basic.clearScreen()
})
let command = ""
let transfert = 0
let data_tot = ""
let data = ""
basic.showIcon(IconNames.House)
data = ""
data_tot = ""
datalogger.setColumnTitles("type")
datalogger.setColumnTitles("message")
serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    if (transfert == 1) {
        transfert += 1
        if (transfert > 3) {
            basic.showIcon(IconNames.Sad)
        }
    }
})
