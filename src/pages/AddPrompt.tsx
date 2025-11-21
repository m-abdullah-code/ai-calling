// import { useState } from "react";
// import { FiPlus, FiEdit2, FiCheck } from "react-icons/fi";
// import { updateSystemPrompt } from "../api/Call";

// const AddPrompt = () => {
//   const [prompt, setPrompt] = useState("");
//   const [savedPrompt, setSavedPrompt] = useState("");
//   const [isEditing, setIsEditing] = useState(false);

//   // const handleAddOrUpdate = () => {
//   //   if (!prompt.trim()) return;
//   //   setSavedPrompt(prompt.trim());
//   //   setPrompt("");
//   //   setIsEditing(false);
//   // };

//   const handleAddOrUpdate = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const data = { system_prompt: prompt };
//       const response = await updateSystemPrompt(data, token);
//       setSavedPrompt(prompt.trim());
//       console.log("Prompt updated successfully:", response);
//     } catch (error) {
//       console.error("Failed to update prompt:", error);
//     }
//   };

//   const handleEditPrompt = () => {
//     setPrompt(savedPrompt);
//     setIsEditing(true);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center px-4 py-10">
//       <div className="w-full max-w-2xl p-8">
//         {/* Header Section */}
//         <h1 className="text-4xl font-bold text-[#3F3EED] text-center mb-2">
//           Prompt Manager
//         </h1>
//         <p className="text-gray-600 text-center mb-8">
//           Add or edit your custom AI prompt below. You can only have one active
//           prompt at a time.
//         </p>

//         {/* Input Section */}
//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           rows={3}
//           placeholder="Type your prompt here..."
//           className="w-full border border-[#3F3EED] rounded-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#3F3EED] mb-4 resize-none"
//         />

//         <button
//           onClick={handleAddOrUpdate}
//           disabled={!prompt.trim()}
//           className={`w-full flex items-center justify-center cursor-pointer gap-2 rounded-xl py-3 text-white font-medium transition-all ${
//             !prompt.trim()
//               ? "bg-[#3F3EED]/50 cursor-not-allowed"
//               : "bg-[#3F3EED] hover:bg-[#2d2ce0]"
//           }`}
//         >
//           {isEditing ? <FiCheck /> : <FiPlus />}
//           {isEditing ? "Update Prompt" : "Add Prompt"}
//         </button>

//         {/* Table Section */}
//         {savedPrompt && (
//           <div className="mt-8">
//             <h2 className="text-lg font-semibold text-[#3F3EED] mb-3">
//               Saved Prompt
//             </h2>
//             <table className="w-full border border-[#3F3EED] rounded-xl overflow-hidden">
//               <thead className="bg-[#3F3EED]/10 text-[#3F3EED] text-left">
//                 <tr>
//                   <th className="py-2 px-4">Prompt</th>
//                   <th className="py-2 px-4 text-center">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr className="border-t border-[#3F3EED]/20">
//                   <td className="py-3 px-4 text-gray-700">{savedPrompt}</td>
//                   <td className="py-3 px-4 text-center flex justify-center gap-4">
//                     <button
//                       onClick={handleEditPrompt}
//                       className="text-[#3F3EED] hover:text-[#2d2ce0] transition-colors cursor-pointer"
//                     >
//                       <FiEdit2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddPrompt;






// // Previous Code
// import { useEffect, useState } from "react";
// import { FiPlus, FiEdit2, FiCheck } from "react-icons/fi";
// import { updateSystemPrompt, getSystemPrompt } from "../api/Call";
// import type { AxiosError } from "axios";
// import toast from "react-hot-toast";

// interface SystemPromptResponse {
//   system_prompt: string;
// }

// interface UpdatePromptPayload {
//   system_prompt: string;
// }

// const AddPrompt = () => {
//   const [prompt, setPrompt] = useState<string>("");
//   const [savedPrompt, setSavedPrompt] = useState<string>("");
//   const [isEditing, setIsEditing] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // ✅ Button loader state

//   // ✅ Fetch existing prompt
//   useEffect(() => {
//     const fetchPrompt = async () => {
//       try {
//         setLoading(true);
//         const token = localStorage.getItem("token");
//         if (!token) return;

//         const response: SystemPromptResponse = await getSystemPrompt(token);
//         if (response?.system_prompt) {
//           setSavedPrompt(response.system_prompt);
//         }
//       } catch (error) {
//         console.error("Failed to fetch prompt:", error);
//         toast.error("Failed to load prompt.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPrompt();
//   }, []);

//   // ✅ Add or update prompt
//   const handleAddOrUpdate = async (): Promise<void> => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       setIsSubmitting(true);
//       const data: UpdatePromptPayload = { system_prompt: prompt.trim() };
//       const response = await updateSystemPrompt(data, token);

