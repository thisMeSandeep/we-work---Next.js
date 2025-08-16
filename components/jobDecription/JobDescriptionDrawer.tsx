"use client"

import {
  ArrowLeft,
  CheckCircle,
  DollarSign,
  Heart,
  Link,
  MapPin,
  Star,
  UserPen,
} from "lucide-react";
import Reviews from "./Reviews";
import { Button } from "../ui/button";
import { useState } from "react";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  // optional: override drawer width if you want different breakpoints
  widthClass?: string;
};

const JobDescriptionDrawer = ({
  isOpen: controlledIsOpen,
  onClose,
  widthClass = "sm:w-[800px]",
}: Props) => {
  // support both controlled and uncontrolled usage
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalOpen;
  const close = () => {
    if (isControlled) onClose?.();
    else setInternalOpen(false);
  };

  return (
    <>
      {/* optional trigger when used uncontrolled */}
      {!isControlled && !isOpen && (
        <div className="p-4">
          <Button
            onClick={() => setInternalOpen(true)}
            className="bg-green-600 text-white px-4 py-2"
          >
            Open Job Drawer
          </Button>
        </div>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40"
          onClick={close}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-full ${widthClass} bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-scroll ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        {/* header sticky*/}
        <div className="flex items-center justify-between sticky top-0 bg-white z-10 px-6 sm:px-10 py-5 border-b">
          <button className="cursor-pointer" onClick={close}>
            <ArrowLeft className="size-8 text-green-600 hover:-translate-x-2 duration-300" />
          </button>
          <p className="text-green-600">Job Description</p>
        </div>

        {/* job description */}
        <article className="mt-5 space-y-10 p-6">
          {/* Job title & meta */}
          <header>
            <h2 className="text-2xl font-semibold text-gray-900">
              Optimize CSS for Website
            </h2>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-gray-600">
              <time dateTime="2025-08-16" className="text-base">
                Date comes here
              </time>
              <span className="flex items-center gap-2 text-base">
                <MapPin className="size-5" />
                Worldwide
              </span>
            </div>
          </header>

          {/* Connects info */}
          <section className="space-y-1 text-lg text-gray-700">
            <p>
              Required Connects:{" "}
              <span className="font-medium text-gray-900">14</span>
            </p>
            <p>
              Available Connects:{" "}
              <span className="font-medium text-gray-900">200</span>
            </p>
          </section>

          {/* Job summary */}
          <section>
            <h3 className="text-xl font-semibold text-gray-800">Summary</h3>
            <p className="mt-3 text-lg leading-relaxed text-gray-700 font-light">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Obcaecati sed laudantium earum consequuntur, vitae optio voluptas?
              Nostrum totam non, accusantium, hic maiores aperiam, quis ratione
              autem fuga placeat reiciendis laborum officia vitae laudantium
              minus est sequi iusto quo cupiditate cum dolorem? Repellat magnam
              voluptate ad sunt eligendi deleniti corporis itaque.
            </p>
          </section>

          {/* Price & Level */}
          <section className="flex flex-wrap gap-16 border-t border-gray-200 pt-8">
            <div className="flex items-start gap-3">
              <DollarSign className="size-5 mt-1 text-gray-500" />
              <div>
                <p className="text-lg font-medium text-gray-900">$15.00</p>
                <p className="text-sm text-gray-500">Fixed-price</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <UserPen className="size-5 mt-1 text-gray-500" />
              <div>
                <p className="text-lg font-medium text-gray-900">Entry Level</p>
                <p className="text-sm text-gray-500">Experience</p>
              </div>
            </div>
          </section>

          {/* Attachment */}
          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-800">Attachment</h3>
            <a
              href="#"
              className="mt-3 flex items-center gap-2 text-lg text-green-600 hover:underline"
            >
              <Link className="size-5" />
              Attachment link will come here
            </a>
          </section>

          {/* Skills */}
          <section className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-800">
              Skills & Expertise
            </h3>
            <ul className="mt-5 flex flex-wrap gap-3">
              {Array.from({ length: 10 }, (_, i) => (
                <li
                  key={i}
                  className="text-base bg-gray-100 text-gray-800 px-4 py-1 rounded-2xl"
                >
                  Skill-{i + 1}
                </li>
              ))}
            </ul>
          </section>

          {/* Proposals */}
          <footer className="border-t border-gray-200 pt-8">
            <p className="text-base text-gray-500">Total proposals: 20</p>
          </footer>
        </article>

        {/* client details */}
        <section className="mt-10 border p-6 px-5 bg-white ">
          <h3 className="text-xl font-semibold text-gray-900">
            About the Client
          </h3>

          {/* Header: Name + Company */}
          <div className="mt-4">
            <p className="text-lg font-medium text-gray-900">John Doe</p>
            <p className="text-gray-600">Acme Corp</p>
          </div>

          {/* Contact */}
          <div className="mt-3 space-y-1 text-base text-gray-700">
            <p>
              Email: <span className="font-medium">johndoe@email.com</span>
            </p>
            <p>
              Website:{" "}
              <a
                href="https://acmecorp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                acmecorp.com
              </a>
            </p>
          </div>

          {/* Verification */}
          <div className="mt-5 space-y-2 text-base text-gray-700">
            <p className="flex items-center gap-2">
              <CheckCircle className="size-5 text-green-600" />
              Payment method verified
            </p>
            <p className="flex items-center gap-2">
              <CheckCircle className="size-5 text-green-600" />
              Phone number verified
            </p>
          </div>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-2 text-base text-gray-700">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="size-5 text-yellow-500 fill-yellow-500"
              />
            ))}
            <span className="font-medium">5.0</span>
          </div>

          {/* Location + Stats */}
          <div className="mt-5 space-y-2 text-base text-gray-700">
            <p className="flex items-center gap-2">
              <MapPin className="size-5 text-gray-500" />
              United States
            </p>
            <p>4 jobs posted</p>
            <p>$482 total spent</p>
            <p>Member since Mar 9, 2024</p>
          </div>
        </section>

        {/* reviews */}
        <div className="mb-10">
          <Reviews />
        </div>

        {/* action buttons */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-5 flex items-center gap-4">
          {/* Primary button */}
          <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md py-3 cursor-pointer">
            Apply Now
          </Button>

          {/* Secondary button */}
          <Button className="flex-1 bg-white border border-green-600 text-green-600  font-medium rounded-md py-3 flex items-center justify-center gap-2 hover:bg-green-500 hover:text-white duration-300 cursor-pointer">
            <Heart className="size-5" />
            Save Job
          </Button>
        </div>
      </div>
    </>
  );
};

export default JobDescriptionDrawer;
