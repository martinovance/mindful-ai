import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

import AddFile from "@/assets/AddFile.svg";

const CreateAffirmation = () => {
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
            className="h-[140px] flex flex-col justify-center items-center gap-2 border-2 border-dashed border-spacing-7
           border-[#292D32]"
          >
            <img src={AddFile} alt="add-icon" />
            <div className="flex flex-col items-center">
              <p className="text-gray-500 text-xs">
                Upload a file or drag and drop
              </p>
              <p className="text-gray-500 text-xs">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </FormItem>
        <Button
          type="submit"
          className="mt-4 w-full bg-[#0D80F2] text-[#fff] font-bold rounded-sm hover:text-white 
            cursor-pointer"
        >
          {"Create"}
        </Button>
      </form>
    </section>
  );
};

export default CreateAffirmation;
