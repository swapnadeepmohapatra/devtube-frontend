import React, { useEffect, useState } from "react";
import api from "../helper/api";
import "../css/subscribe.css";
import { Check } from "@material-ui/icons";

function Subscribe(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;

  const [subscriberNumber, setSubscriberNumber] = useState(0);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const onSubscribe = () => {
    let subscribeData = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (isSubscribed) {
      api.post("/unSubscribe", subscribeData).then((response) => {
        if (response.data.error) {
          alert("Failed to unsubscribe");
        } else {
          setSubscriberNumber(subscriberNumber - 1);
          setIsSubscribed(!isSubscribed);
        }
      });
    } else {
      api.post("/subscribe", subscribeData).then((response) => {
        if (response.data.error) {
          alert("Failed to subscribe");
        } else {
          setSubscriberNumber(subscriberNumber + 1);
          setIsSubscribed(!isSubscribed);
        }
      });
    }
  };

  useEffect(() => {
    const subscriberNumberData = { userTo: userTo, userFrom: userFrom };
    api.post("/getSubscriberById", subscriberNumberData).then((response) => {
      if (response.data.error) {
        alert("Failed to get subscriber Number");
      } else {
        console.log(response.data);

        setSubscriberNumber(response.data.subscriberNumber);
      }
    });

    api.post("/isSubscribed", subscriberNumberData).then((response) => {
      if (response.data.error) {
        alert("Failed to get Subscribed Information");
      } else {
        console.log(response.data);
        setIsSubscribed(response.data.subscribed);
      }
    });
  }, []);

  return (
    <div
      className="subs-btn"
      style={{
        backgroundColor: isSubscribed ? "#26ae60" : "#CC0000",
        display: "flex",
        alignItems: "center",
      }}
    >
      {isSubscribed ? <Check style={{ color: "#ffffff" }} /> : null}
      <button
        style={{
          backgroundColor: isSubscribed ? "#26ae60" : "#CC0000",
        }}
        onClick={onSubscribe}
      >
        {isSubscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
