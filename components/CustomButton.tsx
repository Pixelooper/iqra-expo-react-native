import { TouchableOpacity, Text, Image } from "react-native";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "primary":
      return "bg-dark-green";
    case "secondary":
      return "bg-gray-500";
    case "danger":
      return "bg-red-500";
    case "success":
      return "bg-green-500";
    case "outline":
      return "bg-transparent border-neutral-300 border-[0.5px]";
    default:
      return "bg-white";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-white text-lg";
    case "secondary":
      return "text-gray-100";
    case "danger":
      return "text-red-100";
    case "success":
      return "text-green-100";
    default:
      return "gray-black text-xs";
  }
};

const CustomButton = ({
  onPress,
  title,
  className,
  bgVariant,
  textVariant,
  ImgLeft,
  ImgRight,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex flex-row items-center ${ImgLeft || ImgRight ? 'justify-between' : 'justify-center'} border ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {ImgLeft && 
        <Image
          source={ImgLeft}
          className="w-[12px] h-[12px]"
          resizeMode="contain"
        />
      }
      <Text className={`font-AnekBangla ${getTextVariantStyle(textVariant)}`}>
        {title}
      </Text>
      {ImgRight && 
        <Image
          source={ImgRight}
          className="h-[24px]"
          resizeMode="contain"
        />
      }
    </TouchableOpacity>
  );
};

export default CustomButton;
