
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { workspaceService } from "../services/workspaceService";
import { useAuth } from "@/features/auth/hooks/AuthContext";

import type {
  UpdateWorkspaceInput,
} from "../types/workspace.types";

export function useWorkspaces() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  // Retrieve workspaces
  const workspacesQuery = useQuery({
    queryKey: ["workspaces", user?.id],
    queryFn: workspaceService.getAll,
    enabled: !!user,
  });

  // Create workspace
  const createWorkspaceMutation = useMutation({
    mutationFn: (name: string) => {
      if (!user) {
        throw new Error("You must be logged in to create a workspace.");
      }

      return workspaceService.create({ name });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  // Update workspace
  const updateWorkspaceMutation = useMutation({
    mutationFn: ({
      workspaceId,
      input,
    }: {
      workspaceId: string;
      input: UpdateWorkspaceInput;
    }) => {
      if (!user) {
        throw new Error("You must be logged in to update a workspace.");
      }

      return workspaceService.update(workspaceId, input);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  // Delete workspace
  const deleteWorkspaceMutation = useMutation({
    mutationFn: (workspaceId: string) => {
      if (!user) {
        throw new Error("You must be logged in to delete a workspace.");
      }

      return workspaceService.delete(workspaceId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["workspaces"],
      });
    },
  });

  return {
    // Query data
    workspaces: workspacesQuery.data ?? [],
    isLoading: workspacesQuery.isLoading,
    error: workspacesQuery.error,

    // Create
    createWorkspace: createWorkspaceMutation.mutateAsync,
    isCreating: createWorkspaceMutation.isPending,
    createError: createWorkspaceMutation.error,

    // Update
    updateWorkspace: updateWorkspaceMutation.mutateAsync,
    isUpdating: updateWorkspaceMutation.isPending,
    updateError: updateWorkspaceMutation.error,

    // Delete
    deleteWorkspace: deleteWorkspaceMutation.mutateAsync,
    isDeleting: deleteWorkspaceMutation.isPending,
    deleteError: deleteWorkspaceMutation.error,
  };
}
