"use client";
import React, { useState } from "react";
import Nav from "../sections/navegation/Nav";
import Content from "../sections/content/Content";
import OffCanvasMenu from "../micro/off-canva/OffCanvasMenu";

function Main() {
  return (
    <div>
      {/* NAV */}
      <div className="">
        <Nav />
      </div>

      {/* CONTENIDO */}
      <div className="">
        <Content type="home" />
      </div>

      {/* FOOTER */}
      <div className=""></div>
    </div>
  );
}

export default Main;
