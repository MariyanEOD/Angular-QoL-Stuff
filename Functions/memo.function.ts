/**
 * @function memo
 * @description Creates a memoized version of a function.
 *
 * Memoization caches the function's return value for a given set of arguments, so subsequent calls with the same arguments avoid redundant computations. This can improve performance for functions with expensive calculations.
 *
 * @param {T extends Function} fnToMemoize The function to be memoized. Must be a function of type `T`.
 * @returns {T} A memoized version of the input function. Maintains the same type (`T`) as the original function.
 *
 * @example
 * controls = memo(() => this.form.controls);
 * // ....
 * <div [ngClass]="{'bg-red-500' : !controls().valid">
 *  Control Label
 * </div>
 *
 */
export function memo<T extends Function>(fnToMemoize: T): T {
  let prevArgs = [{}];
  let result: any;

  return function (...newArgs: any[]) {
    if (hasDifferentArgs(prevArgs, newArgs)) {
      result = fnToMemoize(...newArgs);
      prevArgs = newArgs;
    }
    return result;
  } as any;
}

function hasDifferentArgs(prev: unknown[], next: unknown[]) {
  if (prev.length !== next.length) return true;
  for (let i = 0; i < prev.length; i++) {
    if (!Object.is(prev[i], next[i])) return true;
  }
  return false;
}
