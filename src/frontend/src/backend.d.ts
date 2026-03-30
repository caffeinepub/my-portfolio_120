import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactMessage {
    name: string;
    email: string;
    message: string;
}
export interface Skill {
    id: string;
    name: string;
    description: string;
    iconName: string;
}
export interface Project {
    id: string;
    title: string;
    tags: Array<string>;
    description: string;
    imageUrl: string;
    projectUrl: string;
}
export interface Profile {
    bio: string;
    title: string;
    name: string;
    email: string;
    location: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addProject(project: Project): Promise<void>;
    addSkill(skill: Skill): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteProject(id: string): Promise<void>;
    deleteSkill(id: string): Promise<void>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllProjects(): Promise<Array<Project>>;
    getAllSkills(): Promise<Array<Skill>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProfile(): Promise<Profile>;
    getProject(id: string): Promise<Project>;
    getSkill(id: string): Promise<Skill>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(message: ContactMessage): Promise<void>;
    updateProfile(newProfile: Profile): Promise<void>;
    updateProject(project: Project): Promise<void>;
    updateSkill(skill: Skill): Promise<void>;
}
