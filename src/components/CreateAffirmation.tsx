import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import AddFile from "@/assets/AddFile.svg";
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { CircleX, Loader } from "lucide-react";
import { showToast } from "@/shared/Toast";
import {
  createNotifications,
  postAffrimations,
} from "@/services/fireStoreService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { affirmationSchema } from "@/pages/auth/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const CreateAffirmation = ({
  // open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [file, setFile] = useState<FileWithPath | null>(null);
  const form = useForm<z.infer<typeof affirmationSchema>>({
    resolver: zodResolver(affirmationSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: undefined,
    },
  });
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const uploadedFiles = acceptedFiles[0];
      if (uploadedFiles.type.startsWith("image/")) {
        setFile(uploadedFiles);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    validator: (file: FileWithPath) => {
      if (!file.type.startsWith("image/")) {
        showToast({
          title: "Invalid file type",
          description: "Only image files are allowed",
          status: "error",
        });
      }
      if (file.size > 2 * 1024 * 1024) {
        showToast({
          title: "Too large file",
          description: "Image file must not be more than 1mb",
          status: "error",
        });
      }
      return null;
    },
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
  });

  useEffect(() => {
    if (file) {
      form.setValue("thumbnail", file || undefined);
    }
  }, [file, form]);

  const handleRemove = () => {
    setFile(null);
  };

  const { mutate: uploadAffirmations, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof affirmationSchema>) => {
      const formData = new FormData();
      formData.append("file", values.thumbnail);
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "affirmations");

      const res = await fetch(
        import.meta.env.VITE_CLOUDINARY_IMAGE_UPLOAD_URL,
        {
          method: "post",
          body: formData,
        }
      );

      if (!res.ok) throw new Error("Upload to Cloudinary failed");
      if (!user?.uid) throw new Error("User not authenticated");

      const data = await res.json();

      await postAffrimations({
        userId: user?.uid,
        title: values.title,
        content: values.content,
        thumbnail: data.secure_url,
      });

      return {
        ...values,
        userId: user?.uid,
        createdAt: new Date(),
      };
    },
    onSuccess: async () => {
      showToast({
        title: "Created!",
        description: "Affirmation created.",
        status: "success",
      });
      queryClient.invalidateQueries({
        queryKey: ["affirmations", user?.uid],
      });
      setOpen(false);
      await createNotifications(user?.uid ?? "", {
        title: "Affirmations",
        message: "A new affirmation has been created",
        type: "affirmation",
      });
    },
    onError: (error: Error) => {
      showToast({
        title: "Error",
        description: error.message,
        status: "error",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof affirmationSchema>) => {
    uploadAffirmations(values);
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <Label>Title</Label>
                <FormMessage />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="I am capable of handling challenges..."
                    className="bg-[#F0F2F5] rounded-xs border-none focus-visible:ring-0 
                      focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-12 mb-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <Label>Content</Label>
                <FormMessage />
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="This affirmation reminds you of your inner strength and ability to overcome obstacles. Repeat it through out the day to reinforce your confidence"
                    rows={5}
                    className="bg-[#F0F2F5] rounded-xs border-none focus-visible:ring-0 
                        focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-25 mb-5"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormItem>
            <Label>Thumbnail</Label>
            {form.formState.errors.thumbnail && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.thumbnail.message}
              </p>
            )}
            <div
              {...getRootProps()}
              className="h-[140px] flex flex-col justify-center items-center gap-2 border-2 
            border-dashed border-spacing-2 rounded-md cursor-pointer border-gray-300]"
            >
              <Input {...getInputProps()} />
              {!file ? (
                <div className="h-full w-full flex flex-col justify-center items-center gap-2">
                  <img src={AddFile} loading="lazy" alt="add-icon" />
                  <div className="flex flex-col items-center">
                    <p className="text-gray-500 text-xs">
                      {isDragActive
                        ? "Drop file here"
                        : "Upload a file or drag and drop"}
                    </p>
                    <p className="text-gray-500 text-xs">
                      PNG, JPG, GIF up to 2MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full w-full relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="h-full w-full object-contain p-2"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove();
                    }}
                    className="cursor-pointer absolute top-1 right-1 bg-white rounded-full 
                  p-1 shadow-sm hover:bg-gray-100"
                  >
                    <CircleX />
                  </button>
                </div>
              )}
            </div>
          </FormItem>
          <Button
            disabled={!file}
            type="submit"
            className="mt-4 w-full bg-[#0D80F2] text-[#fff] font-bold rounded-sm 
              hover:text-white cursor-pointer"
          >
            {isPending ? (
              <Loader className="animate-spin text-[#fff]" />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default CreateAffirmation;
