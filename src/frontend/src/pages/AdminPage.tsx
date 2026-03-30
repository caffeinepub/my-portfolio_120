import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Briefcase,
  Code2,
  Loader2,
  LogIn,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Trash2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Profile, Project, Skill } from "../backend.d";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddProject,
  useAddSkill,
  useContactMessages,
  useDeleteProject,
  useDeleteSkill,
  useIsAdmin,
  useProfile,
  useProjects,
  useSkills,
  useUpdateProfile,
  useUpdateProject,
  useUpdateSkill,
} from "../hooks/useQueries";

const EMPTY_PROJECT: Project = {
  id: "",
  title: "",
  description: "",
  tags: [],
  imageUrl: "",
  projectUrl: "",
};

const EMPTY_SKILL: Skill = {
  id: "",
  name: "",
  description: "",
  iconName: "",
};

function LoginGate() {
  const { login, isLoggingIn } = useInternetIdentity();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-3xl p-10 max-w-md w-full text-center flex flex-col gap-6"
        data-ocid="admin.card"
      >
        <div className="w-16 h-16 rounded-full bg-orange/10 border border-orange/30 flex items-center justify-center mx-auto">
          <LogIn className="w-8 h-8 text-orange" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold uppercase tracking-wider">
            Admin <span className="text-orange">Portal</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to manage your portfolio
          </p>
        </div>
        <Button
          onClick={login}
          disabled={isLoggingIn}
          className="bg-orange text-primary-foreground font-bold uppercase tracking-wider rounded-xl py-6 hover:opacity-90 transition-opacity"
          data-ocid="admin.primary_button"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Signing in...
            </>
          ) : (
            <>
              <LogIn className="w-4 h-4 mr-2" /> Sign in with Internet Identity
            </>
          )}
        </Button>
        <a
          href="/"
          className="text-sm text-muted-foreground hover:text-orange transition-colors flex items-center justify-center gap-1"
        >
          <ArrowLeft className="w-3 h-3" /> Back to Portfolio
        </a>
      </motion.div>
    </div>
  );
}

