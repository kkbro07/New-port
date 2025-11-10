
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Separator } from "../ui/separator";
import { Youtube } from "lucide-react";

export function YoutubeBadge() {
    const avatar = PlaceHolderImages.find(img => img.id === 'kirtan-avatar');

    return (
        <Card className="w-[240px] pt-4 text-left">
            <CardHeader className="p-4">
                 <Link href="https://www.youtube.com/@kirtankalathiya" target="_blank" className="flex items-center gap-4">
                    {avatar && (
                        <Image 
                            src={avatar.imageUrl}
                            alt="Kirtan Kalathiya"
                            width={64}
                            height={64}
                            className="rounded-full"
                            data-ai-hint={avatar.imageHint}
                        />
                    )}
                    <div>
                        <h3 className="font-bold text-base">kirtankalathiya</h3>
                        <p className="text-sm text-muted-foreground">Kirtan Kalathiya</p>
                    </div>
                </Link>
            </CardHeader>
            <CardContent className="px-4 pb-4">
                 <div className="flex justify-around text-center text-sm">
                    <div>
                        <p className="font-bold">25</p>
                        <p className="text-xs text-muted-foreground">Videos</p>
                    </div>
                     <div>
                        <p className="font-bold">1.2K</p>
                        <p className="text-xs text-muted-foreground">Subscribers</p>
                    </div>
                </div>
            </CardContent>
            <Separator />
            <CardFooter className="p-4">
                <Button asChild className="w-full bg-[#FF0000] hover:bg-[#FF0000]/90 text-white">
                    <Link href="https://www.youtube.com/@kirtankalathiya" target="_blank">
                        <Youtube className="mr-2 h-4 w-4" /> Subscribe
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
