import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter, RelativePathString, useSegments } from 'expo-router';
import { useAtom } from "jotai";
import { indexActionSheet, intentAtom } from "../../store/Atom";
import { navItems } from "@/constants/tabsData";
import { QrCode, SmartphoneNfc } from "lucide-react-native";
import "@/global.css";

const Navbar = () => {
    const router = useRouter();
      const segments = useSegments();

    const [intent] = useAtom(intentAtom);
    const [indexSheet, setindexActionSheet] = useAtom(indexActionSheet);
    const [showActivitySheet, setShowActivitySheet] = useState(false);

   const isActive = (target?: string[]) => {
    if (!target) return false;
    if (segments.length < target.length) return false;
    return target.every((seg, i) => segments[i] === seg);
  };
    return (
        <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
            <View className="bg-[#86D2FF] rounded-3xl px-6 py-4">
                <View className="flex-row justify-around items-center">
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        const active = isActive(item.segments);

                        /* -------- Center QR -------- */
                        if (item.isCenter) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() =>
                                        router.push(item.route as RelativePathString)
                                    }
                                    className="-mt-10"
                                >
                                    <View className="w-16 h-16 rounded-full bg-[#001C71] items-center justify-center">
                                        <Icon size={30} color="#86D2FF" />
                                    </View>
                                </TouchableOpacity>
                            );
                        }

                        /* -------- Activity (Action Sheet) -------- */
                        if (item.isAction) {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setShowActivitySheet(true)}
                                    className="items-center"
                                >
                                    <Icon size={26} color="#001C71" strokeWidth={2} />
                                </TouchableOpacity>
                            );
                        }

                        /* -------- Normal Tabs -------- */
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() =>
                                    router.push(item.route as RelativePathString)
                                }
                                className="items-center"
                            >
                                <Icon
                                    size={26}
                                    color="#001C71"
                                    strokeWidth={active ? 3 : 2}
                                />

                                {/* Active underline */}
                                <View
                                    className={`mt-1 h-[3px] rounded-full ${active ? "w-6 bg-[#001C71]" : "w-0"
                                        }`}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {showActivitySheet && (
                <View className="absolute inset-0 justify-end">
                    {/* Overlay */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setShowActivitySheet(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* Sheet */}
                    <View className="bg-[#ffffff] rounded-t-3xl px-6 py-5">
                        <View className="items-center mb-4">
                            <View className="w-10 h-1.5 bg-gray-600 rounded-full" />
                        </View>

                        <Text className="text-lg font-bold text-gray-900 mb-4">
                            Wallet Actions
                        </Text>

                        {/* RECEIVE */}
                        <TouchableOpacity
                            onPress={() => {
                                setShowActivitySheet(false);
                                router.push("/(protected)/bluetooth/receive");
                            }}
                            className="border border-gray-200 rounded-2xl p-4 mb-3 flex-row items-center"
                        >
                            <View className="w-10 h-10 bg-blue-100 rounded-xl items-center justify-center">
                                <QrCode size={20} color="#2563EB" />
                            </View>
                            <View className="ml-4">
                                <Text className="font-semibold text-gray-900">
                                    Receive Tokens
                                </Text>
                                <Text className="text-gray-500 text-sm">Via Bluetooth</Text>
                            </View>
                        </TouchableOpacity>

                        {/* SEND */}
                        <TouchableOpacity
                            onPress={() => {
                                setShowActivitySheet(false);
                                router.push("/(protected)/bluetooth/send");
                            }}
                            className="border border-gray-200 rounded-2xl p-4 flex-row items-center"
                        >
                            <View className="w-10 h-10 bg-green-100 rounded-xl items-center justify-center">
                                <SmartphoneNfc size={20} color="#16A34A" />
                            </View>
                            <View className="ml-4">
                                <Text className="font-semibold text-gray-900">
                                    Send Tokens
                                </Text>
                                <Text className="text-gray-500 text-sm">
                                    Transfer Money via Bluetooth
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {indexSheet && (
                <View className="absolute inset-0 justify-end">
                    {/* Overlay */}
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => setindexActionSheet(false)}
                        className="absolute inset-0 bg-black/40"
                    />

                    {/* Sheet */}
                    <View className="bg-[#ffffff] rounded-t-3xl px-6 py-5">
                        {/* Handle */}
                        <View className="items-center mb-4">
                            <View className="w-10 h-1.5 bg-gray-600 rounded-full" />
                        </View>

                        <Text className="text-lg font-bold text-gray-900 mb-4">
                            Choose Transfer Method
                        </Text>

                        {/* ================= ORBITPAY ================= */}
                        <TouchableOpacity
                            onPress={() => {
                                // setRail("bluetooth");
                                setindexActionSheet(false);
                                router.push(
                                    `/(protected)/bluetooth/${intent}` as RelativePathString
                                );
                            }}
                            className="border border-gray-200 rounded-2xl p-4 mb-3 flex-row items-center"
                        >
                            <View className="w-10 h-10 rounded-xl items-center justify-center">
                                <Image
                                    source={require("@/assets/images/withoutbg.png")}
                                    className="w-8 h-8"
                                    resizeMode="contain"
                                />
                            </View>

                            <View className="ml-4">
                                <Text className="font-semibold text-gray-900">
                                    Via OrbitPay
                                </Text>
                                <Text className="text-gray-500 text-sm">
                                    Instant transfer using Bluetooth
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* ================= SOLANA ================= */}
                        <TouchableOpacity
                            onPress={() => {
                                setindexActionSheet(false);
                                router.push(
                                    `/(protected)/blockchain/sol/${intent}` as RelativePathString
                                );
                            }}
                            className="border border-gray-200 rounded-2xl p-4 flex-row items-center"
                        >
                            <View className="w-10 h-10 rounded-xl items-center justify-center">
                                <Image
                                    source={require("@/assets/images/logos/solana-sol-logo.png")}
                                    className="w-8 h-8"
                                    resizeMode="contain"
                                />
                            </View>

                            <View className="ml-4">
                                <Text className="font-semibold text-gray-900">
                                    Via Solana
                                </Text>
                                <Text className="text-gray-500 text-sm">
                                    On-chain blockchain transfer
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Navbar;