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

	const handleClose = useCallback(() => {
		setLocalBaseUrl(baseUrl);
		setShowValidation(false);
		onClose();
	}, [baseUrl, onClose]);

	const onSave = useCallback(() => {
		if (!validateUrl(localBaseUrl)) {
			setShowValidation(true);
			return;
		} else {
			setBaseUrl(localBaseUrl);
			setShowValidation(false);
		}

		onClose();
	}, [localBaseUrl, onClose, setBaseUrl]);

	return (
		<Modal
			variant={ModalVariant.small}
			title="Settings"
			isOpen={open}
			onClose={handleClose}
			data-testid="settings-modal"
			actions={[
				<Button
					key="confirm"
					variant="primary"
					onClick={onSave}
					data-testid={"settings-confirm-button"}
				>
					Confirm
				</Button>,
				<Button
					key="cancel"
					variant="link"
					onClick={handleClose}
					data-testid={"settings-close-button"}
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
								aria-label="More info for endpoint field"
								onClick={e => e.preventDefault()}
								aria-describedby="form-group-label-info"
								data-testid={"rekor-endpoint-help-button"}
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
						value={localBaseUrl ?? baseUrl}
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
						data-testid={"rekor-endpoint-override"}
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
