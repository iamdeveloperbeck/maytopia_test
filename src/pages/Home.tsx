import { Button } from "@/components/ui/button";
import useCheckUser from "@/hooks/useCheckUser";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Home() {
  const { type } = useParams<{ type: string }>();
  const { isLoading } = useCheckUser();

  useEffect(() => {
    const video = document.getElementById("myVideo") as HTMLVideoElement | null;
    const handler = () => {
      if (video && video.paused) {
        video.muted = false;
        video.play();
      }
    };

    window.addEventListener("click", handler, { once: true });

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <main className="p-4 min-h-screen bg-background">
      {/* Featured YouTube Video Section */}
      <section className="">
        <div className="max-w-4xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border">
            {/* <video
              id="myVideo"
              src="https://youtu.be/0VJbnTBWvcQ?si=5f0Ti4cpmmunE7th"
              controls
              autoPlay
            ></video> */}
            {type === "1" && (
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/0VJbnTBWvcQ?si=FvnDi1uoUbcmtGtU"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
            {type === "2" && (
              <iframe
                width="560"
                height="315"
                src="https://youtu.be/mYdtgSwjkbk?si=6i4_TWpFFLXrw1tC"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            )}
          </div>

          {/* Menu Button */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/menu" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary hover:bg-secondary text-primary-foreground font-bold py-3 px-8 text-lg rounded-lg transition-colors">
                Menyuni ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
