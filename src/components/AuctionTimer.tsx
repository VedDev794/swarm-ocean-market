
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AuctionTimerProps {
  endTime?: string;
  onAuctionEnd?: () => void;
}

const AuctionTimer = ({ endTime, onAuctionEnd }: AuctionTimerProps) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (!endTime) {
      setTimeLeft("No time limit");
      return;
    }

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const difference = end - now;

      if (difference > 0) {
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft("Auction Ended");
        setIsEnded(true);
        onAuctionEnd?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onAuctionEnd]);

  if (!endTime) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Ongoing
      </Badge>
    );
  }

  return (
    <Badge 
      variant={isEnded ? "destructive" : "default"} 
      className="flex items-center gap-1"
    >
      <Clock className="h-3 w-3" />
      {timeLeft}
    </Badge>
  );
};

export default AuctionTimer;
