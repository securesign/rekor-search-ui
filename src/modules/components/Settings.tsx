import { FormEvent, useCallback, useState } from "react";
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
	ValidatedOptions,
} from "@patternfly/react-core";
import { ExclamationCircleIcon, HelpIcon } from "@patternfly/react-icons";
import styles from "@patternfly/react-styles/css/components/Form/form";
import { validateUrl } from "../utils/validateUrl";

export function Settings({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const [baseUrl, setBaseUrl] = useRekorBaseUrl();
	const [localBaseUrl, setLocalBaseUrl] = useState(baseUrl);
	const [showValidation, setShowValidation] = useState(false);

	const handleChangeBaseUrl = useCallback((e: FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length === 0) {
			setLocalBaseUrl(undefined);
		} else {
			setLocalBaseUrl(e.currentTarget.value);
		}
	}, []);

	const onSave = useCallback(() => {
		if (!validateUrl(localBaseUrl)) {
			console.log(!validateUrl(localBaseUrl));
			setShowValidation(true);
			return;
		} else {
			setShowValidation(false);
		}

		if (
			localBaseUrl === undefined &&
			process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN
		) {
			setLocalBaseUrl(process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN);
		}

		setBaseUrl(localBaseUrl);
		onClose();
	}, [localBaseUrl, setBaseUrl, onClose]);

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
					onClick={onSave}
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
			<Form id="settings-form">
				<FormGroup
					label="Override Rekor Endpoint"
					labelIcon={
						<Popover bodyContent={"Specify your private Rekor endpoint URL."}>
							<button
								type="button"
								aria-label="More info for name field"
								onClick={e => e.preventDefault()}
								aria-describedby="form-group-label-info"
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
						value={localBaseUrl ?? "https://rekor.sigstore.dev"}
						type="text"
						onChange={handleChangeBaseUrl}
						placeholder={
							baseUrl === undefined
								? "https://private.rekor.example.com"
								: baseUrl
						}
						label={"name"}
						aria-label="override rekor endpoint"
						id={"rekor-endpoint-override"}
						validated={showValidation ? ValidatedOptions.error : undefined}
						aria-invalid={showValidation}
						isRequired
					/>
					{showValidation && (
						<FormHelperText>
							<HelperText>
								<HelperTextItem
									icon={<ExclamationCircleIcon />}
									variant={"error"}
								>
									To continue, specify an endpoint in https://xxxx format
								</HelperTextItem>
							</HelperText>
						</FormHelperText>
					)}
				</FormGroup>
			</Form>
		</Modal>
	);
}
