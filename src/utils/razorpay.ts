import Router from "next/router";
import {
  EventPaymentOrderDocument,
  FestRegPaymentOrderDocument,
} from "../generated/generated";
import { client } from "../lib/apollo";
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

export const makePayment = async (setSDKLoading?: (arg1: any) => void) => {
  console.log("here...");
  setSDKLoading && setSDKLoading(true);
  const res = await initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
  }
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
      image: "/logo.png",
      handler: function (response: any) {
        client.refetchQueries({
          include: ["MeQuery"],
        });
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
  setSDKLoading && setSDKLoading(false);
};

export const makeTeamPayment = async (
  teamId: string,
  name: string,
  email: string,
  setSDKLoading?: (arg1: any) => void
) => {
  console.log("here...");
  setSDKLoading && setSDKLoading(true);
  const res = initializeRazorpay();

  if (!res) {
    alert("Razorpay SDK Failed to load");
  }
  const { data } = await client.mutate({
    mutation: EventPaymentOrderDocument,
    variables: {
      teamId,
    },
  });
  if (
    data?.eventPaymentOrder.__typename === "MutationEventPaymentOrderSuccess"
  ) {
    const options = {
      key: process.env.RAZORPAY_KEY,
      name: "Incridea 2023",
      currency: "INR",
      amount: data.eventPaymentOrder.data.amount,
      order_id: data.eventPaymentOrder.data.orderId,
      description: `Register for ${data.eventPaymentOrder.data.Team.event.name}`,
      image: "/logo.png",
      handler: function (response: any) {
        //  refetch query
        client.refetchQueries({
          include: ["MyTeam"],
        });
      },
      prefill: {
        email: email,
        name: name,
      },
    };
    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
  } else {
    alert("Something went wrong");
    console.log(data);
  }
  setSDKLoading && setSDKLoading(false);
};
