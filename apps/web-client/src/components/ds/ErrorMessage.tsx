interface Props {
  errors?: Array<{ message: string } | undefined>;
}

export default function ErrorMessage({ errors }: Props) {
  if (!errors?.length) return;

  return (
    <small className="block text-xs md:text-[13px] text-destructive">
      {errors[0]?.message}
    </small>
  );
}
