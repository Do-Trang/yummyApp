import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { LogBox } from 'react-native';

// Vô hiệu hóa tất cả cảnh báo
LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);