import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Plus, Trash2 } from "lucide-react";
import CustomDialog from "@/shared/Dialog";
import CreateAffirmation from "./CreateAffirmation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteUserDoc, fetchAffirmations } from "@/services/fireStoreService";
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
  const [deleteModalOpen, setDeleteModalOpen] = useState<string | null>(null);

  const queryClient = useQueryClient();

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

  const totalPages = getAffirmations?.total
    ? Math.ceil(getAffirmations?.total / itemsPerPage)
    : 1;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setPage(page);
  };

  const { mutate: deleteAffrimation, isPending } = useMutation({
    mutationFn: async (docId: string) => {
      if (!user?.uid) return;

      return await deleteUserDoc("affirmations", docId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["affirmations", user?.uid] });
      setDeleteModalOpen(null);
    },
  });

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
                <div className="w-full flex flex-col justify-start items-start gap-2">
                  <p className="text-md font-medium">{affirm.title}</p>
                  <p className="text-sm font-normal text-[#637387]">
                    {affirm.content}
                  </p>
                </div>
                <CustomDialog
                  open={Boolean(deleteModalOpen)}
                  onOpenChange={(isOpen) => {
                    if (!isOpen) setDeleteModalOpen(null);
                  }}
                  trigger={
                    <Button
                      variant="ghost"
                      className="mt-auto ml-auto cursor-pointer text-red-400"
                      onClick={() => setDeleteModalOpen(affirm.id)}
                    >
                      <Trash2 />
                      Delete
                    </Button>
                  }
                >
                  <div className="flex flex-col justify-center items-center gap-5 text-center">
                    <Trash2 className="h-8 w-8 text-red-400" />
                    <p className="text-lg font-bold text-[#000]">
                      Are you sure you want to delete this affirmation?
                    </p>
                    <div className="flex items-center gap-3 mb-3">
                      <Button
                        variant="default"
                        onClick={() =>
                          deleteModalOpen && deleteAffrimation(deleteModalOpen)
                        }
                        className="cursor-pointer bg-[#EA4335] text-[#fff]"
                      >
                        {isPending ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          "Yes"
                        )}
                      </Button>
                      <Button
                        variant="default"
                        onClick={() => setDeleteModalOpen(null)}
                        className="cursor-pointer text-[#0D80F2] bg-transparent 
                        border border-[#0D80F2]"
                      >
                        No
                      </Button>
                    </div>
                  </div>
                </CustomDialog>
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
