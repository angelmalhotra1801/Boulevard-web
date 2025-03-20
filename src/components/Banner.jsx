import styled from "styled-components";

import "../components/banner.css";
import SLIDE from "../assets/bannerImg/3.png";
import SLIDE1 from "../assets/bannerImg/4.png";
import SLIDE2 from "../assets/bannerImg/5.png";
import SLIDE3 from "../assets/bannerImg/6.png";
import SLIDE4 from "../assets/bannerImg/7.png";
import SLIDE5 from "../assets/bannerImg/8.png";


const SectionWrapper = styled.section`
  min-height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  margin: 0 auto;
  color: white;
  font-family: "Albert Sans", sans-serif;
`;

const LeftContainer = styled.div`
  position: absolute;
  left: -18%;
  top: 50%;
`;

const Container = styled.div`
  top: 10%;
  left: 5%;
  position: absolute;
  text-transform: uppercase;
  font-family: boldgod;
`;

const Banner = () => {
  return (
    <SectionWrapper id="fixed-target" className="banner">
      <Container data-scroll data-scroll-delay=".15" data-scroll-speed="1">
        <p className="how-work">What's Included</p>
        <p className="more-thn">
          Genesis
          <br />
          <span className="gen-yell">Collection</span>
        </p>
        <p className="meta-des">
          The Metaluxe genesis NFT collection consists of
          <span className="ten-yell"> 10,000 unique, hand-curated suits</span>.
          <br />
          Each suit includes a blockchain-authenticated artwork piece and an
          identical, cloud-hosted
          <span className="rm-one"> augmented reality model</span>.
        </p>
      </Container>

      <LeftContainer data-scroll data-scroll-delay=".15" data-scroll-speed="2">
        <div className="items">
          {[SLIDE, SLIDE1, SLIDE2, SLIDE3, SLIDE4, SLIDE5].map(
            (image, index) => (
              <div key={index} className="entry">
                <img src={image} alt={`Slide ${index + 1}`} className="slide" />
              </div>
            )
          )}
        </div>
      </LeftContainer>
    </SectionWrapper>
  );
};

export default Banner;
