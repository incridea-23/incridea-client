import { FormEventHandler, FunctionComponent, useState } from "react";

type AccommodationFormProps = {
    setWhichForm: (
        whichForm: "signIn" | "resetPassword" | "signUp" | "resendEmail"
    ) => void;
};

// HACK: add logic and queries
const AccommodationForm: FunctionComponent<AccommodationFormProps> = ({
    setWhichForm,
}) => {
    const [error, setError] = useState<string | null>("");

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        setError(null);
    };

    return <form className="" onSubmit={handleSubmit}></form>;
};

export default AccommodationForm;
