// src/hooks/useSuiContract.ts
import { useState, useCallback, useEffect } from 'react';
import { suiContractService, ProductBatch, ProductEvent } from '../lib/suiClient';

interface ContractState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userAddress: string | null;
}

interface UseContractReturn extends ContractState {
  // Product batch operations
  createProductBatch: (batchId: string, location: string) => Promise<string | null>;
  transferOwnership: (batchId: string, newOwner: string, newLocation: string) => Promise<string | null>;
  logProcessing: (batchId: string, details: string) => Promise<string | null>;
  flagProduct: (batchId: string, reason: string) => Promise<string | null>;
  
  // Read operations
  getProductStatus: (batchId: string) => Promise<ProductBatch | null>;
  getProductHistory: (batchId: string) => Promise<ProductEvent[]>;
  
  // Utility functions
  clearError: () => void;
  refreshAuth: () => void;
}

export const useSuiContract = (): UseContractReturn => {
  const [state, setState] = useState<ContractState>({
    isLoading: false,
    error: null,
    isAuthenticated: false,
    userAddress: null
  });

  // Initialize authentication state
  useEffect(() => {
    const initAuth = () => {
      const zkState = suiContractService.initializeZkLogin();
      setState(prev => ({
        ...prev,
        isAuthenticated: zkState.isLoggedIn,
        userAddress: zkState.userAddress
      }));
    };

    initAuth();
  }, []);

  // Generic error handler
  const handleError = useCallback((error: any, operation: string) => {
    console.error(`Error in ${operation}:`, error);
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: error.message || `Failed to ${operation}`
    }));
  }, []);

  // Generic loading wrapper
  const withLoading = useCallback(async <T,>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T | null> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await operation();
      setState(prev => ({ ...prev, isLoading: false }));
      return result;
    } catch (error) {
      handleError(error, operationName);
      return null;
    }
  }, [handleError]);

  // Contract operations
  const createProductBatch = useCallback(async (
    batchId: string, 
    location: string
  ): Promise<string | null> => {
    return withLoading(
      () => suiContractService.createProductBatch(batchId, location),
      'create product batch'
    );
  }, [withLoading]);

  const transferOwnership = useCallback(async (
    batchId: string,
    newOwner: string,
    newLocation: string
  ): Promise<string | null> => {
    return withLoading(
      () => suiContractService.transferOwnership(batchId, newOwner, newLocation),
      'transfer ownership'
    );
  }, [withLoading]);

  const logProcessing = useCallback(async (
    batchId: string,
    details: string
  ): Promise<string | null> => {
    return withLoading(
      () => suiContractService.logProcessing(batchId, details),
      'log processing'
    );
  }, [withLoading]);

  const flagProduct = useCallback(async (
    batchId: string,
    reason: string
  ): Promise<string | null> => {
    return withLoading(
      () => suiContractService.flagProduct(batchId, reason),
      'flag product'
    );
  }, [withLoading]);

  // Read operations
  const getProductStatus = useCallback(async (
    batchId: string
  ): Promise<ProductBatch | null> => {
    return withLoading(
      () => suiContractService.getProductBatchStatus(batchId),
      'get product status'
    );
  }, [withLoading]);

  const getProductHistory = useCallback(async (
    batchId: string
  ): Promise<ProductEvent[]> => {
    const result = await withLoading(
      () => suiContractService.getProductBatchHistory(batchId),
      'get product history'
    );
    return result || [];
  }, [withLoading]);

  // Utility functions
  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  const refreshAuth = useCallback(() => {
    const zkState = suiContractService.initializeZkLogin();
    setState(prev => ({
      ...prev,
      isAuthenticated: zkState.isLoggedIn,
      userAddress: zkState.userAddress
    }));
  }, []);

  return {
    ...state,
    createProductBatch,
    transferOwnership,
    logProcessing,
    flagProduct,
    getProductStatus,
    getProductHistory,
    clearError,
    refreshAuth
  };
};

// Additional hook for product batch data with real-time updates
export const useProductBatch = (batchId: string | null) => {
  const [productData, setProductData] = useState<{
    batch: ProductBatch | null;
    history: ProductEvent[];
    isLoading: boolean;
    error: string | null;
  }>({
    batch: null,
    history: [],
    isLoading: false,
    error: null
  });

  const { getProductStatus, getProductHistory } = useSuiContract();

  const fetchProductData = useCallback(async () => {
    if (!batchId) return;

    setProductData(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const [batch, history] = await Promise.all([
        getProductStatus(batchId),
        getProductHistory(batchId)
      ]);

      setProductData({
        batch,
        history,
        isLoading: false,
        error: null
      });
    } catch (error) {
      setProductData(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch product data'
      }));
    }
  }, [batchId, getProductStatus, getProductHistory]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  return {
    ...productData,
    refetch: fetchProductData
  };
};