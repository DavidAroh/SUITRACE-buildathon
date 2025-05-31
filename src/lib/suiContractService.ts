import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiClient } from "@mysten/sui.js/client";
import { zkLoginService } from "./zkLoginService";
import { PACKAGE_ID } from "./config";

export interface ProductBatch {
  id: string;
  owner: string;
  location: string;
  stage: number;
  isFlagged: boolean;
}

export interface ProductEvent {
  eventType: number;
  timestamp: number;
  details: string;
  actor: string;
}

export class SuiContractService {
  private client: SuiClient;

  constructor() {
    this.client = new SuiClient({ url: process.env.SUI_NETWORK! });
  }

  private async executeTransaction(tx: TransactionBlock) {
    const userAddress = zkLoginService.getUserAddress();
    if (!userAddress) throw new Error("User not authenticated");
    
    tx.setSender(userAddress);
    const result = await this.client.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      signer: zkLoginService.getEphemeralKeypair(),
    });
    
    return result.digest;
  }

  async createProductBatch(batchId: string, location: string): Promise<string> {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ID}::sui_trace::create_product_batch`,
      arguments: [
        tx.pure(batchId),
        tx.pure(location),
      ],
    });
    return this.executeTransaction(tx);
  }

  async transferOwnership(
    batchId: string,
    newOwner: string,
    newLocation: string
  ): Promise<string> {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ID}::sui_trace::transfer_ownership`,
      arguments: [
        tx.pure(batchId),
        tx.pure(newOwner),
        tx.pure(newLocation),
      ],
    });
    return this.executeTransaction(tx);
  }

  async logProcessing(batchId: string, details: string): Promise<string> {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ID}::sui_trace::log_processing`,
      arguments: [
        tx.pure(batchId),
        tx.pure(details),
      ],
    });
    return this.executeTransaction(tx);
  }

  async flagProduct(batchId: string, reason: string): Promise<string> {
    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ID}::sui_trace::flag_product`,
      arguments: [
        tx.pure(batchId),
        tx.pure(reason),
      ],
    });
    return this.executeTransaction(tx);
  }

  async getProductBatchStatus(batchId: string): Promise<ProductBatch | null> {
    // Implementation to query blockchain
  }

  async getProductBatchHistory(batchId: string): Promise<ProductEvent[]> {
    // Implementation to query blockchain
  }
}

export const suiContractService = new SuiContractService();