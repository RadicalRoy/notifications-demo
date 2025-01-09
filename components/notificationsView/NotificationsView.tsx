import { View, StyleSheet, type ViewProps, Pressable } from "react-native";
import { useNotifications } from "@/hooks/useNotifications";
import { useCallback, useMemo } from "react";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { type AppNotification } from "@/constants/Notifications";
import { NotificationCard } from "./NotificationsCard";

type NotificationsViewProps = {} & ViewProps;

export function NotificationsView({}: NotificationsViewProps) {
  const { notifications, setNotifications } = useNotifications();

  // could add additional filtering logic here ('mentions', 'friend_requests', etc)
  // TODO: SHOULD REFRESH THE VIEW EVERY MINUTE - Maybe just refresh the timestamps
  const displayNotifs = useMemo(() => {
    return notifications.slice().reverse();
  }, [notifications]);

  const renderItem = useCallback<ListRenderItem<AppNotification>>(
    ({ item, index }) => {
      const markRead = () => {
        if (!item.isRead) {
          setNotifications((notifs) => {
            // want to update isRead status on global notification, but index will be of list in reverse
            // so we calculate original index
            const ogIndex = notifs.length - index - 1;

            const newNotifs = notifs.slice();
            const oldNotif = notifs[ogIndex];
            newNotifs[ogIndex] = { ...oldNotif, isRead: true };
            return newNotifs;
          });
        }
      };

      return <NotificationCard item={item} markRead={markRead} />;
    },
    []
  );

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={sendNotification}>
        <ThemedText>Send test notification</ThemedText>
      </Pressable> */}
      <FlashList
        data={displayNotifs}
        renderItem={renderItem}
        keyExtractor={(item) => item.notification.request.identifier}
        estimatedItemSize={66}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { height: "100%", overflow: "hidden" },
  notificationCard: {
    width: "100%",
    height: 60,
    flex: 1,
    flexDirection: "row",
  },
});
