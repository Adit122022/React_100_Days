import MacWindow from '../MacWindow'
import { WindowsState } from '@/lib/constatns'
import { Dispatch, SetStateAction } from 'react'

interface SpotifyProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    title?: string;
    fileUrl?: string;
}

const Spotify = ({ windowName, setWindowsState, title = "spotify" }: SpotifyProps) => {
    return (
        <MacWindow
            x={100}
            y={50}
            width="35vw"
            height="65vh"
            title={title}
            onClose={() => setWindowsState((prev) => ({ ...prev, [windowName]: false }))}
        >
            <div className="h-[95%] w-full bg-[#0b0b0b] text-white overflow-x-hidden overflow-y-auto scrollbar ">
                <iframe data-testid="embed-iframe" style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/album/24C47633GRlozws7WBth7t?utm_source=generator&theme=0" width="100%" height="100%" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            </div>
        </MacWindow>
    )
}

export default Spotify