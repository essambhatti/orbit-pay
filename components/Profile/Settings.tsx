import { Alert, Text, TouchableOpacity, View } from "react-native";


import React from 'react'
import { Lock, LogOut, Trash2 } from "lucide-react-native";
import { showToast } from "@/lib/toast";
import { useAuth, useUser } from "@clerk/clerk-expo";

const Settings = () => {

    const { signOut } = useAuth();
    const {user}  = useUser()


    const handleDeactivate = () => {
        Alert.alert("Deactivate account", "This action is permanent", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Deactivate",
                style: "destructive",
                onPress: async () => {
                    await user?.delete();
                },
            },
        ]);
    };

    return (
        <View className="bg-[#0B1624] rounded-3xl p-5 mb-6">
            <Text className="text-white text-xl font-bold mb-2">Settings</Text>

            <Row
                label="Change password"
                icon={<Lock size={20} color="#1E90FF" />}
                onPress={() => showToast({ type: "info", title: "Password", message: "Use Clerk Security Settings" })}
            />

            <Row
                label="Logout"
                icon={<LogOut size={20} color="#FF6B6B" />}
                onPress={() => signOut()}
            />

            <Row
                label="Deactivate account"
                danger
                icon={<Trash2 size={20} color="#FF4D4D" />}
                onPress={handleDeactivate}
            />
        </View>
    )
}

export default Settings

function Row({
    icon,
    label,
    onPress,
    danger,
}: {
    icon: React.ReactNode;
    label: string;
    onPress: () => void;
    danger?: boolean;
}) {
    return (
        <TouchableOpacity onPress={onPress} className="flex-row items-center py-4">
            {icon}
            <Text
                className={`ml-4 text-base ${danger ? "text-red-400" : "text-white"}`}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}
