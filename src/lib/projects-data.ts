export type Project = {
  id: string;
  title: string;
  category: string;
  imageId: string;
  featured?: boolean;
  meta?: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "Ethereal Visions",
    category: "Branding Identity",
    imageId: "project-1",
  },
  {
    id: "2",
    title: "Zenith Workspace",
    category: "Web Design",
    imageId: "project-2",
  },
  {
    id: "3",
    title: "Monochrome Dreams",
    category: "Photography",
    imageId: "project-3",
  },
  {
    id: "4",
    title: "Concrete Jungle",
    category: "Art Direction",
    imageId: "project-4",
  },
  {
    id: "5",
    title: "Project Nova",
    category: "Product Design",
    imageId: "project-5",
  },
  {
    id: "6",
    title: "Umbra",
    category: "Exhibition",
    imageId: "project-6",
  },
  {
    id: "7",
    title: "Rodewald",
    category: "Experience Design",
    imageId: "experience-1",
    featured: true,
    meta: "INTERNATIONAL"
  },
  {
    id: "8",
    title: "TCG Dream",
    category: "Digital Product",
    imageId: "experience-2",
    featured: true,
    meta: "GERMANY"
  }
];
