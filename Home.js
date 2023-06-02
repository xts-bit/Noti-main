import React, { useEffect } from 'react'
import { Pressable, Text } from 'react-native'
import notifee, { AndroidImportance, AuthorizationStatus, EventType, TriggerType } from '@notifee/react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation()

  async function checkInitialNotificationStatus() {
    const initialNotification = await notifee.getInitialNotification();
    if (initialNotification) {
      navigation.navigate("profile")
    }
  }

  useEffect(() => {
    checkInitialNotificationStatus();

    return notifee.onForegroundEvent(({ type, detail }) => {
      if (type == EventType.ACTION_PRESS || type == EventType.PRESS) {
        navigation.navigate("profile")
      }
    })
  }, [])

  async function onCreateTriggerNotification(UserExpDate) {
    console.log(UserExpDate)
    const date = new Date(UserExpDate);
    console.log("Converted UserExpDate:", date);

    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      sound: 'default',
    });

    await notifee.createTriggerNotification(
      {
        title: '<p style="color: #4caf50;"><b>Noti Noti</span></p></b></p>',
        body: `Profile Screen`,
        android: {
          channelId,
        },
      },
      trigger,
    );

    notifee.onBackgroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        navigation.navigate('profile');
      }
    });

    notifee.onForegroundEvent(({ type, detail }) => {
      if (type === EventType.PRESS) {
        navigation.navigate('profile');
      }
    })

    const ids = await notifee.getTriggerNotificationIds();
    console.log('All trigger notifications: ', ids);
  }

  async function Handler() {
    const currentTime = new Date().getTime();
    const futureTime = currentTime + 10000; // 10 seconds = 10,000 milliseconds
    const date = new Date(futureTime);
    console.log(date)
    const settings = await notifee.requestPermission();
    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      console.log("Allow per")
    } else if (settings.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
      await onCreateTriggerNotification(date);
    } else if (settings.authorizationStatus === AuthorizationStatus.PROVISIONAL) {
      await onCreateTriggerNotification(date);
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'gray', flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Pressable onPress={() => Handler()} style={{ alignItems: 'center' }}>
        <Text>Press Me</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default Home