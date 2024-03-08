import {
	Button,
	Flex,
	FlexItem,
	Form,
	FormGroup,
	FormHelperText,
	FormSelect,
	FormSelectOption,
	HelperText,
	HelperTextItem,
	Popover,
	TextInput,
} from "@patternfly/react-core";
import { ReactNode, useEffect, useState } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import { Attribute, ATTRIBUTES } from "../api/rekor_api";
import { ExclamationCircleIcon, HelpIcon } from "@patternfly/react-icons";
import styles from "@patternfly/react-styles/css/components/Form/form";

export interface FormProps {
	defaultValues?: FormInputs;
	isLoading: boolean;
	onSubmit: (query: FormInputs) => void;
}

export interface FormInputs {
	attribute: Attribute;
	value: string;
}

type Rules = Omit<
	RegisterOptions,
	"valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
>;

interface InputConfig {
	name: string;
	helperText?: ReactNode;
	rules: Rules;
	tooltipText?: ReactNode;
}

const inputConfigByAttribute: Record<FormInputs["attribute"], InputConfig> = {
	email: {
		name: "Email",
		rules: {
			pattern: {
				value: /\S+@\S+\.\S+/,
				message: "Entered value does not match the email format: 'S+@S+.S+'",
			},
		},
		tooltipText: <>Search by the signer&apos;s email address.</>,
	},
	hash: {
		name: "Hash",
		rules: {
			pattern: {
				value: /^(sha256:)?[0-9a-fA-F]{64}$|^(sha1:)?[0-9a-fA-F]{40}$/,
				message:
					"Entered value does not match the hash format: '^(sha256:)?[0-9a-fA-F]{64}$|^(sha1:)?[0-9a-fA-F]{40}$'",
			},
		},
		tooltipText: <>Search by the SHA1 or SHA2 hash value.</>,
	},
	commitSha: {
		name: "Commit SHA",
		helperText: (
			<>
				Only compatible with{" "}
				<a
					href="https://github.com/sigstore/gitsign"
					target="_blank"
					rel="noopener noreferrer"
					style={{
						textDecoration: "underline",
					}}
				>
					sigstore/gitsign
				</a>{" "}
				entries
			</>
		),
		rules: {
			pattern: {
				value: /^[0-9a-fA-F]{40}$/,
				message:
					"Entered value does not match the commit SHA format: '^[0-9a-fA-F]{40}$'",
			},
		},
		tooltipText: <>Search by the commit hash.</>,
	},
	uuid: {
		name: "Entry UUID",
		helperText: <>Search by the universally unique identifier value.</>,
		rules: {
			pattern: {
				value: /^[0-9a-fA-F]{64}|[0-9a-fA-F]{80}$/,
				message:
					"Entered value does not match the entry UUID format: '^[0-9a-fA-F]{64}|[0-9a-fA-F]{80}$'",
			},
		},
		tooltipText: <>Search by the universally unique identifier value.</>,
	},
	logIndex: {
		name: "Log Index",
		helperText: <>Search by the log index number.</>,
		rules: {
			min: {
				value: 0,
				message: "Entered value must be larger than 0",
			},
			pattern: {
				value: /^\d+$/,
				message: "Entered value must be of type int64",
			},
		},
		tooltipText: <>Search by the log index number.</>,
	},
};

export function SearchForm({ defaultValues, onSubmit, isLoading }: FormProps) {
	const { handleSubmit, control, watch, setValue, trigger } =
		useForm<FormInputs>({
			mode: "all",
			reValidateMode: "onChange",
			defaultValues: {
				attribute: "email",
				value: "",
			},
		});

	useEffect(() => {
		if (defaultValues) {
			setValue("attribute", defaultValues.attribute);
			setValue("value", defaultValues.value);
		}
	}, [defaultValues, setValue]);

	const watchAttribute = watch("attribute");

	useEffect(() => {
		if (control.getFieldState("attribute").isTouched) {
			trigger();
		}
	}, [watchAttribute, trigger, control]);

	const rules = Object.assign(
		{
			required: {
				value: true,
				message: "A value is required",
			},
			pattern: undefined,
			min: undefined,
		},
		inputConfigByAttribute[watchAttribute].rules,
	);

	return (
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Flex>
				<Flex
					direction={{ default: "column" }}
					flex={{ default: "flex_3" }}
				>
					<FlexItem>
						<Controller
							name="attribute"
							control={control}
							render={({ field }) => (
								<FormGroup
									label={"Attribute"}
									fieldId={"rekor-search-attribute"}
									labelIcon={
										<Popover
											bodyContent={
												inputConfigByAttribute[watchAttribute].tooltipText
											}
											position={"right"}
										>
											<button
												type="button"
												aria-label="More info for attribute field"
												onClick={e => e.preventDefault()}
												aria-describedby="attribute-info"
												className={styles.formGroupLabelHelp}
											>
												<HelpIcon />
											</button>
										</Popover>
									}
								>
									<FormSelect
										id="rekor-search-attribute"
										{...field}
										label="Attribute"
									>
										{ATTRIBUTES.map(attribute => (
											<FormSelectOption
												label={inputConfigByAttribute[attribute].name}
												key={attribute}
												value={attribute}
											/>
										))}
									</FormSelect>
								</FormGroup>
							)}
						/>
					</FlexItem>
				</Flex>
				<Flex
					direction={{ default: "column" }}
					flex={{ default: "flex_3" }}
				>
					<FlexItem>
						<Controller
							name="value"
							control={control}
							rules={rules}
							render={({ field, fieldState }) => (
								<FormGroup
									label={inputConfigByAttribute[watchAttribute].name}
									fieldId={`rekor-search-${inputConfigByAttribute[
										watchAttribute
									].name.toLowerCase()}`}
								>
									<TextInput
										aria-label={`${inputConfigByAttribute[watchAttribute].name} input field`}
										{...field}
										id={`rekor-search-${inputConfigByAttribute[
											watchAttribute
										].name.toLowerCase()}`}
										label={inputConfigByAttribute[watchAttribute].name}
										placeholder={inputConfigByAttribute[watchAttribute].name}
										type={
											inputConfigByAttribute[watchAttribute].name === "email"
												? "email"
												: "text"
										}
										validated={fieldState.invalid ? "error" : "default"}
									/>
									{fieldState.invalid && (
										<FormHelperText>
											<HelperText>
												<HelperTextItem
													icon={<ExclamationCircleIcon />}
													variant={fieldState.invalid ? "error" : "success"}
												>
													{fieldState.invalid
														? fieldState.error?.message
														: inputConfigByAttribute[watchAttribute].helperText}
												</HelperTextItem>
											</HelperText>
										</FormHelperText>
									)}
								</FormGroup>
							)}
						/>
					</FlexItem>
				</Flex>
				<Flex
					direction={{ default: "column" }}
					alignSelf={{ default: "alignSelfFlexEnd" }}
					flex={{ default: "flex_1" }}
				>
					<FlexItem>
						<Button
							variant="primary"
							id="search-form-button"
							isBlock={true}
							isLoading={isLoading}
							type="submit"
							spinnerAriaLabel={"Loading"}
							spinnerAriaLabelledBy={"search-form-button"}
						>
							Search
						</Button>
					</FlexItem>
				</Flex>
			</Flex>
		</Form>
	);
}
