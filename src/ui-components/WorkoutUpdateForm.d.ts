/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type WorkoutUpdateFormInputValues = {
    workout_name?: string;
    feel?: string;
};
export declare type WorkoutUpdateFormValidationValues = {
    workout_name?: ValidationFunction<string>;
    feel?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type WorkoutUpdateFormOverridesProps = {
    WorkoutUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    workout_name?: PrimitiveOverrideProps<TextFieldProps>;
    feel?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type WorkoutUpdateFormProps = React.PropsWithChildren<{
    overrides?: WorkoutUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    workout?: any;
    onSubmit?: (fields: WorkoutUpdateFormInputValues) => WorkoutUpdateFormInputValues;
    onSuccess?: (fields: WorkoutUpdateFormInputValues) => void;
    onError?: (fields: WorkoutUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: WorkoutUpdateFormInputValues) => WorkoutUpdateFormInputValues;
    onValidate?: WorkoutUpdateFormValidationValues;
} & React.CSSProperties>;
export default function WorkoutUpdateForm(props: WorkoutUpdateFormProps): React.ReactElement;
