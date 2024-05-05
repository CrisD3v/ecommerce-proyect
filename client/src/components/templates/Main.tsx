"use client";
import React, { useState } from "react";
import Nav from "../sections/navegation/Nav";
import Content from "../sections/content/Content";
import OffCanvasMenu from "../micro/off-canva/OffCanvasMenu";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import LoginModal from "../micro/modal/LoginModal";
import { setOpenModal } from "@/redux/features/modalSlice";

function Main() {
   const modalIsOpen = useAppSelector((state) => state.openModal.openModal);
   const dispatch = useAppDispatch();
  const openModal = () => {
    dispatch(setOpenModal()); // Dispatch del action creator para cambiar el estado de isClicked
  };
  return (
    <div>
      {/* NAV */}
      <div className="">
        <Nav route="main" />
      </div>

      {/* CONTENIDO */}
      <div className="">
        <Content type="home" />
      </div>

      {/* FOOTER */}
      <div className=""></div>
      {modalIsOpen ? <LoginModal type="signin" onClose={openModal} /> : ""}
    </div>
  );
}

export default Main;
