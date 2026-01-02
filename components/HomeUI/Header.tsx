import { showToast } from '@/lib/toast';
import { Bluetooth, BluetoothOff} from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View} from 'react-native'
import RNBluetoothClassic from "react-native-bluetooth-classic";

const Header = () => {

    const [bleEnabled, setBleEnabled] = useState<boolean | null>(null);


    useEffect(() => {
        RNBluetoothClassic.isBluetoothEnabled().then(setBleEnabled);
    }, []);

    const enableBluetooth = async () => {
        try {
            const enabled = await RNBluetoothClassic.isBluetoothEnabled();
            if (!enabled) {
                await RNBluetoothClassic.requestBluetoothEnabled();
            }
            const updated = await RNBluetoothClassic.isBluetoothEnabled();
            setBleEnabled(updated);
            showToast({ type: "success", title: updated ? "Bluetooth Enabled" : "Bluetooth Disabled", message: updated ? "Bluetooth Enabled" : "Bluetooth Disabled" });

        } catch {
            showToast({ type: "error", title: "Bluetooth", message: "Failed to ena" });

        }
    };

    return (
        <View className="flex-row justify-between items-center pb-4 border-b border-white/10 mt-5">
            <Image
                source={require("@/assets/images/withoutbg.png")}
                className="w-10 h-10"
                resizeMode="contain"
            />

            <TouchableOpacity
                onPress={enableBluetooth}
                className={`p-2.5 rounded-full ${bleEnabled ? "bg-[#001C71]" : "bg-[#99838395]"
                    }`}
            >
                {bleEnabled ? (
                    <Bluetooth size={20} color="#86D2FF" />
                ) : (
                    <BluetoothOff size={20} color="#fff" />
                )}
            </TouchableOpacity>
        </View>

    )
}

export default Header
