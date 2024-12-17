// import { Metadata } from 'next';
import * as React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '../components/Sidebar';
import Upbar from '../components/Upbar';

interface ICreatorDashboardLayoutProps {
  children: React.ReactNode;
}

// export const metadata:Metadata(){
// }

const CreatorDashboardLayout: React.FunctionComponent<ICreatorDashboardLayoutProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-1 relative">
        <SidebarProvider className=" w-full sticky top-0">
          <AppSidebar />
        </SidebarProvider>
      </div>
      <div className="col-span-6 py-4 flex flex-col gap-10">
        <Upbar />
        {children}
      </div>
    </div>
  );
};

export default CreatorDashboardLayout;
