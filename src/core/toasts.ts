import { toast } from '@zerodevx/svelte-toast';

export const toastMatchFound = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastBackground': 'green',
			'--toastColor': 'white',
			'--toastBarBackground': 'olive'
		}
	});

export const toastNoMatch = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastBackground': 'red',
			'--toastColor': 'white',
			'--toastBarBackground': 'olive'
		}
	});
