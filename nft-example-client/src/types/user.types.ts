export interface IUser {
  username: string;
  authData: AuthData;
  createdAt: string;
  updatedAt: string;
  accounts: string[];
  ethAddress: string;
  ACL: ACL;
  sessionToken: string;
  objectId: string;
}

export interface ACL {
  "0B8bhMd8Snx5aDjV6jidlIOB": The0B8BhMd8Snx5ADjV6JidlIOB;
}

export interface The0B8BhMd8Snx5ADjV6JidlIOB {
  read: boolean;
  write: boolean;
}

export interface AuthData {
  moralisEth: MoralisEth;
}

export interface MoralisEth {
  id: string;
  signature: string;
  data: string;
}

export type MoralisChains =
  | "eth"
  | "0x1"
  | "ropsten"
  | "0x3"
  | "rinkeby"
  | "0x4"
  | "goerli"
  | "0x5"
  | "kovan"
  | "0x2a"
  | "polygon"
  | "0x89"
  | "mumbai"
  | "0x13881"
  | "bsc"
  | "0x38"
  | "bsc testnet"
  | "0x61"
  | "avalanche"
  | "0xa86a"
  | "avalanche testnet"
  | "0xa869"
  | "fantom"
  | "0xfa"
  | undefined;
