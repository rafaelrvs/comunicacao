import { ElementType } from "react";
type FormInputTextProps = Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    icon?: ElementType;
    label?: string;
    inputId?: string;
  
  };

export default function FormInputText({
  icon: Icon,
  inputId,
  label,

  ...props
}: FormInputTextProps) {
  return (
    <div className={"flex flex-col gap-1 w-full"}>
      {label && (
        <label
          htmlFor={props.id as string}
          className="text-primary-900 font-semibold dark:text-gray-400"
        >
          {label}
        </label>
      )}
      <div
        className={
          "focus-within:border-primary-600 hover:border-primary-600 shadow-primary-300/40 flex items-center justify-center gap-2 rounded-[12px] border-2 border-transparent bg-gray-400/35 pl-4 text-gray-50 transition-all outline-none focus-within:bg-gray-400/30 focus-within:shadow-[0px_0px_2px_2px] hover:bg-gray-400/30 hover:shadow-[0px_0px_2px_2px] active:scale-98 dark:bg-gray-400/20"
       
        }
      >
        {Icon && <Icon className="text-gray-700 dark:text-gray-700" />}
        <input
          type={props.type || "text"}
          id={inputId && inputId}
          className="flex w-full py-2 text-xl text-gray-600 outline-0 placeholder:text-xl placeholder:text-gray-600/50 dark:text-gray-700 dark:placeholder:text-gray-500"
          {...props}
        />
        
      </div>
    </div>
  );
}