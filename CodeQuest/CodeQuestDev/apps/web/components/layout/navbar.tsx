"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User, Settings, LayoutDashboard, Users, Swords, Trophy, Target, Brain, Zap } from "lucide-react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/settings/theme-toggle";

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    const NAV_ITEMS = [
        { label: "Home", href: user ? "/dashboard" : "/" },
        { label: "Aprender", href: "/learn" },
        { label: "Playground", href: "/playground" },
        ...(user ? [
            { label: "Ranking", href: "/ranking" },
            { label: "Amigos", href: "/friends" },
        ] : []),
    ];

    return (
        <nav className="border-b-2 border-black dark:border-zinc-500 bg-background sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                    <div className="bg-primary border-2 border-black h-8 w-8 flex items-center justify-center neo-shadow group-hover:translate-y-1 group-hover:shadow-none transition-all">
                        <span className="font-bold text-black">CQ</span>
                    </div>
                    <span className="font-extrabold text-xl tracking-tighter uppercase hidden sm:block">
                        CodeQuest
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors",
                                pathname === item.href && "text-primary decoration-2 underline underline-offset-4"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}


                    <ThemeToggle />

                    {user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-transparent hover:border-black p-0 overflow-hidden hover:bg-transparent">
                                    <Avatar className="h-9 w-9 border-2 border-black">
                                        <AvatarImage src={user.image || ''} alt={user.name || 'User'} />
                                        <AvatarFallback className="font-bold bg-primary text-black">
                                            {user.name?.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 border-2 border-black shadow-[4px_4px_0px_0px_#000] p-0" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal p-4 bg-zinc-50 dark:bg-zinc-900 border-b-2 border-black">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-black uppercase leading-none">{user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground font-mono">
                                            {user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <div className="p-2">
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black mb-1">
                                        <Link href="/dashboard" className="flex items-center">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black mb-1">
                                        <Link href="/profile" className="flex items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Perfil</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black mb-1">
                                        <Link href="/duel" className="flex items-center">
                                            <Swords className="mr-2 h-4 w-4" />
                                            <span>Duelos</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black mb-1">
                                        <Link href="/challenges" className="flex items-center">
                                            <Target className="mr-2 h-4 w-4" />
                                            <span>Desafios</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black mb-1">
                                        <Link href="/flashcards" className="flex items-center">
                                            <Brain className="mr-2 h-4 w-4" />
                                            <span>Flashcards</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black mb-1">
                                        <Link href="/speedrun" className="flex items-center">
                                            <Zap className="mr-2 h-4 w-4" />
                                            <span>Speedrun</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild className="cursor-pointer font-bold focus:bg-black focus:text-white rounded-none border-2 border-transparent focus:border-black">
                                        <Link href="/settings" className="flex items-center">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Configurações</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </div>
                                <DropdownMenuSeparator className="bg-black h-[2px] m-0" />
                                <div className="p-2">
                                    <DropdownMenuItem
                                        className="cursor-pointer font-bold text-red-600 focus:bg-red-100 focus:text-red-900 focus:border-red-900 rounded-none border-2 border-transparent"
                                        onClick={() => signOut({ callbackUrl: "/" })}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sair</span>
                                    </DropdownMenuItem>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Link href="/login">
                            <Button size="sm" className="hidden lg:flex border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:translate-y-0.5 hover:shadow-none transition-all">
                                Login
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-2 md:hidden">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden border-t-2 border-black dark:border-zinc-500 bg-background p-4 flex flex-col gap-4 neo-shadow absolute w-full left-0">
                    {user && (
                        <div className="flex items-center gap-3 pb-3 border-b-2 border-dashed border-gray-300 dark:border-zinc-700">
                            <Avatar className="h-10 w-10 border-2 border-black">
                                <AvatarImage src={user.image || ''} />
                                <AvatarFallback className="bg-primary text-black font-bold">{user.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-black uppercase">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>
                    )}

                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "text-lg font-bold uppercase py-2 border-b border-dashed border-gray-300 dark:border-zinc-700",
                                pathname === item.href && "text-primary border-solid border-primary"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {user ? (
                        <Button
                            variant="destructive"
                            className="w-full border-2 border-black shadow-[4px_4px_0px_0px_#000]"
                            onClick={() => signOut({ callbackUrl: "/" })}
                        >
                            <LogOut className="mr-2 h-4 w-4" /> Sair
                        </Button>
                    ) : (
                        <Link href="/login" onClick={() => setIsOpen(false)}>
                            <Button className="w-full border-2 border-black shadow-[4px_4px_0px_0px_#000]">Login</Button>
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
