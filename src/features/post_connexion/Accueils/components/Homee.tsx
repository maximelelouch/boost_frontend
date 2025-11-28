import React from "react";
import { CreatePost } from "@/features/post_connexion/Accueils/components/CreatePost";
import { StoryReel } from "@/features/post_connexion/Accueils/components/StoryReel";
import { SuggestionList } from "@/features/post_connexion/Accueils/components/SuggestionList";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 font-sans">
      
      

        {/* Colonne Centrale (Feed) */}
        <main className="flex-1 max-w-[700px] p-4 min-h-screen">
          <div className="mx-auto max-w-[590px]">
            <CreatePost />
            <StoryReel />
            <SuggestionList />
            
            {/* Exemple d'un post simple */}
             {/* Tu peux ajouter ici <PostFeed /> plus tard */}
          </div>
        </main>
        
      </div>

  );
}

