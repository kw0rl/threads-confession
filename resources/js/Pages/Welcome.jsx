import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";
import { Spinner } from "@/Components/ui/spinner";
import { Toaster } from "@/Components/ui/sonner";
import { Switch } from "@/Components/ui/switch";
import { 
  Command, 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/Components/ui/command";
import { Settings, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { useForm, Head } from '@inertiajs/react';

// Komponen Partikel Latar Belakang (Simple CSS Animation)
function BackgroundParticles() {
    return (
        <div className="fixed inset-0 z-0 overflow-hidden bg-slate-50 dark:bg-black pointer-events-none">
            <div className="absolute inset-0 bg-dots text-slate-300/80 dark:text-zinc-800 animate-moving-dots"></div>
            {/* Overlay Gradient Tepi Kiri Kanan Atas Bawah Biar Lembut */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent dark:from-black"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-transparent to-transparent dark:from-black"></div>
        </div>
    );
}

export default function Welcome() {
    const { data, setData, post, processing, reset} = useForm({
        message: '',
    });
    
    const [isDark, setIsDark] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // Tentukan tema semasa load
        if (document.documentElement.classList.contains('dark')) {
            setIsDark(true);
        }
        
        // Command Menu Keyboard Shortcut (Ctrl/Cmd + K)
        const down = (e) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, []);

    const toggleDarkMode = () => {
        const newIsDark = !isDark;
        setIsDark(newIsDark);
        if (newIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Menu kekal buka (tidak setOpen(false))
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/confessions', {
            onSuccess: () => {
                toast.success('Success!', {
                    description: 'confession has been posted to Threads.',
                    closeButton: true,
                });
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Threads Confession" />
            <Toaster position="bottom-right" richColors />
            
            <BackgroundParticles />
            
            {/* Butang Command Menu dengan ikon Setting di bawah kanan */}
            <div className="fixed bottom-6 right-6 z-50">
                <Button 
                    variant="outline" 
                    size="icon"
                    className="h-12 w-12 rounded-full shadow-lg border-zinc-200 dark:border-[#27272a] bg-white dark:bg-[#18181b] text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-[#27272a] transition-all"
                    onClick={() => setOpen(true)}
                >
                    <Settings className="h-6 w-6" />
                    <span className="sr-only">Open Command Menu</span>
                </Button>
            </div>

            {/* Command Dialog Shadcn */}
            <CommandDialog open={open} onOpenChange={setOpen}>
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Settings">
                            <CommandItem 
                                onSelect={(value) => {
                                    toggleDarkMode();
                                }} 
                                className="cursor-pointer"
                            >
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        {isDark ? (
                                            <>
                                                <Sun className="mr-2 h-4 w-4" />
                                                <span>Light Mode</span>
                                            </>
                                        ) : (
                                            <>
                                                <Moon className="mr-2 h-4 w-4" />
                                                <span>Dark Mode</span>
                                            </>
                                        )}
                                    </div>
                                    <Switch checked={isDark} className="pointer-events-none translate-x-5" />
                                </div>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </CommandDialog>

            <div className="flex items-center justify-center min-h-screen p-4 transition-colors relative z-10 w-full">
                <Card className="w-full sm:max-w-md bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-[#27272a] text-zinc-900 dark:text-white shadow-sm dark:shadow-none">
                    <CardHeader>
                        <CardTitle className="text-xl font-semibold text-zinc-900 dark:text-white">
                            Threads Confession
                        </CardTitle>
                        <CardDescription className="text-zinc-500 dark:text-[#a1a1aa] text-sm">
                            Write your anonymous confession here.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} id="confession-form">
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-medium text-zinc-900 dark:text-white">Your Message</Label>
                                <div className="relative border border-zinc-200 dark:border-[#27272a] rounded-md bg-white dark:bg-[#18181b] focus-within:ring-1 focus-within:ring-zinc-900 dark:focus-within:ring-white transition-shadow">
                                    <Textarea 
                                        id="message"
                                        placeholder="Write confession here..."
                                        className="min-h-[140px] border-0 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-[#a1a1aa] focus-visible:ring-0 focus-visible:ring-offset-0 resize-none p-3 pb-8"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        maxLength={500}
                                        required
                                    />
                                    <div className="absolute bottom-2 left-3 right-3 flex justify-end items-center text-xs text-zinc-500 dark:text-[#a1a1aa] bg-transparent pointer-events-none">
                                        <span>
                                            {data.message.length}/500 characters
                                        </span>
                                    </div>
                                </div>
                                <p className="text-sm text-zinc-500 dark:text-[#a1a1aa] pt-2">
                                    Include any details you want to share anonymously to the world.
                                </p>
                            </div>
                        </form>
                    </CardContent>
                    <div className="flex items-center justify-end gap-3 p-6 pt-0">
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => reset()}
                            className="bg-transparent border border-zinc-200 dark:border-[#27272a] text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-[#27272a] hover:text-zinc-900 dark:hover:text-white"
                        >
                            Reset
                        </Button>
                        <Button 
                            className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200" 
                            type="submit"
                            form="confession-form"
                            disabled={processing || data.message.length === 0 || data.message.length > 500}
                        >
                            {processing ? (
                                <>
                                    <Spinner data-icon="inline-start" className="mr-2 h-4 w-4" />
                                    Processing...
                                </>
                            ) : (
                                'Submit'
                            )}
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}