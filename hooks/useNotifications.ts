import {
  type AppNotification,
  notificationCategories as categories,
} from "@/constants/Notifications";
import * as Notifications from "expo-notifications";
import { useEffect, useRef, useState } from "react";

export const sendNotification = () => {
  const { name, category } = generateRandomNotificationsData();
  Notifications.scheduleNotificationAsync({
    content: {
      title: getNotificationsMessage({ name, category }),
      body: null,
      categoryIdentifier: category,
      data: { name }, // have to set type of data somewhere...
    },
    trigger: null,
  });
};

/*
    truly the notifications array and badgeCount variables should be stored in a Context
    so they may be accessed for use in other views.
    (alternatively a singleton styled hook implementation could work so that calling it anywhere
    returns the correct value)
*/

export const useNotifications = () => {
  /*
    We should consider a more appropriate data structure than an array because 
        1) If we .push new elements then displaying the array 
        will always result in a .reverse O(n) call to display elements in reverse
        2) If we store elements in reverse then adding a new element will also result in a .unshift O(n) call
    We'll also have to do consistent .find item lookups to mark notifications as read later
    Thus something like a parallel object & array (or other data structure) would be more appropriate
    - Let's discuss that in review
    */
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const notificationListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    // Set the handler that will cause the notification to show the alert
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
      }),
      handleError: async (_notificationId, error) => {
        console.error(error);
      },
      handleSuccess: async () => {
        console.log("notificationSuccess");
      },
    });

    // Set listeners
    notificationListener.current =
      Notifications.addNotificationReceivedListener((newNotification) => {
        Notifications.getBadgeCountAsync().then((num) =>
          console.log("badgecount", num)
        );

        setNotifications((currentNotifications) => [
          ...currentNotifications,
          { notification: newNotification, isRead: false },
        ]);
      });

    // Send initial notifications
    sendNotification();
    sendNotification();
    sendNotification();

    return () => {
      // cleanup listeners
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      // cancel any pending notifications
      Notifications.cancelAllScheduledNotificationsAsync();
    };
  }, []);

  return { notifications };
};

const generateRandomNotificationsData = () => {
  const randomInt = Math.floor(Math.random() * 1000);
  // needs a random name
  const name = names[randomInt % names.length];
  // needs a random category
  const category = categories[randomInt % categories.length];

  return { name, category };
};

const names = [
  "Elphaba",
  "Glinda",
  "Nessarose",
  "Fiyero",
  "Boq",
  "Mme. Morrible",
  "The Wizard",
  "Dr. Dillamond",
];

// might be more appropriate to return a formatted text element
const getNotificationsMessage = ({
  name,
  category,
}: {
  name: string;
  category: (typeof categories)[number];
}) => {
  const map: Record<(typeof categories)[number], string> = {
    community_invite: `@${name} sent you a community invite!`,
    friend_request: `@${name} sent you a friend request!`,
    mention: `@${name} mentioned you in a post!`,
  };

  return map[category];
};
