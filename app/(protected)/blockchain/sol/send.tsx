import PaymentForm from "@/components/Solana/PaymentForm";
import ScreenHeader from "@/components/Solana/ScreenHeader";
import React from "react";
import {
    SafeAreaView,
} from "react-native";



const SendSol = () => {



  return (
    <SafeAreaView className="flex-1 px-5 py-6">

      <ScreenHeader screenName="Send" />

      <PaymentForm />

    </SafeAreaView>
  );
};

export default SendSol;
