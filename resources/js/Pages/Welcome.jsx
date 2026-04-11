import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/Components/ui/card";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Label } from "@/Components/ui/label";

export default function ConfessionForm() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Nanti kita akan guna Inertia.post untuk hantar data ke Laravel
        console.log("Mesej dihantar:", message);
        alert("Confession anda telah dihantar ke barisan giliran Threads!");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">Threads Confession 🤫</CardTitle>
                    <CardDescription className="text-center">
                        Luahkan apa sahaja secara anonim. Mesej anda akan dipaparkan di akaun Threads kami.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="message">Mesej Anda</Label>
                            <Textarea 
                                id="message"
                                placeholder="Tulis sesuatu di sini..."
                                className="min-h-[150px] resize-none"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <Button className="w-full bg-black text-white hover:bg-slate-800" type="submit">
                            Hantar ke Threads
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}