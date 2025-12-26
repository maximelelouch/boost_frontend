import React from "react";
import { CreatePost } from "@/features/post_connexion/Accueils/components/CreatePost";
import { StoryReel } from "@/features/post_connexion/Accueils/components/StoryReel";
import { SuggestionList } from "@/features/post_connexion/Accueils/components/SuggestionList";
// 1. IMPORT DU COMPOSANT
import { RightSidebar } from "@/features/navigation"; 

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900 font-sans">
      
      {/* 2. CONTENEUR FLEX : 
         'flex' met les éléments côte à côte.
         'justify-center' centre le tout horizontalement.
         'pt-14' laisse la place pour le Header fixe.
      */}
      <div className="flex justify-center pt-14">

        {/* (Optionnel) Sidebar Gauche irait ici */}
        {/* <div className="w-[300px] hidden xl:block relative"><LeftSidebar /></div> */}

        {/* --- COLONNE CENTRALE (Feed) --- */}
        <main className="flex-1 max-w-[700px] p-4 min-h-screen">
          <div className="mx-auto max-w-[590px]">
            {/* Si tu as le nouveau FeedActions (Bouton + et Créer page), utilise-le ici à la place de CreatePost/StoryReel selon ton choix */}
            <CreatePost /> 
            <StoryReel />
            <SuggestionList />
            
            {/* Exemple d'un post simple */}
            {/* <PostFeed /> */}
          </div>
        </main>

        {/* --- 3. COLONNE DE DROITE (RightSidebar) --- */}
        {/* 'hidden xl:block' : Caché sur mobile/tablette, visible sur grand écran.
            'w-[300px]' : Réserve l'espace pour ne pas que le feed soit caché par la sidebar fixe.
            'relative' : Sert de repère pour le positionnement.
        */}
        
        
      </div>

    </div>
  );
}