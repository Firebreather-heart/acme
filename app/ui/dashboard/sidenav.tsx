'use client'
import { Sidebar, SidebarContent, SidebarFooter, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AnimatePresence, motion } from "framer-motion";
import NavLinks from '@/app/ui/dashboard/nav-links';
import AcmeLogo from '@/app/ui/pagelogo';
import Link from 'next/link';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { handleSignOut } from '../../lib/actions';

const MotionSidebar = motion.create(Sidebar);

export default function SideNav() {
    const sidebarVariants = {
        closed: {
            width: 64,
            transition: { duration: 0.3 }
        },
        open: {
            width: 240,
            transition: { duration: 0.3 }
        }
    };

    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setOpen(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <SidebarProvider defaultOpen={open} onOpenChange={setOpen}>
            <div className="md:hidden">
                <SidebarTrigger className="m-2" />
            </div>
            <AnimatePresence>
                <MotionSidebar
                    collapsible="icon"
                    initial={isMobile ? "closed" : "open"}
                    animate={open ? "open" : "closed"}
                    exit="closed"
                    variants={sidebarVariants}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className={`flex h-full flex-col px-3 py-4 md:px-2 ${isMobile ? 'fixed top-0 left-0 z-40 bg-background' : ''}`}
                >
                    <SidebarContent>
                        <Link
                            className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
                            href="/"
                        >
                            <div className="w-32 text-white md:w-40">
                                <AcmeLogo />
                            </div>
                        </Link>
                        <div className="flex grow flex-col justify-start items-start space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                            <NavLinks />
                            <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                            <form
                                action={handleSignOut}
                            >
                                <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                                    <PowerIcon className="w-6" />
                                    <div className="hidden md:block">Sign Out</div>
                                </button>
                            </form>
                        </div>
                    </SidebarContent>
                    <SidebarFooter>© Acme</SidebarFooter>
                </MotionSidebar>
            </AnimatePresence>
        </SidebarProvider>
    );
}