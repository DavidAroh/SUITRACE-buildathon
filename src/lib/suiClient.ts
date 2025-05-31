// src/lib/suiClient.ts
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { Ed25519Keypair } from '@mysten/sui.js/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui.js/transactions';
import { 
  generateNonce, 
  generateRandomness, 
  jwtToAddress,
  getZkLoginSignature,
  ZkLoginSignature
} from '@mysten/zklogin';

// Initialize Sui client
const suiClient = new SuiClient({
  url: getFullnodeUrl('testnet'), // or 'mainnet' for production
});

export { suiClient };

// Contract configuration
export const CONTRACT_CONFIG = {
  PACKAGE_ID: '0xad836b3e18d53c049899584a379c3de413477304babcc65706315989e5ee32bd', // Replace with your deployed package ID
  MODULE_NAME: 'sui_trace',
  FUNCTION_NAMES: {
    CREATE_PRODUCT_BATCH: 'create_product_batch',
    TRANSFER_OWNERSHIP: 'transfer_ownership',
    LOG_PROCESSING: 'log_processing',
    LOG_INSPECTION: 'log_inspection',
    LOG_DAMAGE: 'log_damage',
    FLAG_PRODUCT: 'flag_product',
    RESOLVE_FLAG: 'resolve_flag',
    MARK_AS_SOLD: 'mark_as_sold',
    GET_HISTORY: 'get_history',
    GET_STATUS: 'get_status',
  }
};

// Types for our contract interactions
export interface ProductBatch {
  id: string;
  batch_id: string;
  origin_farmer: string;
  current_owner: string;
  current_location: string;
  current_stage: number;
  is_tampered: boolean;
  created_at: string;
}

export interface ProductEvent {
  event_type: number;
  actor: string;
  timestamp: string;
  details: string;
}

// zkLogin state management
export interface ZkLoginState {
  userAddress: string | null;
  jwt: string | null;
  salt: string | null;
  isLoggedIn: boolean;
}

class SuiContractService {
  private zkLoginState: ZkLoginState = {
    userAddress: null,
    jwt: null,
    salt: null,
    isLoggedIn: false
  };

