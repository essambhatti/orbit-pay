import { showToast } from "@/lib/toast";
import { balanceAtom } from "@/store/Atom";
import { PublicKey } from "@solana/web3.js";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useAtom } from "jotai";
import { QrCode } from "lucide-react-native";
import React, { useState } from "react";

import { Modal, Text, TouchableOpacity, View } from "react-native";

interface Props {
  screenName: string;
}

const ScreenHeader = ({ screenName }: Props) => {
  const [scanOpen, setScanOpen] = useState(false);

  const [balance] = useAtom(balanceAtom);
  const [permission, requestPermission] = useCameraPermissions();
  const [toAddress, setToAddress] = useState("");
  const isValidAddress = (address: string) => {
    try {
      new PublicKey(address);
      return true;
    } catch {
      return false;
    }
  };

  const handleScan = ({ data }: { data: string }) => {
    if (isValidAddress(data)) {
      setToAddress(data);

      setScanOpen(false);
    } else {
      showToast({
        type: "error",
        title: "Invalid QR",
        message: "Not a valid Solana address",
      });
    }
  };

  return (
    <>
      <View className="flex-row items-center justify-center">
        <View>
          <Text className="text-white text-2xl font-bold ">
            {screenName} SOL
          </Text>
          <Text className="text-[#86D2FF] text-sm mt-1">
            Solana • Secure Transfer
          </Text>
        </View>

        <TouchableOpacity
          onPress={async () => {
            if (!permission?.granted) await requestPermission();
            setScanOpen(true);
          }}
          className="w-11 h-11 rounded-xl bg-[#0B1E5B] items-center justify-center"
        >
          <QrCode size={22} color="#86D2FF" />
        </TouchableOpacity>
      </View>

      {balance !== null && (
        <View className="mt-6 items-center justify-center">
          <Text className="text-white/70 text-sm">Available Balance</Text>
          <Text className="text-white text-lg font-semibold mt-1">
            {balance.toFixed(4)} SOL
          </Text>
        </View>
      )}

      <Modal visible={scanOpen} animationType="slide">
        <View className="flex-1 bg-black">
          <CameraView
            style={{ flex: 1 }}
            barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
            onBarcodeScanned={handleScan}
          />

          <TouchableOpacity
            onPress={() => setScanOpen(false)}
            className="absolute bottom-10 self-center bg-white px-6 py-3 rounded-full"
          >
            <Text className="font-semibold">Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default ScreenHeader;
