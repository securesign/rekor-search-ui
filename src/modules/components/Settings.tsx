import { useRekorBaseUrl } from "../api/context";
import {
	Modal,
	ModalVariant,
	Button,
	TextInput,
	Form,
	FormGroup,
	Popover,
	HelperText,
	HelperTextItem,
	FormHelperText,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, HelpIcon } from "@patternfly/react-icons";
import styles from "@patternfly/react-styles/css/components/Form/form";
import { validateUrl } from "../utils/validateUrl";
import { Controller, useForm } from "react-hook-form";

export interface SettingsProps {
	onClose: () => void;
	open: boolean;
}

export function Settings({ open, onClose }: SettingsProps) {
	const [baseUrl, setBaseUrl] = useRekorBaseUrl();

	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
	} = useForm({
		mode: "all",
		reValidateMode: "onChange",
		defaultValues: {
			endpoint: baseUrl,
		},
	});

	const onSave = (data: any) => {
		setBaseUrl(data.currentTarget.value);
		onClose();
	};

	return (
		<Modal
			variant={ModalVariant.small}
			title="Settings"
			isOpen={open}
			onClose={onClose}
			actions={[
				<Button
					key="confirm"
					variant="primary"
					isDisabled={!isValid}
					onClick={onSave}
					type="submit"
				>
					Confirm
				</Button>,
				<Button
					key="cancel"
					variant="link"
					onClick={onClose}
				>
					Cancel
				</Button>,
			]}
		>
			<Form
				id="settings-form"
				onSubmit={handleSubmit(onSave)}
			>
				<Controller
					name="endpoint"
					control={control}
					rules={{
						required: {
							value: true,
							message: "To continue, specify an endpoint in xxxx format",
						},
						validate: (url: string | undefined) => {
							return (
								validateUrl(url) ||
								"To continue, provide a valid URL, starting with https://"
							);
						},
					}}
					render={({ field, fieldState }) => (
						<FormGroup
							label="Override Rekor Endpoint"
							labelIcon={
								<Popover
									bodyContent={"Specify your private Rekor endpoint URL."}
								>
									<button
										type="button"
										aria-label="Rekor endpoint URL"
										onClick={e => e.preventDefault()}
										aria-describedby="rekor-endpoint-url"
										className={styles.formGroupLabelHelp}
									>
										<HelpIcon />
									</button>
								</Popover>
							}
							isRequired
							fieldId="rekor-endpoint-override"
						>
							<TextInput
								type="text"
								{...field}
								aria-invalid={errors.endpoint ? "true" : "false"}
								placeholder={
									baseUrl === undefined
										? "https://private.rekor.example.com"
										: baseUrl
								}
								label={"name"}
								aria-label="override rekor endpoint"
								id={"rekor-endpoint-override"}
								validated={fieldState.invalid ? "error" : "default"}
							/>

							{fieldState.invalid && (
								<FormHelperText>
									<HelperText>
										<HelperTextItem
											icon={<ExclamationCircleIcon />}
											variant={"error"}
										>
											{fieldState.error?.message}
										</HelperTextItem>
									</HelperText>
								</FormHelperText>
							)}
						</FormGroup>
					)}
				/>
			</Form>
		</Modal>
	);
}
