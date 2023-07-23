serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    datalogger.log(
    datalogger.createCV("type", "respons"),
    datalogger.createCV("message", serial.readLine())
    )
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . . # . .
        . . # . .
        `)
    bluetooth.uartWriteString(serial.readLine())
    basic.pause(1000)
    basic.clearScreen()
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.StickFigure)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serial.writeLine(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
    datalogger.log(
    datalogger.createCV("type", "command"),
    datalogger.createCV("message", bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
    )
    basic.showIcon(IconNames.Sword)
    if (bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)) == "close") {
        basic.showIcon(IconNames.No)
    }
    basic.pause(1000)
    basic.clearScreen()
})
basic.showIcon(IconNames.House)
datalogger.setColumnTitles("type")
datalogger.setColumnTitles("message")
serial.setBaudRate(BaudRate.BaudRate9600)
basic.forever(function () {
	
})
