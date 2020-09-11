/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName, apiUrl} from './app.json';
import axios from 'axios';

axios.defaults.baseURL = apiUrl;
AppRegistry.registerComponent(appName, () => App);
