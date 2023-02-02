import { FieldErrorsImpl } from "react-hook-form";

import { ErrorMessage } from "../Elements";

type SectionErrorMessageProps = {
  idx: number;
  errors: Partial<
    FieldErrorsImpl<{
      sections: {
        title: string;
        ingredients: {
          unit: string;
          amount: number;
          name: string;
        }[];
        directions: {
          direction: string;
        }[];
      }[];
    }>
  >;
};

const SectionErrorMessage = ({ errors, idx }: SectionErrorMessageProps) => {
  const section =
    errors.sections && errors.sections.at && errors.sections.at(idx);

  return (
    <div>
      {section &&
        section.ingredients &&
        section.ingredients.map &&
        section?.ingredients.map &&
        section?.ingredients.map((ing, ingIdx) => (
          <div key={ingIdx}>
            <ErrorMessage error={ing?.amount?.message} />
            <ErrorMessage error={ing?.unit?.message} />
            <ErrorMessage error={ing?.name?.message} />
          </div>
        ))}
    </div>
  );
};

export default SectionErrorMessage;
