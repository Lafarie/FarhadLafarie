import type { ReactNode } from "react";

function CV(): ReactNode {
  return (
    <section className="flex justify-center items-center mt-14 h-screen">
      <iframe
        className="w-full h-full max-w-4xl max-h-[75vh] md:max-w-3xl md:max-h-[70vh] sm:max-w-full sm:max-h-[60vh] rounded-lg shadow-lg hidden sm:block"
        src="/FarhadLafarieCV.pdf"
        style={{ aspectRatio: "4 / 3" }}
        width="100%"
        height="100%"
        title="Farhad Lafarie CV"
      ></iframe>
      <div className="block sm:hidden text-center">
        <p>Cannot display the PDF due to limitations on mobile devices.</p>
      </div>
    </section>
  );
}

export default CV;
