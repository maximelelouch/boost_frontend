import React from "react";
import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";

export const RightSidebar = () => {
  return (
    <aside className="fixed right-0 top-14 h-[calc(100vh-56px)] w-[300px] p-4 hidden xl:flex flex-col overflow-y-auto">
      <div className="flex items-center justify-between text-gray-500 mb-4">
        <h3 className="font-semibold text-gray-600">Discussions de groupe</h3>
      </div>

      <div className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg cursor-pointer text-gray-600 mb-4">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          <Plus size={18} />
        </div>
        <span className="text-sm font-medium">Créer une discussion</span>
      </div>
    </aside>
  );
};