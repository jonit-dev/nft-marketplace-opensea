export const appEnv = {
  moralis: {
    appId: process.env.REACT_APP_MORALIS_APP_ID!,
    serverUrl: process.env.REACT_APP_MORALIS_SERVER_URL!,
  },
  currentChain: process.env.REACT_APP_CURRENT_CHAIN!,
  nft: {
    contractAddress: process.env.REACT_APP_NFT_TOKEN_CONTRACT_ADDRESS!,
  },
};
