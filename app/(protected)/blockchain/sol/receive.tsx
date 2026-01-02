import ScreenHeader from "@/components/Solana/ScreenHeader";
import { getSolBalance, loadWallet } from "@/lib/Solana/walletCreate";
import { showToast } from "@/lib/toast";
import * as Clipboard from "expo-clipboard";
import { Copy } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import QRCode from "react-native-qrcode-svg";

const ReceiveSol = () => {
  const [balance, setBalance] = useState<number | null>(null);
  const [receiver, setReceiver] = useState<string>("");

  useEffect(() => {
    (async () => {
      const wallet = await loadWallet();
      if (!wallet) {
        showToast({ type: "error", title: "Wallet not found", message: "Create a Wallet first" });
        return;
      }

      const address = wallet.publicKey.toBase58();
      setReceiver(address);

      const bal = await getSolBalance(address);
      setBalance(bal);
    })();
  }, []);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(receiver);
  };

  return (
    <SafeAreaView className="flex-1  px-5 py-6">

      <ScreenHeader screenName="Recieve"/>

      {/* ================= QR CARD ================= */}
      <View className="mt-10 rounded-3xl py-8 items-center">
        {receiver ? (
          <QRCode
            value={receiver}
            size={240}
            backgroundColor="transparent"
            color="#86D2FF"
          />
        ) : (
          <Text className="text-white mt-6">Generating QR…</Text>
        )}

        <Text className="text-white/70 text-sm mt-4">Scan to receive SOL</Text>
      </View>

      {/* ================= ADDRESS ================= */}
      <View className="mt-8">
        <View className="bg-[#000000] rounded-2xl px-4 py-4 flex-row items-center justify-between">
          <Text className="text-white text-sm w-[85%]" numberOfLines={1}>
            {receiver}
          </Text>

          <TouchableOpacity onPress={handleCopy}>
            <Copy size={20} color="#86D2FF" />
          </TouchableOpacity>
        </View>

        <Text className="text-white/60 text-xs mt-2 text-center">
          Tap to copy your Solana address
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ReceiveSol;
