import { Home, Settings, CreditCard, UserRoundPen, Ticket } from 'lucide-react';

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Link from 'next/link';

// Menu items.
const dashboardItems = [
  {
    title: 'Dashboard',
    url: '/creator/dashboard',
    icon: Home,
  },
  {
    title: 'Event',
    url: '/creator/dashboard/event',
    icon: Ticket,
  },
];
const accountItems = [
  {
    title: 'General Information',
    url: '/creator/dashboard/general-information',
    icon: UserRoundPen,
  },
  {
    title: 'Bank Account',
    url: '#',
    icon: CreditCard,
  },
  {
    title: 'Settings',
    url: '#',
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="py-4 pl-4 border-r-2 h-screen w-full">
      <SidebarHeader>
        <p className="text-3xl font-bold">LOGO</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
