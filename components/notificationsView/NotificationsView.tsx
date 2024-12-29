import { View, StyleSheet, type ViewProps } from "react-native";

type NotificationsViewProps = {} & ViewProps;

export function NotificationsView({}: NotificationsViewProps) {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
