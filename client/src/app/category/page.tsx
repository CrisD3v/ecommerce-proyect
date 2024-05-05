import React from "react";
import Nav from "../../components/sections/navegation/Nav";
import Content from "../../components/sections/content/Content";

function page() {
  return (
    <div>
      {/* NAV */}
      <div className="">
        <Nav route="category"/>
      </div>

      {/* CONTENIDO */}
      <div className="">
        <Content type="category" />
      </div>

      {/* FOOTER */}
      <div className=""></div>
    </div>
  );
}

export default page;
