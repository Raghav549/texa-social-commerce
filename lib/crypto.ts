import nacl from "tweetnacl";

/**
 * Encryption utility for end-to-end encrypted messaging
 * Uses TweetNaCl.js for public-key cryptography
 */

export interface KeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export interface EncryptedMessage {
  ciphertext: string; // base64 encoded
  nonce: string; // base64 encoded
  senderPublicKey: string; // base64 encoded
}

/**
 * Generate a new keypair for the user
 */
export function generateKeyPair(): KeyPair {
  return nacl.box.keyPair();
}

/**
 * Convert Uint8Array to base64 string
 */
export function uint8ArrayToBase64(arr: Uint8Array): string {
  return Buffer.from(arr).toString("base64");
}

/**
 * Convert base64 string to Uint8Array
 */
export function base64ToUint8Array(str: string): Uint8Array {
  return new Uint8Array(Buffer.from(str, "base64"));
}

/**
 * Encrypt a message for a recipient
 * @param message - The message to encrypt
 * @param recipientPublicKey - Recipient's public key (base64)
 * @param senderSecretKey - Sender's secret key (base64)
 */
export function encryptMessage(
  message: string,
  recipientPublicKey: string,
  senderSecretKey: string
): EncryptedMessage {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageUint8 = new TextEncoder().encode(message);
  const recipientPubKey = base64ToUint8Array(recipientPublicKey);
  const senderSecKey = base64ToUint8Array(senderSecretKey);

  const ciphertext = nacl.box(messageUint8, nonce, recipientPubKey, senderSecKey);

  return {
    ciphertext: uint8ArrayToBase64(ciphertext),
    nonce: uint8ArrayToBase64(nonce),
    senderPublicKey: uint8ArrayToBase64(nacl.box.keyPair.fromSecretKey(senderSecKey).publicKey),
  };
}

/**
 * Decrypt a message
 * @param encryptedMessage - The encrypted message object
 * @param recipientSecretKey - Recipient's secret key (base64)
 */
export function decryptMessage(
  encryptedMessage: EncryptedMessage,
  recipientSecretKey: string
): string {
  const ciphertext = base64ToUint8Array(encryptedMessage.ciphertext);
  const nonce = base64ToUint8Array(encryptedMessage.nonce);
  const senderPublicKey = base64ToUint8Array(encryptedMessage.senderPublicKey);
  const recipientSecKey = base64ToUint8Array(recipientSecretKey);

  const decrypted = nacl.box.open(ciphertext, nonce, senderPublicKey, recipientSecKey);

  if (!decrypted) {
    throw new Error("Failed to decrypt message");
  }

  return new TextDecoder().decode(decrypted);
}

/**
 * Sign a message with the sender's secret key
 */
export function signMessage(message: string, secretKey: string): string {
  const messageUint8 = new TextEncoder().encode(message);
  const secKey = base64ToUint8Array(secretKey);
  const signatureKeyPair = nacl.sign.keyPair.fromSecretKey(secKey);
  const signature = nacl.sign.detached(messageUint8, signatureKeyPair.secretKey);

  return uint8ArrayToBase64(signature);
}

/**
 * Verify a message signature
 */
export function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  const messageUint8 = new TextEncoder().encode(message);
  const sig = base64ToUint8Array(signature);
  const pubKey = base64ToUint8Array(publicKey);

  return nacl.sign.detached.verify(messageUint8, sig, pubKey);
}
