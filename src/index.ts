interface Currency {
  unit: "EUR" | "GBP" | "JPY" | "USD"
  value: number
}

namespace Currency {
  export const DEFAULT: Currency["unit"] = "USD"
  export function from(value: number, unit = Currency.DEFAULT): Currency {
    return {unit, value}
  }
}

const amountDue: Currency = {
  unit: "JPY",
  value: 83733.1
}

const otherAmountDue = Currency.from(330, "EUR")