import { View, StyleSheet, type ViewProps, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { sendNotification, useNotifications } from "@/hooks/useNotifications";
import { useCallback, useMemo } from "react";
import { FlashList, type ListRenderItem } from "@shopify/flash-list";
import { type AppNotification } from "@/constants/Notifications";

type NotificationsViewProps = {} & ViewProps;

export function NotificationsView({}: NotificationsViewProps) {
  const { notifications } = useNotifications();

  // could add additional filtering logic here ('mentions', 'friend_requests', etc)
  const displayNotifs = useMemo(() => {
    return notifications.reverse();
  }, [notifications]);

  const renderItem = useCallback<ListRenderItem<AppNotification>>(
    ({ item }) => {
      return <ThemedText>{item.notification.request.content.title}</ThemedText>;
    },
    []
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={sendNotification}>
        <ThemedText>Send test notification</ThemedText>
        <FlashList data={displayNotifs} renderItem={renderItem} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
