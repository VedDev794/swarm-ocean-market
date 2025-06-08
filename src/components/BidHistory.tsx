
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { Bid } from "@/types/Agent";

interface BidHistoryProps {
  bids: Bid[];
}

const BidHistory = ({ bids }: BidHistoryProps) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const sortedBids = [...bids].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Live Bid History ({bids.length} bids)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {sortedBids.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2" />
              <p>No bids yet. Be the first to bid!</p>
            </div>
          ) : (
            sortedBids.map((bid, index) => (
              <div 
                key={bid.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  index === 0 ? 'bg-green-50 border-green-200' : 'bg-muted/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    index === 0 ? 'bg-green-500' : 'bg-muted-foreground'
                  }`} />
                  <div>
                    <div className="font-medium text-foreground">
                      {bid.bidder}
                      {bid.bidder === "YourAgent_001" && (
                        <Badge variant="secondary" className="ml-2 text-xs">You</Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(bid.timestamp)}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    index === 0 ? 'text-green-600' : 'text-foreground'
                  }`}>
                    ${bid.amount.toFixed(2)}
                  </div>
                  {index === 0 && (
                    <Badge variant="secondary" className="text-xs">
                      Leading
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BidHistory;
