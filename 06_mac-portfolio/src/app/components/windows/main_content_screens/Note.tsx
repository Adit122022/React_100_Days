"use client"
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import MacWindow from '../MacWindow'
import Markdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierDuneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface WindowsState {
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

interface NoteProps {
    windowName: keyof WindowsState;
    setWindowsState: Dispatch<SetStateAction<WindowsState>>;
    title?: string;
    fileUrl?: string;
}

const Note = ({ windowName, setWindowsState, title = "aditya_sharma.config.ts", fileUrl = "/note.md" }: NoteProps) => {
    const [markdown, setMarkdown] = useState<string | null>(null)
    useEffect(() => {
        fetch(fileUrl)
            .then((res) => res.text())
            .then((data: string) => setMarkdown(data))
    }, [fileUrl])
    return (
        <MacWindow
            x={100}
            y={50}
            width="60vw"
            height="70vh"
            title={title}
            onClose={() => setWindowsState((prev) => ({ ...prev, [windowName]: false }))}
        >
            <div className="h-[95%] w-full bg-[#0b0b0b] text-white overflow-x-hidden overflow-y-auto scrollbar ">
                {markdown ? <SyntaxHighlighter className='!bg-black' language="typescript" style={atelierDuneDark}>
                    {markdown}
                </SyntaxHighlighter> : <p>Loading...</p>}
            </div>
        </MacWindow>
    )
}
export default Note