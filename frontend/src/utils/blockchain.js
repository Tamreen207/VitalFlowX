import CryptoJS from 'crypto-js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Lightweight in-memory blockchain used as a local fallback
export class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.pendingTransactions = [];
    this.difficulty = 4;
  }

  createGenesisBlock() {
    const block = {
      index: 0,
      timestamp: Date.now(),
      data: 'Genesis Block',
      previousHash: '0',
      nonce: 0,
    };
    block.hash = this.calculateHash(block);
    return block;
  }

  calculateHash(block) {
    const { hash: _hash, ...rest } = block;
    const blockString = JSON.stringify(rest);
    return CryptoJS.SHA256(blockString).toString(CryptoJS.enc.Hex);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(data) {
    const newBlock = {
      index: this.chain.length,
      timestamp: Date.now(),
      data,
      previousHash: this.chain.length ? this.getLatestBlock().hash : '0',
      nonce: 0,
    };
    newBlock.hash = this.calculateHash(newBlock);
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i += 1) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

class BlockchainClient {
  constructor() {
    this.chain = [];
    this.localBlockchain = new Blockchain();
  }

  async getChain() {
    try {
      const response = await fetch(`${API_URL}/api/v1/blockchain/chain`);
      if (!response.ok) {
        throw new Error('Failed to fetch chain');
      }
      const data = await response.json();
      this.chain = data.chain;
      return this.chain;
    } catch (err) {
      // fallback to local chain
      console.error('BlockchainClient.getChain error, using local chain:', err);
      return this.localBlockchain.chain;
    }
  }

  async addTransaction(data) {
    try {
      const response = await fetch(`${API_URL}/api/v1/blockchain/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      const resData = await response.json();
      return resData.block;
    } catch (err) {
      console.error('BlockchainClient.addTransaction failed, adding locally:', err);
      return this.localBlockchain.addTransaction(data);
    }
  }

  async isChainValid() {
    try {
      const response = await fetch(`${API_URL}/api/v1/blockchain/verify`);
      if (!response.ok) {
        throw new Error('Failed to verify chain');
      }
      const data = await response.json();
      return Boolean(data.is_valid);
    } catch (err) {
      console.error('BlockchainClient.isChainValid check failed, validating local chain:', err);
      return this.localBlockchain.isChainValid();
    }
  }
}

export const ledger = new BlockchainClient();

