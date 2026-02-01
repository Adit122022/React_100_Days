import { dots, userDetails } from '@/lib/constatns';
import React from 'react'
import { Rnd } from 'react-rnd'

const MacWindow = ({ children }: { children: React.ReactNode }) => {

    const [isMaximized, setIsMaximized] = React.useState(false);
    return (
        <Rnd default={{
            x: 0,
            y: 0,
            width: 320,
            height: 200,
        }}>
            <div className="w-full h-full bg-black rounded-lg ">

                {/* nav */}
                <div className="w-full flex  items-center gap-5  p-2 border-b-[0.5px] border-gray-600">
                    {/* dots */}
                    <div className="flex items-center gap-1">
                        {dots.map((dot, index) => (
                            <div key={index} className={`w-3 h-3 ${dot.icon} rounded-full`}></div>
                        ))}
                    </div>
                    {/* name */}
                    <div> <p className='text-sm font-[system-ui] text-gray-400 font-semibold'> {userDetails.name} ~zsh</p></div>
                </div>
                {/* main content */}
                <div className="w-full h-[calc(100%-20px)] text-white p-2">
                    {children}
                </div>
            </div>
        </Rnd>
    )
}

export default MacWindow