import { getVisiblePixels } from "@/app/place/actions";
import PixelGrid from "@/components/place/PixelGrid";
import { getCurrentUser } from "@/lib/auth";

export default async function PlacePage() {
  const currentUser = await getCurrentUser();
  const pixels = await getVisiblePixels();

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-4 p-6">
      <div>
        <h1 className="text-3xl font-bold">Place</h1>
        <p className="text-muted-foreground">
          Klicke auf ein Pixel und waehle eine Farbe aus.
        </p>
      </div>

      <PixelGrid
        pixels={pixels}
        currentUserName={currentUser?.username ?? null}
      />
    </main>
  );
}
