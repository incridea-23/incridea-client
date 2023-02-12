import { useMutation } from "@apollo/client";
import Router from "next/router";
import { FestRegPaymentOrderDocument } from "../generated/generated";
export const initializeRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};
const usePayment = () => {
  const [mutate, { data: resp, loading, error }] = useMutation(
    FestRegPaymentOrderDocument
  );
  console.log(resp, loading, error);

  const initiatePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
    }

    if (
      resp?.createPaymentOrder.__typename ===
      "MutationCreatePaymentOrderSuccess"
    ) {
      const options = {
        key: process.env.RAZORPAY_KEY,
        name: "Incridea 2022",
        currency: "INR",
        amount: resp.createPaymentOrder.data.amount,
        order_id: resp.createPaymentOrder.data.orderId,
        description: "Incridea 2023 Registration",
        image: "/images/logo.svg",
        handler: function (response: any) {
          Router.push("/profile");
        },
        prefill: {
          email: resp.createPaymentOrder.data.user.email,
          name: resp.createPaymentOrder.data.user.name,
        },
      };
      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
      console.log(resp.createPaymentOrder.data);
    }
  };

  return { initiatePayment, mutate };
};

export default usePayment;
