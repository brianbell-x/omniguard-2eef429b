import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { UserCheck, RefreshCcw, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { ReportedConversation, VerificationVote } from "@/types/verification";

const HumanVerification = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<ReportedConversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVoteType, setSelectedVoteType] = useState<VerificationVote["vote_type"]>("safe");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("reported_conversations")
        .select("*")
        .eq("status", "pending")
        .order("reported_at", { ascending: false });

      if (error) throw error;

      // Validate and transform the data to ensure it matches ReportedConversation type
      const validatedData: ReportedConversation[] = (data || []).map((item) => ({
        ...item,
        status: item.status as ReportedConversation["status"],
        id: String(item.id),
        user_id: String(item.user_id),
        total_votes: Number(item.total_votes) || 0,
        user_violation_votes: Number(item.user_violation_votes) || 0,
        assistant_violation_votes: Number(item.assistant_violation_votes) || 0,
        safe_votes: Number(item.safe_votes) || 0,
      }));

      setConversations(validatedData);
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

      // Check authentication only when submitting a vote
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from("verification_votes").insert({
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
      setSelectedVoteType("safe");
      setComment("");

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
    fetchConversations();
  }, []);

  return (
    <div className="h-[calc(100vh-56px)] bg-background">
      <ScrollArea className="h-full">
        {/* Single container with consistent spacing */}
        <div className="max-w-4xl mx-auto space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Human Verification</h1>
              <p className="text-sm text-muted-foreground">
                Review and vote on flagged conversations
              </p>
            </div>
            <Button
              onClick={fetchConversations} // simplified refresh trigger
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
              <CardContent className="space-y-2 p-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-4/6" />
              </CardContent>
            </Card>
          ) : conversations.length === 0 ? (
            <Card>
              <CardContent className="p-6">
                No pending reports.
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
                      <CardDescription className="text-sm">
                        Reported on {new Date(conv.reported_at).toLocaleString()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="text-md font-medium">Reason</h4>
                        <p className="text-sm text-muted-foreground">{conv.reason}</p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-md font-medium">Content</h4>
                        <div className="rounded-lg bg-muted p-4">
                          <p className="text-sm whitespace-pre-wrap">{conv.message_content}</p>
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <h4 className="text-md font-medium">Vote</h4>
                        <RadioGroup
                          value={selectedVoteType}
                          onValueChange={(value) =>
                            setSelectedVoteType(value as VerificationVote["vote_type"])
                          }
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="user_violation"
                              id={`user_violation-${conv.id}`}
                            />
                            <Label
                              htmlFor={`user_violation-${conv.id}`}
                              className="text-sm"
                            >
                              User Violation
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="assistant_violation"
                              id={`assistant_violation-${conv.id}`}
                            />
                            <Label
                              htmlFor={`assistant_violation-${conv.id}`}
                              className="text-sm"
                            >
                              Assistant Violation
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="safe" id={`safe-${conv.id}`} />
                            <Label htmlFor={`safe-${conv.id}`} className="text-sm">
                              No Violation (Safe)
                            </Label>
                          </div>
                        </RadioGroup>
                        <div className="mt-2 space-y-1">
                          <Label htmlFor="comment" className="text-sm">
                            Additional Comments
                          </Label>
                          <Textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Optional details..."
                            className="h-20"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        Current Votes: {conv.total_votes}
                      </div>
                      <Button onClick={() => submitVote(conv.id)} disabled={submitting}>
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
      </ScrollArea>
    </div>
  );
};

export default HumanVerification;
