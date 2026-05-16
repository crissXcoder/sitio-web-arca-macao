"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
    title: string;
    description: string;
    icon?: React.ReactNode;
    status?: string;
    tags?: string[];
    meta?: string;
    cta?: string;
    colSpan?: number;
    hasPersistentHover?: boolean;
}

interface BentoGridProps {
    items: BentoItem[];
    className?: string;
}

export function BentoGrid({ items, className }: BentoGridProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-2xl overflow-hidden transition-all duration-500",
                        "border border-border/30 bg-foreground/[0.03] backdrop-blur-xl",
                        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] hover:border-primary/30",
                        "hover:-translate-y-1 will-change-transform",
                        item.colSpan || "col-span-1",
                        item.colSpan === 2 ? "md:col-span-2" : "",
                        item.colSpan === 3 ? "md:col-span-3" : "",
                        {
                            "shadow-[0_8px_32px_rgba(0,0,0,0.12)] -translate-y-1 border-primary/20":
                                item.hasPersistentHover,
                        }
                    )}
                >
                    <div
                        className={cn(
                            "absolute inset-0 transition-opacity duration-500",
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
                    </div>

                    <div className="relative flex flex-col h-full space-y-6">
                        <div className="flex items-start justify-between">
                            {item.icon && (
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-500">
                                    {item.icon}
                                </div>
                            )}
                            {item.status && (
                                <span
                                    className={cn(
                                        "text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full backdrop-blur-md",
                                        "bg-foreground/5 text-muted-foreground",
                                        "transition-colors duration-500 group-hover:bg-primary/10 group-hover:text-primary"
                                    )}
                                >
                                    {item.status}
                                </span>
                            )}
                        </div>

                        <div className="space-y-3 flex-grow">
                            <h3 className="font-serif text-3xl md:text-4xl text-foreground font-light tracking-tight flex items-baseline gap-2">
                                {item.title}
                                {item.meta && (
                                    <span className="text-sm font-sans text-primary font-bold uppercase tracking-[0.2em]">
                                        {item.meta}
                                    </span>
                                )}
                            </h3>
                            <p className="font-sans text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        {(item.tags || item.cta) && (
                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/5">
                                <div className="flex items-center space-x-2">
                                    {item.tags?.map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 rounded-md bg-foreground/5 text-[10px] font-black uppercase tracking-[0.1em] text-muted-foreground transition-all duration-300 hover:bg-foreground/10 hover:text-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                {item.cta && (
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1">
                                        {item.cta}
                                        <span className="text-lg leading-none">&rarr;</span>
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    <div
                        className={cn(
                            "absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-primary/10 to-transparent",
                            item.hasPersistentHover
                                ? "opacity-100"
                                : "opacity-0 group-hover:opacity-100",
                            "transition-opacity duration-500"
                        )}
                    />
                </div>
            ))}
        </div>
    );
}
