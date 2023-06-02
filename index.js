import { AppRegistry } from 'react-native';
import notifee, { EventType } from '@notifee/react-native';
import App from './App';
import { useNavigation } from '@react-navigation/native';

const navigation = useNavigation();

notifee.onBackgroundEvent(async ({ type, detail }) => {
    const { notification, pressAction } = detail;
    if (type === EventType.ACTION_PRESS) {
        navigation.navigate("profile")
    }
});

AppRegistry.registerComponent('app', () => App);