'use client';
import Script from "next/script";
import React, { useState, useEffect } from "react";
import { loadConnectAndInitialize } from "@stripe/connect-js/pure";
import {
  ConnectPayments,
  ConnectComponentsProvider,
  ConnectBalances,
  ConnectPayouts,
  ConnectPayoutsList,
  ConnectPaymentDetails,
  ConnectNotificationBanner,
} from "@stripe/react-connect-js";
import TinyLineChart from "../Support/TinyLineChart";

export const AdminHome = ({ SITEINFO, OWNER }) => {
  const color = SITEINFO?.colors?.accent || "#625afa"; // Default color fallback
  const [stripeConnectInstance, setStripeConnectInstance] = useState(null);
  useEffect(() => {
    if(!OWNER?.stripeAccountID) {
      console.error("No Stripe Account ID found for this user.");
      return;
    }
    const fetchClientSecret = async () => {
      try {
        const response = await fetch("/api/AccountSession", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            stripeAccountID: OWNER?.stripeAccountID || null,
          }),
        });

        if (!response.ok) {
          const { error } = await response.json();
          console.error("An error occurred:", error);
          return null;
        }

        const { client_secret: clientSecret } = await response.json();
        return clientSecret;
      } catch (error) {
        console.error("Error fetching client secret:", error);
        return null;
      }
    };

    const initializeStripeConnect = async () => {
      const clientSecret = await fetchClientSecret();

      if (clientSecret) {
        const instance = loadConnectAndInitialize({
          publishableKey: process.env.STRIPE_PUBLIC_KEY_LIVE || "pk_test_51QcJHJAw2TrHFjVplnRUQpe3F8YsYzxmWWIUTMMhcgDH3sBNlW6XOeva7fQhGeahXoYg2HUbwZrccnwBYc4NG2qc00JQpZHGqm",
          fetchClientSecret: () => clientSecret,
          appearance: {
            overlays: "dialog",
            variables: {
              colorPrimary: color,
            },
          },
        });

        setStripeConnectInstance(instance);
      }
    };

    initializeStripeConnect();
  }, [OWNER?.stripeAccountID, color]);

  if (!stripeConnectInstance) {
    return <div>Loading Stripe Connect...</div>; // Fallback while initializing
  }

  return (
    <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <div className=" w-full overflow-y-scroll overflow-hidden hidescroll relative   md:right-0 mx-0  flex flex-col    md:p-20  ">
            <div className="flex gap-4 flex-col-reverse md:flex-row justify-between w-full">
                <div className="w-1/3">
                    <ConnectBalances  />
                </div>
                <TinyLineChart /> 
            </div>
            <br/>
            <br/>
            <ConnectPayments />
            <div className="w-full center m-auto">
                <ConnectNotificationBanner />
            </div>
       </div>

    </ConnectComponentsProvider>
   
  );
};
