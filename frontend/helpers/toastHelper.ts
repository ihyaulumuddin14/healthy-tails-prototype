import { toast } from 'sonner';

export function showErrorToast(message: string) {
   toast.dismiss();
   toast.error(message, { position: 'top-center', duration: 2000 });
}

export function showSuccessToast(message: string) {
   toast.dismiss();
   toast.success(message, { position: 'top-center', duration: 2000 });
}

export function showLoadingToast(message: string) {
   toast.dismiss();
   toast.loading(message, { position: 'top-center' });
}