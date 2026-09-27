import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function CameraCapture({ onCapture }) {
  const ref = useRef(null);
  const [shot, setShot] = useState(null);

  const capture = () => {
    const img = ref.current?.getScreenshot();

    if (img) {
      setShot(img);
      onCapture(img);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-lg">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Take a Selfie
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Position your face inside the camera frame
        </p>
      </div>

      {/* Camera / Preview */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 shadow-inner">
        {shot ? (
          <img
            src={shot}
            alt="Captured selfie"
            className="h-full w-full object-cover"
          />
        ) : (
          <Webcam
            ref={ref}
            audio={false}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            className="h-full w-full object-cover"
          />
        )}

        {/* Camera overlay */}
        {!shot && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-44 w-36 rounded-full border-2 border-white/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.15)]" />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          onClick={() => {
            setShot(null);
            onCapture(null);
          }}
          disabled={!shot}
          className="
            rounded-lg border border-gray-300
            bg-white px-4 py-2.5
            text-sm font-semibold text-gray-700
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Retake
        </button>

        <button
          onClick={capture}
          disabled={!!shot}
          className="
            rounded-lg bg-blue-600
            px-4 py-2.5
            text-sm font-semibold text-white
            shadow-sm transition
            hover:bg-blue-700
            active:scale-[0.98]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Capture Selfie
        </button>
      </div>

      {/* Status */}
      <div className="mt-4 text-center">
        {shot ? (
          <p className="text-sm font-medium text-green-600">
            ✓ Selfie captured successfully
          </p>
        ) : (
          <p className="text-xs text-gray-400">
            Camera access is required to capture your selfie
          </p>
        )}
      </div>
    </div>
  );
}