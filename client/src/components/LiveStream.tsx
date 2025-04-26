import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

interface Message {
  type: string;
  sender?: string;
  content?: string;
  message?: string;
  timestamp?: string;
}

const LiveStream: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(`Guest${Math.floor(Math.random() * 10000)}`);
  const [viewerCount, setViewerCount] = useState(0);
  const wsRef = useRef<WebSocket | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Connect to WebSocket when component mounts
    connectWebSocket();
    
    // Cleanup when component unmounts
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.close();
      }
    };
  }, []);
  
  const connectWebSocket = () => {
    // Use the appropriate WebSocket protocol based on current connection
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;
    
    ws.onopen = () => {
      setIsConnected(true);
      toast({
        title: "Connected to live stream",
        description: "You are now connected to Hawk Eye's live stream.",
      });
      
      // Send join message
      ws.send(JSON.stringify({
        type: 'join',
        content: `${username} has joined the chat`,
        sender: username
      }));
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        setMessages(prev => [...prev, data]);
        
        // Update viewer count if provided
        if (data.type === 'viewers' && data.count) {
          setViewerCount(data.count);
        }
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };
    
    ws.onclose = () => {
      setIsConnected(false);
      toast({
        variant: "destructive",
        title: "Disconnected",
        description: "Lost connection to the live stream. Attempting to reconnect...",
      });
      
      // Try to reconnect after 3 seconds
      setTimeout(connectWebSocket, 3000);
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "There was an error connecting to the live stream.",
      });
    };
  };
  
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'message',
        content: message,
        sender: username
      }));
      setMessage('');
    } else {
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "You are not connected to the chat. Trying to reconnect...",
      });
      connectWebSocket();
    }
  };
  
  return (
    <div className="bg-navy/30 rounded-lg overflow-hidden shadow-xl">
      <div className="p-4 bg-navy/50">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold orbitron text-orange">HAWK EYE LIVE</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-xs text-light/70">
              {isConnected ? 'LIVE' : 'CONNECTING...'}
            </span>
            <span className="text-xs text-light/70 ml-2">
              {viewerCount} {viewerCount === 1 ? 'viewer' : 'viewers'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row">
        {/* Video stream placeholder */}
        <div className="w-full md:w-3/4 bg-navy/80 p-2">
          <div className="relative" style={{ paddingBottom: '56.25%' }}>
            <div className="absolute inset-0 flex items-center justify-center bg-navy/90">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-orange/20 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-video text-orange text-2xl"></i>
                </div>
                <p className="text-light">Stream will begin soon</p>
                <p className="text-light/60 text-sm mt-2">
                  When Hawk Eye goes live, the video will appear here
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Chat section */}
        <div className="w-full md:w-1/4 border-l border-navy/70">
          <div className="p-2 bg-navy/50 text-light flex items-center justify-between">
            <span className="text-sm font-medium">Live Chat</span>
            <div>
              <Input
                type="text"
                placeholder="Your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-6 text-xs w-28"
              />
            </div>
          </div>
          
          <ScrollArea className="h-[300px] p-3">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-light/50 text-sm">No messages yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg, index) => (
                  <div key={index} className="text-sm">
                    {msg.type === 'info' && (
                      <div className="py-1 px-2 bg-navy/50 rounded text-light/70 text-xs">
                        {msg.message}
                      </div>
                    )}
                    
                    {msg.type === 'message' && (
                      <div className="flex space-x-2">
                        <span className="font-bold text-orange">{msg.sender}:</span>
                        <span className="text-light">{msg.content}</span>
                      </div>
                    )}
                    
                    {msg.type === 'join' && (
                      <div className="py-1 px-2 bg-navy/40 rounded text-light/80 text-xs">
                        {msg.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          
          <Separator className="bg-navy/70" />
          
          <form onSubmit={sendMessage} className="p-3 flex space-x-2">
            <Input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!isConnected}
              className="text-sm"
            />
            <Button type="submit" disabled={!isConnected} size="sm">
              <i className="fas fa-paper-plane mr-1"></i>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LiveStream;