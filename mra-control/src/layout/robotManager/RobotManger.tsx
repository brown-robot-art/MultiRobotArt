import {
    faCheck,
    faPencil,
    faPlusCircle,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { IconButton } from "../../components/buttons/IconButton";
import { useRobartState } from "../../state/useRobartState";

export const RobotManager = () => {
    const robots = useRobartState((state) => state.robots);
    const createRobot = useRobartState((state) => state.createRobot);
    const updateRobot = useRobartState((state) => state.saveRobot);
    const [selectedRobotId, setSelectedRobotId] = useState<
        string | undefined
    >();
    const [showRename, setShowRename] = useState(false);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (
            selectedRobotId !== undefined &&
            robots[selectedRobotId].name === ""
        )
            updateRobot(selectedRobotId, { name: "Unnamed Robot" });
    }, [showRename]);

    return (
        <div className="flex h-full">
            <div className="flex flex-grow-0 basis-[10%] flex-col items-center gap-2 overflow-y-auto p-4">
                {Object.values(robots).map((robot) => (
                    <div
                        className="flex h-10 w-full cursor-pointer items-center justify-center rounded-lg border-2 px-2 text-center"
                        onClick={() => {
                            setShowRename(false);
                            setSelectedRobotId(robot.id);
                        }}
                    >
                        <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {robot.name}
                        </span>
                    </div>
                ))}
                <IconButton icon={faPlusCircle} text="" onClick={createRobot} />
            </div>
            <div className="flex basis-4/5">
                {selectedRobotId !== undefined ? (
                    <>
                        {showRename ? (
                            <div className="m-4 flex h-min w-full items-center gap-4 text-4xl font-extrabold">
                                <TextInput
                                    className="w-full"
                                    sizing="4xl"
                                    value={inputValue}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                />
                                <FontAwesomeIcon
                                    icon={faCheck}
                                    className="cursor-pointer text-xl text-green-500"
                                    onClick={() => {
                                        updateRobot(selectedRobotId, {
                                            name: inputValue,
                                        });
                                        setShowRename(false);
                                    }}
                                />
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className="cursor-pointer text-xl text-red-500"
                                    onClick={() => {
                                        setShowRename(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <h2
                                className="flex h-min w-fit items-center gap-4 rounded-md border-2 border-white p-2  text-4xl font-extrabold hover:border-black"
                                onClick={() => {
                                    setInputValue(robots[selectedRobotId].name);
                                    setShowRename(true);
                                }}
                            >
                                {robots[selectedRobotId].name}
                            </h2>
                        )}
                    </>
                ) : null}
            </div>
        </div>
    );
};
