import { View, StyleSheet, type ViewProps, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { sendNotification, useNotifications } from "@/hooks/useNotifications";
import { useCallback, useMemo } from "react";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { type AppNotification } from "@/constants/Notifications";
import { NotificationCard } from "./NotificationsCard";

type NotificationsViewProps = {} & ViewProps;

export function NotificationsView({}: NotificationsViewProps) {
  const { notifications } = useNotifications();

  // could add additional filtering logic here ('mentions', 'friend_requests', etc)
  // TODO: SHOULD REFRESH THE VIEW EVERY MINUTE - Maybe just refresh the timestamps
  const displayNotifs = useMemo(() => {
    return notifications.slice().reverse();
  }, [notifications]);

  const renderItem = useCallback<ListRenderItem<AppNotification>>(
    ({ item }) => {
      return <NotificationCard item={item} />;
    },
    []
  );

  return (
    <View style={styles.container}>
      {/* <Pressable onPress={sendNotification}>
        <ThemedText>Send test notification</ThemedText>
      </Pressable> */}
      <FlashList data={displayNotifs} renderItem={renderItem} />
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
