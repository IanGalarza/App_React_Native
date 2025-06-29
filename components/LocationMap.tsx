import { Platform } from 'react-native';

let Component: any;
if (Platform.OS === 'web') {
} else {
  Component = require('./LocationMap.native').default;
}

export default Component;