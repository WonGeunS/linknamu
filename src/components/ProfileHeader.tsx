type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl?: string;
};

const avatarClass =
  "h-28 w-28 rounded-full ring-4 ring-white/80 shadow-[0_12px_30px_-8px_rgba(160,90,50,0.35)]";

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={`${name} 프로필 사진`} className={`${avatarClass} object-cover`} />
      ) : (
        <div
          aria-label={`${name} 프로필 사진`}
          className={`${avatarClass} flex items-center justify-center bg-white/60 text-3xl font-semibold`}
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-6 text-xl font-bold tracking-tight">{name}</h1>
      <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-foreground/65">{bio}</p>
    </header>
  );
}
