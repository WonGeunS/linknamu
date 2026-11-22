type ProfileHeaderProps = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          className="h-36 w-36 rounded-full border-2 border-foreground/80 object-cover"
        />
      ) : (
        <div
          aria-label={`${name} 프로필 사진`}
          className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-foreground/80 text-3xl font-semibold"
        >
          {name.charAt(0)}
        </div>
      )}
      <h1 className="mt-5 text-lg font-bold">{name}</h1>
      <p className="mt-3 text-sm text-foreground/70">{bio}</p>
    </header>
  );
}
