"use client";
import Filter from "@/components/micro/filter/Filter";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "@/redux/store";
import { clickAction } from "@/redux/actions";
import {
  ArrowLongRightIcon,
  ArrowLongLeftIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Transition } from "@headlessui/react";

import Link from "next/link";
import CardProduct from "@/components/micro/cards/CardProduct";
import CardCategory from "@/components/micro/cards/CardCategory";
import BannerCard from "@/components/micro/cards/BannerCard";

interface Props {
  type: string;
  isClicked: boolean;
  handleClick: () => void;
}

interface categoryProps {
  isClicked: boolean;
  handleClick: () => void;
}

function Home() {
  return (
    <div className="grid grid-cols-12 m-10">
      
      <BannerCard/>

      <div className="col-start-2 col-end-12 mt-5">
        <div className="flex flex-col">
          <div className="flex flex-row w-full">
            <div className="">
              <p className="text-4xl font-mono">NUEVOS</p>
            </div>

            <div className="w-full flex justify-end  items-center">
              <Link
                href="/category"
                className="flex w-24 gap-2 hover:text-cyan-500 cursor-pointer select-none"
              >
                <p>Ver mas</p>
                <ArrowLongRightIcon className="w-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap mt-5 gap-20">
            <CardProduct />
          </div>
        </div>
      </div>

      <div className="col-start-2 col-end-12 mt-5 border-t border-b">
        <CardCategory category="Cobijas" image="1" key={1} />
      </div>
    </div>
  );
}

function Category({ handleClick, isClicked }: categoryProps) {
  return (
    <div className="grid grid-cols-12 m-10">
      <Transition
        show={isClicked}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-50"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={`col-start-1 col-end-4 ${isClicked ? "block" : "hidden"} `}
        >
          <Filter />
        </div>
      </Transition>
      <div
        className={` ${isClicked ? "col-start-5" : "col-start-1"} col-end-12`}
      >
        <div className="flex flex-col">
          <div className="flex flex-row w-full">
            <div className=" border-b border-gray-200 pb-6 w-96 flex gap-2">
              <p className="text-4xl font-bold mt-2">CATEGORIA</p>
              <div
                className="flex gap-2 hover:text-cyan-500 cursor-pointer select-none"
                onClick={handleClick}
              >
                <Squares2X2Icon className="h-5 w-5 mt-2" aria-hidden="true" />
                <p className="font-semibold ">FILTROS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end  items-center">
          <Link
            href="/"
            className="flex w-max gap-2 hover:text-cyan-500 cursor-pointer select-none"
          >
            <ArrowLongLeftIcon className="w-5" />
            <p>Inicio</p>
          </Link>
        </div>
        <div className="flex flex-wrap mt-5 gap-20">
          <CardProduct />
        </div>
      </div>
    </div>
  );
}

function Content({ type, handleClick, isClicked }: Props) {
  return (
    <div>
      {type === "home" ? (
        <Home />
      ) : (
        <Category handleClick={handleClick} isClicked={isClicked} />
      )}
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  isClicked: state.isClicked,
});

const mapDispatchToProps = {
  handleClick: clickAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Content);
