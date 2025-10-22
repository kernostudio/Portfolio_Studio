"use client";

import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-4">
          <div className="max-w-lg w-full text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Critical Error
            </h1>
            <p className="text-gray-600 mb-6">
              A critical error has occurred in the application.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-6 rounded-lg transition-colors"
              >
                <Home className="w-5 h-5" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
