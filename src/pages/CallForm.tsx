import { useForm } from "react-hook-form";
import type { CallFormInputs } from "../interfaces/callForm";
import {
  createCallFailure,
  createCallStart,
  createCallSuccess,
  resetCall,
  togglePopup,
} from "../store/slices/callForm";
import { useDispatch, useSelector } from "react-redux";
import {
  // checkCallStatus,
  initiateCall,
  getContacts,
  getAllPrompt,
} from "../api/Call";
import type { RootState } from "../store/store";
import { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { IoCall } from "react-icons/io5";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

import UploadCsv from "./UploadCsv";

function CallForm() {
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<CallFormInputs>({
    defaultValues: {
      caller_name: user?.username || "",
      caller_email: user?.email || "",
      caller_number: "",
      phone_numbers: [],
      objective: "",
      context: "",
      system_prompt: "",
      language: user?.language || "en",
      voice: "",
    },
  });

  const dispatch = useDispatch();

  const token = useSelector(
    (state: RootState) => state.auth.user?.access_token
  );

  const { openPopup, transcript } = useSelector(
    (state: RootState) => state.call
  );

  console.log(transcript, "call id");
  // const navigate = useNavigate();

  const onSubmit = async (values: CallFormInputs) => {
    try {
      dispatch(resetCall());
      dispatch(createCallStart());
      if (!token) throw new Error("No token found. Please login again.");

      const res = await initiateCall(values, token);
      dispatch(createCallSuccess(res));
      reset();

      localStorage.setItem("lastCallId", res.call_id);
      localStorage.setItem("callerEmail", values.caller_email);
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Oops an error occurred");
      dispatch(createCallFailure(error.message));
    }
  };

  // Input tel: Name or phone search in api
  const [contacts, setContacts] = useState<
    { firstName: string; phoneNumber: string }[]
  >([]);
  const [filteredContacts, setFilteredContacts] = useState<typeof contacts>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        if (!token) return;
        const response = await getContacts(token); // ye ab filtered array return karega
        setContacts(response); // full array
        setFilteredContacts(response); // dropdown filter
      } catch (err) {
        console.error("Failed to fetch contacts", err);
        toast.error("Failed to load contacts");
      }
    };

    fetchContacts();
  }, [token]);

  // Number Input || Select multiple number
  const [selectedNumbers, setSelectedNumbers] = useState<string[]>([]);
  const [typedValue, setTypedValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleRemoveNumber = (num: string) => {
    const updated = selectedNumbers.filter((n) => n !== num);
    setSelectedNumbers(updated);

    setValue("phone_numbers", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  let newNum = typedValue.trim();

  // Auto add "+"
  if (!newNum.startsWith("+")) {
    newNum = "+" + newNum;
  }


  // Auto select all numbers coming from dropdown
  useEffect(() => {
    if (filteredContacts.length > 0) {
      const allNumbers = filteredContacts.map((c) =>
        c.phoneNumber.startsWith("+") ? c.phoneNumber : "+" + c.phoneNumber
      );

      setSelectedNumbers(allNumbers);
      setValue("phone_numbers", allNumbers);
    }
  }, [filteredContacts]);



  // useEffect(() => {
  //   const saved = localStorage.getItem("uploadedContacts");
  //   if (saved) {
  //     const parsed = JSON.parse(saved);

  //     // CSV response -> [{ firstName, phoneNumber }]
  //     const csvNumbers = parsed.map((item: any) =>
  //       item.phoneNumber.startsWith("+")
  //         ? item.phoneNumber
  //         : "+" + item.phoneNumber
  //     );

  //     setSelectedNumbers(csvNumbers);
  //     setValue("phone_numbers", csvNumbers);
  //   }
  // }, []);





  // // =============================
  // // AUTO LOAD CSV CONTACTS
  // // =============================
  // useEffect(() => {
  //   const uploaded = localStorage.getItem("uploadedContacts");
  //   if (!uploaded) return;

  //   try {
  //     const parsed = JSON.parse(uploaded);

  //     // Parsed contacts array
  //     const contactsFromCsv = parsed.contacts || [];

  //     // Auto select all phone numbers
  //     const autoNumbers = contactsFromCsv
  //       .map((c: any) => c.phone_number?.trim())
  //       .filter(Boolean)
  //       .map((num: string) => (num.startsWith("+") ? num : "+" + num));

  //     // Set dropdown contacts
  //     setContacts(contactsFromCsv);
  //     setFilteredContacts(contactsFromCsv);

  //     // Set tags for input
  //     setSelectedNumbers(autoNumbers);
  //     setValue("phone_numbers", autoNumbers);

  //   } catch (e) {
  //     console.error("Invalid CSV data", e);
  //   }
  // }, []);




  // Call Context Dropdown || show all prompt_name

  const [prompts, setPrompts] = useState<any[]>([]);
  const [typedContext, setTypedContext] = useState("");
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);

  useEffect(() => {
    async function fetchPrompts() {
      try {
        if (!token) return;
        const response = await getAllPrompt(token);
        // setPrompts(response);
        setPrompts(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error loading prompts", err);
        setPrompts([]);
      }
    }
    fetchPrompts();
  }, [token]);




  // Optional: close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const input = document.querySelector<HTMLInputElement>(
        'input[name="context"]'
      );
      if (
        !input?.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(".dropdown")
      ) {
        setShowPromptDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (openPopup) {
      const timer = setTimeout(() => {
        dispatch(togglePopup(false));

        // Reset phone number tags
        setSelectedNumbers([]);
        setTypedValue("");

        // RESET EXCEPT name, email, language
        reset(
          {
            caller_name: user?.username || "",
            caller_email: user?.email || "",
            language: user?.language || "en",
            caller_number: "",
            phone_numbers: [],
            objective: "",
            context: "",
            system_prompt: "",
            voice: "",
          },
          { keepDefaultValues: false }
        );
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [openPopup]);

  return (
    <>
      <div className="max-w-3xl mx-auto p-8 mt-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10 text-[#13243C]">
          Let AI Handle Your Next Call
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
            <div>
              <label className="block text-sm font-semibold text-[#13243C] mb-1">
                Your Name
              </label>
              <input
                type="text"
                {...register("caller_name", { required: "Name is required" })}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900 hover:border-blue-900
 ${errors.caller_name ? "border-red-500" : "border-gray-300"}`}
                placeholder="Your Name"
              />
              {errors.caller_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.caller_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#13243C] mb-1">
                Your Email
              </label>
              <input
                type="email"
                {...register("caller_email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
                className={`w-full px-4 hover:border-blue-900
 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900  ${errors.caller_email ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="name@example.com"
              />
              {errors.caller_email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.caller_email.message}
                </p>
              )}
            </div>
          </div>

          {/* Upload csv file  */}
          <UploadCsv />

          {/* Phone Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-semibold text-[#13243C] mb-1">
                Phone Number
              </label>

              <div
                className={`flex flex-wrap items-center gap-1 w-full min-h-[42px] px-2 py-1 border rounded-md 
      ${errors.phone_numbers ? "border-red-500" : "border-gray-300"}
      hover:border-blue-900 focus-within:ring-1 focus-within:ring-blue-900`}
                onClick={() => inputRef.current?.focus()}
              >
                {/* TAGS */}
                {selectedNumbers.map((num, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {num}
                    <button
                      type="button"
                      onClick={() => handleRemoveNumber(num)}
                      className="font-bold cursor-pointer"
                    >
                      &times;
                    </button>
                  </span>
                ))}

                {/* INPUT FIELD */}
                <input
                  ref={inputRef}
                  type="text"
                  // disabled={selectedNumbers.length >= 15}
                  // value={typedValue}
                  value={typedValue}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setTypedValue(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === "," || e.key === " ") {
                      e.preventDefault();

                      let newNum = typedValue.trim();
                      if (!newNum) return;

                      // STEP 1: Auto add "+"
                      if (!newNum.startsWith("+")) {
                        newNum = "+" + newNum;
                      }

                      // STEP 2: Duplicate check
                      if (selectedNumbers.includes(newNum)) {
                        toast.error("Number already selected");
                        setTypedValue("");
                        return;
                      }

                      // STEP 4: Add to tags
                      const updated = [...selectedNumbers, newNum];
                      setSelectedNumbers(updated);
                      setValue("phone_numbers", updated);

                      // Clear typed input
                      setTypedValue("");
                    }
                  }}
                  className="flex-1 outline-none py-1"
                  placeholder="+1234567890"
                />
              </div>

              {/* DROPDOWN */}
              {showDropdown && filteredContacts.length > 0 && (
                <ul className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {filteredContacts.map((c, idx) => (
                    <li
                      key={idx}
                      onClick={() => {
                        let number = c.phoneNumber;
                        if (!number.startsWith("+")) {
                          number = "+" + number;
                        }

                        if (selectedNumbers.includes(number)) {
                          toast.error("Number already selected");
                          return;
                        }

                        const updated = [...selectedNumbers, number];
                        setSelectedNumbers(updated);
                        setValue("phone_numbers", updated);
                        setTypedValue("");
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                    >
                      <span className="font-medium">{c.firstName}</span> -{" "}
                      {c.phoneNumber}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Agent Name (New Field) */}
          <div>
            <label className="block text-sm font-semibold text-[#13243C] mb-1">
              Agent Name
            </label>
            <select
              {...register("voice", { required: "Agent name is required" })}
              className={`w-full px-4 py-2 border rounded-md hover:border-blue-900 focus:outline-none focus:ring-1 focus:ring-blue-900 ${errors.voice ? "border-red-500" : "border-gray-300"
                }`}
            >
              <option value="">Select Agent</option>
              <option value="george">George - english (Male)</option>
              <option value="julian">Julian - english (Male)</option>
              <option value="edward">Edward - english (Male)</option>
              <option value="marcus">Marcus - english (Male)</option>
              <option value="james">James - english (Male)</option>
              <option value="meera">Meera - english (Female)</option>
              <option value="shelby">Shelby - english (Female)</option>
              <option value="blondie">Blondie - english (Female)</option>
              <option value="samarax">Samara X - english (Female)</option>
              <option value="verity">Verity - english (Female)</option>

            </select>
            {errors.voice && (
              <p className="text-red-500 text-xs mt-1">
                {errors.voice.message}
              </p>
            )}
          </div>

          {/* Call Context Input */}
          <div className="relative w-full">
            <label className="block text-sm font-semibold text-[#13243C] mb-1">
              Call Context
            </label>

            <input
              {...register("context", { required: "Context is required" })}
              value={typedContext} // controlled input
              onChange={(e) => {
                setTypedContext(e.target.value);
                setValue("context", e.target.value); // update RHF
                setShowPromptDropdown(true);
              }}
              onFocus={() => setShowPromptDropdown(true)}
              className={`w-full px-4 py-2 border rounded-md hover:border-blue-900
              focus:outline-none focus:ring-1 focus:ring-blue-900 
              ${errors.context ? "border-red-500" : "border-gray-300"}`}
            />

            {errors.context && (
              <p className="text-red-500 text-xs mt-1">
                {errors.context.message}
              </p>
            )}

            {showPromptDropdown && prompts.length > 0 && (
              <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-md dropdown">
                {prompts
                  .filter((p) =>
                    p.prompt_name
                      .toLowerCase()
                      .includes(typedContext.toLowerCase())
                  )
                  .map((prompt) => (
                    <div
                      key={prompt.id}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setTypedContext(prompt.prompt_name);
                        setValue("context", prompt.prompt_name);
                        setValue("system_prompt", prompt.system_prompt);
                        setShowPromptDropdown(false);
                      }}
                    >
                      {prompt.prompt_name}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Language */}
          <div>
            <label className="block text-sm font-semibold text-[#13243C] mb-1">
              Language
            </label>
            <select
              {...register("language")}
              className="w-full px-4 py-2 border border-gray-300 hover:border-blue-900 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-900"
            >
              <option value="en">English</option>
              {/* <option value="es">Spanish</option> */}
            </select>
          </div>

          {/* Submit */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#13243C] text-lg hover:opacity-90 font-semibold w-full cursor-pointer text-white rounded-md focus:outline-none focus:ring-1 focus:ring-blue-blue-900 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed in_hover"
            >
              {isSubmitting ? "Initiating Call..." : "Initiate Call"}
            </button>
          </div>
        </form>
      </div>
      {/* ==== Popup ==== */}

      {openPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => dispatch(togglePopup(false))}
        >
          {" "}
          <div
            className="bg-white rounded-lg shadow-lg w-[95%] sm:w-[75%] md:w-[50%] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {" "}
            <h2 className="text-3xl text-[#13243C] text-center font-bold mb-4 p-5">
              Call Initiated
            </h2>{" "}
            {/* <div className="flex flex-wrap items-center mb-4 px-6">
              {" "}
              <span className="font-medium">Call ID:</span>{" "}
              <span className="md:px-3 md:mx-5 py-1 text-gray-700 rounded-lg">
                {" "}
                {callId}{" "}
              </span>{" "}
            </div>{" "} */}
            <div className="rounded-lg">
              {" "}
              {/* Caller Section */}{" "}
              <div className="flex flex-col items-center justify-center py-5">
                {" "}
                {/* Animated Circle */}{" "}
                <div className="relative mb-8">
                  {" "}
                  {/* Outer Animated Pulse */}{" "}
                  <span className="absolute inset-0 rounded-full bg-[#13243C] opacity-60 animate-ping"></span>{" "}
                  {/* Inner Static Circle */}{" "}
                  <div className="w-20 h-20 rounded-full bg-[#13243C] flex items-center justify-center shadow-md relative overflow-hidden">
                    {" "}
                    <IoCall color="white" size={30} />{" "}
                  </div>{" "}
                </div>{" "}
                {/* Status Below */}{" "}
                {/* <p className="mt-6 text-lg font-medium text-[#13243C] animate-pulse">
                  {" "}
                  {status ?? "Connecting..."}{" "}
                </p>{" "} */}
              </div>{" "}
            </div>{" "}
            {/* <div className="p-6 max-h-96 overflow-y-auto border-t border-blue-200 bg-blue-50 "> */}{" "}
            <div className="text-gray-700 leading-relaxed"> </div>{" "}
            <div className="p-6 border-t border-[#d1d5dc] flex justify-center">
              {" "}
              {/* <button
                onClick={() => callId && handlePoll(callId)}
                className="w-full cursor-pointer sm:w-auto px-2 sm:px-6 py-2 bg-[#13243C] text-white rounded-lg hover:opacity-90 transform transition-all duration-200 font-medium text-base font-semibold shadow-lg"
              >
                {" "}
                Check Status Now{" "}
              </button>{" "} */}
              <button
                onClick={() => dispatch(togglePopup(false))}
                className="ml-4 px-6 py-2 bg-white border border-[#13243C] text-[#13243C] text-base font-semibold rounded-lg cursor-pointer"
              >
                {" "}
                Close{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </>
  );
}

export default CallForm;
