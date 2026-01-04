// import { loadWallet, sendSol } from "@/lib/Solana/walletCreate";
// import { showToast } from "@/lib/toast";
// import { balanceAtom, qrScanResultAtom, walletAtom } from "@/store/Atom";
// import { PublicKey } from "@solana/web3.js";
// import { useAtom } from "jotai";
// import { Send } from "lucide-react-native";
// import React, { useState } from "react";
// import {
//   ActivityIndicator,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";

// const ESTIMATED_FEE = 0.00001;
// const PaymentForm = () => {
//   const [toAddress, setToAddress] = useState("");
//   const [amount, setAmount] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [useReceiverAddress, _] = useAtom(qrScanResultAtom);
//   const [balance] = useAtom(balanceAtom);
//   const [wallet] = useAtom(walletAtom);

//   /* -------- Validation -------- */
//   const isValidAddress = (address: string) => {
//     try {
//       new PublicKey(address);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   /* -------- Send -------- */
//   const handleSend = async () => {
//     if (!toAddress || !amount) {
//       showToast({
//         type: "error",
//         title: "Missing Fields",
//         message: "Enter address and amount",
//       });
//       return;
//     }

//     if (!isValidAddress(toAddress)) {
//       showToast({
//         type: "error",
//         title: "Invalid address",
//         message: "Invalid Address",
//       });
//       return;
//     }

//     const solAmount = Number(amount);
//     if (isNaN(solAmount) || solAmount <= 0) {
//       showToast({
//         type: "error",
//         title: "Invalid amount",
//         message: "Invalid amount",
//       });
//       return;
//     }

//     if (balance !== null && solAmount + ESTIMATED_FEE > balance) {
//       showToast({
//         type: "error",
//         title: "Insufficient Balance",
//         message: "Amount + Fees exceed balance",
//       });

//       return;
//     }

//     try {
//       setLoading(true);
//       const sender = await loadWallet();
//       if (!sender) throw new Error("Wallet not loaded");

//       const sig = await sendSol(sender, toAddress, solAmount);

//       showToast({
//         type: "success",
//         title: "Transaction Sent",
//         message: `Transaction sent\n\n${sig}`,
//       });

//       setAmount("");
//       setToAddress(useReceiverAddress);
//       console.log(useReceiverAddress);
//     } catch (e: any) {
//       showToast({ type: "error", title: "Failed", message: `${e.message}` });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <View className="mt-8">
//         <Text className="text-white font-bold mb-2">Recipient Address</Text>
//         <TextInput
//           value={toAddress}
//           onChangeText={setToAddress}
//           placeholder="Solana address"
//           placeholderTextColor="#ccc"
//           className="bg-[#000] text-white rounded-2xl px-4 py-4 mb-4"
//         />

//         <Text className="text-white font-bold mb-2">Amount (SOL)</Text>
//         <TextInput
//           value={amount}
//           onChangeText={setAmount}
//           keyboardType="decimal-pad"
//           placeholder="0.01"
//           placeholderTextColor="#ccc"
//           className="bg-[#000] text-white rounded-2xl px-4 py-4"
//         />
//       </View>

//       {/* ================= FEES ================= */}
//       <View className="mt-4 flex-row justify-between">
//         <Text className="text-white/60 text-sm">Estimated Fee</Text>
//         <Text className="text-[#86D2FF] text-sm">{ESTIMATED_FEE} SOL</Text>
//       </View>

//       {/* ================= SEND BUTTON ================= */}
//       <TouchableOpacity
//         onPress={handleSend}
//         disabled={loading}
//         className="mt-10 bg-[#86D2FF] rounded-2xl py-4 items-center"
//       >
//         {loading ? (
//           <ActivityIndicator color="#0B1E5B" />
//         ) : (
//           <View className="flex-row items-center gap-2">
//             <Send size={18} color="#0B1E5B" />
//             <Text className="text-[#0B1E5B] font-bold text-lg">Send SOL</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//     </>
//   );
// };

// export default PaymentForm;
