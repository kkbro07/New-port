export type Project = {
  id: string;
  title: string;
  category: string;
  imageId: string;
  featured?: boolean;
  meta?: string;
  description: string;
  githubLink?: string;
};

export const projects: Project[] = [
  {
    id: "1",
    title: "ONLINE FOOD DELIVERY MANAGEMENT",
    category: "Web Development",
    imageId: "project-1",
    description: "Developed a food delivery platform using HTML for the frontend, MySQL for the database, and PHP for the backend. The system allows users to browse restaurant menus, place orders, and track deliveries. Admins can manage orders, update menu items, and handle customer requests. The application is hosted on an XAMPP server for local development, ensuring smooth interaction between the frontend and backend components.",
    githubLink: "https://github.com/kkbro07/project"
  },
  {
    id: "2",
    title: "RESTRO AND CAFE MANAGEMENT SYSTEM",
    category: "Web Development",
    imageId: "project-2",
    description: "Developed a restaurant/café management system using ASP.NET and SQL Server. The system allows for efficient order management, billing, and inventory tracking, with features like table management and customer service. Admins can manage staff schedules, view sales analytics, and generate reports. The system is designed to streamline operations and improve customer service.",
    githubLink: "https://github.com/kkbro07/Food_Ordering_Project"
  },
  {
    id: "3",
    title: "ONLINE CLOTHING SHOP MANAGEMENT SYSTEM",
    category: "Web Development",
    imageId: "project-3",
    description: "Created an online clothing shop management system using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system includes features like user authentication, product listing, and order management. Admins can update products, track orders, and manage customer data. The frontend is built with React.js for an interactive experience, while the backend uses Node.js and MongoDB for efficient data handling. The platform ensures a smooth and secure shopping experience for users.",
    githubLink: "#"
  },
  {
    id: "4",
    title: "FILE CONVERSION WEB APPLICATION",
    category: "Web Development",
    imageId: "project-4",
    description: "Developed a file conversion web app using Python, Django, and React.js. The platform allows users to convert PDF to Word, Word to PDF, and merge PDFs. The user-friendly interface enables quick file uploads and conversions. Django handles backend processing, while React.js ensures a responsive frontend. The app provides a fast, reliable solution for managing document conversion.",
    githubLink: "#"
  },
  {
    id: "5",
    title: "Jarvis AI Assistant",
    category: "AI/ML Development",
    imageId: "project-7",
    description: "A personal AI assistant inspired by Jarvis from Iron Man, built with Python. It can perform various tasks like opening applications, searching the web, and providing real-time information.",
    githubLink: "https://github.com/kkbro07/jarvis"
  }
];
