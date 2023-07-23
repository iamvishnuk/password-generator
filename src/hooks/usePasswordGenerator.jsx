import { useState } from "react";

const usePasswordGenerator = () => {
    const [password, setPasswrod] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const generatePassword = (checkBoxData, length) => {
        let charSet = "";
        let generatedPassword = "";
        
        const selectedOption = checkBoxData.filter(
            (checkBox) => checkBox.state
        );

        if (selectedOption.length === 0) {
            setErrorMsg("Select at least on option.");
            setPasswrod("");
            return;
        }

        selectedOption.forEach((options) => {
            switch (options.title) {
                case "Include uppercase Letters":
                    charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                    break;
                case "Include Lowercase Letters":
                    charSet += "abcdefghijklmnopqrstuvwxyz";
                    break;
                case "Include Numbers":
                    charSet += "0123456789";
                    break;
                case "Include Symbols":
                    charSet += "!@#$%^&*()";
                    break;
                default:
                    break;
            }
        });

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charSet.length);
            generatedPassword += charSet[randomIndex];

        }

        setPasswrod(generatedPassword);
        setErrorMsg("");
    };
    return { password, errorMsg, generatePassword };
};

export default usePasswordGenerator;
