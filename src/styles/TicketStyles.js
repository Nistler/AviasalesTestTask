import styled from "styled-components";

export const Ticket = styled.article`
  height: 184px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
`;

export const Header = styled.div`
  padding: 20px 0 20px 20px;
  width: 432px;
  height: 36px;
  display: flex;
  justify-content: space-between;
`;

export const Price = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #2196f3;
`;

export const CompanyLogo = styled.img`
  width: 110px;
  height: 36px;
`;

export const RouteInfo = styled.div`
  margin: 0 0 10px 20px;
  height: 39px;
  display: flex;
  justify-content: space-between;
`;

export const H3 = styled.h3`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 18px; /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #a0b0b9;
  margin: 0;
`;

export const Details = styled.div`
  font-family: "Open Sans";
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 21px; /* identical to box height, or 150% */
  display: flex;
  align-items: center;
  color: #4a4a4a;
`;

export const DetailsBox = styled.div`
  width: 141px;
  margin-right: 20px;
`;
