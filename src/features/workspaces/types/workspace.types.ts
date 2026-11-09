
export interface Workspace {
  id: string;
  name: string;
  owner_id: string;
  created_at: string | null;
}

export interface CreateWorkspaceInput {
  name: string;
}

export interface UpdateWorkspaceInput {
  name: string;
}

