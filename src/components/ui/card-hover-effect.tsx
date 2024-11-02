"use client"
import { eventContext } from "@/app/context/MyContext";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;        
        image: string; // Added image property
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const router = useRouter()
    const context = useContext(eventContext);
    if (!context) {
        throw new Error("eventContext is null");
    }
    const { setUserSelectedEvent } = context;

  
    const handleSetSelectedEvent = (item:any) =>{
        setUserSelectedEvent(item)
        localStorage.setItem("UserSelectedEvent",JSON.stringify(item))
        router.push("/selectedEvent")
    }
    return (
        <div
            className={cn(
                "grid grid-cols-3 md:grid-cols-1  lg:grid-cols-3  py-10 mb",
                className
            )}
        >
            {items.map((item, idx) => (
                <button
                    
                    onClick={()=>handleSetSelectedEvent(item)}                    
                    key={item?.title || ""}
                    className="relative group  block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card image={item.image}>
                        <CardTitle>{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                    </Card>
                </button>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
    image,
}: {
    className?: string;
    children: React.ReactNode;
    image: string; // Added image property
}) => {
    return (
        <div
            className={cn(
                "rounded-2xl h-full w-full p-4 overflow-hidden bg-[#00000078] bg-blend-multiply border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                className
            )}
            style={{  backgroundImage :  `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Added inline style for background image
        >
            <div className="absolute  bg-black opacity-100 z-10"></div> {/* Added black shade overlay */}
            <div className="relative z-50">
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};

export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
            {children}
        </h4>
    );
};

export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                "mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm",
                className
            )}
        >
            {children}
        </p>
    );
};
