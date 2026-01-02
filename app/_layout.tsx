import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import Toast from 'react-native-toast-message';


const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  return (
    <GestureHandlerRootView className="flex-1">
      <ClerkProvider tokenCache={tokenCache}>
        <ConvexProvider client={convex}>
          <Slot />
          <Toast />
        </ConvexProvider>
      </ClerkProvider>
    </GestureHandlerRootView>
  );
}
