import { useState } from "react";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import StrengthChecker from "./components/strengthChecker";
import Button from "./components/Button";
import CheckBox from "./components/CheckBox";

function App() {
    const [charLength, setCharLength] = useState(4);
    const [checkBoxData, setCheckBoxData] = useState([
        { title: "Include uppercase Letters", state: false },
        { title: "Include Lowercase Letters", state: false },
        { title: "Include Numbers", state: false },
        { title: "Include Symbols", state: false },
    ]);
    const [copy, setCopy] = useState(false);

    const handleCheckBoxChange = (index) => {
        const updateCheckBoxData = [...checkBoxData];
        updateCheckBoxData[index].state = !updateCheckBoxData[index].state;
        setCheckBoxData(updateCheckBoxData);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(password);
        setCopy(true);
        setTimeout(() => {
            setCopy(false);
        }, 1000);
    };

    const { password, errorMsg, generatePassword } = usePasswordGenerator();

    return (
        <div className="flex justify-center bg-blue-50 h-screen items-center bg-gray-400">
            <div className="bg-black text-white p-6 min-w-[700px]">
                {password && (
                    <div className="flex justify-between font-bold pb-6">
                        <div className="text-xl">{password}</div>
                        <Button
                            text={copy ? "Copied" : "Copy"}
                            onClick={handleCopy}
                            customClass={
                                "p-2 rounded-md border-none bg-green-600 uppercase font-medium cursor-pointer text-xs"
                            }
                        />
                    </div>
                )}
                <div className="flex flex-col text-xl pb-6 font-medium">
                    <span className="w-full flex justify-between pb-6">
                        <label htmlFor="">Character Length</label>
                        <label htmlFor="">{charLength}</label>
                    </span>
                    <input
                        type="range"
                        min={4}
                        max={20}
                        onChange={(e) => setCharLength(e.target.value)}
                        value={charLength}
                    />
                </div>
                <div className="grid grid-cols-2 font-bold text-base">
                    {checkBoxData.map((checkbox, index) => {
                        return (
                            <CheckBox
                                key={index}
                                onChange={() => handleCheckBoxChange(index)}
                                state={checkbox.state}
                                title={checkbox.title}
                            />
                        );
                    })}
                </div>
                <StrengthChecker password={password} />
                {errorMsg && (
                    <div className="text-red-500 text-center pb-2">
                        {errorMsg}
                    </div>
                )}
                <Button
                    text="Generate Password"
                    onClick={() => generatePassword(checkBoxData, charLength)}
                    customClass={
                        "rounded-md border-none bg-green-600 uppercase font-medium cursor-pointer text-xl p-5 w-full"
                    }
                />
            </div>
        </div>
    );
}

export default App;
