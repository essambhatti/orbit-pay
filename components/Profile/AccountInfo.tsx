import { showToast } from '@/lib/toast';
import { walletAtom } from '@/store/Atom';
import { useAtom } from 'jotai';
import React from 'react'
import * as Clipboard from "expo-clipboard";


import {
    Image,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useUser } from '@clerk/clerk-expo';
import { Copy } from 'lucide-react-native';

const AccountInfo = () => {

    const walletObj = useAtom(walletAtom);
    const walletAddress = walletObj[0];
    const { user } = useUser();

    const email = user?.primaryEmailAddress?.emailAddress;
    const avatar = user?.imageUrl;


    const copyWallet = async () => {
        if (!walletAddress) return;
        await Clipboard.setStringAsync(walletAddress as string);
        showToast({ type: "success", title: "Copied", message: "Wallet Address Copied" });

    };

    return (
        <View className="bg-[#0B1624] rounded-3xl p-5 mb-6">
            <Text className="text-white text-2xl font-bold mb-4">
                Current Account
            </Text>

            <View className="flex-row items-center">
                <Image source={{ uri: avatar }} className="w-14 h-14 rounded-full" />

                <View className="ml-4 flex-1">
                    <Text className="text-white text-base">{email}</Text>

                    {walletAddress && (
                        <View className="flex-row items-center mt-1">
                            <Text className="text-[#8FA3BF] text-sm">
                                {typeof walletAddress === "string"
                                    ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}`
                                    : ""}
                            </Text>

                            <TouchableOpacity onPress={copyWallet} className="ml-3">
                                <Copy size={16} color="#1E90FF" />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>

            <TouchableOpacity className="mt-5 bg-[#1E90FF] py-3 rounded-full">
                <Text className="text-center text-white font-semibold">
                    Manage account
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default AccountInfo
