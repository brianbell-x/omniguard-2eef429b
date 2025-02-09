
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserCheck, RefreshCcw, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ReportedConversation, VerificationVote } from "@/types/verification";

const HumanVerification = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ReportedConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoteType, setSelectedVoteType] = useState<VerificationVote['vote_type']>('safe');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('reported_conversations')
        .select('*')
        .eq('status', 'pending')
        .order('reported_at', { ascending: false });

      if (error) throw error;
      setConversations(data);
    } catch (error: any) {
      toast({
        title: "Error fetching conversations",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitVote = async (conversationId: string) => {
    try {
      setSubmitting(true);
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('verification_votes')
        .insert({
          conversation_id: conversationId,
          voter_id: user.id,
          vote_type: selectedVoteType,
          comment: comment || null,
        });

      if (error) throw error;

      toast({
        title: "Vote submitted successfully",
        description: "Thank you for your contribution to content moderation.",
      });

      // Reset form
      setSelectedVoteType('safe');
      setComment('');
      
      // Refresh conversations
      await fetchConversations();
    } catch (error: any) {
      toast({
        title: "Error submitting vote",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    // Check authentication
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        navigate('/auth');
        return;
      }
      fetchConversations();
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Human Verification</h1>
            <p className="text-muted-foreground">
              Review and vote on flagged conversations
            </p>
          </div>
          <Button
            onClick={() => fetchConversations()}
            disabled={loading}
            variant="outline"
            size="sm"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {loading ? (
          <Card>
            <CardContent className="p-6">
              Loading conversations...
            </CardContent>
          </Card>
        ) : conversations.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              No conversations currently need verification.
            </CardContent>
          </Card>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-6">
              {conversations.map((conv) => (
                <Card key={conv.id} className="border-muted">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      Reported Conversation
                    </CardTitle>
                    <CardDescription>
                      Reported on {new Date(conv.reported_at).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-medium">Reason for Report</h4>
                      <p className="text-sm text-muted-foreground">{conv.reason}</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Message Content</h4>
                      <div className="rounded-lg bg-muted p-4">
                        <p className="text-sm whitespace-pre-wrap">{conv.message_content}</p>
                      </div>
                    </div>
                    <div className="space-y-4 pt-4">
                      <h4 className="font-medium">Your Vote</h4>
                      <RadioGroup
                        value={selectedVoteType}
                        onValueChange={(value) => setSelectedVoteType(value as VerificationVote['vote_type'])}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="user_violation" id="user_violation" />
                          <Label htmlFor="user_violation">User Violation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="assistant_violation" id="assistant_violation" />
                          <Label htmlFor="assistant_violation">Assistant Violation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="safe" id="safe" />
                          <Label htmlFor="safe">No Violation (Safe)</Label>
                        </div>
                      </RadioGroup>
                      <div className="space-y-2">
                        <Label htmlFor="comment">Additional Comments (Optional)</Label>
                        <Textarea
                          id="comment"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Add any additional context or explanation for your vote..."
                          className="h-20"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">
                      Current Votes: {conv.total_votes}
                    </div>
                    <Button
                      onClick={() => submitVote(conv.id)}
                      disabled={submitting}
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      Submit Vote
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default HumanVerification;
