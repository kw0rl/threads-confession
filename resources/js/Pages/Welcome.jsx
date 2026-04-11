import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

export default function Welcome() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Nanti kita akan sambung logic Inertia di sini
        console.log("Mesej:", message);
        alert("Confession dihantar ke konsol (Logic API akan datang!)");
    };

    return (
        <>
            <Head title="Threads Confession" />
            <div className="flex items-center justify-center min-h-screen bg-slate-100 p-4">
                <Card className="w-full max-w-md shadow-xl border-none">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-3xl font-extrabold text-center tracking-tight">
                            Threads Confession 🤫
                        </CardTitle>
                        <CardDescription className="text-center text-slate-500">
                            Luahkan apa sahaja secara anonim. 
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="message" className="text-sm font-semibold">Mesej Anda</Label>
                                <Textarea 
                                    id="message"
                                    placeholder="Tulis confession anda di sini..."
                                    className="min-h-[120px] focus:ring-2 focus:ring-black transition-all"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                />
                            </div>
                            <Button className="w-full bg-black text-white hover:bg-zinc-800 h-11 text-lg font-medium" type="submit">
                                Post ke Threads
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}