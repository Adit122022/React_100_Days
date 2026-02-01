import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";



const Dock = () => {
    const icons = [
        { src: "github.svg", alt: "GitHub", color: "bg-gradient-to-b from-[#444d56] to-[#24292e]" }, // 3D Slate
        { src: "calender.svg", alt: "Calendar", color: "bg-gradient-to-b from-[#7A83FF] to-[#5856D6]" }, // 3D Red
        { src: "cli.svg", alt: "Terminal", color: "bg-gradient-to-b from-[#757575] to-[#4d4d4d]" }, // 3D Gray
        { src: "link.svg", alt: "Links", color: "bg-gradient-to-b from-[#5ac8fa] to-[#007aff]" }, // 3D Blue
        { src: "mail.svg", alt: "Mail", color: "bg-gradient-to-b from-[#7d7aff] to-[#5856d6]" }, // 3D Indigo
        { src: "pdf.svg", alt: "PDF", color: "bg-gradient-to-b from-[#ff4b2b] to-[#f40f02]" }, // 3D Red-Orange
        { src: "spotify.svg", alt: "Spotify", color: "bg-gradient-to-b from-[#2ecc71] to-[#1DB954]" }, // 3D Green
        { src: "note.svg", alt: "Notes", color: "bg-gradient-to-b from-[#ffd54f] via-[#ffcc00] to-[#ffb300]" }, // 3D Yellow
    ];

    return (
        <footer className="w-full relative">
            <div className='dock-container'>
                {icons.map((icon, index) => (
                    <Tooltip delayDuration={100} key={index}>
                        <TooltipTrigger asChild>
                            <img
                                className={`dock-icons p-2 rounded-lg ${icon.color}`}
                                src={`./doc-icons/${icon.src}`}
                                alt={icon.alt}
                            />

                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 border-gray-700">
                            <p className="text-sm text-gray-200">{icon.alt}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </footer>
    )
}

export default Dock