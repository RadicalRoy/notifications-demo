import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/ThemedView";
import { useBottomTabOverflow } from "@/components/ui/TabBarBackground";
import { useColorScheme } from "@/hooks/useColorScheme";

const HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
  headerElement: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerElement,
  headerBackgroundColor,
}: Props) {
  const colorScheme = useColorScheme() ?? "light";
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
          ]}
        >
          {headerElement}
        </View>
        {children}
        {/* <ThemedView style={styles.content}>{children}</ThemedView> */}
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#1d3247",
  },
  header: {
    height: HEADER_HEIGHT,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    // padding: 32,
    // gap: 16,
    // overflow: "hidden",
  },
});
