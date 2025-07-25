export function encode(payload: any) {
  const stringPayload = JSON.stringify(payload || {});
  const encodeString = Buffer.from(stringPayload, "utf-8").toString("base64");
  return encodeString;
}

export function decode(input: string) {
  if (!input) return {};

  try {
    const isBase64 = input.length % 4 === 0 && /^[A-Za-z0-9+/=]+$/.test(input);
    const decodedString = isBase64
      ? Buffer.from(input, "base64").toString("utf-8")
      : input;

    return JSON.parse(decodedString || "{}");
  } catch {
    return {};
  }
}
