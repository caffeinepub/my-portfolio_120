import type { Profile, Project, Skill } from "../backend.d";

export const SAMPLE_PROFILE: Profile = {
  name: "Nick",
  title: "Multimedia Designer",
  bio: "I'm a passionate multimedia designer with over 5 years of experience crafting stunning visuals, 3D assets, and motion graphics. I blend creative artistry with technical precision to deliver work that stands out.",
  email: "contact@example.com",
  location: "Earth",
};

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "ShopSphere E-Commerce",
    description:
      "A full-featured e-commerce platform with real-time inventory, AI-powered product recommendations, and a sleek dark dashboard for merchants.",
    tags: ["React", "Node.js", "Tailwind", "Stripe"],
    imageUrl: "/assets/generated/project-ecommerce.dim_600x400.jpg",
    projectUrl: "#",
  },
  {
    id: "proj-2",
    title: "FlowTask Manager",
    description:
      "A productivity-first task management app featuring kanban boards, time tracking, team collaboration, and powerful analytics.",
    tags: ["React", "TypeScript", "GraphQL"],
    imageUrl: "/assets/generated/project-taskapp.dim_600x400.jpg",
    projectUrl: "#",
  },
  {
    id: "proj-3",
    title: "Ember Restaurant Website",
    description:
      "Elegant restaurant website with online reservations, seasonal menu management, and immersive food photography presentation.",
    tags: ["Next.js", "Framer Motion", "Sanity CMS"],
    imageUrl: "/assets/generated/project-restaurant.dim_600x400.jpg",
    projectUrl: "#",
  },
];

export const SAMPLE_SKILLS: Skill[] = [
  {
    id: "skill-1",
    name: "Photoshop",
    description: "Photo editing, digital compositing, and visual artwork.",
    iconName: "photoshop",
  },
  {
    id: "skill-2",
    name: "Illustrator",
    description: "Vector graphics, logo design, and scalable brand assets.",
    iconName: "illustrator",
  },
  {
    id: "skill-3",
    name: "Maya",
    description: "3D modeling, rigging, and animation for film and games.",
    iconName: "maya",
  },
  {
    id: "skill-4",
    name: "Blender",
    description: "3D creation, sculpting, rendering, and visual effects.",
    iconName: "blender",
  },
  {
    id: "skill-5",
    name: "Premiere Pro",
    description: "Professional video editing and color grading.",
    iconName: "premiere",
  },
  {
    id: "skill-6",
    name: "After Effects",
    description: "Motion graphics, compositing, and animation.",
    iconName: "aftereffects",
  },
  {
    id: "skill-7",
    name: "Unreal Engine",
    description: "Real-time 3D environments, game development, and VFX.",
    iconName: "unreal",
  },
];
