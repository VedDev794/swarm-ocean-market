
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Thermometer, Wifi, User, DollarSign } from "lucide-react";
import { mockAgents, mockBids } from "@/data/mockData";
import BidHistory from "@/components/BidHistory";
import AuctionTimer from "@/components/AuctionTimer";
import { useToast } from "@/hooks/use-toast";

const AgentAuction = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [bids, setBids] = useState(mockBids.filter(bid => bid.agentId === agentId));

  const agent = mockAgents.find(a => a.id === agentId);

  useEffect(() => {
    // Simulate receiving new bids periodically
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance of new bid
        const newBid = {
          id: `bid-${Date.now()}`,
          agentId: agentId!,
          bidder: `CompetitorBot_${Math.floor(Math.random() * 100)}`,
          amount: (agent?.currentBid || 0) + Math.random() * 2 + 0.25,
          timestamp: new Date().toISOString()
        };
        setBids(prev => [newBid, ...prev]);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [agentId, agent?.currentBid]);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Agent Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested agent could not be found.</p>
          <Button onClick={() => navigate("/")}>Return to Marketplace</Button>
        </Card>
      </div>
    );
  }

  const handlePlaceBid = () => {
    const amount = parseFloat(bidAmount);
    const currentHigh = Math.max(...bids.map(b => b.amount), agent.currentBid || 0);
    
    if (!amount || amount <= currentHigh) {
      toast({
        title: "Invalid Bid",
        description: `Bid must be higher than current highest bid of $${currentHigh.toFixed(2)}`,
        variant: "destructive"
      });
      return;
    }

    const newBid = {
      id: `bid-${Date.now()}`,
      agentId: agentId!,
      bidder: "YourAgent_001",
      amount: amount,
      timestamp: new Date().toISOString()
    };

    setBids(prev => [newBid, ...prev]);
    setBidAmount("");
    
    toast({
      title: "Bid Placed Successfully",
      description: `Your bid of $${amount.toFixed(2)} has been submitted.`
    });
  };

  const handleAuctionEnd = () => {
    const winningBid = Math.max(...bids.map(b => b.amount));
    const winner = bids.find(b => b.amount === winningBid);
    
    if (winner?.bidder === "YourAgent_001") {
      navigate(`/transaction/tx-${Date.now()}`);
    } else {
      toast({
        title: "Auction Ended",
        description: `Auction won by ${winner?.bidder} with $${winningBid.toFixed(2)}`,
        variant: "destructive"
      });
      setTimeout(() => navigate("/"), 2000);
    }
  };

  const currentHighBid = Math.max(...bids.map(b => b.amount), agent.currentBid || 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </div>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Live Auction: {agent.name}
              </h1>
              <p className="text-lg text-muted-foreground">
                {agent.description}
              </p>
            </div>
            
            <div className="flex flex-col items-start lg:items-end gap-2">
              <Badge variant="secondary" className="text-sm">
                {agent.region}
              </Badge>
              <AuctionTimer 
                endTime={agent.auctionEndTime} 
                onAuctionEnd={handleAuctionEnd}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Agent Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="h-5 w-5 text-blue-500" />
                  Agent Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-foreground">
                    {agent.currentTemp}°C
                  </div>
                  <div className="text-sm text-muted-foreground">Current Temperature</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="font-medium">${agent.pricing}/hr</div>
                      <div className="text-muted-foreground">Base Price</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    <div>
                      <div className="font-medium">{agent.latency}ms</div>
                      <div className="text-muted-foreground">Latency</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Wifi className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{agent.sensorCount} Active Sensors</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Network: {agent.networkType}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bidding Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Bid Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Current Auction Status</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ${currentHighBid.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">Highest Bid</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder={`Enter bid (min: $${(currentHighBid + 0.25).toFixed(2)})`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      step="0.25"
                      min={currentHighBid + 0.25}
                    />
                  </div>
                  <Button 
                    onClick={handlePlaceBid}
                    className="sm:w-auto w-full"
                    disabled={!bidAmount || parseFloat(bidAmount) <= currentHighBid}
                  >
                    Place Bid
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Your Agent:</span>
                    <span className="text-muted-foreground">YourAgent_001</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <BidHistory bids={bids} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentAuction;
