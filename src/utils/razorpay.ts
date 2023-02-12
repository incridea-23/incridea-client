import { useMutation } from "@apollo/client";
import Router from "next/router";
import { FestRegPaymentOrderDocument } from "../generated/generated";
import { initializeApollo } from "../lib/apollo";
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

export const makePayment = async () => {
  console.log("here...");
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
  }
  const client = initializeApollo();
  const { data } = await client.mutate({
    mutation: FestRegPaymentOrderDocument,
  });
  if (
    data?.createPaymentOrder.__typename === "MutationCreatePaymentOrderSuccess"
  ) {
    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Incridea 2023",
      currency: "INR",
      amount: data.createPaymentOrder.data.amount,
      order_id: data.createPaymentOrder.data.orderId,
      description: "Incridea 2023 Registration",
      image: "/images/logo.svg",
      handler: function (response: any) {
        Router.push("/profile");
      },
      prefill: {
        email: data.createPaymentOrder.data.user.email,
        name: data.createPaymentOrder.data.user.name,
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } else {
    alert("Something went wrong");
    console.log(data);
  }
};
