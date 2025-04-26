
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Upgrade, 
  Account as AccountIcon, 
  Billing, 
  Notifications, 
  LogOut 
} from "lucide-react";

export function ProfileDropdown() {
  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors cursor-pointer">
        <Avatar>
          <AvatarImage src={"/placeholder.svg"} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
          <span className="text-sm font-medium">shadcn</span>
          <span className="text-xs text-muted-foreground">m@example.com</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem>
          <Upgrade className="mr-2" />
          <span>Upgrade to Pro</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <AccountIcon className="mr-2" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Billing className="mr-2" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Notifications className="mr-2" />
          <span>Notifications</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
