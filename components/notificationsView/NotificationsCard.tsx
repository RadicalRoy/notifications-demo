import {
  notificationCategory,
  type AppNotification,
} from "@/constants/Notifications";
import { Pressable, View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { IconSymbol } from "../ui/IconSymbol";
import { useRef, useState } from "react";

// want the item ref so that we can directly update the isRead property
type NotificationCardProps = { item: AppNotification };

export const NotificationCard = ({ item }: NotificationCardProps) => {
  const itemRef = useRef<AppNotification>(item);
  const [isRead, setIsRead] = useState<boolean>(item.isRead);
  // update state when element is recycled
  if (item !== itemRef.current) {
    itemRef.current = item;
    setIsRead(item.isRead);
  }
  // should validate the data
  // cast is not ideal
  const { name, category } = item.notification.request.content.data as {
    name: string;
    category: notificationCategory;
  };

  const { dateReceived } = item;

  console.log(`${name} - ${category} rendered  with isRead `);

  return (
    <Pressable
      onPress={() => {
        // mark read here
        if (!isRead) {
          item.isRead = true;
          setIsRead(true);
        }

        console.log("pressed");
      }}
      key={item.notification.request.identifier}
    >
      <View
        style={{
          ...styles.notificationCard,
          backgroundColor: isRead ? "#252242" : "#2c3950",
        }}
      >
        <View style={styles.iconContainer}>
          <IconSymbol size={28} name="mail" color={"#fff"} />
        </View>
        <View style={styles.textContainer}>
          {getFormattedNotificationText({ name, category })}
          <ThemedText>{getTimeString(dateReceived)}</ThemedText>
        </View>
      </View>
    </Pressable>
  );
};

const getTimeString = (date: number) => {
  const minutes = Math.floor((Date.now() - date) / (1000 * 60));
  return "" + minutes + " minute" + (minutes !== 1 ? "s" : "") + " ago";
};

const getFormattedNotificationText = ({
  name,
  category,
}: {
  name: string;
  category: notificationCategory;
}) => {
  const messageMap: Record<notificationCategory, string> = {
    community_invite: ` sent you a community invite!`,
    friend_request: ` sent you a friend request!`,
    mention: ` mentioned you in a post!`,
  };

  return (
    <ThemedText>
      <ThemedText type="defaultSemiBold">{"@" + name}</ThemedText>
      <ThemedText>{messageMap[category]}</ThemedText>
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  notificationCard: {
    width: "100%",
    height: 60,
    flex: 1,
    flexDirection: "row",
  },
  iconContainer: {
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    justifyContent: "center",
  },
});
