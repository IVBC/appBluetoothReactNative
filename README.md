# appBluetoothReactNative
# APP - Bluetooth Firmware Configuration App

This app set up a medication or control unit via bluetooth. Through the QR code of the shell asset, it obtains the necessary data to configure the firmware of the units. This app was developed in react native.

  - QR CODE
  - BLUETOOTH
  - REACT NATIVE


### Installation

Elektro Config Firmware requires [Node.js](https://nodejs.org/) v4+ to run.

Install the dependencies and devDependencies and start the server.


Installing cURL

```sh
$ sudo apt-get install curl
```



Installing NodeJS


```sh
$ sudo apt-get install curl
$ curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
$ sudo apt install nodejs
```

Installing React Native CLI

```sh
$ sudo npm install -g react-native-cli
// Or yarn global add react-native-cli
```

Installing JDK (Java Development Kit)


```sh
$ sudo add-apt-repository ppa:openjdk-r/ppa
$ sudo apt-get update
$ sudo apt-get install openjdk-8-jdk
```

Installing libs gráficas

```sh
$ sudo apt-get install gcc-multilib lib32z1 lib32stdc++6
```

Installing dependencies via YARN

Open the application folder, Elektro Config, and then install the dependencies with the command:
```sh
$ yarn
```

### Emulating via USB to ANDROID


First connect your device via USB.
With the device connected, it must have USB Debugging enabled, if yours does not already have Developer Options enabled, you can follow the steps below.
Open terminal / prompt and run the adb devices command, the return should be something like:
```sh
$ adb devices
```
If written device next to the device ID means that it is ready to run the application. At this point simply run the command below and wait for the application to be installed on your device.
```sh
$ react-native run-android
$ react-native start --reset-cache
```


### Emulator
To use an Android emulator for the application, you can follow this tutorial: https://docs.rocketseat.dev/ambiente-react-native/android/emulator


