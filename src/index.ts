import { readFile } from "fs"
import { fork } from "child_process"
import { resolve } from "path"

function promisify<T, A>(
  f: (arg: A, f: (error: unknown, result: T | null) => void) => void
): (arg: A) => Promise<T> {
  return (arg: A) =>
    new Promise<T>((resolve, reject) =>
      f(arg, (error, result) => {
        if (error) {
          return reject(error)
        }
        if (result === null) {
          return reject(null)
        }
        resolve(result)
      })
    )
}

const readFilePromise = promisify(readFile)
readFilePromise(__dirname + "/exercises.js")
  .then(result => console.log("done!", result.toString()))

type Matrix = number[][]

type MatrixProtocol = {
  determinant: {
    in: [Matrix]
    out: number
  }
  "dot-product": {
    in: [Matrix, Matrix]
    out: Matrix
  }
  invert: {
    in: [Matrix]
    out: Matrix
  }
}

type Protocol = {
  [command: string]: {
    in: unknown[]
    out: unknown
  }
}

function createProtocol<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) => (...args: P[K]["in"]) =>
    new Promise<P[K]["out"]>((resolve, reject) => {
      let worker = new Worker(script)
      worker.onerror = reject
      worker.onmessage = event => resolve(event.data)
      worker.postMessage({command, args})
    })
}

let runWithMatrixProtocol = createProtocol<MatrixProtocol>(
  "MatrixWorkerScript.js"
)

let parallelDeterminant = runWithMatrixProtocol("determinant")

parallelDeterminant([[1, 2],[3, 4]]).then(
  determinant => console.log(determinant)
)

type Data<
  P extends Protocol,
  C extends keyof P = keyof P
> = C extends C
  ? {command: C; args: P[C]["in"]}
  : never

function handle(
  data: Data<MatrixProtocol>
): MatrixProtocol[typeof data.command]["out"] {
  switch (data.command) {
    case "determinant":
      return determinant(...data.args)
    case "dot-product":
      return dotProduct(...data.args)
    case "invert":
      return invert(...data.args)
  }
}

onmessage = ({data}) => postMessage(handle(data))

declare function determinant(matrix: Matrix): number
declare function dotProduct(matrixA: Matrix, matrixB: Matrix): Matrix
declare function invert(matrix: Matrix): Matrix

function createProtocolCP<P extends Protocol>(script: string) {
  return <K extends keyof P>(command: K) => (...args: P[K]["in"]) =>
    new Promise<P[K]["out"]>((resolve, reject) => {
      const child = fork(script)
      child.on("error", reject)
      child.on("message", resolve)
      child.send({command, args})
    })
}

const runWithMatrixProtocolCP = createProtocolCP<MatrixProtocol>(
  "./ChildThread.js"
)
const parallelDeterminantCP = runWithMatrixProtocolCP("determinant")

parallelDeterminantCP([[1, 2], [3, 4]]).then(
  determinant => console.log(determinant)
)

process.on("message",data => process.send!(handle(data)))