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
} from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import styles from "@patternfly/react-styles/css/components/Form/form";

export function Settings({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const [baseUrl, setBaseUrl] = useRekorBaseUrl();
	const [localBaseUrl, setLocalBaseUrl] = useState(baseUrl);

	const handleChangeBaseUrl = useCallback((e: FormEvent<HTMLInputElement>) => {
		if (e.currentTarget.value.length === 0) {
			setLocalBaseUrl(undefined);
		} else {
			setLocalBaseUrl(e.currentTarget.value);
		}
	}, []);

	const onSave = useCallback(() => {
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
						aria-label="override rekor endpoint"
					/>
				</FormGroup>
			</Form>
		</Modal>
	);
}
