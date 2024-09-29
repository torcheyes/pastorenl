import * as bip39 from "bip39";

export const toSeed = (mnemonic: string): string => {
  if (!bip39.validateMnemonic(mnemonic)) {
    return "false";
  }

  return bip39.mnemonicToSeedSync(mnemonic).toString("hex");
};

// path: src/utils/crypto.util.ts