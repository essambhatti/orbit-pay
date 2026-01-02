import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

export const Widget = ({ icon, label, disabled, onPress }: any) => (
  <TouchableOpacity
    disabled={disabled}
    className={`w-20 h-20 rounded-2xl items-center justify-center ${
      disabled ? "bg-[#46484c]" : "bg-[#0B1E5B]"
    }`}
    onPress={onPress}
  >
    <Ionicons name={icon} size={26} color="white" />
    <Text className="text-white text-xs font-extrabold mt-1">{label}</Text>
  </TouchableOpacity>
)