import About from "@/components/Profile/About";
import AccountInfo from "@/components/Profile/AccountInfo";
import Settings from "@/components/Profile/Settings";

import React from "react";
import {
  ScrollView,
} from "react-native";

export default function Profile() {
  return (
    <ScrollView
      className="flex-1 px-4 pt-6"
      contentContainerStyle={{ paddingBottom: 120 }}
    >

      <AccountInfo />

      {/* ================= SETTINGS ================= */}
      <Settings />

      {/* ================= ABOUT ================= */}
      <About />
    </ScrollView>
  );
}