//       setSavedPrompt(prompt.trim());
//       setPrompt("");
//       setIsEditing(false);
//       toast.success("Prompt updated successfully!");
//       console.log("Response:", response);
//     } catch (err) {
//       const error = err as AxiosError<{
//         detail?: { msg: string }[];
//         message?: string;
//         error?: string;
//       }>;

//       const message =
//         error.response?.data?.detail?.[0]?.msg ||
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Oops! An unexpected error occurred.";

//       toast.error(message);
//       console.error("Error:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleEditPrompt = (): void => {
//     setPrompt(savedPrompt);
//     setIsEditing(true);
//   };

//   return (
//     <div className="flex flex-col items-center justify-center px-4 py-10">
//       <div className="w-full max-w-2xl p-7">
//         <h1 className="text-2xl sm:text-4xl font-bold text-center mb-10 text-blue-900">
//           Prompt Manager
//         </h1>
//         <p className="text-gray-600 text-center mb-8">
//           Add or edit your custom AI prompt below. You can only have one active
//           prompt at a time.
//         </p>

//         <textarea
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           rows={3}
//           placeholder="Type your prompt here..."
//           className="w-full border border-blue-900 rounded-sm px-4 py-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-900 mb-4 resize-none"
//         />

//         {/* ✅ Loader-enabled Button */}
//         <button
//           onClick={handleAddOrUpdate}
//           disabled={!prompt.trim() || isSubmitting}
//           className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-white font-medium transition-all ${!prompt.trim() || isSubmitting
//             ? "bg-blue-900/50 cursor-not-allowed"
//             : "bg-blue-900 hover:opacity-90 cursor-pointer"
//             }`}
//         >
//           {isSubmitting ? (
//             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//           ) : isEditing ? (
//             <FiCheck />
//           ) : (
//             <FiPlus />
//           )}
//           {isSubmitting
//             ? "Saving..."
//             : isEditing
//               ? "Update Prompt"
//               : "Add Prompt"}
//         </button>

//         {/* ✅ Table Section */}
//         <div className="mt-8">
//           <h2 className="text-xl font-bold text-blue-900 mb-3">
//             Saved Prompt
//           </h2>
//           <table className="w-full border border-blue-500 rounded-xl overflow-hidden">
//             <thead className="bg-blue-500/10 text-blue-900 text-left">
//               <tr>
//                 <th className="py-2 px-4">Prompt</th>
//                 <th className="py-2 px-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan={2}
//                     className="py-6 text-center text-gray-500 italic"
//                   >
//                     <div className="flex items-center justify-center gap-2">
//                       <div className="w-5 h-5 border-2 border-[#3F3EED] border-t-transparent rounded-full animate-spin" />
//                       Loading prompt...
//                     </div>
//                   </td>
//                 </tr>
//               ) : savedPrompt ? (
//                 <tr className="border-t border-[#3F3EED]/20">
//                   <td className="py-3 px-4 text-gray-700">{savedPrompt}</td>
//                   <td className="py-3 px-4 text-center flex justify-center gap-4">
//                     <button
//                       onClick={handleEditPrompt}
//                       className="text-[#3F3EED] hover:text-[#2d2ce0] transition-colors cursor-pointer"
//                     >
//                       <FiEdit2 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={2}
//                     className="py-6 text-center text-gray-500 italic"
//                   >
//                     No prompt found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddPrompt;




// Clone Code
import { useState, useEffect } from "react";
import { FiPlus, FiEdit2, FiEye, FiTrash2 } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { createPrompt, getAllPrompt, updatePrompt, deletePrompt } from "../api/Call";

import type { Prompt, PromptFormValues } from "../interfaces/callForm"; //
import toast from "react-hot-toast";
import type { AxiosError } from "axios";

