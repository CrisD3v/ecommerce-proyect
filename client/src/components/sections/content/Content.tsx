"use client";
import Filter from "@/components/micro/filter/Filter";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toggleClick } from "@/redux/features/isClickedSlice";
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
import {
  useGetCategoryQuery,
  useGetProductsQuery,
} from "@/redux/services/ecommerceApi";

interface Props {
  type: string;
}

interface Product {
  id: any;
  price: any;
  name: string;
  code: string;
  image: string;
  description: string;
  stock: string;
}

interface Category {
  id: any;
  category: string;
  image: string;
}


function Home() {
  const { data: dataCategory = [] as Category[], isLoading, isError } = useGetCategoryQuery();
  const {
    data: dataProduct = [] as Product[],
    isLoading: isLoading2,
    isError: isError2,
  } = useGetProductsQuery();
  return (
    <div className="grid grid-cols-12 m-10">
      <BannerCard />
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
            {(dataProduct as Product[])
              ?.slice(-4)
              .reverse()
              .map((el, i) => (
                <CardProduct
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  id={el.id}
                  key={i}
                />
              ))}
          </div>
        </div>
      </div>

      <div className="col-start-2 col-end-12 mt-5 border-t border-b">
        <div className="flex flex-row w-full">
          <div className="">
            <p className="text-4xl font-mono">CATEGORIAS</p>
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
        <div className="flex flex-wrap gap-5">
          {(dataCategory as Category[])?.map((el, i) =>
            i <= 2 ? (
              <CardCategory
                category={el.category}
                image={el.image}
                key={el.id}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

function Category() {
  const { data: dataProduct = [] as Product[], isLoading, isError } = useGetProductsQuery();
  const isClicked = useAppSelector((state) => state.isClicked.isClicked);
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(toggleClick()); // Dispatch del action creator para cambiar el estado de isClicked
  };
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
              <p className="text-4xl font-bold mt-2">NUEVOS</p>
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
          {(dataProduct as Product[])
            ?.slice()
            .reverse()
            .map((el, i) => (
              <CardProduct
                image={el.image}
                name={el.name}
                price={el.price}
                id={el.id}
                key={i}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

function Content({ type }: Props) {
  return <div>{type === "home" ? <Home /> : <Category />}</div>;
}

export default Content;
