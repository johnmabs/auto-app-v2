import { getCustomerRequestDetailsAction } from "@/features/customer-requests";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RequestPage({ params }: Props) {
  const { id } = await params;
  let requestData = null;
  const request = await getCustomerRequestDetailsAction(id);
  if (request.success) {
    requestData = request.data;
  }

  if (!request) {
    notFound();
  }

  return (
    <div className="max-w-3xl space-y-6">
      <header>
        <h1 className="font-display text-[2.2rem] tracking-[0.04em]">
          MODIFIER LA DEMANDE DU CLIENT
        </h1>
        <p className="text-[0.82rem] text-(--muted) mt-1">
          {requestData?.firstName} {requestData?.lastName}
        </p>
      </header>
    </div>
  );
}
