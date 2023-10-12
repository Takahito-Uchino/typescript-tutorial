type Reservation = unknown

type Reserve = {
  (from: Date, to: Date, destination: string): Reservation
  (from: Date, destination: string): Reservation
  (destination: string): Reservation
}

let reserve: Reserve = (
  fromOrDestination: Date | string,
  toOrDestination?: Date | string,
  destination?: string
) => {
  if (
    fromOrDestination instanceof Date &&
    toOrDestination instanceof Date &&
    destination !== undefined
  ) {
    console.log("宿泊旅行を予約する")
  } else if (
    fromOrDestination instanceof Date &&
    typeof toOrDestination === "string"
  ) {
    console.log("日帰り旅行を予約する")
  } else if (typeof fromOrDestination === "string") {
    console.log("すぐに出発する旅行を予約する")
  }
}

function call<T extends [unknown, string, ...unknown[]], R>(
  f: (...args: T) => R,
  ...args: T
): R {
  return f(...args)
}

function fill(length: number, value: string): string[] {
  return Array.from({length}, () => value)
}

call(fill, 10, "a")

function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every(_ => _ === a)
}

is("string", "otherstring")

is(true, false)

is(42, 42)

is(10, "foo")

is([1], [1, 2], [1, 2, 3])