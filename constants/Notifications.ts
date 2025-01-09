import { type Notification } from "expo-notifications";

export type AppNotification = {
  notification: Notification;
  isRead: boolean;
  dateReceived: number;
};

export const notificationCategories = [
  "friend_request",
  "mention",
  "community_invite",
] as const;

export type notificationCategory = (typeof notificationCategories)[number];
