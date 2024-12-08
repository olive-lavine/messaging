import { useForm as useMantineForm, zodResolver } from '@mantine/form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { ZodSchema } from 'zod';

export type FormAction<Values extends Record<string, any>> = (
  input: Values
) => Promise<
  | {
      message: string;
    }
  | undefined
>;

export function useForm<Values extends Record<string, any>>(args: {
  schema: ZodSchema<Values>;
  action: FormAction<Values>;
  options?: {
    initialValues?: typeof args.schema._input;
    /** If set, automatically calls `router.back()` after success. */
    routerBackAfter?: boolean;
    /** If set, redirects to path after success. */
    routerPushAfter?: string;
    callbackAfter?: () => void;
  };
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const form = useMantineForm<Values>({
    validate: zodResolver(args.schema),
    initialValues: args.options?.initialValues,
    validateInputOnChange: true,
  });

  const onSubmit = form.onSubmit(async (values) => {
    setIsLoading(true);

    const res = await args.action(values);

    if (res?.message) {
      setIsLoading(false);
      setErrorMessage(res.message);
      return;
    }

    if (args.options?.routerBackAfter === true) {
      router.back();
      return;
    }

    if (args.options?.routerPushAfter) {
      router.push(args.options.routerPushAfter);
      return;
    }

    if (args.options?.callbackAfter) {
      args.options.callbackAfter();
    }

    form.reset();
    setErrorMessage('');
    setIsLoading(false);
    return;
  });

  return {
    mantineForm: form,
    onSubmit,
    isLoading,
    errorMessage,
  };
}
