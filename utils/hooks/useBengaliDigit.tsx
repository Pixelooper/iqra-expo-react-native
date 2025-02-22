// src/utils/convertToBengaliDigits.ts
export function convertToBengaliDigits(number: number | string): string {
  const englishToBengaliDigitsMap: Record<string, string> = {
      '0': '০',
      '1': '১',
      '2': '২',
      '3': '৩',
      '4': '৪',
      '5': '৫',
      '6': '৬',
      '7': '৭',
      '8': '৮',
      '9': '৯',
  };

  return number
      .toString() // Ensure the input is treated as a string
      .split('')  // Split into individual characters
      .map((digit) => englishToBengaliDigitsMap[digit] || digit) // Convert each digit
      .join(''); // Join back into a single string
}

export const convertToEnglishDigits = (banglaNumber: string): string => {
    const banglaToEnglishMap: { [key: string]: string } = {
        '০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4',
        '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'
    };

    return banglaNumber.split('').map(char => banglaToEnglishMap[char] || char).join('');
};
