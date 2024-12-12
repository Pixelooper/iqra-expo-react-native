import arrowDown from "@/assets/icons/arrow-down.png";
import arrowUp from "@/assets/icons/arrow-up.png";
import backArrow from "@/assets/icons/back-arrow.png";
import checkmark from "@/assets/icons/check.png";
import close from "@/assets/icons/close.png";
import home from "@/assets/icons/home.png";
import list from "@/assets/icons/list.png";
import out from "@/assets/icons/out.png";
import person from "@/assets/icons/person.png";
import pin from "@/assets/icons/pin.png";
import point from "@/assets/icons/point.png";
import profile from "@/assets/icons/profile.png";
import search from "@/assets/icons/search.png";
import star from "@/assets/icons/star.png";
import target from "@/assets/icons/target.png";
import to from "@/assets/icons/to.png";

import logo from "@/assets/images/icon.png";
import check from "@/assets/images/check.png";
import getStarted from "@/assets/images/get-started.png";
import message from "@/assets/images/message.png";
import noResult from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import signUpCar from "@/assets/images/signup-car.png";

export const icons = {
    arrowDown,
    arrowUp,
    backArrow,
    checkmark,
    close,
    home,
    list,
    out,
    person,
    pin,
    point,
    profile,
    search,
    star,
    target,
    to,
};

export const images = {
  logo,
  onboarding1,
  onboarding2,
  onboarding3,
  getStarted,
  signUpCar,
  check,
  noResult,
  message,
};

export const onboarding = [
  {
    id: 1,
    title: "The perfect ride is just a tap away!",
    description:
      "Your journey begins with Ryde. Find your ideal ride effortlessly.",
    image: images.onboarding1,
  },
  {
    id: 2,
    title: "Best car in your hands with Ryde",
    description:
      "Discover the convenience of finding your perfect ride with Ryde",
    image: images.onboarding2,
  },
  {
    id: 3,
    title: "Your ride, your way. Let's go!",
    description:
      "Enter your destination, sit back, and let us take care of the rest.",
    image: images.onboarding3,
  },
];

export const surahList = [
  {
    _id: 1,
    no: '১',
    name_bn: "আল ফাতিহা",
    totalAyat: '৭',
  },
  {
    _id: 2,
    no: '২',
    name_bn: "আল বাক্বারাহ",
    totalAyat: '২৮৬',
  },
  {
    _id: 3,
    no: '৩',
    name_bn: "আল-ইমরান",
    totalAyat: '২০০',
  }
];

export const blogs = [
  {
    _id: 1,
    title: "জান্নাতী দল কোনটি?",
    desc: "",
  },
  {
    _id: 2,
    title: "কিয়ামত কি খুব কাছে?",
    desc: "",
  },
  {
    _id: 3,
    title: "ইসলামের মূল ভিত্তি কী?",
    desc: "",
  }
];

export const settings = [
  {
    _id: 1,
    title: "Surah",
    items: 1,
    bgClass: "bg-yellow-100",
    textClass: "text-yellow-700"
  },
  {
    _id: 2,
    title: "Ayat",
    items: 2,
    bgClass: "bg-pink-200",
    textClass: "text-red-700"
  },
  {
    _id: 3,
    title: "Tafsir",
    items: 0,
    bgClass: "bg-red-200",
    textClass: "text-pink-700"
  }
];

export const moods = [
  {
    _id: 1,
    name: "Surah",
    bgClass: "bg-slate-300",
    icon: "🌞"
  },
  {
    _id: 2,
    name: "Sadness",
    bgClass: "bg-orange-300",
    icon: "🌙"
  },
  {
    _id: 3,
    name: "Anger",
    bgClass: "bg-lime-300",
    icon: "🔥"
  },
  // {
  //   _id: 4,
  //   name: "Fear",
  //   bgClass: "bg-yellow-500",
  //   icon: "⚡"
  // },
];

export const data = {
  onboarding,
};
