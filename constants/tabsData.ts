import {
    CreditCard,
    Home,
    QrCode,
    SmartphoneNfc,
    User,
} from "lucide-react-native";


export  const navItems = [
    {
      name: "Home",
      icon: Home,
      route: "/(protected)",
      segments: ["(protected)"],
    },
    {
      name: "Activity",
      icon: SmartphoneNfc,
      isAction: true,
    },
    {
      name: "QR",
      icon: QrCode,
      route: "/(scan)",
      segments: ["(scan)"],
      isCenter: true,
    },
    {
      name: "Credit",
      icon: CreditCard,
      route: "/(protected)/credit-score",
      segments: ["(protected)", "credit-score"],
    },
    {
      name: "Profile",
      icon: User,
      route: "/(protected)/profile",
      segments: ["(protected)", "profile"],
    },
  ];
