serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    bluetooth.uartWriteString(serial.readLine())
})
bluetooth.onBluetoothConnected(function () {
    basic.showIcon(IconNames.StickFigure)
})
bluetooth.onBluetoothDisconnected(function () {
    basic.showIcon(IconNames.No)
})
bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    serial.writeLine(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
    if (bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)) == "close") {
        basic.showIcon(IconNames.No)
    }
})
basic.showIcon(IconNames.House)
basic.forever(function () {
	
})
