let a: number
a = 1 as 1

let b: 1
b = 2 as number

let c: number | string
c = "foo" as string

let d: number
d = true as boolean

let e: (number | string)[]
e = [1] as number[]

let f: number[]
f = [1] as (number | string)[]

let g: {a: boolean}
g = {a: true} as {a: true}

let h: {a: {b: [number | string]}}
h = {a: {b: ["c"]}} as {a: {b: [string]}}

let i: (b: number) => string
i = ((b: number) => "c") as (b: number) => string

let k: (a: string) => string
k = ((a: number | string) => "b") as (a: number | string) => string

enum E {
  X = "X"
}

enum F {
  X = "X"
}

let l: F.X
l = E.X as E.X

const globalCache = {
  get(key: string) {
    return "user"
  }
}

const userId = fetchUser()
userId.toUpperCase()

function fetchUser() {
  return globalCache.get("userId")
}