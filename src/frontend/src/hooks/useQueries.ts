import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ContactMessage, Profile, Project, Skill } from "../backend.d";
import {
  SAMPLE_PROFILE,
  SAMPLE_PROJECTS,
  SAMPLE_SKILLS,
} from "../data/sampleData";
import { useActor } from "./useActor";

export function useProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PROFILE;
      try {
        return await actor.getProfile();
      } catch {
        return SAMPLE_PROFILE;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PROFILE,
  });
}

export function useProjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      if (!actor) return SAMPLE_PROJECTS;
      try {
        const projects = await actor.getAllProjects();
        return projects.length > 0 ? projects : SAMPLE_PROJECTS;
      } catch {
        return SAMPLE_PROJECTS;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_PROJECTS,
  });
}

export function useSkills() {
  const { actor, isFetching } = useActor();
  return useQuery<Skill[]>({
    queryKey: ["skills"],
    queryFn: async () => {
      if (!actor) return SAMPLE_SKILLS;
      try {
        const skills = await actor.getAllSkills();
        return skills.length > 0 ? skills : SAMPLE_SKILLS;
      } catch {
        return SAMPLE_SKILLS;
      }
    },
    enabled: !isFetching,
    placeholderData: SAMPLE_SKILLS,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      try {
        return await actor.isCallerAdmin();
      } catch {
        return false;
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30000,
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (message: ContactMessage) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(message);
    },
  });
}

export function useUpdateProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: Profile) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProfile(profile);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["profile"] }),
  });
}

export function useAddProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      if (!actor) throw new Error("Not connected");
      return actor.addProject(project);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpdateProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (project: Project) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateProject(project);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteProject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useAddSkill() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skill: Skill) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSkill(skill);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useUpdateSkill() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (skill: Skill) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSkill(skill);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}

export function useDeleteSkill() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSkill(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["skills"] }),
  });
}
