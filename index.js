/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import NavApp from './src/view1.js';
import NavTabApp from './src/view2.js';
import Login from './src/login.js';
import RegView1 from './src/regView1.js';
import RegView2 from './src/regView2.js';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => RegView2);
