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
    title: "ONLINE FOOD DELIVERY MANAGEMENT",
    category: "Web Development",
    imageId: "project-1",
  },
  {
    id: "2",
    title: "RESTRO AND CAFE MANAGEMENT SYSTEM",
    category: "Web Development",
    imageId: "project-2",
  },
  {
    id: "3",
    title: "ONLINE CLOTHING SHOP MANAGEMENT SYSTEM",
    category: "Web Development",
    imageId: "project-3",
  },
  {
    id: "4",
    title: "FILE CONVERSION WEB APPLICATION",
    category: "Web Development",
    imageId: "project-4",
  },
];
