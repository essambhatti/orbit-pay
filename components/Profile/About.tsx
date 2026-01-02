import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo';
import Constants from "expo-constants";


const About = () => {
    const { user } = useUser();



    const appVersion = Constants.expoConfig?.version ?? "1.0.0";
    return (
        <View className="bg-[#0B1624] rounded-3xl p-5">
            <Text className="text-white text-xl font-bold mb-3">About</Text>

            <Text className="text-[#8FA3BF] text-sm mb-2">
                Version {appVersion}
            </Text>

            <Text className="text-[#8FA3BF] text-sm">User ID: {user?.id}</Text>
        </View>
    )
}

export default About