import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

const host = NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0];

if (__DEV__) {
    const tron = Reactotron.configure({ host }) // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!

    console.tron = tron;

    tron.clear();
}
