import { createClient, createAccount } from 'genlayer-js';
import { testnetBradbury } from 'genlayer-js/chains';

const client = createClient({ network: testnetBradbury });

export const CONTRACT_ADDRESS = '0xYOUR_ADDRESS_HERE';

export async function judgeMatch(
  card1: string,
  card2: string
): Promise<{ is_match: boolean; reason: string; txHash: string }> {
  const account = createAccount();

  const txHash = await client.writeContract({
    account,
    address: CONTRACT_ADDRESS,
    functionName: 'judge_match',
    args: [card1, card2],
    value: 0,
  });

  const receipt = await client.waitForTransactionReceipt({ hash: txHash });
  const result = JSON.parse(receipt.result ?? '{}');

  return {
    is_match: result.is_match ?? false,
    reason: result.reason ?? '',
    txHash,
  };
}

export async function getStats() {
  return await client.readContract({
    address: CONTRACT_ADDRESS,
    functionName: 'get_stats',
    args: [],
  });
}
