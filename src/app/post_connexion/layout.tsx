// src/app/post_connexion/layout.tsx
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { Header, LeftSidebar, RightSidebar } from '@/features/navigation';
import { useFriends } from '@lib/hooks/useAPI';

export default function PostConnexionLayout({ children }: { children: React.ReactNode }) {
  const { friends } = useFriends();
  const pathname = usePathname();

  // Ne pas afficher les sidebars sur la page de profil pour un layout pleine page
  const isProfilePage = pathname.includes('/Profils');

  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <Header />
      <div className="pt-14 flex justify-between min-h-screen">
        {!isProfilePage && (
          <div className="w-[300px] hidden xl:block fixed left-0 h-full">
            <LeftSidebar friends={friends} />
          </div>
        )}

        <main className={`flex-1 max-w-full ${!isProfilePage ? 'xl:max-w-[720px] xl:ml-[300px] xl:mr-[320px]' : ''} p-4 md:p-8`}>
          {children}
        </main>

        {!isProfilePage && (
          <div className="w-[320px] hidden lg:block fixed right-0 h-full">
            <RightSidebar />
          </div>
        )}
      </div>
    </div>
  );
}
