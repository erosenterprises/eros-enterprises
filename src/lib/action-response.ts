export type ActionFieldErrors<TField extends string = string> = Partial<
  Record<TField, string[]>
>;

export type ActionResponse<TData = undefined, TField extends string = string> =
  | {
      success: true;
      message: string;
      data: TData;
      errors: null;
    }
  | {
      success: false;
      message: string;
      data: null;
      errors: ActionFieldErrors<TField> | null;
    };

export function actionSuccess<TData>(
  message: string,
  data: TData,
): ActionResponse<TData> {
  return {
    success: true,
    message,
    data,
    errors: null,
  };
}

export function actionFailure<TField extends string = string>(
  message: string,
  errors: ActionFieldErrors<TField> | null = null,
): ActionResponse<never, TField> {
  return {
    success: false,
    message,
    data: null,
    errors,
  };
}
