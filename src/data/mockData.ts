
import { Agent, Bid, Transaction } from "@/types/Agent";

export const mockAgents: Agent[] = [
  {
    id: "ocean-agent-001",
    name: "OceanAgent_Pacific",
    region: "Pacific Ocean",
    currentTemp: 18.5,
    pricing: 12.50,
    latency: 45,
    status: "online",
    sensorCount: 24,
    networkType: "Buoy Network Alpha",
    description: "High-precision temperature monitoring across the North Pacific with real-time streaming capabilities.",
    auctionEndTime: "2024-06-08T16:30:00Z",
    currentBid: 15.00,
    bidCount: 7
  },
  {
    id: "ocean-agent-002", 
    name: "ArcticSensor_99",
    region: "Arctic Ocean",
    currentTemp: -1.2,
    pricing: 18.00,
    latency: 78,
    status: "busy",
    sensorCount: 16,
    networkType: "Ice Station Network",
    description: "Specialized arctic temperature monitoring with ice-penetrating sensors.",
    auctionEndTime: "2024-06-08T15:45:00Z",
    currentBid: 22.50,
    bidCount: 12
  },
  {
    id: "ocean-agent-003",
    name: "IndianOcean_Temp",
    region: "Indian Ocean",
    currentTemp: 24.8,
    pricing: 10.75,
    latency: 62,
    status: "online",
    sensorCount: 31,
    networkType: "Monsoon Monitor Grid",
    description: "Comprehensive Indian Ocean temperature data with monsoon-specific analytics.",
    currentBid: 13.25,
    bidCount: 4
  },
  {
    id: "ocean-agent-004",
    name: "AtlanticDeep_Scanner",
    region: "Atlantic Ocean",
    currentTemp: 4.2,
    pricing: 15.25,
    latency: 34,
    status: "online",
    sensorCount: 19,
    networkType: "Deep Sea Array",
    description: "Deep-water temperature monitoring with advanced pressure-resistant sensors.",
    currentBid: 17.00,
    bidCount: 8
  },
  {
    id: "ocean-agent-005",
    name: "MediterraneanNet",
    region: "Mediterranean Sea",
    currentTemp: 21.3,
    pricing: 8.50,
    latency: 23,
    status: "offline",
    sensorCount: 12,
    networkType: "Coastal Sensor Web",
    description: "Mediterranean coastal temperature monitoring with high-frequency sampling."
  },
  {
    id: "ocean-agent-006",
    name: "Baltic_TempStream",
    region: "Baltic Sea",
    currentTemp: 12.7,
    pricing: 9.25,
    latency: 41,
    status: "online",
    sensorCount: 15,
    networkType: "Nordic Marine Grid",
    description: "Baltic Sea temperature monitoring with salinity correlation analysis.",
    currentBid: 11.50,
    bidCount: 3
  }
];

export const mockBids: Bid[] = [
  {
    id: "bid-001",
    agentId: "ocean-agent-001",
    bidder: "TempDataBuyer_Alpha",
    amount: 15.00,
    timestamp: "2024-06-08T14:25:30Z"
  },
  {
    id: "bid-002", 
    agentId: "ocean-agent-001",
    bidder: "OceanAnalytics_Pro",
    amount: 14.75,
    timestamp: "2024-06-08T14:18:15Z"
  },
  {
    id: "bid-003",
    agentId: "ocean-agent-001",
    bidder: "ClimateResearch_Bot",
    amount: 13.50,
    timestamp: "2024-06-08T14:10:22Z"
  },
  {
    id: "bid-004",
    agentId: "ocean-agent-002",
    bidder: "ArcticStudies_AI",
    amount: 22.50,
    timestamp: "2024-06-08T14:32:18Z"
  },
  {
    id: "bid-005",
    agentId: "ocean-agent-002", 
    bidder: "PolarData_Collector",
    amount: 21.25,
    timestamp: "2024-06-08T14:28:45Z"
  }
];

export const mockTransactions: Transaction[] = [
  {
    id: "tx-001",
    agentId: "ocean-agent-001",
    winningBid: 15.00,
    winner: "TempDataBuyer_Alpha",
    status: "completed",
    dataDelivered: true,
    timestamp: "2024-06-08T14:35:00Z"
  },
  {
    id: "tx-002",
    agentId: "ocean-agent-002",
    winningBid: 22.50,
    winner: "ArcticStudies_AI", 
    status: "processing",
    dataDelivered: false,
    timestamp: "2024-06-08T14:40:00Z"
  }
];
