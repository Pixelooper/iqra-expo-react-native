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
