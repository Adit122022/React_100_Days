export const wallpapersList = [
  {
    id: "sequoia",
    name: "Sequoia",
    url: "./mac-wallpaper.jpg",
    thumbnail: "./mac-wallpaper.jpg",
  },
  {
    id: "ventura",
    name: "Ventura",
    url: "./spiderman.jpg",
    thumbnail: "./spiderman.jpg",
  },
  {
    id: "sonoma",
    name: "Sonoma",
    url: "./sonoma.jpg",
    thumbnail: "./sonoma.jpg",
  },
  {
    id: "monterey",
    name: "Monterey",
    url: "./monterey.jpg",
    thumbnail: "./monterey.jpg",
  },
];

export const dots = [
  { icon: "bg-red-500", fn: () => console.log("red") },
  { icon: "bg-yellow-500", fn: () => console.log("yellow") },
  { icon: "bg-green-500", fn: () => console.log("green") },
];

//  name should be your terminal name and github username
export const userDetails = {
    name:"aditya",
    githubUsername:"adit122022"
}


// Update with your Project details
  export  const projects = [
        {
            title: "CodeMitra",
            description: "Real-time collaborative coding platform with video chat and shared editor.",
            tech: ["MERN", "Socket.io", "WebRTC"],
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80", // Replace with your screenshot
            github: "https://github.com/adit122022/codemitra",
            live: "https://code-mitra-ad.vercel.app/"
        },
        {
            title: "Omoide",
            description: "A second brain application for managing personal knowledge and daily tasks.",
            tech: ["Next.js", "TypeScript", "Tailwind"],
            image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&q=80",
            github: "https://github.com/Adit122022/Omoide",
            live: "#"
        },
        {
            title: "Kizuna",
            description: "Social networking web app focusing on building meaningful connections.",
            tech: ["React", "Node.js", "MongoDB"],
            image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80",
            github: "https://github.com/adit122022/kizuna",
            live: "#"
        }
    ];

    export interface WindowsState {
        github: boolean;
        note: boolean;
        resume: boolean;
        spotify: boolean;
        cli: boolean;
        calender: boolean;
        link: boolean;
        mail: boolean;
        pdf: boolean;
    }