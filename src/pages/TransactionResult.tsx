
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Download, ArrowLeft, Thermometer } from "lucide-react";
import { mockTransactions, mockAgents } from "@/data/mockData";

const TransactionResult = () => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  // For demo purposes, create a mock successful transaction
  const transaction = {
    id: transactionId || "tx-demo",
    agentId: "ocean-agent-001",
    winningBid: 15.00,
    winner: "YourAgent_001",
    status: "completed" as const,
    dataDelivered: true,
    timestamp: new Date().toISOString()
  };

  const agent = mockAgents.find(a => a.id === transaction.agentId);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <h2 className="text-xl font-semibold mb-2">Transaction Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested transaction could not be found.</p>
          <Button onClick={() => navigate("/")}>Return to Marketplace</Button>
        </Card>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case "processing":
        return <Clock className="h-6 w-6 text-yellow-500" />;
      default:
        return <Clock className="h-6 w-6 text-red-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      default: return "bg-red-100 text-red-800";
    }
  };

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
          
          <div className="text-center">
            <div className="flex justify-center mb-4">
              {getStatusIcon(transaction.status)}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Transaction {transaction.status === "completed" ? "Successful" : "Processing"}
            </h1>
            <p className="text-lg text-muted-foreground">
              Your auction with {agent.name} has been {transaction.status}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Transaction Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Transaction ID</div>
                  <div className="font-mono text-sm">{transaction.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Timestamp</div>
                  <div className="text-sm">{new Date(transaction.timestamp).toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Winner</div>
                  <div className="font-medium">{transaction.winner}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Final Price</div>
                  <div className="text-lg font-bold text-green-600">
                    ${transaction.winningBid.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t">
                <div className="text-sm text-muted-foreground">Status:</div>
                <Badge className={getStatusColor(transaction.status)}>
                  {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Agent Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-blue-500" />
                Data Source: {agent.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Region</div>
                  <div className="font-medium">{agent.region}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Network</div>
                  <div className="font-medium">{agent.networkType}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Current Temperature</div>
                  <div className="font-medium">{agent.currentTemp}°C</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Sensors</div>
                  <div className="font-medium">{agent.sensorCount} active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment & Data Delivery Status */}
          <Card>
            <CardHeader>
              <CardTitle>Service Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium text-green-800">Payment Successful</div>
                    <div className="text-sm text-green-600">Funds transferred securely</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium text-green-800">Data Delivered</div>
                    <div className="text-sm text-green-600">Stream established successfully</div>
                  </div>
                </div>
              </div>

              {transaction.status === "completed" && (
                <div className="pt-4 border-t">
                  <Button className="w-full" onClick={() => {
                    // Simulate download
                    alert("Downloading temperature data stream...");
                  }}>
                    <Download className="h-4 w-4 mr-2" />
                    Access Data Stream
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="flex-1"
            >
              Browse More Agents
            </Button>
            <Button 
              onClick={() => window.print()}
              className="flex-1"
            >
              Download Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionResult;
