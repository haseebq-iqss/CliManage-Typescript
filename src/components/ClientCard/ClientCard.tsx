import React from "react";
import "./ClientCard.scss";
import { SlideInAnimator } from "../../animation-engine/AnimatorPresets";
import { Email, Person, Phone } from "@mui/icons-material";

function ClientCard({ client }: any) {
  console.log(client);
  return (
    <SlideInAnimator time={0.25}>
      <div className="clientCardContainer">
        <h2>Client Information</h2>
        <hr />
        <div className="nameCol">
          <Person />
          <h4>{client?.name}</h4>
        </div>
        <div className="emailCol">
          <Email />
          <h4>{client?.email}</h4>
        </div>
        <div className="phoneCol">
          <Phone />
          <h4>{client?.phone}</h4>
        </div>
      </div>
    </SlideInAnimator>
  );
}

export default ClientCard;
