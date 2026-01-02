import { Text, View } from "react-native";

export const BalanceBox = ({ label, value }: any) => (
  <View className="w-[48%] bg-[#0B1E5B] p-4 rounded-3xl items-center">
    <Text className="text-white font-bold opacity-80">{label}</Text>
    <Text className="text-white text-lg font-bold mt-1">{value}</Text>
    <Text className="text-green-400 font-bold mt-1">+ $12.61</Text>
  </View>
);