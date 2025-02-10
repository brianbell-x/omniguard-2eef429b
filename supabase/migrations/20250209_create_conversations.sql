create table if not exists conversations (
  conversation_id text primary key,
  omniguard_evaluation_input text not null,
  omniguard_raw_response text not null,
  assistant_output text not null,
  user_violates_rules boolean not null,
  assistant_violates_rules boolean not null,
  model_name text not null,
  reasoning_effort numeric not null,
  prompt_tokens integer not null,
  completion_tokens integer not null,
  total_tokens integer not null,
  input_cost numeric not null,
  output_cost numeric not null,
  total_cost numeric not null,
  latency_ms integer not null,
  usage_data jsonb not null default '{}'::jsonb,
  request_timings jsonb not null default '{}'::jsonb,
  needed_human_verification boolean,
  human_verification boolean,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create an index on conversation_id for faster lookups
create index if not exists conversations_conversation_id_idx on conversations(conversation_id);

-- Add a trigger to automatically update the updated_at timestamp
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_conversations_updated_at on conversations;
create trigger update_conversations_updated_at
  before update on conversations
  for each row
  execute function update_updated_at_column();