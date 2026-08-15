import { ContentGuide } from "./ContentGuide";
import { BackButton } from "./BackButton";

export function GuidePage() {
  return (
    <main id="main-content" className="mx-auto max-w-6xl px-4 pb-12 pt-30 sm:px-6 lg:px-8" tabIndex={-1}>
      <div className="mb-5">
        <BackButton />
      </div>
      <ContentGuide />
    </main>
  );
}
