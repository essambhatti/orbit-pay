import { useAuth } from "@clerk/clerk-expo";
import {
  Redirect,

  Slot,

} from "expo-router";
import {
  ImageBackground,
  ScrollView,
  View,
} from "react-native";

import "@/global.css";
import Header from "@/components/HomeUI/Header";
import Navbar from "@/components/HomeUI/Navbar";

export default function RootLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href="/(auth)/signin" />;
  }

  return (
    <ImageBackground
      source={require("@/assets/screens/dashboard-bg.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1">
        {/* ================= CONTENT ================= */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="px-4 pt-6 pb-28">
            {/* Header */}
            <Header />
            {/* Screens */}
            <Slot />
          </View>
        </ScrollView>

        {/* ================= BOTTOM NAV ================= */}
        <Navbar />

      </View>
    </ImageBackground>
  );
}
