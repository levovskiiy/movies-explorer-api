/**
 *
 * @param dependencies
 * @param dependencyFns
 * @returns {{[p: string]: *}}
 */
export default (dependencies, dependencyFns) => {
  const res = {};

  const entries = Object.entries(dependencyFns);

  entries.forEach(([fnName, fn]) => {
    res[fnName] = fn(dependencies);
  });

  return res;
};