function ProfileTab() {
  const { data: profile } = useProfile();
  const updateProfile = useUpdateProfile();
  const [form, setForm] = useState<Profile | null>(null);
  const editing = form !== null;

  const startEdit = () =>
    setForm(
      profile ?? { name: "", title: "", bio: "", email: "", location: "" },
    );
  const cancelEdit = () => setForm(null);

  const handleSave = async () => {
    if (!form) return;
    try {
      await updateProfile.mutateAsync(form);
      toast.success("Profile updated!");
      setForm(null);
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  if (!profile)
    return (
      <Skeleton
        className="h-40 w-full rounded-2xl"
        data-ocid="admin.loading_state"
      />
    );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider">
          Profile Information
        </h3>
        {!editing && (
          <Button
            variant="outline"
            size="sm"
            onClick={startEdit}
            className="border-orange text-orange hover:bg-orange hover:text-primary-foreground"
            data-ocid="admin.edit_button"
          >
            <Pencil className="w-3.5 h-3.5 mr-2" /> Edit Profile
          </Button>
        )}
      </div>

      {editing && form ? (
        <div className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5">
          {(
            [
              { key: "name", label: "Name", type: "text" },
              { key: "title", label: "Title", type: "text" },
              { key: "email", label: "Email", type: "email" },
              { key: "location", label: "Location", type: "text" },
            ] as const
          ).map(({ key, label, type }) => (
            <div key={key}>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                {label}
              </div>
              <Input
                type={type}
                value={form[key]}
                onChange={(e) =>
                  setForm((p) => (p ? { ...p, [key]: e.target.value } : p))
                }
                className="bg-secondary border-border"
                data-ocid="admin.input"
              />
            </div>
          ))}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
              Bio
            </div>
            <Textarea
              value={form.bio}
              onChange={(e) =>
                setForm((p) => (p ? { ...p, bio: e.target.value } : p))
              }
              rows={4}
              className="bg-secondary border-border resize-none"
              data-ocid="admin.textarea"
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleSave}
              disabled={updateProfile.isPending}
              className="bg-orange text-primary-foreground font-bold"
              data-ocid="admin.save_button"
            >
              {updateProfile.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              variant="outline"
              onClick={cancelEdit}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { label: "Name", value: profile.name },
            { label: "Title", value: profile.title },
            { label: "Email", value: profile.email },
            { label: "Location", value: profile.location },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                {label}
              </div>
              <div className="text-sm font-medium">{value || "—"}</div>
            </div>
          ))}
          <div className="sm:col-span-2">
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Bio
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {profile.bio || "—"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProjectsTab() {
  const { data: projects = [] } = useProjects();
  const addProject = useAddProject();
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [form, setForm] = useState<Project>(EMPTY_PROJECT);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [tagsInput, setTagsInput] = useState("");

  const openAdd = () => {
    setEditingProject(null);
    setForm({ ...EMPTY_PROJECT, id: `proj-${Date.now()}` });
    setTagsInput("");
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setForm(p);
    setTagsInput(p.tags.join(", "));
    setDialogOpen(true);
  };

  const handleSave = async () => {
    const projectToSave = {
      ...form,
      tags: tagsInput
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };
    try {
      if (editingProject) {
        await updateProject.mutateAsync(projectToSave);
        toast.success("Project updated!");
      } else {
        await addProject.mutateAsync(projectToSave);
        toast.success("Project added!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save project.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject.mutateAsync(deleteId);
      toast.success("Project deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete project.");
    }
  };

  const isSaving = addProject.isPending || updateProject.isPending;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider">Projects</h3>
        <Button
          className="bg-orange text-primary-foreground font-bold"
          onClick={openAdd}
          data-ocid="projects.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="projects.empty_state"
        >
          No projects yet. Add your first project!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-3"
              data-ocid={`projects.item.${i + 1}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold">{project.title}</h4>
                <div className="flex gap-2 flex-shrink-0">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openEdit(project)}
                    data-ocid={`projects.edit_button.${i + 1}`}
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => setDeleteId(project.id)}
                    data-ocid={`projects.delete_button.${i + 1}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border max-w-lg"
          data-ocid="projects.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingProject ? "Edit Project" : "Add Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            {(
              [
                { key: "title", label: "Title", type: "text" },
                { key: "imageUrl", label: "Image URL", type: "url" },
                { key: "projectUrl", label: "Project URL", type: "url" },
              ] as const
            ).map(({ key, label, type }) => (
              <div key={key}>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                  {label}
                </div>
                <Input
                  type={type}
                  value={form[key]}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, [key]: e.target.value }))
                  }
                  className="bg-secondary border-border"
                  data-ocid="projects.input"
                />
              </div>
            ))}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Tags (comma separated)
              </div>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="React, TypeScript, Node.js"
                className="bg-secondary border-border"
                data-ocid="projects.input"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Description
              </div>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="bg-secondary border-border resize-none"
                data-ocid="projects.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="projects.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-orange text-primary-foreground font-bold"
              data-ocid="projects.confirm_button"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent
          className="bg-card border-border"
          data-ocid="projects.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="projects.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="projects.delete_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function SkillsTab() {
  const { data: skills = [] } = useSkills();
  const addSkill = useAddSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [form, setForm] = useState<Skill>(EMPTY_SKILL);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const openAdd = () => {
    setEditingSkill(null);
    setForm({ ...EMPTY_SKILL, id: `skill-${Date.now()}` });
    setDialogOpen(true);
  };

  const openEdit = (s: Skill) => {
    setEditingSkill(s);
    setForm(s);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingSkill) {
        await updateSkill.mutateAsync(form);
        toast.success("Skill updated!");
      } else {
        await addSkill.mutateAsync(form);
        toast.success("Skill added!");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Failed to save skill.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSkill.mutateAsync(deleteId);
      toast.success("Skill deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Failed to delete skill.");
    }
  };

  const isSaving = addSkill.isPending || updateSkill.isPending;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold uppercase tracking-wider">Skills</h3>
        <Button
          className="bg-orange text-primary-foreground font-bold"
          onClick={openAdd}
          data-ocid="skills.open_modal_button"
        >
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      {skills.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="skills.empty_state"
        >
          No skills yet. Add your first skill!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              className="bg-card border border-border rounded-2xl p-4 flex items-start gap-4"
              data-ocid={`skills.item.${i + 1}`}
            >
              <div className="flex-1">
                <div className="font-bold">{skill.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {skill.iconName}
                </div>
                <div className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {skill.description}
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEdit(skill)}
                  data-ocid={`skills.edit_button.${i + 1}`}
                >
                  <Pencil className="w-3.5 h-3.5" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => setDeleteId(skill.id)}
                  data-ocid={`skills.delete_button.${i + 1}`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          className="bg-card border-border"
          data-ocid="skills.dialog"
        >
          <DialogHeader>
            <DialogTitle>
              {editingSkill ? "Edit Skill" : "Add Skill"}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Name
              </div>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                className="bg-secondary border-border"
                data-ocid="skills.input"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Icon Name
              </div>
              <Input
                value={form.iconName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, iconName: e.target.value }))
                }
                placeholder="html5, javascript, react, nodejs, uiux, figma"
                className="bg-secondary border-border"
                data-ocid="skills.input"
              />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-1.5">
                Description
              </div>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={3}
                className="bg-secondary border-border resize-none"
                data-ocid="skills.textarea"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              data-ocid="skills.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-orange text-primary-foreground font-bold"
              data-ocid="skills.confirm_button"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent
          className="bg-card border-border"
          data-ocid="skills.dialog"
        >
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Skill?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="skills.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground"
              data-ocid="skills.delete_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MessagesTab() {
  const { data: messages = [], isLoading } = useContactMessages();

  if (isLoading) {
    return (
      <div className="space-y-4" data-ocid="messages.loading_state">
        {[1, 2, 3].map((i) => (
          <Skeleton key={`sk-${i}`} className="h-24 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-bold uppercase tracking-wider">
        Contact Messages ({messages.length})
      </h3>
      {messages.length === 0 ? (
        <div
          className="text-center py-12 text-muted-foreground"
          data-ocid="messages.empty_state"
        >
          No messages yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg, i) => (
            <div
              key={`${msg.name}-${msg.email}-${i}`}
              className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-2"
              data-ocid={`messages.item.${i + 1}`}
            >
              <div className="flex items-center justify-between">
                <div className="font-bold">{msg.name}</div>
                <div className="text-xs text-muted-foreground">{msg.email}</div>
              </div>
              <p className="text-sm text-muted-foreground">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const { identity, clear } = useInternetIdentity();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  if (!identity) return <LoginGate />;

  if (isAdminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2
          className="w-8 h-8 text-orange animate-spin"
          data-ocid="admin.loading_state"
        />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div
          className="bg-card border border-destructive rounded-3xl p-10 max-w-md w-full text-center flex flex-col gap-4"
          data-ocid="admin.card"
        >
          <h2 className="text-xl font-extrabold uppercase tracking-wider text-destructive">
            Access Denied
          </h2>
          <p className="text-muted-foreground text-sm">
            You don't have admin privileges for this portfolio.
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={clear}
              data-ocid="admin.secondary_button"
            >
              <LogOut className="w-4 h-4 mr-2" /> Sign Out
            </Button>
            <a href="/">
              <Button
                className="bg-orange text-primary-foreground"
                data-ocid="admin.primary_button"
              >
                Back to Portfolio
              </Button>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-muted-foreground hover:text-orange transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </a>
            <div>
              <div className="text-lg font-extrabold uppercase tracking-widest">
                <span className="text-orange">ALEX</span>
                <span className="text-foreground"> CARTER</span>
                <span className="text-muted-foreground text-sm font-normal ml-2">
                  / Admin
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clear}
            className="border-border hover:border-orange"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Tabs defaultValue="profile">
            <TabsList
              className="bg-card border border-border mb-8 h-auto p-1 gap-1"
              data-ocid="admin.tab"
            >
              <TabsTrigger
                value="profile"
                className="flex items-center gap-2 data-[state=active]:bg-orange data-[state=active]:text-primary-foreground"
                data-ocid="admin.tab"
              >
                <User className="w-4 h-4" /> Profile
              </TabsTrigger>
              <TabsTrigger
                value="projects"
                className="flex items-center gap-2 data-[state=active]:bg-orange data-[state=active]:text-primary-foreground"
                data-ocid="admin.tab"
              >
                <Briefcase className="w-4 h-4" /> Projects
              </TabsTrigger>
              <TabsTrigger
                value="skills"
                className="flex items-center gap-2 data-[state=active]:bg-orange data-[state=active]:text-primary-foreground"
                data-ocid="admin.tab"
              >
                <Code2 className="w-4 h-4" /> Skills
              </TabsTrigger>
              <TabsTrigger
                value="messages"
                className="flex items-center gap-2 data-[state=active]:bg-orange data-[state=active]:text-primary-foreground"
                data-ocid="admin.tab"
              >
                <Mail className="w-4 h-4" /> Messages
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>
            <TabsContent value="projects">
              <ProjectsTab />
            </TabsContent>
            <TabsContent value="skills">
              <SkillsTab />
            </TabsContent>
            <TabsContent value="messages">
              <MessagesTab />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
