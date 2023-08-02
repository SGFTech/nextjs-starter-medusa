import SHA256 from "crypto-js/sha256";
export function createPostCheckSumHeader(
    payload: any,
    salt?: string,
    apiString?: string
  ) {
    const SALT_KEY = salt ?? process.env.PHONEPE_SALT ?? "test-salt";
    const encodedBody = btoa(JSON.stringify(payload, null, 2));
    const base64string = encodedBody + `${apiString}${SALT_KEY}`;
    const encodedPayload = SHA256(base64string).toString();
    const checksum = `${encodedPayload}###1`;
    return { checksum, encodedBody };
  }
  