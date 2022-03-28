import { makeAutoObservable } from "mobx";
import sleep from "sleep-promise";
import { appEnv } from "../constants/env";
import { INFTToken, ITokenIdOwner } from "../types/token.types";
import { MoralisChains } from "../types/user.types";
import { uiStore } from "./UI.store";

class NFTStore {
  public nftTokens: INFTToken[] = [];
  public ownersLoaded: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  public async updateNftTokens(nftTokens: INFTToken[]) {
    this.nftTokens = nftTokens.map((token) => {
      token.metadata = JSON.parse(token.metadata as unknown as string);

      return token;
    });
  }

  public async getNFTTokenIds(Web3API: any): Promise<INFTToken[]> {
    uiStore.toggleIsLoading();
    const response = await Web3API.token.getAllTokenIds({
      address: appEnv.nft.contractAddress,
      chain: appEnv.currentChain as MoralisChains,
    });
    uiStore.toggleIsLoading();

    return response.result as unknown as INFTToken[];
  }

  public async loadTokenIdOwners(Web3API: any) {
    console.log(`loading owners for ${this.nftTokens.length} tokens`);

    for (const token of this.nftTokens) {
      console.log(`loading owners for token ${token.token_id}`);

      const tokenIdOwners = await this.getTokenIdOwners(
        token.token_id,
        Web3API
      );

      const ownersOf = tokenIdOwners.map((data) => data.owner_of);

      await sleep(500);

      this.nftTokens.map((data) => {
        if (data.token_id === token.token_id) {
          data.owners = ownersOf;
        }
      });
    }

    this.ownersLoaded = true;
  }

  public async getTokenIdOwners(
    tokenId: string,
    Web3API: any
  ): Promise<ITokenIdOwner[]> {
    const response = await Web3API.token.getTokenIdOwners({
      address: appEnv.nft.contractAddress,
      chain: appEnv.currentChain as MoralisChains,
      token_id: tokenId,
    });

    console.log(response.result);

    return response.result;
  }
}

export const nftStore = new NFTStore();
