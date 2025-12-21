import React from "react";
import { Users, Bookmark, MonitorPlay, Store, Clock, ChevronDown } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

const MENU_ITEMS = [
  { icon: Users, label: "Ami(e)s", color: "text-purple-500" },
];

export const LeftSidebar = () => {
  return (
    <aside className="fixed left-0 top-14 h-[calc(100vh-56px)] w-[300px] p-4 overflow-y-auto hidden xl:block hover:overflow-y-scroll scrollbar-hide">
      <div className="space-y-2">
        {/* Profil courant */}
        <div className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer transition">
          <Avatar size="sm" alt="Me" />
          <span className="font-semibold text-sm text-purple-700">Antoine Emmanuel ESSOMBA</span>
        </div>

        {/* Liste Menu */}
        {MENU_ITEMS.map((item, index) => (
          <div key={index} className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer transition">
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <span className="font-medium text-sm text-gray-700">{item.label}</span>
          </div>
        ))}

        <div className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg cursor-pointer transition">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <ChevronDown size={20} className="text-purple-600" />
          </div>
          <span className="font-medium text-sm text-gray-700">Voir plus</span>
        </div>
      </div>

      <div className="mt-4 border-t pt-4 text-xs text-gray-500">
        <p>Confidentialité · Conditions · Publicité · Cookies </p>
      </div>
    </aside>
  );
};