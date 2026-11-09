
import { supabase } from "@/lib/supabase";
import type {
  Workspace,
  CreateWorkspaceInput,
  UpdateWorkspaceInput,
} from "../types/workspace.types";

export const workspaceService = {
  // Retrieve all workspaces
  async getAll(): Promise<Workspace[]> {
    const { data, error } = await supabase
      .from("workspaces")
      .select("id, name, owner_id, created_at")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    return data ?? [];
  },

  // Create a workspace
  // Create a workspace
  async create(input: CreateWorkspaceInput): Promise<Workspace> {
    const { data: userData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = userData.user;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const workspaceData = {
      name: input.name.trim(),
      owner_id: user.id,
    };

    console.log("Workspace insert data:", workspaceData);

    // Temporary test: INSERT without SELECT
    const { error } = await supabase
      .from("workspaces")
      .insert(workspaceData);

    if (error) {
      console.error("Workspace INSERT failed:", {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint,
      });

      throw error;
    }

    console.log("Workspace inserted successfully.");

    return {
      id: "",
      name: workspaceData.name,
      owner_id: workspaceData.owner_id,
      created_at: null,
    };
  },

  // Update a workspace
  async update(
    workspaceId: string,
    input: UpdateWorkspaceInput
  ): Promise<Workspace> {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const { data, error } = await supabase
      .from("workspaces")
      .update({
        name: input.name,
      })
      .eq("id", workspaceId)
      .eq("owner_id", user.id)
      .select("id, name, owner_id, created_at")
      .single();

    if (error) throw new Error(error.message);

    return data;
  },

  // Delete a workspace
  async delete(workspaceId: string): Promise<void> {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw authError;

    const user = authData.user;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const { data, error } = await supabase
      .from("workspaces")
      .delete()
      .eq("id", workspaceId)
      .eq("owner_id", user.id)
      .select("id")
      .maybeSingle();

    if (error) throw new Error(error.message);

    if (!data) {
      throw new Error(
        "Workspace not found or you don't have permission to delete it."
      );
    }
  },
};
