import { type Notification } from "expo-notifications";

export type AppNotification = {
  notification: Notification;
  isRead: boolean;
};

export const notificationCategories = [
  "friend_request",
  "mention",
  "community_invite",
] as const;
