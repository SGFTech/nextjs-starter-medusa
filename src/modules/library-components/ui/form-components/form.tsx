
"use client"
import type {
    UseFormReturn,
    SubmitHandler,
    UseFormProps,
    Path,
    FieldValues
} from "react-hook-form";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import  { Schema  } from "yup";
type ServerErrors<T> = {
    [Property in keyof T]: string;
};
type FormProps<TFormValues extends FieldValues> = {
    onSubmit: SubmitHandler<TFormValues>;
    children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
    useFormProps?: UseFormProps<TFormValues>;
    validationSchema?: typeof Schema<TFormValues>;
    serverError?: ServerErrors<Partial<TFormValues>> | null;
    resetValues?: any | null;
    className?: string;
    [key: string]: unknown;
};

export const Form = <
    TFormValues extends Record<string, any> = Record<string, any>
>({
    onSubmit,
    children,
    useFormProps,
    validationSchema,
    serverError,
    resetValues,
    ...props
}: FormProps<TFormValues>) => {
    const methods = useForm<TFormValues>({
        ...(!!validationSchema && { resolver: yupResolver(validationSchema as any) }),
        ...(!!useFormProps && useFormProps)
    });
    useEffect(() => {
        if (serverError) {
            Object.entries(serverError).forEach(([key, value]) => {
                methods.setError(key as Path<TFormValues>, {
                    type: "manual",
                    message: value
                });
            });
        }
    }, [serverError, methods]);

    useEffect(() => {
        if (resetValues) {
            methods.reset(resetValues);
        }
    }, [resetValues, methods]);
    return (
        <form onSubmit={methods.handleSubmit(onSubmit)} noValidate {...props}>
            {children(methods)}
        </form>
    );
};
