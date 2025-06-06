import {
  AddRegular,
  RadioButtonRegular,
  AlertRegular,
  ArrowRepeatAllRegular,
} from "@fluentui/react-icons";
import { useState } from "react";
import { TooltipIcon } from "./TooltipIcon";
import DatePicker from "./DatePicker";
import { useTodoContext } from "../context/TodoContext";

const TaskInput = () => {
  const { addTodo } = useTodoContext();

  const [isFocused, setIsFocused] = useState(false);
  const [inputClicked, setInputClicked] = useState(false);
  const [quickAddText, setQuickAddText] = useState("");

  const [selected, setSelected] = useState<Date | undefined>();

  const [remindActive, setRemindActive] = useState<boolean>(false);
  const [repeatActive, setRepeatActive] = useState<boolean>(false);

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (quickAddText.trim()) {
      addTodo(quickAddText.trim(), undefined, selected);
      setQuickAddText("");
    }
    setSelected(undefined);
  };

  return (
    <section className="w-full rounded-md shadow-md my-2">
      <form action="" className="w-full" onSubmit={handleQuickAdd}>
        <div className="flex items-center gap-2 bg-white p-4 py-2 shadow-sm">
          <div className="text-blue-600">
            {inputClicked ? (
              <RadioButtonRegular fontSize={20} />
            ) : (
              <AddRegular
                fontSize={20}
                onClick={() => {
                  const inputElement = document.querySelector(
                    "#quick-add-input[type='text']"
                  ) as HTMLInputElement;
                  inputElement?.focus();
                  setInputClicked(true);
                }}
                className="cursor-pointer"
                aria-label="Add task"
              />
            )}
          </div>

          <input
            type="text"
            value={quickAddText}
            onChange={(e) => setQuickAddText(e.target.value)}
            id="quick-add-input"
            className={`w-full h-8 px-4 py-2 rounded-md outline-none transition text-sm ${
              isFocused
                ? "placeholder:text-gray-400"
                : "placeholder:text-blue-600"
            }`}
            placeholder="Add a task"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onClick={() => setInputClicked(true)}
          />
        </div>
        {inputClicked && (
          <div className="flex items-center justify-between p-4 py-2">
            <div className="flex items-center gap-2">
              <DatePicker selected={selected} setSelected={setSelected} />
              <TooltipIcon
                icon={AlertRegular}
                tooltipText="Remind me"
                tipClassName="bottom-full"
                className={`cursor-pointer ${
                  remindActive ? "text-blue-600" : ""
                }`}
                onClick={() => setRemindActive((prev) => !prev)}
              />
              <TooltipIcon
                icon={ArrowRepeatAllRegular}
                tooltipText="Repeat"
                tipClassName="bottom-full"
                className={`cursor-pointer ${
                  repeatActive ? "text-blue-600" : ""
                }`}
                onClick={() => setRepeatActive((prev) => !prev)}
              />
            </div>
            <button
              type="submit"
              disabled={!quickAddText.trim()}
              className={`border p-1 text-sm text-blue-600 ${
                !quickAddText.trim() && "cursor-not-allowed text-gray-400"
              }`}
            >
              Add
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default TaskInput;
