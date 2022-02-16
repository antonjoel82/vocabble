declare module "node-fpe" {
  type CharDomain = (string | number)[];
  type Secret = string;

  interface FPEConfig {
    secret: Secret;
    domain?: CharDomain;
  }

  interface FPECipher {
    encrypt: (input: string) => string;
    decrypt: (input: string) => string;
  }

  function fpe(config: FPEConfig): FPECipher;

  export = fpe;
}
