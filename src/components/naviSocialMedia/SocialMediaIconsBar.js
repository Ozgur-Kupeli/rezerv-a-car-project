import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SocialMediaBar = styled.section`
  width: auto;
  height: auto;
  border: none;
  outline: none;
  overflow: hidden;
  padding: 0;
  margin: 0 auto;
  position: relative;
  background: transparent;
  display: block;
`;
const SocialMediaLink = styled.a`
  height: auto;
  width: auto;
  border: none;
  outline: none;
  overflow: hidden;
  padding: 0;
  margin-left: 8px;
  display: inline-block;
  background: transparent;
`;
const SocialMediaIcon = styled.img`
  width: 20px;
  height: auto;
  background: transparent;
`;

function SocialMediaIconsBar({ socialMediaIcons }) {
  return (
    <SocialMediaBar>
      {socialMediaIcons.map((i) => {
        return (
          <SocialMediaLink key={i.id} href={i.link} target={i.target}>
            <SocialMediaIcon src={i.iconLink} title={i.title} alt={i.alt} />
          </SocialMediaLink>
        );
      })}
    </SocialMediaBar>
  );
}
SocialMediaIconsBar.propTypes = {
  socialMediaIcons: PropTypes.array.isRequired,
};
SocialMediaIconsBar.defaultProps = {
  socialMediaIcons: [],
};
export default SocialMediaIconsBar;