const AddPrompt = () => {

  // ==========================
  // API Data State
  // ==========================
  const [prompts, setPromptList] = useState<Prompt[]>([]); // Initial state ko empty array kar diya
  const [loading, setLoading] = useState(true); // Loading state add kiya

  // ==========================
  // Add Modal State
  // ==========================
  const [openModal, setOpenModal] = useState(false);
  const [saving, setSaving] = useState(false);

  // ==========================
  // View Modal State
  // ==========================
  const [viewModal, setViewModal] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromptFormValues>({
    defaultValues: {
      prompt_name: "",
      system_prompt: "",
    },
  });


  // ==========================
  // Fetch Prompts Function
  // ==========================
  const fetchPrompts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token") || "";
      // API call without the 'data' argument
      const prompts = await getAllPrompt(token);

      // Assuming prompts .data is an array of Prompt objects
      setPromptList(prompts);

    } catch (error) {
      console.error("Failed to fetch prompts:", error);
      toast.error("Failed to load prompts.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Load Prompts on Component Mount
  // ==========================
  useEffect(() => {
    fetchPrompts();
  }, []); // Empty dependency array means this runs once on mount


  // ==========================
  // Add Prompt Submit
  // ==========================
  const onAdd: SubmitHandler<PromptFormValues> = async (data) => {
    setSaving(true);

    try {
      const token = localStorage.getItem("token") || "";

      // Prepare API payload according to your response
      const payload = {
        prompt_name: data.prompt_name,
        system_prompt: data.system_prompt,
      };

      // Call API
      const response = await createPrompt(payload as any, token);

      // Add to local state for table display
      const newPrompt = response?.prompt
        ? {
          id: response.prompt.id,
          prompt_name: response.prompt.prompt_name,
          system_prompt: response.prompt.system_prompt,
        }
        : {
          id: response.id,
          prompt_name: response.prompt_name,
          system_prompt: response.system_prompt,
        };

      setPromptList((prev) => [newPrompt, ...prev]);

      toast.success("Prompt saved!");
      setOpenModal(false);
      reset();

    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      toast.error(error?.response?.data?.error || "Oops an error occurred");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // Open View Modal
  // ==========================
  const handleView = (item: Prompt) => {
    setSelectedPrompt(item);
    setEditMode(false);
    setViewModal(true);
  };

  // ==========================
  // Update Submit
  // ==========================
  const onUpdate: SubmitHandler<PromptFormValues> = async (data) => {
    if (!selectedPrompt) return;

    try {
      setUpdateLoading(true);

      const token = localStorage.getItem("token") || "";

      const payload = {
        prompt_name: data.prompt_name,
        system_prompt: data.system_prompt,
      };

      // Hit Update API
      const response = await updatePrompt(selectedPrompt.id, payload, token);

      // Success Toast
      toast.success("Prompt updated successfully!");

      // Update table without refresh
      setPromptList((prev) =>
        prev.map((item) =>
          item.id === selectedPrompt.id
            ? {
              ...item,
              prompt_name: response.prompt.prompt_name,
              system_prompt: response.prompt.system_prompt,
            }
            : item
        )
      );

      // Update selected prompt
      setSelectedPrompt({
        ...selectedPrompt,
        prompt_name: response.prompt.prompt_name,
        system_prompt: response.prompt.system_prompt,
      });

      // Close edit mode + modal
      setEditMode(false);
      setViewModal(false);

    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to update prompt");

    } finally {
      setUpdateLoading(false);
    }
  };


  //==================
  //Delete prompt in table
  //==================

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const deletePromptNow = async () => {
    if (!deleteId) return;

    try {
      setDeleteLoading(true);
      const token = localStorage.getItem("token") || "";

      await deletePrompt(deleteId, token);

      setPromptList((prev) => prev.filter((p) => p.id !== deleteId));

      toast.success("Prompt deleted successfully!");

    } catch (err: any) {
      toast.error(err?.response?.data?.error || "Failed to delete prompt");
    } finally {
      setDeleteModal(false);
      setDeleteId(null);
    }
  };



  return (
    <div className="flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl p-7">
        <h1 className="text-3xl font-bold text-center mb-10 text-[#13243C]">
          Prompt Manager
        </h1>

        <button
          onClick={() => {
            reset();
            setOpenModal(true);
          }}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 text-white font-medium transition-all bg-[#13243C] cursor-pointer"
        >
          <FiPlus />
          Add Prompt
        </button>

        {/* ADD MODAL */}
        {openModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 w-[90%] max-w-4xl rounded-xl relative">
              <button
                onClick={() => setOpenModal(false)}
                className="absolute top-3 right-3 text-gray-600 cursor-pointer"
              >
                <AiOutlineClose size={22} />
              </button>

              <h2 className="text-xl font-bold text-center mb-4">Add Prompt</h2>

              <form onSubmit={handleSubmit(onAdd)} className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Prompt Heading</label>
                  <input
                    type="text"
                    {...register("prompt_name", { required: "Required" })}
                    className="w-full border px-3 py-2 rounded-lg"
                  />
                  {errors.prompt_name && (
                    <p className="text-red-500 text-sm">
                      {errors.prompt_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block mb-1 font-medium">Prompt Text</label>
                  <textarea
                    {...register("system_prompt", { required: "Required" })}
                    className="w-full border px-3 py-2 h-28 rounded-lg"
                  ></textarea>
                  {errors.system_prompt && (
                    <p className="text-red-500 text-sm">
                      {errors.system_prompt.message}
                    </p>
                  )}
                </div>

                <button className="w-full bg-[#13243C] text-white py-3 rounded-xl flex items-center gap-2 justify-center cursor-pointer">
                  {saving && (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {saving ? "Save" : "Save"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* VIEW MODAL */}
        {viewModal && selectedPrompt && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn z-50">
            <div className="bg-white w-[90%] max-w-4xl h-9/12 rounded-xl shadow-lg relative animate-fadeInScale">

              <div className="relative overflow-y-scroll h-full p-6">
                {/* Close Icon */}
                <button
                  onClick={() => setViewModal(false)}
                  className="absolute top-3 right-7 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  <AiOutlineClose size={22} />
                </button>

                {/* Edit Icon */}
                {!editMode && (
                  <button
                    onClick={() => {
                      setEditMode(true);
                      reset({
                        prompt_name: selectedPrompt.prompt_name,
                        system_prompt: selectedPrompt.system_prompt,
                      });
                    }}
                    className="absolute top-3 right-17 text-[#13243C] hover:text-gray-500 cursor-pointer"
                  >
                    <FiEdit2 size={22} />
                  </button>
                )}

                <h2 className="text-xl font-bold text-center mb-4 text-[#13243C]">
                  {editMode ? "Edit Prompt" : "View Prompt"}
                </h2>

                {/* VIEW MODE */}
                {!editMode ? (
                  <div className="space-y-3 py-5 h-full">
                    <p>
                      <span className="font-semibold">Heading:</span>{" "}
                      {selectedPrompt.prompt_name}
                    </p>

                    <p className="text-justify">
                      <span className="font-semibold">Prompt:</span>{" "} <br />
                      <span className="pb-5">{selectedPrompt.system_prompt}</span>
                    </p>
                  </div>
                ) : (
                  /* EDIT MODE */
                  <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">

                    {/* Heading */}
                    <div>
                      <label className="block font-medium mb-1">Prompt Heading</label>
                      <input
                        type="text"
                        {...register("prompt_name", {
                          required: "Heading is required",
                        })}
                        className={`w-full border px-3 py-2 rounded-lg ${errors.prompt_name ? "border-red-500" : "border-gray-300"
                          }`}
                      />

                      {errors.prompt_name && (
                        <p className="text-red-500 text-sm">
                          {errors.prompt_name.message}
                        </p>
                      )}
                    </div>

                    {/* Prompt */}
                    <div>
                      <label className="block font-medium mb-1">Add Prompt</label>

                      <textarea
                        {...register("system_prompt", {
                          required: "Prompt is required",
                        })}
                        className={`w-full border px-3 py-2 rounded-lg h-40 ${errors.system_prompt ? "border-red-500" : "border-gray-300"
                          }`}
                      />

                      {errors.system_prompt && (
                        <p className="text-red-500 text-sm">
                          {errors.system_prompt.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-[#13243C] text-white py-3 rounded-xl flex justify-center items-center gap-2 cursor-pointer"
                    >
                      {updateLoading && (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      )}

                      {updateLoading ? "Updating..." : "Update"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}


        {/* TABLE */}
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-3">Saved Prompts</h2>

          <table className="w-full border border-blue-500 rounded-xl overflow-hidden">
            <thead className="bg-blue-500/10">
              <tr>
                <th className="py-2 px-4">Heading</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={2} className="py-6 text-center">
                    {/* Spinner Loader */}
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-7 h-7 border-2 border-[#13243C] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  </td>
                </tr>
              ) :
                prompts.length === 0 ? (
                  <tr>
                    <td colSpan={2} className="py-6 text-center text-gray-500">
                      No prompts found
                    </td>
                  </tr>
                ) : (
                  prompts.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-3 px-4">{item.prompt_name}</td>
                      <td className="py-3 px-4 text-center flex items-center gap-4 justify-center">
                        <button onClick={() => handleView(item)} className="cursor-pointer text-[#13243C]">
                          <FiEye size={20} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            setDeleteId(item.id);
                            setDeleteModal(true);
                          }}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <FiTrash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
            </tbody>
          </table>
        </div>
      </div>

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 shadow-lg relative animate-fadeInScale">

            {/* Close Icon */}
            <button
              onClick={() => setDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              <AiOutlineClose size={22} />
            </button>

            <h2 className="text-xl font-bold text-center mb-4 text-[#13243C]">
              Delete Prompt
            </h2>

            <p className="text-center text-gray-700 mb-6">
              Are you sure you want to delete this prompt?
            </p>

            <button
              onClick={deletePromptNow}
              className="w-full bg-red-600 text-white py-3 rounded-xl shadow hover:bg-red-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {deleteLoading && (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              )}
              {deleteLoading ? "Ok" : "Ok"}
            </button>

          </div>
        </div>
      )}

    </div>


  );
};

export default AddPrompt;
