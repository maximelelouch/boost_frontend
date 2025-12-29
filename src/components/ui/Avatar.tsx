import React from "react";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Avatar = ({ src, alt = "User", size = "md" }: AvatarProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-40 h-40", // Pour les suggestions
  };

  // Vérifier si c'est une URL SVG (comme celle de DiceBear)
  const isSvg = src?.includes('.svg') || (!src && alt);
  
  if (isSvg) {
    const avatarUrl = src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(alt)}`;
    return (
      <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}>
        {/* Utilisation d'une balise img standard pour les SVG */}
        <img 
          src={avatarUrl}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  // Pour les autres types d'images, utiliser le composant Image de Next.js
  return (
    <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}>
      {src && (
        <Image 
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes={`${sizeClasses[size].split(' ')[0]}`}
        />
      )}
    </div>
  );
};