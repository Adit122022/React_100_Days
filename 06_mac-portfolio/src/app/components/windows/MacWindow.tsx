import { dots, userDetails } from '@/lib/constatns';
import React from 'react'
import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion';


interface MacWindowProps {
    children: React.ReactNode;
    x: number;
    y: number;
    width: string;
    height: string;
    title?: string;
}
const MacWindow = ({ children, x, y, width, height, title, onClose }: MacWindowProps & { onClose?: () => void }) => {
    return (
        <Rnd default={{
            x: x,
            y: y,
            width: width,
            height: height,
        }}>
            <motion.div
                initial={{ scale: 0, opacity: 0, filter: "blur(4px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="w-full h-full bg-black rounded-lg ">

                {/* nav */}
                <div className="w-full flex  items-center gap-5  p-2 border-b-[0.5px] border-gray-600">
                    {/* dots */}
                    <div className="flex items-center gap-1">
                        {dots.map((dot, index) => (
                            <div
                                key={index}
                                className={`w-3 h-3 ${dot.icon} rounded-full cursor-pointer`}
                                onClick={() => {
                                    if (index === 0 && onClose) {
                                        onClose();
                                    }
                                }}
                            ></div>
                        ))}
                    </div>
                    {/* name */}
                    <div> <p className='text-sm font-[system-ui] text-gray-400 font-semibold'> {title ? title : `${userDetails.name} ~zsh`}</p></div>
                </div>
                {/* main content */}
                <div className="w-full h-[calc(100%-20px)] text-white p-2">
                    {children}
                </div>
            </motion.div>
        </Rnd>
    )
}

export default MacWindow