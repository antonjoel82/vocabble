export interface KeyboardBaseProps {
  handleAddChar: (char: string) => void;
  handleSubmit: () => void;
  handleBackspace: () => void;
  canSubmit: boolean;
  canBackspace: boolean;
}
