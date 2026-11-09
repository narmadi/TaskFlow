
import { useState } from "react";
import type { FormEvent } from "react";

import {
  Plus,
  Building2,
  CalendarDays,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";

import { useWorkspaces } from "../hooks/useWorkspaces";
import type { Workspace } from "../types/workspace.types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

export default function WorkspacesPage() {
  const [workspaceName, setWorkspaceName] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [editingWorkspace, setEditingWorkspace] =
    useState<Workspace | null>(null);

  const [deletingWorkspace, setDeletingWorkspace] =
    useState<Workspace | null>(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [actionError, setActionError] = useState("");

  const {
    workspaces,
    isLoading,
    error,

    createWorkspace,
    isCreating,
    createError,

    updateWorkspace,
    isUpdating,
    updateError,

    deleteWorkspace,
    isDeleting,
    deleteError,
  } = useWorkspaces();

  function showSuccess(message: string) {
    setSuccessMessage(message);
    setActionError("");

    window.setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  }

  // Create workspace
  async function handleCreateWorkspace(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const name = workspaceName.trim();

    if (!name) return;

    try {
      await createWorkspace(name);

      setWorkspaceName("");
      setShowForm(false);

      showSuccess("Workspace created successfully!");
    } catch {
      // Error displayed below the create form.
    }
  }

  // Update workspace
  async function handleUpdateWorkspace(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!editingWorkspace) return;

    const name = workspaceName.trim();

    if (!name) return;

    try {
      await updateWorkspace({
        workspaceId: editingWorkspace.id,
        input: { name },
      });

      setEditingWorkspace(null);
      setWorkspaceName("");

      showSuccess("Workspace updated successfully!");
    } catch {
      // Mutation error displayed in the edit dialog.
    }
  }

  // Open edit dialog
  function openEditDialog(workspace: Workspace) {
    setWorkspaceName(workspace.name);
    setEditingWorkspace(workspace);
    setActionError("");
  }

  // Delete workspace
  async function handleDeleteWorkspace() {
    if (!deletingWorkspace) return;

    try {
      await deleteWorkspace(deletingWorkspace.id);

      setDeletingWorkspace(null);

      showSuccess("Workspace deleted successfully!");
    } catch {
      setActionError(
        deleteError?.message || "Unable to delete workspace."
      );
    }
  }

  return (
    <div className="space-y-6">

      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Workspaces
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your workspaces and organize your teams.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setShowForm(!showForm);
            setWorkspaceName("");
          }}
          className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          <Plus size={18} />
          Create Workspace
        </button>
      </div>

      {/* Success message */}
      {successMessage && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
        >
          {successMessage}
        </div>
      )}

      {/* General action error */}
      {actionError && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {actionError}
        </div>
      )}

      {/* Create workspace form */}
      {showForm && (
        <form
          onSubmit={handleCreateWorkspace}
          className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            Create a new workspace
          </h2>

          <label
            htmlFor="workspaceName"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Workspace name
          </label>

          <input
            id="workspaceName"
            type="text"
            value={workspaceName}
            onChange={(event) =>
              setWorkspaceName(event.target.value)
            }
            placeholder="e.g. Development Team"
            maxLength={80}
            required
            className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
          />

          {createError && (
            <p role="alert" className="mt-2 text-sm text-red-600">
              {createError.message}
            </p>
          )}

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setWorkspaceName("");
              }}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isCreating || !workspaceName.trim()}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isCreating ? "Creating..." : "Create Workspace"}
            </button>
          </div>
        </form>
      )}

      {/* Workspace list */}
      <div>
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          Your Workspaces
        </h2>

        {isLoading ? (
          <div className="rounded-xl border border-gray-100 bg-white p-8 text-center text-sm text-gray-500">
            Loading workspaces...
          </div>
        ) : error ? (
          <div role="alert" className="rounded-xl border border-red-100 bg-red-50 p-5 text-sm text-red-600">
            {error.message}
          </div>
        ) : workspaces.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <Building2
              size={36}
              className="mx-auto text-gray-400"
            />

            <h3 className="mt-4 font-semibold text-gray-800">
              No workspaces yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Create your first workspace to start organizing projects.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-4 text-sm font-semibold text-primary hover:underline"
            >
              Create your first workspace
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {workspaces.map((workspace) => (
              <div
                key={workspace.id}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-primary">
                    <Building2 size={22} />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>

                    {/* Workspace actions */}
                    <div className="relative group">
                      <button
                        type="button"
                        aria-label={`Actions for ${workspace.name}`}
                        aria-haspopup="true"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      <div className="absolute right-0 top-full z-10 hidden w-40 rounded-lg border border-gray-100 bg-white p-1 shadow-lg group-focus-within:block group-hover:block">
                        <button
                          type="button"
                          onClick={() => openEditDialog(workspace)}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Pencil size={15} />
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setDeletingWorkspace(workspace);
                            setActionError("");
                          }}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={15} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="mt-4 truncate text-base font-semibold text-gray-900">
                  {workspace.name}
                </h3>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-400">
                  <CalendarDays size={14} />

                  {workspace.created_at
                    ? `Created ${new Date(
                        workspace.created_at
                      ).toLocaleDateString()}`
                    : "Creation date unavailable"}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit workspace dialog */}
      <Dialog
        open={!!editingWorkspace}
        onOpenChange={(open: any) => {
          if (!open && !isUpdating) {
            setEditingWorkspace(null);
            setWorkspaceName("");
          }
        }}
      >
        <DialogContent>
          <form onSubmit={handleUpdateWorkspace}>
            <DialogHeader>
              <DialogTitle>Edit Workspace</DialogTitle>
              <DialogDescription>
                Update the name of your workspace.
              </DialogDescription>
            </DialogHeader>

            <div className="py-5">
              <label
                htmlFor="editWorkspaceName"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Workspace name
              </label>

              <input
                id="editWorkspaceName"
                type="text"
                value={workspaceName}
                onChange={(event) =>
                  setWorkspaceName(event.target.value)
                }
                maxLength={80}
                required
                autoFocus
                className="h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
              />

              {updateError && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {updateError.message}
                </p>
              )}
            </div>

            <DialogFooter>
              <button
                type="button"
                disabled={isUpdating}
                onClick={() => setEditingWorkspace(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isUpdating || !workspaceName.trim()}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete workspace confirmation */}
      <AlertDialog
        open={!!deletingWorkspace}
        onOpenChange={(open: any) => {
          if (!open && !isDeleting) {
            setDeletingWorkspace(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Workspace?
            </AlertDialogTitle>

            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              <strong>{deletingWorkspace?.name}</strong>?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {deleteError && (
            <p role="alert" className="text-sm text-red-600">
              {deleteError.message}
            </p>
          )}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>

            <button
              type="button"
              disabled={isDeleting}
              onClick={handleDeleteWorkspace}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDeleting ? "Deleting..." : "Delete Workspace"}
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
