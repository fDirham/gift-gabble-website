export function encodeObject(obj: { [key: string]: string }): string {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

export const timeoutPromise = (waitInMs: number) => {
  return new Promise((resolve) => setTimeout(resolve, waitInMs));
};
