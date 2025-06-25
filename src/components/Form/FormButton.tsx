export type ButtonProps = React.ComponentProps<'button'> & {
text:string;

};

export default function FormButton({text, ...props}: ButtonProps) {
  return (
    <button {...props}>
      {text}
    </button>
  );
}