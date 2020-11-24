export const fetcher = async (url, token) =>
  await fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin"
  });
