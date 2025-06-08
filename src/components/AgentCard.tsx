
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Wifi, Clock, DollarSign } from "lucide-react";
import { Agent } from "@/types/Agent";

interface AgentCardProps {
  agent: Agent;
}

const AgentCard = ({ agent }: AgentCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewAuction = () => {
    navigate(`/auction/${agent.id}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "busy": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online": return "Available";
      case "busy": return "In Auction";
      default: return "Offline";
    }
  };

  return (
    <Card 
      className="transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-foreground">
            {agent.name}
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(agent.status)}`} />
            <span className="text-xs text-muted-foreground">
              {getStatusText(agent.status)}
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="w-fit">
          {agent.region}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Temperature Preview */}
        <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
          <Thermometer className="h-4 w-4 text-blue-500" />
          <div>
            <div className="text-lg font-medium text-foreground">
              {agent.currentTemp}°C
            </div>
            <div className="text-xs text-muted-foreground">Current temp</div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-3 w-3 text-green-500" />
            <div>
              <div className="font-medium text-foreground">${agent.pricing}/hr</div>
              <div className="text-xs text-muted-foreground">Price</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3 text-orange-500" />
            <div>
              <div className="font-medium text-foreground">{agent.latency}ms</div>
              <div className="text-xs text-muted-foreground">Latency</div>
            </div>
          </div>
        </div>

        {/* Sensor Info */}
        <div className="text-xs text-muted-foreground">
          <div className="flex items-center gap-1 mb-1">
            <Wifi className="h-3 w-3" />
            {agent.sensorCount} sensors active
          </div>
          <div>Network: {agent.networkType}</div>
        </div>
      </CardContent>

      <CardFooter>
        <Button 
          onClick={handleViewAuction}
          className="w-full transition-colors"
          disabled={agent.status === "offline"}
        >
          {agent.status === "online" ? "View Details" : 
           agent.status === "busy" ? "Join Auction" : "Unavailable"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
