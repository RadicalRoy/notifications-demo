import { StyleSheet, Image, Platform, ScrollView } from "react-native";

import { Collapsible } from "@/components/Collapsible";
import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { NotificationsView } from "@/components/notificationsView/NotificationsView";

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerElement={
        <ThemedView style={styles.headerElement}>
          <ThemedText type="defaultSemiBold">Notifications</ThemedText>
        </ThemedView>
      }
    >
      <NotificationsView />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerElement: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