  // Initialize zkLogin state from localStorage
  initializeZkLogin(): ZkLoginState {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.address && user.jwt) {
          this.zkLoginState = {
            userAddress: user.address,
            jwt: user.jwt,
            salt: user.salt || generateRandomness().toString(),
            isLoggedIn: true
          };
        }
      }
    } catch (error) {
      console.error('Error initializing zkLogin:', error);
    }
    return this.zkLoginState;
  }

  // Set zkLogin credentials (called after successful Google OAuth)
  setZkLoginCredentials(userAddress: string, jwt: string, salt?: string) {
    this.zkLoginState = {
      userAddress,
      jwt,
      salt: salt || generateRandomness().toString(),
      isLoggedIn: true
    };
    
    // Update localStorage
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    localStorage.setItem('user', JSON.stringify({
      ...existingUser,
      address: userAddress,
      jwt,
      salt: this.zkLoginState.salt
    }));
  }

  // Create a new product batch
  async createProductBatch(
    batchId: string,
    initialLocation: string
  ): Promise<string | null> {
    if (!this.zkLoginState.isLoggedIn || !this.zkLoginState.userAddress) {
      throw new Error('User not authenticated');
    }

    try {
      const txb = new TransactionBlock();
      
      txb.moveCall({
        target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTION_NAMES.CREATE_PRODUCT_BATCH}`,
        arguments: [
          txb.pure(Array.from(new TextEncoder().encode(batchId))),
          txb.pure(Array.from(new TextEncoder().encode(initialLocation)))
        ],
      });

      // Sign and execute transaction with zkLogin
      const signature = await this.signWithZkLogin(txb);
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: txb,
        signature,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });

      return result.digest;
    } catch (error) {
      console.error('Error creating product batch:', error);
      throw error;
    }
  }

  // Transfer ownership of a product batch
  async transferOwnership(
    productBatchId: string,
    newOwner: string,
    newLocation: string
  ): Promise<string | null> {
    if (!this.zkLoginState.isLoggedIn) {
      throw new Error('User not authenticated');
    }

    try {
      const txb = new TransactionBlock();
      
      txb.moveCall({
        target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTION_NAMES.TRANSFER_OWNERSHIP}`,
        arguments: [
          txb.object(productBatchId),
          txb.pure(newOwner),
          txb.pure(Array.from(new TextEncoder().encode(newLocation)))
        ],
      });

      const signature = await this.signWithZkLogin(txb);
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: txb,
        signature,
        options: {
          showEffects: true,
        },
      });

      return result.digest;
    } catch (error) {
      console.error('Error transferring ownership:', error);
      throw error;
    }
  }

  // Log processing event
  async logProcessing(
    productBatchId: string,
    details: string
  ): Promise<string | null> {
    if (!this.zkLoginState.isLoggedIn) {
      throw new Error('User not authenticated');
    }

    try {
      const txb = new TransactionBlock();
      
      txb.moveCall({
        target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTION_NAMES.LOG_PROCESSING}`,
        arguments: [
          txb.object(productBatchId),
          txb.pure(Array.from(new TextEncoder().encode(details)))
        ],
      });

      const signature = await this.signWithZkLogin(txb);
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: txb,
        signature,
        options: {
          showEffects: true,
        },
      });

      return result.digest;
    } catch (error) {
      console.error('Error logging processing:', error);
      throw error;
    }
  }

  // Flag a product for issues
  async flagProduct(
    productBatchId: string,
    reason: string
  ): Promise<string | null> {
    if (!this.zkLoginState.isLoggedIn) {
      throw new Error('User not authenticated');
    }

    try {
      const txb = new TransactionBlock();
      
      txb.moveCall({
        target: `${CONTRACT_CONFIG.PACKAGE_ID}::${CONTRACT_CONFIG.MODULE_NAME}::${CONTRACT_CONFIG.FUNCTION_NAMES.FLAG_PRODUCT}`,
        arguments: [
          txb.object(productBatchId),
          txb.pure(Array.from(new TextEncoder().encode(reason)))
        ],
      });

      const signature = await this.signWithZkLogin(txb);
      const result = await suiClient.executeTransactionBlock({
        transactionBlock: txb,
        signature,
        options: {
          showEffects: true,
        },
      });

      return result.digest;
    } catch (error) {
      console.error('Error flagging product:', error);
      throw error;
    }
  }

  // Get product batch status (read-only)
  async getProductBatchStatus(productBatchId: string): Promise<ProductBatch | null> {
    try {
      const result = await suiClient.getObject({
        id: productBatchId,
        options: {
          showContent: true,
          showType: true,
        },
      });

      if (result.data?.content && 'fields' in result.data.content) {
        const fields = result.data.content.fields as any;
        return {
          id: fields.id.id,
          batch_id: fields.batch_id,
          origin_farmer: fields.origin_farmer,
          current_owner: fields.current_owner,
          current_location: fields.current_location,
          current_stage: fields.current_stage,
          is_tampered: fields.is_tampered,
          created_at: fields.created_at,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting product batch status:', error);
      return null;
    }
  }

  // Get product batch history (read-only)
  async getProductBatchHistory(productBatchId: string): Promise<ProductEvent[]> {
    try {
      const result = await suiClient.getObject({
        id: productBatchId,
        options: {
          showContent: true,
        },
      });

      if (result.data?.content && 'fields' in result.data.content) {
        const fields = result.data.content.fields as any;
        return fields.history || [];
      }
      return [];
    } catch (error) {
      console.error('Error getting product batch history:', error);
      return [];
    }
  }

  // Private method to sign transactions with zkLogin
  private async signWithZkLogin(txb: TransactionBlock): Promise<ZkLoginSignature> {
    if (!this.zkLoginState.jwt || !this.zkLoginState.salt) {
      throw new Error('Missing zkLogin credentials');
    }

    try {
      // Get the transaction bytes
      const txBytes = await txb.build({ client: suiClient });
      
      // Create zkLogin signature
      const signature = await getZkLoginSignature({
        inputs: {
          jwt: this.zkLoginState.jwt,
          ephemeralKeyPair: Ed25519Keypair.generate(), // You should store this
          userSalt: this.zkLoginState.salt,
          maxEpoch: 10, // Set appropriate epoch
        },
        txBytes,
      });

      return signature;
    } catch (error) {
      console.error('Error signing with zkLogin:', error);
      throw error;
    }
  }

  // Get current user address
  getCurrentUserAddress(): string | null {
    return this.zkLoginState.userAddress;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.zkLoginState.isLoggedIn;
  }

  // Logout
  logout() {
    this.zkLoginState = {
      userAddress: null,
      jwt: null,
      salt: null,
      isLoggedIn: false
    };
    localStorage.removeItem('user');
  }
}

// Export singleton instance
export const suiContractService = new SuiContractService();