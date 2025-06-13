import { toast } from "sonner";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  XCircle,
  Loader2,
} from "lucide-react";

type ToastStatus = "success" | "error" | "warning" | "info" | "loading";

interface ToastProps {
  title: string;
  description?: string;
  status?: ToastStatus;
}

export const showToast = ({
  title,
  description,
  status = "info",
}: ToastProps) => {
  const statusIcons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-rose-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
    loading: <Loader2 className="w-5 h-5 text-gray-500 animate-spin" />,
  };

  const statusColors = {
    success: "border-emerald-500 bg-emerald-50",
    error: "border-rose-500 bg-rose-50",
    warning: "border-amber-500 bg-amber-50",
    info: "border-blue-500 bg-blue-50",
    loading: "border-gray-500 bg-gray-50",
  };

  toast.custom((t) => (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border ${statusColors[status]} shadow-lg max-w-md`}
    >
      <div className="mt-0.5">{statusIcons[status]}</div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      <button
        onClick={() => toast.dismiss(t)}
        className="text-gray-400 hover:text-gray-500"
      >
        <XCircle className="w-5 h-5" />
      </button>
    </div>
  ));
};
