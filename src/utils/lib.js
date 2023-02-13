/**
 *
 * @param dependencies
 * @param dependencyFns
 * @returns {{[p: string]: *}}
 */
export const factory = (dependencies, dependencyFns) => {
  const res = {};

  for (const fnName in dependencyFns) {
    res[fnName] = dependencyFns[fnName](dependencies);
  }

  return res;
};
