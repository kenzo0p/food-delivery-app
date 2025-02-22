import { Loader2 } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center flex-col gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
      <div className="text-lg font-medium text-gray-900">
        Please wait while we verify your authentication...
      </div>
      <div className="text-sm text-gray-500">
        This may take a few moments
      </div>
    </div>
  );
};

export default LoadingScreen;