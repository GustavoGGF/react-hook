import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://xzsjxfklgzeozwvffqqn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6c2p4ZmtsZ3plb3p3dmZmcXFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQwOTA4OTEsImV4cCI6MTk5OTY2Njg5MX0.aYzv3PGPL3kDfC_dk_jNkHIgCWdwuNKA2GxD4ljeUQ0"
);
