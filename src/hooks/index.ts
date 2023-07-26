import { useDispatch } from "react-redux";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { AppDispatch } from "../store/store";
import Glide, { Options } from "@glidejs/glide";

export const useActions = (
  value: number,
  length: number,
  showcasedElements: number
) => {
  const ref = useRef<HTMLUListElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(true);

  const goBack = () => {
    setCurrentIndex(currentIndex - 1);
    if (ref.current) {
      ref.current.style.transform = `translate(${left + value}vw)`;
    }
    setLeft(left + 29.882);
    if (currentIndex === 1) {
      setBack(false);
    } else {
      setForward(true);
    }
  };

  const goForward = () => {
    setCurrentIndex(currentIndex + 1);
    if (ref.current) {
      ref.current.style.transform = `translate(${left - value}vw)`;
    }
    setLeft(left - 29.882);
    if (currentIndex === length - showcasedElements) {
      setForward(false);
    } else {
      setBack(true);
    }
  };

  return {
    ref,
    currentIndex,
    goBack,
    back,
    goForward,
    forward,
  };
};

export const useSlider = (number: number) => {
  const sliderRef = useRef<Slider>(null);

  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(true);

  const goBack = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const afterChange = (current: number) => {
    if (current === 0) {
      setBack(false);
    } else {
      setBack(true);
    }
    // @ts-ignore
    if (current === sliderRef.current?.innerSlider?.state.slideCount - number) {
      setForward(false);
    } else {
      setForward(true);
    }
  };

  const goForward = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  return {
    sliderRef,
    afterChange,
    goBack,
    back,
    goForward,
    forward,
    setForward,
  };
};

export const useAppDispatch = () => useDispatch<AppDispatch>();

export function useStateRef<HTMLElement>(
  initialValue: HTMLElement[] | (() => HTMLElement[])
): [
  HTMLElement[],
  React.Dispatch<React.SetStateAction<HTMLElement[]>>,
  React.MutableRefObject<HTMLElement[]>
] {
  const [value, setValue] = useState(initialValue);

  const ref = useRef(value);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return [value, setValue, ref];
}
