
export interface Agent {
  id: string;
  name: string;
  region: string;
  currentTemp: number;
  pricing: number;
  latency: number;
  status: "online" | "busy" | "offline";
  sensorCount: number;
  networkType: string;
  description: string;
  auctionEndTime?: string;
  currentBid?: number;
  bidCount?: number;
}

export interface Bid {
  id: string;
  agentId: string;
  bidder: string;
  amount: number;
  timestamp: string;
}

export interface Transaction {
  id: string;
  agentId: string;
  winningBid: number;
  winner: string;
  status: "completed" | "processing" | "failed";
  dataDelivered: boolean;
  timestamp: string;
}
