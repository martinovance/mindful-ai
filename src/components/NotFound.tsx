import { Button } from "@/components/ui/button";
import MindLogo from "@/assets/Images/MindLogo.webp";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center px-6 bg-background text-foreground">
      <div className="flex items-center gap-3">
        <img
          src={MindLogo}
          loading="lazy"
          alt="app-logo"
          className="h-10 w-10"
        />
        <p className="text-lg font-bold text-foreground">Mindful AI</p>
      </div>

      <h1 className="text-2xl md:text-3xl font-semibold text-center mb-2">
        Page Not Found
      </h1>
      <p className="text-sm md:text-base text-muted-foreground text-center max-w-md mb-6">
        We couldn't find page. Missing route or incorrect url.
      </p>

      <div className="flex gap-3">
        <Button
          onClick={() => (window.location.href = "/")}
          className="cursor-pointer bg-[#0D80F2]"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
