import styled from "styled-components"

//todo https://www.socialmediatoday.com/news/8-of-the-most-important-html-tags-for-seo/574987/ !!!!
export const SliderLayout = styled.main`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  scroll-snap-stop: always;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
`
