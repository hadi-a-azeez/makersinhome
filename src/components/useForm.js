import { useState } from "react";

export const useForm = (initialValue) => {
  const [values, setValues] = useState(initialValue);

  return [
    values,
    (newVal) => {
      console.log(newVal);
      setValues(newVal);
    },
    (e) => {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    },
  ];
};
