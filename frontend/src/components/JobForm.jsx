"use client";
import { Loader, LoaderCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { toast } from "sonner";
import { fetchData } from "@/utils/fetch";
import { useJobs } from "@/context/JobsContext";

const formSchema = yup.object().shape({
    task_name: yup
        .string()
        .required('Task name is required')
        .min(3, 'Task name must be at least 3 characters')
        .max(30, 'Task name must be at most 20 characters'),
    priority: yup.string().required('Priority is required'),
    payload: yup.string().required('Payload is required').test('is-json', 'Invalid JSON format', (value) => {
        try {
            JSON.parse(value);
            return true;
        } catch (e) {
            return false;
        }
    }),
});

export default function JobForm({ setIsCreateModalOpen, setJobs }) {

    // form
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
    });

    const [isLoading, setIsLoading] = useState(false);
    const { setStaticJobs } = useJobs();

    // handle create job
    const handleCreateJob = async (data) => {
        setIsLoading(true);
        try {

            const res = await fetchData('/api/jobs/create', {
                method: 'POST',
                data: JSON.stringify(data),
            });

            if (res?.message === "Job created successfully") {
                toast.success(res.message);
                setJobs((prev) => {
                    const newArr = prev.slice(0, -1);
                    return [res.data, ...newArr];
                });

                setStaticJobs((prev) => ({ ...prev, total: prev.total + 1, pending: prev.pending + 1 }))
                setIsCreateModalOpen(false);
            } else {
                toast.error(res.message);
            }
        } catch (error) {
            const errorMessage = error?.message || "Something went wrong!";
            toast(errorMessage, {
                description: "An error occurred while fetching data. Please try again later.",
            })
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg w-full max-w-md shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-3 border-b border-zinc-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-100">Create Job</h2>
                        <p className="text-zinc-300 text-xs">Add a new automated task to the queue.</p>
                    </div>
                    <button type="button" onClick={() => setIsCreateModalOpen(false)} className="rounded-full flex items-center justify-center w-10 h-10 hover:bg-zinc-800 text-zinc-500 cursor-pointer hover:text-zinc-200 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit(handleCreateJob)} className="p-3 space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 capitalize tracking-wide">Task Name</label>
                        <input
                            {...register('task_name')}
                            type="text"
                            placeholder="Enter job name"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 py-[10px] text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all placeholder:text-zinc-400"
                        />
                        {errors.task_name && <p className="text-red-500 tracking-wide text-[13px] font-medium">{errors.task_name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 capitalize tracking-wide">Priority Level</label>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                            {['high', 'medium', 'low'].map((p) => (
                                <label key={p} className="cursor-pointer">
                                    <input type="radio"
                                        {...register('priority')}
                                        name="priority"
                                        value={p}
                                        className="peer sr-only"
                                        defaultChecked={p === 'medium'} />
                                    <div className="text-center py-2 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-500 text-sm peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all font-medium">
                                        {p}
                                    </div>
                                </label>
                            ))}
                        </div>
                        {errors.priority && <p className="text-red-500 tracking-wide text-[13px] font-medium">{errors.priority.message}</p>}
                    </div>

                    {/* textarea */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 capitalize tracking-wide">Payload (JSON) *</label>
                        <textarea
                            {...register('payload')}
                            placeholder="{&quot;to&quot;: &quot;user@example.com&quot;,
                                &quot;template&quot;: &quot;welcome&quot;}"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-md px-4 resize-none py-[10px] text-sm focus:outline-none focus:ring-1 focus:ring-ring transition-all h-32 placeholder:text-zinc-400"
                        />
                        {errors.payload && <p className="text-red-500 tracking-wide text-[13px] font-medium">{errors.payload.message}</p>}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button disabled={isLoading} type="button" onClick={() => setIsCreateModalOpen(false)} className="flex-1 py-[10px] rounded-md border border-zinc-800 text-zinc-200 bg-zinc-800 cursor-pointer text-sm font-medium disabled:opacity-50 transition-colors">
                            Cancel
                        </button>
                        <button
                            disabled={isLoading}
                            type="submit" className="cursor-pointer flex-1 bg-primary hover:opacity-80 transition-all duration-300 flex items-center justify-center disabled:opacity-50 text-white py-[10px] rounded-md text-sm font-medium">
                            {
                                isLoading ? <LoaderCircle size={20} className="animate-spin" /> : 'Create Job'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}