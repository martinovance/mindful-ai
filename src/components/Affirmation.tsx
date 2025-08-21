import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import CustomDialog from "@/shared/Dialog";
import CreateAffirmation from "./CreateAffirmation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { fetchAffirmations } from "@/services/fireStoreService";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { Skeleton } from "./ui/skeleton";

const Affirmation = () => {
  const { user } = useAuth();
  const itemsPerPage = 5;
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [lastItems, setLastItems] = useState<
    Record<number, QueryDocumentSnapshot<DocumentData> | null>
  >({});

  const { data: getAffirmations, isPending: loadingAffirmations } = useQuery({
    queryKey: ["affirmations", user?.uid, page],
    queryFn: async () => {
      const lastDoc = lastItems[page - 1] || null;
      if (!user?.uid) throw new Error("User not authenticated");
      const data = await fetchAffirmations(user?.uid, lastDoc, itemsPerPage);

      setLastItems((prev) => ({
        ...prev,
        [page]: data.lastVisible,
      }));
      return data;
    },
    enabled: !!user?.uid,
  });
  console.log(getAffirmations);

  const totalPages = getAffirmations?.total
    ? Math.ceil(getAffirmations?.total / itemsPerPage)
    : 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setPage(page);
  };

  return (
    <div className="pt-4 w-full">
      <div className="flex justify-between items-center gap-3">
        <div className="flex flex-col justify-start items-start mb-5">
          <h1 className="font-bold text-xl">Daily Affirmations</h1>
          <p className="font-medium text-sm text-[#61758A]">
            Improve communication and strengthen your wellness.
          </p>
        </div>

        <CustomDialog
          title="Create Affirmation"
          open={open}
          onOpenChange={setOpen}
          trigger={
            <Button
              className="bg-[#0D80F2] text-[#FFFFFF] rounded-full 
          hover:text-[#B2C9E5] cursor-pointer h-[30px]"
            >
              <Plus /> Create
            </Button>
          }
        >
          <CreateAffirmation open={open} setOpen={setOpen} />
        </CustomDialog>
      </div>
      <Card className="shadow-none bg-[#fff] p-3 md:p-8 w-full flex flex-col gap-3">
        {loadingAffirmations ? (
          // Skeleton Loader
          Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row gap-3 animate-pulse"
            >
              {/* Image Skeleton */}
              <Card className="w-full sm:max-w-[50%] min-h-[180px] sm:max-h-[256px] p-0 overflow-hidden">
                <Skeleton className="w-full h-full rounded-xl" />
              </Card>

              {/* Text Skeletons */}
              <div className="w-full sm:w-[50%] flex flex-col justify-start items-start gap-2">
                <Skeleton className="h-5 w-40 rounded-md" /> {/* Title */}
                <Skeleton className="h-4 w-full rounded-md" />{" "}
                {/* Content line 1 */}
                <Skeleton className="h-4 w-3/4 rounded-md" />{" "}
                {/* Content line 2 */}
              </div>
            </div>
          ))
        ) : (getAffirmations?.result ?? [])?.length > 0 ? (
          getAffirmations?.result?.map((affirm, i) => (
            <div key={i} className="flex flex-col sm:flex-row gap-3">
              <Card className="w-full sm:max-w-[50%] min-h-full sm:max-h-[256px] p-0 overflow-hidden">
                <img
                  src={affirm.thumbnail}
                  alt={`${affirm.title}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </Card>
              <div className="w-full sm:w-[50%] flex flex-col justify-start items-start gap-2">
                <p className="text-md font-medium">{affirm.title}</p>
                <p className="text-sm font-normal text-[#637387]">
                  {affirm.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center gap-3 text-center w-full">
            <p className="text-gray-500 text-center">
              You haven't created any affirmation for yourself. Click create
            </p>
          </div>
        )}

        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Previous
          </Button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={page === pageNum ? "default" : "outline"}
                onClick={() => handlePageChange(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Affirmation;
