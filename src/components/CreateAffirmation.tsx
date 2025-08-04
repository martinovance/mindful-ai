import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import AddFile from "@/assets/AddFile.svg";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { CircleX } from "lucide-react";
import { showToast } from "@/shared/Toast";
import { Link } from "react-router-dom";

const CreateAffirmation = () => {
  const [file, setFile] = useState<FileWithPath | null>(null);

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

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <section className="flex flex-col justify-center items-center gap-5">
      <form className="w-full">
        <FormItem>
          <Label>Title</Label>
          <Input
            placeholder="I am capable of handling challenges..."
            className="bg-[#F0F2F5] rounded-xs border-none focus-visible:ring-0 
                    focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-12 mb-5"
          />
        </FormItem>
        <FormItem>
          <Label>Content</Label>
          <Textarea
            placeholder="This affirmation reminds you of your inner strength and ability to overcome obstacles. Repeat it through out the day to reinforce your confidence"
            rows={5}
            className="bg-[#F0F2F5] rounded-xs border-none focus-visible:ring-0 
                    focus-visible:ring-offset-0 placeholder:text-[#637387] text-sm h-25 mb-5"
          />
        </FormItem>
        <FormItem>
          <Label>Thumbnail</Label>
          <div
            {...getRootProps()}
            className="h-[140px] flex flex-col justify-center items-center gap-2 border-2 
            border-dashed border-spacing-2 rounded-md cursor-pointer border-gray-300]"
          >
            <Input {...getInputProps()} />
            {!file ? (
              <div className="h-full w-full flex flex-col justify-center items-center gap-2">
                <img src={AddFile} alt="add-icon" />
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
        <Link to="/">
          <Button
            disabled={!file}
            type="submit"
            className="mt-4 w-full bg-[#0D80F2] text-[#fff] font-bold rounded-sm hover:text-white 
            cursor-pointer"
          >
            {"Create"}
          </Button>
        </Link>
      </form>
    </section>
  );
};

export default CreateAffirmation;
