import styled, { keyframes, css } from "styled-components";
import customCursor from "./cursor.svg";

export const Aviasales = styled.div`
  margin: auto;
  display: flex;
  justify-content: center;
  @media (max-width: 800px) {
    margin-top: 5px;
    flex-direction: column;
    align-items: center;
  }
`;

export const Logo = styled.img`
  position: absolute;
  top: 40px;
  @media (max-width: 800px) {
    position: initial;
  }
`;

export const Title = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 12px;
  padding: 20px 0 10px 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #4a4a4a;
`;

export const Container = styled.main`
  display: flex;
  justify-content: center;

  @media (max-width: 800px) {
    justify-content: initial;
  }
`;

export const Label = styled.label`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 20px;
`;

export const TicketsBlock = styled.section`
  position: relative;
  top: 160px;
  padding-left: 20px;

  @media (max-width: 800px) {
    top: 0px;
    padding-left: initial;
  }
`;

export const Tickets = styled.section`
  margin-top: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Buttons = styled.section`
  width: 504px;
`;

const donutSpin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  display: inline-block;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #2196f3;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${donutSpin} 1.2s linear infinite;
`;

export const CheckboxField = styled.div`
  height: 40px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  color: ${({ disabled }) =>
    disabled ? "#cecece !important" : "#4a4a4a !important"};
  &:hover {
    background-color: #f1fcff;
  }
`;

const Button = styled.button`
  width: 252px;
  height: 50px;
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 20px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: ${({ disabled }) => (disabled ? "#cecece !important" : "#4a4a4a")};
  cursor: url(${customCursor}), pointer;
  background: #ffffff;
  border: 1px solid #dfe5ec;
  box-sizing: border-box;
  transition-duration: 0.5s;
  &:hover {
    border: 1px solid #2196f3;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  }
  &:focus {
    outline-style: none;
    border: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

export const LeftButton = styled(Button)`
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background: ${({ id, active }) => (id === active ? "#2196f3" : "#ffffff")};
  color: ${({ id, active }) => (id === active ? "#ffffff" : "#4a4a4a")};
`;

export const RightButton = styled(Button)`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  background: ${({ id, active }) => (id === active ? "#2196f3" : "#ffffff")};
  color: ${({ id, active }) => (id === active ? "#ffffff" : "#4a4a4a")};
`;

const rollIn = keyframes`
  0% {
    height: 0px;
    visibility: hidden;
  }
  40% {
    height: 0px;
    visibility: visible;
  }
  100% {
    height: 252px;
    visibility: visible;
  }
`;

export const FilterBox = styled.aside`
  position: relative;
  top: 160px;
  width: 232px;
  height: 252px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  @media (max-width: 800px) {
    position: absolute;
    visibility: ${({ isHidden }) => (isHidden ? "hidden" : "visible")};
    animation: ${({ isHidden }) =>
      isHidden
        ? ""
        : css`
            ${rollIn} 0.5s ease-in-out
          `};
    z-index: 1;
    left: initial;
    top: 45px;
    overflow: hidden;
  }
`;

export const MobileMenu = styled.button`
  position: absolute;
  visibility: hidden;
  cursor: url(${customCursor}), pointer;
  &:focus {
    outline-style: none;
    border: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
  &:after {
    content: "≡";
  }
  @media (max-width: 800px) {
    visibility: visible;
    font-family: Open Sans;
    line-height: 20px;
    border: 1px solid #dfe5ec;
    top: 13px;
    width: ${({ isHidden }) => (isHidden ? "40px" : "234px")};
    height: 40px;
    padding-bottom: 5px;
    background: ${({ isHidden }) => (isHidden ? "#ffffff" : "#2196f3")};
    color: ${({ isHidden }) => (isHidden ? "#4a4a4a" : "#ffffff")};
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    text-align: center;
    font-size: 2.3em;
    font-weight: 600;
    z-index: 2;
    transition: 0.2s;
  }
`;

export const CustomCheckbox = styled.input`
  &:checked {
    position: absolute;
    left: -9999px;
  }
  &:not(:checked) {
    position: absolute;
    left: -9999px;
  }
  &:not(:checked) + label:after {
    opacity: 0;
  }

  &:checked + label:after {
    opacity: 1;
  }

  &:checked + label,
  &:not(:checked) + label {
    display: inline-block;
    position: relative;
    padding-left: 28px;
    line-height: 40px;
    width: 180px;
    cursor: url(${customCursor}), pointer;
  }

  &:checked + label:before,
  &:not(:checked) + label:before {
    content: "";
    position: absolute;
    left: 0px;
    top: 10px;
    width: 20px;
    height: 20px;
    border: 1px solid #2196f3;
    box-sizing: border-box;
    border-radius: 2px;
  }

  &:checked + label:after,
  &:not(:checked) + label:after {
    content: "";
    position: absolute;
    -webkit-transition: all 0.2s ease;
    -moz-transition: all 0.2s ease;
    -o-transition: all 0.2s ease;
    transition: all 0.2s ease;
    left: 5px;
    top: 15px;
    width: 9px;
    height: 5px;
    border-radius: 1px;
    border-left: 2px solid #2196f3;
    border-bottom: 2px solid #2196f3;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  &:focus + label:before {
    outline-style: solid;
    outline-color: transparent;
    border: 1px solid #2196f3;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
