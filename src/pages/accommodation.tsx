import React, { useState } from "react";
import AccommodationForm from "../components/form/accommodation";
import Button from "../components/button";

const Accommodation = () => {
    const [formVisible, setFormVisible] = useState<boolean>(false);

    return (
        <>
            <div className="h-16"></div>
            <div>
                <Button
                    onClick={() => {
                        setFormVisible(true);
                    }}>
                    Create Accommodation Request
                </Button>
                {formVisible && <AccommodationForm />}
            </div>
        </>
    );
};

export default Accommodation;
