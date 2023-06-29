export function useUtils() {
  function nullRemover(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, v]) => (v != null && v != undefined && v != ""))
    );
  }

  return {
    nullRemover,
  };
}
