import { toast } from 'react-hot-toast';

const createToast = (
  promise: Promise<any>,
  loadingText?: string,
  errorMessage?: string
) => {
  const errorText = loadingText?.toLowerCase().replace('...', '');
  return toast.promise(
    promise,
    {
      loading: loadingText || 'Loading...',
      success: 'All done!',
      error: errorMessage || `Error ${errorText} 🫤`,
    },
    {
      position: 'bottom-center',
    }
  );
};

export default createToast;
