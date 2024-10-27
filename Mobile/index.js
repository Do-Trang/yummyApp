/**
 * @format
 */

import {AppRegistry} from 'react-native';
import SignupForm from './src/components/forms/signup-form/SignupForm';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => SignupForm);
