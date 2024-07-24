import { Building, ChevronDown, LogOut } from "lucide-react";
import { Button } from "./button";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuSeparator
} from "./dropdown-menu";


export function AccountMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant={'outline'}
                    className="flex items-center gap-2 select-none"
                >
                    Pizza Shop
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                    <span>Itallo Minatti</span>
                    <span className="text-xs font-normal text-muted-foreground">itallominatti@gmail.com</span>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <Building className="h-4 w-4 mr-2" />
                    <span>Perfil da loja</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem className="text-rose-500 dark:text-rose-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Sair</span>
                </DropdownMenuItem>


            </DropdownMenuContent>

        </DropdownMenu>
    )
}