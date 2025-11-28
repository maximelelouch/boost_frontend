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

  return (
    <div className={`${sizeClasses[size]} relative rounded-full overflow-hidden bg-gray-200 flex-shrink-0`}>
      {/* Utilisation d'une image placeholder si pas de src */}
      <Image 
        src={src || `https://api.dicebear.com/7.x/avataaars/svg?seed=${alt}`} 
        alt={alt} 
        fill 
        className="object-cover"
      />
    </div>
  );
};