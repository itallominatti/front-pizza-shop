import { Building, ChevronDown, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "./dropdown-menu";
import { getProfile } from "@/api/get-profile";
import { getManagedRestaurant } from "@/api/get-managed-restaurant";
import { Skeleton } from "./skeleton";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogTrigger } from "./dialog";
import { StoreProfileDialog } from "./store-profile-dialog";


export function AccountMenu() {

    const {
        data: profile,
        isLoading: isLoadingProfile,
    } = useQuery({

        queryKey: ['profile'],
        queryFn: getProfile,
        staleTime: Infinity,

    })

    const {
        data: managedRestaurant,
        isLoading: isLoadingManagedRestaurant
    } = useQuery({

        queryKey: ['managed-restaurant'],
        queryFn: getManagedRestaurant,
        staleTime: Infinity,

    })

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant='outline'
                        className="flex items-center gap-2 select-none"
                    >
                        {isLoadingManagedRestaurant ? (
                            <Skeleton className="h-4 w-40" />) : managedRestaurant?.name}

                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingProfile ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                            </div>) : (<>
                                <span> {profile?.name}</span>
                                <span className="text-xs font-normal text-muted-foreground">{profile?.email}</span>
                            </>)}
                    </DropdownMenuLabel>

                    <DropdownMenuSeparator />
                    <DialogTrigger asChild>
                        <DropdownMenuItem>
                            <Building className="h-4 w-4 mr-2" />
                            <span>Perfil da loja</span>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                        <LogOut className="h-4 w-4 mr-2" />
                        <span>Sair</span>
                    </DropdownMenuItem>


                </DropdownMenuContent>

            </DropdownMenu >

            <StoreProfileDialog />
        </Dialog >
    )
}