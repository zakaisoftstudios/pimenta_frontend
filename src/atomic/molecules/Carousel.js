import React from 'react'
import styled from 'styled-components'
import NukaCarousel from 'nuka-carousel'
import carouselPrevIcon from '../../assets/icons/carousel-prev.svg'
import carouselNextIcon from '../../assets/icons/carousel-next.svg'
import { breakpoints } from '../../constants/responsive'
import { t } from '@lingui/macro'
import { withI18n } from '@lingui/react'

const Carousel = ({ items, i18n }) => (
  <Wrapper>
    <NukaCarousel
      dragging={false}
      wrapAround={true}
      renderCenterLeftControls={({ previousSlide }) => (
        <PrevBtn
          src={carouselPrevIcon}
          onClick={previousSlide}
          alt={i18n._(t`Previous slide`)}
        />
      )}
      renderCenterRightControls={({ nextSlide }) => (
        <NextBtn
          src={carouselNextIcon}
          onClick={nextSlide}
          alt={i18n._(t`Next slide`)}
        />
      )}
      renderBottomCenterControls={() => null}
    >
      {items.map((url, i) => (
        <Image src={url} key={i} />
      ))}
    </NukaCarousel>
  </Wrapper>
)

const Wrapper = styled.div`
  width: 100%;

  @media (min-width: ${breakpoints.sm}) {
    width: 34.7rem;
    height: 19.5rem;
  }
`

const PrevBtn = styled.img`
  margin-left: 1.2rem;
  cursor: pointer;
`

const NextBtn = styled.img`
  margin-right: 1.2rem;
  cursor: pointer;
`

const Image = styled.img`
  width: 27rem;
  height: 19.5rem;
  @media (min-width: ${breakpoints.sm}) {
    width: 34.7rem;
  }
`

export default withI18n()(Carousel)
